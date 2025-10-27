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

  // Handle "multiplied by" multiplication queries
  if (query.toLowerCase().includes("multiplied")) {
    // Extract all numbers from the query
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length >= 2) {
      const num1 = parseInt(numbers[0], 10);
      const num2 = parseInt(numbers[1], 10);
      const product = num1 * num2;
      return product.toString();
    }
  }

  // Handle "both a square and a cube" queries
  if (query.toLowerCase().includes("square") && query.toLowerCase().includes("cube")) {
    // Extract all numbers from the query
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length > 0) {
      const numericValues = numbers.map(n => parseInt(n, 10));

      // A number is both a perfect square and perfect cube if it's a 6th power
      // Check each number
      for (const num of numericValues) {
        // Check if it's a perfect square
        const squareRoot = Math.sqrt(num);
        const isSquare = Number.isInteger(squareRoot);

        // Check if it's a perfect cube
        const cubeRoot = Math.round(Math.pow(num, 1/3));
        const isCube = Math.pow(cubeRoot, 3) === num;

        if (isSquare && isCube) {
          return num.toString();
        }
      }
    }
  }

  return "";
}
