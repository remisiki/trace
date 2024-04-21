import datetime

from src.Article import Article
from src.Utils import Utils


class Counter:
    """
    A paper counter interface

    Attributes:
        date (datetime.datetime): Date time object
        count (int): Count of papers in the date
    """

    def __init__(self, date: datetime.datetime, count: int = 1):
        self.date = date
        self.count = count

    def inc(self) -> None:
        """
        Increase count by 1
        """
        self.count += 1


class TrendSummarizer:
    """
    Trend summarizer object
    """

    @staticmethod
    def do(articles: list[Article]) -> dict:
        """
        Summarize trend from articles

        Args:
            articles (list[Article]): List of articles

        Returns:
            Summary results
        """
        # Split date range into 10 percentiles
        n = 10
        # Percentiles that need to be recorded
        percentiles = [1, 4, 10]

        latest = articles[0].publishTime
        oldest = articles[-1].publishTime
        interval = (latest - oldest) // (n - 1)

        threshold = latest
        counts = []
        for article in articles:
            # Increase counter if article is in the percentile range, otherwise move to next range
            if article.publishTime > threshold:
                counts[-1].inc()
            else:
                threshold -= interval
                counts.append(Counter(threshold))

        # Cumulatively sum up counts for each range
        sum = 0
        results = {"percentiles": [], "range": {"x": [], "y": []}}
        for i in range(1, n + 1):
            # Number of actual percentiles fewer than `n`
            if i > len(counts):
                break

            c = counts[i - 1]
            sum += c.count
            # Record the count if needed or is the last percentile
            if i in percentiles or i == len(counts):
                results["percentiles"].append(
                    [Utils.datetimeToReadable(latest, c.date), sum]
                )
            # Record all percentiles in range
            results["range"]["x"].append(c.date)
            results["range"]["y"].append(c.count)
        # Sort in ascending order
        results["range"]["x"].reverse()
        results["range"]["y"].reverse()

        return results
