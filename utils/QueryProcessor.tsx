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
    const numericValues = numbers.map(n => parseInt(n, 10));

    // Addition - sum all numbers
    if (query.toLowerCase().includes("plus")) {
      const sum = numericValues.reduce((acc, num) => acc + num, 0);
      return sum.toString();
    }

    // Subtraction - subtract all subsequent numbers from the first
    if (query.toLowerCase().includes("minus")) {
      const difference = numericValues.reduce((acc, num, index) =>
        index === 0 ? num : acc - num, 0);
      return difference.toString();
    }

    // Multiplication - multiply all numbers
    if (query.toLowerCase().includes("multiplied")) {
      const product = numericValues.reduce((acc, num) => acc * num, 1);
      return product.toString();
    }

    // Power/Exponent - only for two numbers
    if (query.toLowerCase().includes("power")) {
      return Math.pow(numericValues[0], numericValues[1]).toString();
    }

    // Division - only for two numbers
    if (query.toLowerCase().includes("divided")) {
      return (numericValues[0] / numericValues[1]).toString();
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

  // Handle "primes" queries
  if (query.toLowerCase().includes("prime")) {
    // Extract all numbers from the query
    const numbers = query.match(/\d+/g);
    if (numbers && numbers.length > 0) {
      const numericValues = numbers.map(n => parseInt(n, 10));

      // Helper function to check if a number is prime
      const isPrime = (num: number): boolean => {
        if (num < 2) return false;
        if (num === 2) return true;
        if (num % 2 === 0) return false;

        for (let i = 3; i <= Math.sqrt(num); i += 2) {
          if (num % i === 0) return false;
        }
        return true;
      };

      // Find all prime numbers
      const primes = numericValues.filter(isPrime);

      if (primes.length > 0) {
        // Return comma-separated list of primes
        return primes.join(", ");
      }
    }
  }

  return "";
}
