export class Recipe {
  constructor() {}

  // Tarif bilgilerini alma
  async getRecipe(id) {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );
    // verileri işle
    const data = await res.json();
    console.log(data);
  }
  // tarif bilgilerini ekrana render etme
}
