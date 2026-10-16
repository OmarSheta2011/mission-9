import products from "./products.js";
// ----------------------------------
const filter = document.querySelector(".filter");
const searchTextInput = document.querySelector(".search-text-input");
const categoryInput = document.querySelector("#category-input");
const sortInput = document.querySelector("#sort");
// ----------------------------------
let searchText = "";
let category = categoryInput.value;
let sort = sortInput.value;

function filterByName(text) {
  let arr = products.filter((product) =>
    product.name.toLowerCase().includes(text),
  );
  console.log(arr);
  filterByCategory(arr);
}

function filterByCategory(arr) {
  let arr2 = arr.filter((product) => product.category === category);
  console.log(arr2);
  filterByPrice(arr2);
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
            arr3.unshift(product);
          }
        });
      });

      console.log(prices.toSorted());
      console.log(arr3);
      break;
    case "HtL":
      arr3 = prices.toSorted().reverse();
      break;
    case "Default":
      arr3 = [...arr2];
      console.log("default" + arr3);
      break;
  }
}

categoryInput.addEventListener("change", (e) => {
  category = e.target.value;
  filterByName(searchText);
});

sortInput.addEventListener("change", (e) => {
  sort = e.target.value;

  filterByName(searchText);
});

searchTextInput.addEventListener("keydown", (e) => {
  if (e.key === "backSpace") return;
  searchText = searchTextInput.value;
  filterByName(searchText);
});
