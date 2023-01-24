export async function searchRecipes(searchTerm: string) {
  return fetch(`http://localhost:5000/recipes/name/${searchTerm}`)
    .then((response) => response.json())
    .then((results) => {
      return results;
    })
    .catch((error) => {
      throw new Error(error);
    });
}
