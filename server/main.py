import logging
import os
import traceback
from contextlib import asynccontextmanager
from typing import *

from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi_cache import FastAPICache
from fastapi_cache.backends.inmemory import InMemoryBackend
from fastapi_cache.decorator import cache
from slowapi import Limiter
from slowapi.errors import RateLimitExceeded
from starlette.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles

from src.ArticleFactory import ArticleFactory
from src.AutoComplete import AutoComplete
from src.KeywordExtractor import KeywordExtractor
from src.NewsFactory import NewsFactory
from src.TrendSummarizer import TrendSummarizer

CACHE_EXPIRE_SECONDS = int(os.getenv("CACHE_EXPIRE_SECONDS", "86400"))
QUERY_LIMIT_RATE = int(os.getenv("QUERY_LIMIT_RATE", "10"))
AUTOCOMPLETE_LIMIT_RATE = int(os.getenv("AUTOCOMPLETE_LIMIT_RATE", "60"))


class StartupModel:
    """
    A startup model

    Attributes:
        keybert: Keyword extractor instance
        newsFactory: News factory
    """

    def __init__(self):
        self.keybert: Optional[KeywordExtractor] = None
        self.newsFactory: Optional[NewsFactory] = None

    def clear(self):
        """
        Clear instances
        """
        self.keybert = None
        self.newsFactory = None


# Set up startup model
models = StartupModel()

# Set up global uvicorn logger format
logger = logging.getLogger("uvicorn.access")
formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
for handler in logger.handlers:
    handler.setFormatter(formatter)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan on startup
    """
    # Init cache using in memory backend
    FastAPICache.init(InMemoryBackend())
    # Start keybert extractor
    models.keybert = KeywordExtractor()
    # Set up news factory
    models.newsFactory = NewsFactory()
    yield
    models.clear()


app = FastAPI(lifespan=lifespan)
# Allow all origins and methods
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def rateLimitExceedHandler(request: Request, exc: HTTPException) -> JSONResponse:
    """
    Handle rate limit exceed

    Args:
        request (Request): Raw request
        exc (HTTPException): Exception

    Returns:
        JSON response
    """
    return JSONResponse(
        status_code=429,
        content={"message": "Too many requests. Please try again later."},
    )


# Add limiter to work globally
limiter = Limiter(
    key_func=lambda: "global",
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, rateLimitExceedHandler)

# Routes


@app.get("/api/query")
@limiter.limit(f"{QUERY_LIMIT_RATE}/minute")
@cache(expire=CACHE_EXPIRE_SECONDS)
async def query(keywords: str, request: Request) -> dict:
    """
    Request query summary results

    Args:
        keywords (str): query keyword
        request (Request): Request object

    """
    response = {"status": "ok"}
    try:
        # Fetch at most 1000 articles
        articles = ArticleFactory.create(keywords, count=1000)
        # Fetch 10 news
        news = models.newsFactory.create(keywords, count=10)
        # If no articles found
        if len(articles) == 0:
            response["status"] = "empty"
        response["result"] = {
            "query": keywords,
            # Keyword extractor
            "keywords": models.keybert.do(articles),
            # Trend summarizer
            "trend": TrendSummarizer.do(articles),
            # List of articles
            "articles": [x.toJson() for x in articles[:10]],
            # List of news
            "news": [x.toJson() for x in news],
        }
    except Exception as err:
        response = {"status": "error"}
        logger.error(f"Error querying keywords {keywords}: {err}")
        logger.error(traceback.format_exc())
    finally:
        return response


@app.get("/api/complete")
@limiter.limit(f"{AUTOCOMPLETE_LIMIT_RATE}/minute")
@cache(expire=CACHE_EXPIRE_SECONDS)
async def complete(keywords: str, request: Request) -> list[str]:
    """
    Request autocomplete

    Args:
        keywords (str): query keyword
        request (Request): Request object

    Returns:
        List of options
    """
    return AutoComplete.do(keywords)


# Server static files from ./build
app.mount("/", StaticFiles(directory="build", html=True), name="client")
