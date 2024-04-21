/**
 * Utils wrapper
 */
namespace Utils {
  /**
   * Normalize array range to [lower, upper]
   * @param arr
   * @param lower
   * @param upper
   * @return The normalized array
   */
  export const normalize = (
    arr: ReadonlyArray<number>,
    lower: number,
    upper: number,
  ): Array<number> => {
    if (arr && arr.length > 0) {
      let min = arr[0];
      let max = arr[0];
      arr.forEach((x) => {
        if (x < min) {
          min = x;
        } else if (x > max) {
          max = x;
        }
      });
      return arr.map(
        (x) => lower + ((upper - lower) * (x - min)) / (max - min),
      );
    } else {
      return [];
    }
  };

  /**
   * Convert date object to readable string
   * @param date
   */
  export const dateToString = (date: Date) => {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };
}

export default Utils;
