from keybert import KeyBERT

from src.Article import Article


class KeywordExtractor:
    """
    Keyword extractor instance

    Attributes:
        model (KeyBERT): The keybert model
    """

    def __init__(self):
        self.model = KeyBERT()

    def do(self, articles: list[Article]) -> list[tuple[str, float]]:
        """
        Extract keywords from articles

        Args:
            articles (list[Article]): List of articles

        Returns:
            List of keywords tuples as (text, score)
        """
        results = []
        if len(articles) > 0:
            # Join all titles into one string
            text = ".".join([a.title for a in articles])
            # Use keybert model to extract top 10 keywords
            results = self.model.extract_keywords(text, top_n=10)
        return results
