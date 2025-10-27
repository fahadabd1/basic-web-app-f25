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

  // Handle arithmetic operations
  const numbers = query.match(/\d+/g);

  if (numbers && numbers.length >= 2) {
    const num1 = parseInt(numbers[0], 10);
    const num2 = parseInt(numbers[1], 10);

    // Addition
    if (query.toLowerCase().includes("plus")) {
      return (num1 + num2).toString();
    }

    // Subtraction
    if (query.toLowerCase().includes("minus")) {
      return (num1 - num2).toString();
    }

    // Multiplication
    if (query.toLowerCase().includes("multiplied")) {
      return (num1 * num2).toString();
    }

    // Division
    if (query.toLowerCase().includes("divided")) {
      return (num1 / num2).toString();
    }
  }

  // Handle "both a square and a cube" queries
  if (query.toLowerCase().includes("square") && query.toLowerCase().includes("cube")) {
    // Extract all numbers from the query
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length > 0) {
      const numericValues = numbers.map(n => parseInt(n, 10));


      for (const num of numericValues) {
        const squareRoot = Math.sqrt(num);
        const isSquare = Number.isInteger(squareRoot);

        
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
