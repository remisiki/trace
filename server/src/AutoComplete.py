import requests

from src.Utils import Utils


class AutoComplete:
    """
    Autocomplete object
    """

    @staticmethod
    def do(keyword: str) -> list[str]:
        """
        Fetch autocomplete suggestions from Google Scholar

        Args:
            keyword (str): Keywords

        Returns:
            List of suggestions
        """
        # Fetch from Google Scholar api
        # Set language as english, date range from 2000~2023 and must have `btnG` (unknown)
        data = requests.get(
            f"https://scholar.google.com/scholar_complete?q={Utils.removeSpace(keyword)}&hl=en&as_sdt=0%2C23&btnG="
        ).json()
        if "l" in data:
            return data["l"]
        else:
            return []
