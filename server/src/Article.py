import math
from datetime import datetime


class Article:
    """
    An article interface

    Attributes:
        publishTime (str): Published time
        title (str): Title
        summary (str): Abstract
        link (str): Uri to original link
        authors (list[str]): List of authors
    """

    def __init__(
        self, publishTime: str, title: str, summary: str, link: str, authors: list[str]
    ):
        self.publishTime = datetime.strptime(publishTime, "%Y-%m-%dT%H:%M:%SZ")
        self.title = title
        self.summary = summary
        self.link = link
        self.authors = authors

    def __str__(self) -> str:
        return f"[{self.title}]{self.summary}"

    def toJson(self) -> dict:
        """
        Returns:
            JSON representation in dict
        """
        return {
            "link": self.link,
            # Convert timestamp to milliseconds
            "publishTime": math.floor(self.publishTime.timestamp() * 1000),
            "title": self.title,
            "summary": self.summary,
            "authors": self.authors,
        }
