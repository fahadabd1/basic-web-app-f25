export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "Fahad";
  }

  if (query.toLowerCase().includes("andrewid")) {
    return "fahadabd";
  }

  // Handle "largest number" queries
  if (query.toLowerCase().includes("largest")) {
    // Extract all numbers from the query
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length > 0) {
      const numericValues = numbers.map(n => parseInt(n, 10));
      const largest = Math.max(...numericValues);
      return largest.toString();
    }
  }

  // Handle "plus" addition queries
  if (query.toLowerCase().includes("plus")) {
    // Extract all numbers from the query
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length >= 2) {
      const num1 = parseInt(numbers[0], 10);
      const num2 = parseInt(numbers[1], 10);
      const sum = num1 + num2;
      return sum.toString();
    }
  }

  return "";
}
