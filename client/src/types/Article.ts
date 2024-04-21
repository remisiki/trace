/**
 * Article wrapper
 */
type Article = {
  // Uri to the original link
  link: string;
  // Published timestamp
  publishTime: number;
  // Title
  title: string;
  // Abstract
  summary: string;
  // Array of author names
  authors: Array<string>;
};

export default Article;
