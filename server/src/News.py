class News:
    """
    A news interface

    Attributes:
        title (str): Title
        link (str): Uri to original link
        thumbnail (str): Uri to thumbnail
    """

    def __init__(self, title: str, link: str, thumbnail: str):
        # News item is not available
        if title == "[Removed]" or thumbnail is None:
            raise NewsIsRemovedException()
        self.title = title
        self.link = link
        self.thumbnail = thumbnail

    def toJson(self) -> dict:
        """
        Returns:
            JSON representation in dict
        """
        return {
            "title": self.title,
            "link": self.link,
            "thumbnail": self.thumbnail,
        }


class NewsIsRemovedException(Exception):
    """
    Exception when news item is removed
    """

    pass
