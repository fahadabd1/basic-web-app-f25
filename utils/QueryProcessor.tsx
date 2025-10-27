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
    const lowerQuery = query.toLowerCase();

    // Parse the expression into tokens (numbers and operators)
    const words = lowerQuery.split(/\s+/);
    const tokens: Array<{ type: 'number' | 'operator', value: number | string }> = [];
    let numIndex = 0;

    for (const word of words) {
      if (word === "plus") {
        tokens.push({ type: 'operator', value: '+' });
      } else if (word === "minus") {
        tokens.push({ type: 'operator', value: '-' });
      } else if (word === "multiplied") {
        tokens.push({ type: 'operator', value: '*' });
      } else if (word === "divided") {
        tokens.push({ type: 'operator', value: '/' });
      } else if (word === "power") {
        tokens.push({ type: 'operator', value: '^' });
      } else if (word.match(/\d+/) && numIndex < numericValues.length) {
        tokens.push({ type: 'number', value: numericValues[numIndex] });
        numIndex++;
      }
    }

    // If we have valid tokens, evaluate with order of operations
    if (tokens.length > 0 && tokens[0].type === 'number') {
      // First pass: handle power operations (highest precedence)
      let i = 0;
      while (i < tokens.length) {
        if (i > 0 && i < tokens.length - 1 &&
            tokens[i].type === 'operator' && tokens[i].value === '^') {
          const left = tokens[i - 1].value as number;
          const right = tokens[i + 1].value as number;
          const result = Math.pow(left, right);
          tokens.splice(i - 1, 3, { type: 'number', value: result });
          i = 0; // Restart from beginning
        } else {
          i++;
        }
      }

      // Second pass: handle multiplication and division (left to right)
      i = 0;
      while (i < tokens.length) {
        if (i > 0 && i < tokens.length - 1 &&
            tokens[i].type === 'operator' && (tokens[i].value === '*' || tokens[i].value === '/')) {
          const left = tokens[i - 1].value as number;
          const right = tokens[i + 1].value as number;
          const result = tokens[i].value === '*' ? left * right : left / right;
          tokens.splice(i - 1, 3, { type: 'number', value: result });
          i = 0; // Restart from beginning
        } else {
          i++;
        }
      }

      // Third pass: handle addition and subtraction (left to right)
      i = 0;
      while (i < tokens.length) {
        if (i > 0 && i < tokens.length - 1 &&
            tokens[i].type === 'operator' && (tokens[i].value === '+' || tokens[i].value === '-')) {
          const left = tokens[i - 1].value as number;
          const right = tokens[i + 1].value as number;
          const result = tokens[i].value === '+' ? left + right : left - right;
          tokens.splice(i - 1, 3, { type: 'number', value: result });
          i = 0; // Restart from beginning
        } else {
          i++;
        }
      }

      // Return the final result
      if (tokens.length === 1 && tokens[0].type === 'number') {
        return tokens[0].value.toString();
      }
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

  // Handle "anagram" queries
  if (query.toLowerCase().includes("anagram")) {
    // Helper function to normalize a word for anagram comparison
    const normalize = (word: string): string => {
      return word.toLowerCase().split('').sort().join('');
    };

    // Extract the target word (word after "anagram of")
    const anagramOfMatch = query.match(/anagram of (\w+)/i);
    if (anagramOfMatch) {
      const targetWord = anagramOfMatch[1];
      const targetNormalized = normalize(targetWord);

      // Extract all words from the query (after the colon)
      const colonIndex = query.indexOf(':');
      if (colonIndex !== -1) {
        const wordList = query.substring(colonIndex + 1);
        const words = wordList.match(/\w+/g);

        if (words) {
          // Find all anagrams
          const anagrams = words.filter(word => {
            return word.toLowerCase() !== targetWord.toLowerCase() &&
                   normalize(word) === targetNormalized;
          });

          if (anagrams.length > 0) {
            return anagrams.join(", ");
          }
        }
      }
    }
  }

  // Handle "scrabble score" queries
  if (query.toLowerCase().includes("scrabble")) {
    // Scrabble letter values
    const scrabbleValues: { [key: string]: number } = {
      'a': 1, 'e': 1, 'i': 1, 'o': 1, 'u': 1, 'l': 1, 'n': 1, 's': 1, 't': 1, 'r': 1,
      'd': 2, 'g': 2,
      'b': 3, 'c': 3, 'm': 3, 'p': 3,
      'f': 4, 'h': 4, 'v': 4, 'w': 4, 'y': 4,
      'k': 5,
      'j': 8, 'x': 8,
      'q': 10, 'z': 10
    };

    // Extract the word (after "scrabble score of")
    const scrabbleMatch = query.match(/scrabble score of (\w+)/i);
    if (scrabbleMatch) {
      const word = scrabbleMatch[1].toLowerCase();
      let score = 0;

      for (const letter of word) {
        score += scrabbleValues[letter] || 0;
      }

      return score.toString();
    }
  }

  return "";
}
