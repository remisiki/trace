import os

import requests

from src.News import News, NewsIsRemovedException
from src.Utils import Utils


class NewsFactory:
    """
    News factory

    Attributes:
        apiKey (str): Key to news api, read from environment variable NEWS_API_KEY
    """

    def __init__(self):
        apiKey = os.getenv("NEWS_API_KEY")
        if apiKey is None:
            raise Exception("No news api key")
        self.apiKey = apiKey

    def create(self, keyword: str, count: int = 10) -> list[News]:
        """
        Create news instances given related keywords
        FIXME Error handler

        Args:
            keyword (str): Keywords
            count (int): Number of instances

        Returns:
            List of news
        """
        # Fetch from news api
        url = (
            f"https://newsapi.org/v2/everything?apiKey={self.apiKey}&q={Utils.removeSpace(keyword)}&pageSize={count}"
            f"&sortBy=relevancy"
        )
        response = requests.get(url).json()
        news = response["articles"]
        newsInstances = []
        for x in news:
            # Exclude news that are not available
            try:
                newsInstances.append(News(x["title"], x["url"], x["urlToImage"]))
            except NewsIsRemovedException:
                pass
        return newsInstances
