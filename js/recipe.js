class Recipe {
  constructor() {}

  // Tarif bilgilerini alma
  getRecipe() {
    const res = fetch(`https://forkify-api.herokuapp.com/api/get?rId=47746`);
  }
}
