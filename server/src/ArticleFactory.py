import requests
import xmltodict

from src.Article import Article
from src.Utils import Utils


class ArticleFactory:
    """
    Article factory
    """

    @staticmethod
    def create(keyword: str, count: int = 10) -> list[Article]:
        """
        Create article instances given related keywords
        FIXME Error handler

        Args:
            keyword (str): Keywords
            count (int): Number of instances

        Returns:
            List of articles
        """
        # Fetch from arxiv api
        url = (
            f"http://export.arxiv.org/api/query?search_query=all:{Utils.removeSpace(keyword)}&"
            f"start=0&max_results={count}&sortBy=submittedDate"
        )
        response = requests.get(url).text
        # Parse xml response
        obj = xmltodict.parse(response)
        articles = obj["feed"]["entry"]
        articles = [
            Article(
                x["published"],
                x["title"],
                x["summary"],
                x["id"],
                (
                    [a["name"] for a in x["author"]]
                    if isinstance(x["author"], list)
                    else [x["author"]["name"]]
                ),
            )
            for x in articles
        ]
        return articles
