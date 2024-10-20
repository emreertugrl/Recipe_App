import { Search } from "./api.js";
import { elements } from "./helper.js";
import { clearLoader, renderLoader, renderResults } from "./ui.js";

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
    }
  }
};

// ! olay izleyicilerl
elements.form.addEventListener("submit", handleSubmit);

// Sayfa yüklendiğinde ve url değiştiğinde çalışacak fonksiyon

const controlRecipe = (eventName) => {
  const id = location.hash.replace("#", "");
};
// !sayfanın yüklenmesi ve url değişimini izle
["load", "hashchange"].forEach((eventName) => {
  window.addEventListener(eventName, controlRecipe);
});
