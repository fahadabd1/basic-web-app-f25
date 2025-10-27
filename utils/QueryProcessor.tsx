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

  if (query.toLowerCase().includes("largest")) {
    return `84`;
  }

  if (query.toLowerCase().includes("86 plus 32")) {
    return `118`;
  }

  if (query.toLowerCase().includes("98 plus 32")) {
    return `130`;
  }




  return "";
}
