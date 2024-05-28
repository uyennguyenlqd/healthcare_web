export function c(inputString: string): string {
  const ignore_words = ["and", "or", "a", "an", "of"];
  const words = inputString.split(" ");

  const capitalizedWords = words.map((word) => {
    if (word.length > 0 && !ignore_words.includes(word.toLowerCase())) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return word; // Handle empty strings if needed
    }
  });

  return capitalizedWords.join(" ");
}
