import products from "./products.js";
// ----------------------------------
const filter = document.querySelector(".filter");
const searchTextInput = document.querySelector(".search-text-input");
const categoryInput = document.querySelector("#category-input");
const sortInput = document.querySelector("#sort");
const productsContainer = document.querySelector(".products-container");
// ----------------------------------
let searchText = searchTextInput.value;
let category = categoryInput.value;
let sort = sortInput.value;

function filterByName(text) {
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
    filterByPrice(arr2);
  } else {
    productsContainer.innerHTML = "No Products Found.";
  }
}

function filterByPrice(arr2) {
  let prices = arr2.map((product) => product.price);
  let arr3 = [];

  switch (sort) {
    case "LtH":
      prices = prices.toSorted();
      prices.forEach((price) => {
        arr2.forEach((product) => {
          if (price === product.price) {
            arr3.push(product);
          }
        });
      });
      break;
    case "HtL":
      prices = prices.toSorted().reverse();
      prices.forEach((price) => {
        arr2.forEach((product) => {
          if (price === product.price) {
            arr3.push(product);
          }
        });
      });
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
  productsContainer.innerHTML = productsHTML;
}

categoryInput.addEventListener("change", (e) => {
  category = e.target.value;
  searchText = searchTextInput.value;
  filterByName(searchText);
});

sortInput.addEventListener("change", (e) => {
  sort = e.target.value;
  searchText = searchTextInput.value;
  filterByName(searchText);
});

searchTextInput.addEventListener("keydown", (e) => {
  if (e.key === "backSpace") return;
  searchText = searchTextInput.value;
  filterByName(searchText);
});
