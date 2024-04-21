import datetime


class Utils:
    """
    Utils object
    """

    @staticmethod
    def datetimeToReadable(dx: datetime.datetime, dy: datetime.datetime) -> str:
        """
        Covert date time to human-readable string

        Args:
            dx (datetime.datetime): From date
            dy (datetime.datetime): To date
        """
        dt = dx - dy
        dt = dt.seconds + (dt.days * 60 * 60 * 24)
        s = dt % 60
        dt //= 60
        m = dt % 60
        dt //= 60
        h = dt % 24
        dt //= 24
        d = dt
        if d > 0:
            result = f"{d} days"
        elif h > 0:
            result = f"{h} hours"
        elif m > 0:
            result = f"{m} minutes"
        else:
            result = f"{s} seconds"
        return result

    @staticmethod
    def removeSpace(s: str) -> str:
        """
        Replace space in the string with plus (+)

        Args:
            s (str): Original string

        Returns:
            New string
        """
        return s.replace(" ", "+")
