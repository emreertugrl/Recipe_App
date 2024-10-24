import { Search } from "./api.js";
import { elements } from "./helper.js";
import { clearLoader, renderLoader, renderResults } from "./ui.js";
import { Recipe } from "./recipe.js";

const recipe = new Recipe();
// ! fonksiyonlar
const handleSubmit = async (e) => {
  e.preventDefault();
  const query = elements.searchInput.value;
  if (query) {
    const search = new Search(query);

    // ekrana loader bas
    renderLoader(elements.resultsList);
    try {
      // api istek at
      await search.getResults();
      // apiden cevap gelince loaderı kaldır
      clearLoader();
      // tarifleri ekrana yaz
      renderResults(search.result);
    } catch (error) {
      alert("Aradığınız kriterlerde uygun tarif bulunamadı");
      clearLoader();
    }
  }
};

// ! olay izleyicilerl
elements.form.addEventListener("submit", handleSubmit);

// Sayfa yüklendiğinde ve url değiştiğinde çalışacak fonksiyon

const controlRecipe = async (eventName) => {
  const id = location.hash.replace("#", "");
  if (id) {
    renderLoader(elements.recipeArea);
    try {
      await recipe.getRecipe(id);
      //  loader ekrandan akldır
      clearLoader();
      // tarif bilgilerini render et
      recipe.renderRecipe(recipe.info);

      // tarif kısmında yer alan arayüz scroll'un düzenlenmesi
      elements.recipeArea.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      alert("Tarif yüklenemedi");
      return;
    }
  }
};
// !sayfanın yüklenmesi ve url değişimini izle
["load", "hashchange"].forEach((eventName) => {
  window.addEventListener(eventName, controlRecipe);
});

// !sepet işlemleri
const handleClick = (e) => {
  if (e.target.id === "add-to-basket") {
    // addtobasket tıklanınca ul erişme
    console.log(e.target.previousElementSibling);
  }
};
// tarif alanında gerçekleşen tıklamaları izle
elements.recipeArea.addEventListener("click", handleClick);
