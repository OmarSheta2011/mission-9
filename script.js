import products from "./products.js";
// ----------------------------------
const filter = document.querySelector(".filter");
const searchTextInput = document.querySelector(".search-text-input");
const categoryInput = document.querySelector("#category-input");
const sortInput = document.querySelector("#sort");
const productsContainer = document.querySelector(".products-container");
const numberOfProductsElem = document.querySelector(".number-of-products");
// ----------------------------------
let category;
let sort;

function filterByName(text) {
  category = categoryInput.value;
  sort = sortInput.value;
  let arr = [...products];
  if (text !== "") {
    arr = products.filter((product) =>
      product.name.toLowerCase().includes(text.toLowerCase()),
    );
  }
  console.log(arr);
  if (arr.length) {
    filterByCategory(arr);
  } else {
    productsContainer.innerHTML = "No Products Found.";
  }
}

function filterByCategory(arr) {
  let arr2 = [...arr];
  if (category !== "All")
    arr2 = arr.filter((product) => product.category === category);
  if (arr2.length) {
    sortByPrice(arr2);
  } else {
    productsContainer.innerHTML = "No Products Found.";
  }
}

function sortByPrice(arr2) {
  let arr3 = [];
  switch (sort) {
    case "LtH":
      arr3 = [
        ...arr2.toSorted(
          (product, nextProduct) => product.price - nextProduct.price,
        ),
      ];
      break;
    case "HtL":
      arr3 = [
        ...arr2.toSorted(
          (product, nextProduct) => nextProduct.price - product.price,
        ),
      ];
      break;
    case "Default":
      arr3 = [...arr2];
      break;
  }
  generateProductsHTML(arr3);
}

function generateProductsHTML(arr3) {
  let productsHTML = "";
  arr3.forEach((product) => {
    productsHTML += `
      <div class="product">
        <div class="image"></div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-category">${product.category}</p>
        <p class="product-price"> ${product.price} EGP</p>
      </div>`;
  });
  numberOfProductsElem.innerHTML = `Showing ${arr3.length} products`;
  productsContainer.innerHTML = productsHTML;
}

categoryInput.addEventListener("change", (e) => {
  category = e.target.value;
  filterByName(searchTextInput.value);
});

sortInput.addEventListener("change", (e) => {
  sort = e.target.value;
  filterByName(searchTextInput.value);
});

searchTextInput.addEventListener("keyup", (e) => {
  filterByName(searchTextInput.value);
});
