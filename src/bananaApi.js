
const API_URL =
  "https://marcconrad.com/uob/banana/api.php?out=json";

export async function fetchBananaPuzzle() {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to load a puzzle from the Banana API.");
  }

  const data = await response.json();

  if (
    !data.question ||
    data.solution === undefined ||
    !Number.isInteger(Number(data.solution)) ||
    Number(data.solution) < 0 ||
    Number(data.solution) > 9
  ) {
    throw new Error("The API returned an invalid puzzle.");
  }

  return {
    imageUrl: data.question,
    solution: Number(data.solution),
  };
}
