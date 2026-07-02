//! the navigation between sections,and managing the sidebar functionality.
const mealCategorySection = document.getElementById("meal-categories-section");
const searchFiltersSection = document.getElementById("search-filters-section");
const allRecipesSection = document.getElementById("all-recipes-section");
const productsSection = document.getElementById("products-section");
const foodlogSection = document.getElementById("foodlog-section");
const mealDetailsSection = document.getElementById("meal-details");
const header = document.getElementById("header");
const sideBar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebar-overlay");
const sections = [
  mealCategorySection,
  searchFiltersSection,
  allRecipesSection,
  productsSection,
  foodlogSection,
];
const links = document.querySelectorAll("nav a");
function navigate(section) {
  history.pushState({}, "", `#${section}`);

  mealDetailsSection.classList.add("hidden");

  sections.forEach((section) => section.classList.add("hidden"));

  links.forEach((link) => {
    link.classList.remove(
      "bg-emerald-50",
      "text-emerald-700",
      "hover:bg-gray-50",
    );
  });
}
function changePage(linkIndex, url, title, description, ...sectionElement) {
  navigate(url);

  links[linkIndex].classList.add("bg-emerald-50", "text-emerald-700");

  sectionElement.forEach((element) => {
    element.classList.remove("hidden");
  });

  header.innerHTML = `
    <div class="px-8 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4 flex-1">
          <button id="header-menu-btn">
            <i class="fa-solid fa-bars"></i>
          </button>

          <div>
            <h1 class="text-2xl font-bold text-gray-900">
              ${title}
            </h1>

            <p class="text-sm text-gray-500 mt-1">
              ${description}
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}
links[0].addEventListener("click", (e) => {
  e.preventDefault();

  let selectedSections = sections.slice(0, 3);
  changePage(
    0,
    "meals",
    "Meals & Recipes",
    "Discover delicious and nutritious recipes tailored for you",
    ...selectedSections,
  );
});
links[1].addEventListener("click", (e) => {
  e.preventDefault();

  changePage(
    1,
    "products",
    "Product Scanner",
    "Search packaged foods by name or barcode",
    productsSection,
  );
});
links[2].addEventListener("click", (e) => {
  e.preventDefault();

  changePage(
    2,
    "foodlog",
    "Food Log",
    "Track your daily nutrition and food intake",
    foodlogSection,
  );
});
document.addEventListener("click", function (e) {
  if (e.target.closest("#header-menu-btn")) {
    sidebarOverlay.classList.add("active");
    sideBar.classList.add("open");
  }

  if (e.target.closest("#sidebar-close-btn")) {
    sidebarOverlay.classList.remove("active");
    sideBar.classList.remove("open");
  }
});

const areasSection = document.getElementById("areasSection");
const getAllBtn = document.getElementById("getAllBtn");
async function getAllAreas() {
  try {
    let url = await fetch("https://nutriplan-api.vercel.app/api/meals/areas");

    let data = await url.json();

    let areas = data.results.slice(0, 10);

    let areasBtns = "";

    for (let i = 0; i < areas.length; i++) {
      areasBtns += `
      
      <button
      class="area-btn px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all" data-area="${areas[i].name}">
      ${areas[i].name}
      </button>
      `;
    }
    areasSection.innerHTML = areasBtns;
    const areasCards = document.querySelectorAll(".area-btn");

    areasCards.forEach((card) => {
      card.addEventListener("click", async function () {
        displayMeals(await getMealsByArea(this.dataset.area));
        getAllBtn.classList.remove("hover:text-white");
        getAllBtn.classList.replace("bg-emerald-600", "bg-gray-100");
        getAllBtn.classList.replace("text-white", "text-gray-700");
        getAllBtn.classList.replace(
          "hover:bg-emerald-700",
          "hover:bg-gray-200",
        );
        areasCards.forEach((card) => {
          card.classList.remove("hover:text-white");
          card.classList.replace("bg-emerald-600", "bg-gray-100");
          card.classList.replace("text-white", "text-gray-700");
          card.classList.replace("hover:bg-emerald-700", "hover:bg-gray-200");
        });
        card.classList.add("hover:text-white");
        card.classList.replace("bg-gray-100", "bg-emerald-600");
        card.classList.replace("text-gray-700", "text-white");
        card.classList.replace("hover:bg-gray-200", "hover:bg-emerald-700");
      });
    });

    getAllBtn.addEventListener("click", async function () {
      displayMeals(await getRandomMeals());
      getAllBtn.classList.add("hover:text-white");
      getAllBtn.classList.replace("bg-gray-100", "bg-emerald-600");
      getAllBtn.classList.replace("text-gray-700", "text-white");
      getAllBtn.classList.replace("hover:bg-gray-200", "hover:bg-emerald-700");
      areasCards.forEach((card) => {
        card.classList.remove("hover:text-white");
        card.classList.replace("bg-emerald-600", "bg-gray-100");
        card.classList.replace("text-white", "text-gray-700");
        card.classList.replace("hover:bg-emerald-700", "hover:bg-gray-200");
      });
    });
  } catch (error) {
    console.log("The Error is: " + error);
  }
}

const categoryStyles = {
  Beef: {
    bg: "from-red-50 to-orange-50",
    border: "border-red-200 hover:border-red-400",
    iconBg: "from-red-400 to-orange-500",
    icon: "fa-drumstick-bite",
  },

  Chicken: {
    bg: "from-yellow-50 to-amber-50",
    border: "border-yellow-200 hover:border-yellow-400",
    iconBg: "from-yellow-400 to-orange-500",
    icon: "fa-egg",
  },

  Dessert: {
    bg: "from-pink-50 to-rose-50",
    border: "border-pink-200 hover:border-pink-400",
    iconBg: "from-pink-400 to-rose-500",
    icon: "fa-cake-candles",
  },

  Seafood: {
    bg: "from-cyan-50 to-blue-50",
    border: "border-cyan-200 hover:border-cyan-400",
    iconBg: "from-cyan-400 to-blue-500",
    icon: "fa-fish",
  },

  Vegetarian: {
    bg: "from-green-50 to-emerald-50",
    border: "border-green-200 hover:border-green-400",
    iconBg: "from-green-400 to-emerald-500",
    icon: "fa-leaf",
  },

  Lamb: {
    bg: "from-stone-50 to-amber-50",
    border: "border-stone-200 hover:border-stone-400",
    iconBg: "from-orange-400 to-amber-500",
    icon: "fa-drumstick-bite",
  },

  Miscellaneous: {
    bg: "from-slate-50 to-gray-100",
    border: "border-slate-200 hover:border-slate-400",
    iconBg: "from-slate-400 to-gray-500",
    icon: "fa-bowl-rice",
  },

  Pasta: {
    bg: "from-yellow-50 to-orange-50",
    border: "border-yellow-200 hover:border-yellow-400",
    iconBg: "from-yellow-400 to-amber-500",
    icon: "fa-wheat-awn",
  },

  Pork: {
    bg: "from-rose-50 to-red-50",
    border: "border-rose-200 hover:border-rose-400",
    iconBg: "from-rose-400 to-red-500",
    icon: "fa-bacon",
  },

  Side: {
    bg: "from-lime-50 to-green-50",
    border: "border-lime-200 hover:border-lime-400",
    iconBg: "from-green-400 to-emerald-500",
    icon: "fa-bowl-food",
  },

  Starter: {
    bg: "from-orange-50 to-amber-50",
    border: "border-orange-200 hover:border-orange-400",
    iconBg: "from-orange-500 to-amber-500",
    icon: "fa-utensils",
  },

  Vegan: {
    bg: "from-emerald-50 to-green-50",
    border: "border-emerald-200 hover:border-emerald-400",
    iconBg: "from-emerald-400 to-green-500",
    icon: "fa-seedling",
  },
};

const categoriesGrid = document.getElementById("categories-grid");
async function getAllCategories() {
  try {
    let url = await fetch(
      "https://nutriplan-api.vercel.app/api/meals/categories",
    );

    let data = await url.json();

    let catigories = data.results.slice(0, 12);

    catigories.forEach((category) => {
      const style = categoryStyles[category.name] || {
        bg: "from-gray-50 to-gray-100",
        border: "border-gray-200",
        iconBg: "from-gray-400 to-gray-500",
        icon: "fa-utensils",
      };

      categoriesGrid.innerHTML += `
        <div
            
            class="category-card bg-gradient-to-br ${style.bg}
            rounded-xl p-3 border ${style.border}
            hover:shadow-md cursor-pointer transition-all group" data-category="${category.name}"">

            <div class="flex items-center gap-2.5">

                <div
                    class="text-white w-9 h-9 bg-gradient-to-br ${style.iconBg}
                    rounded-lg flex items-center justify-center
                    group-hover:scale-110 transition-transform shadow-sm">

                    <i class="fa-solid ${style.icon}"></i>

                </div>

                <div>
                    <h3 class="text-sm font-bold text-gray-900">
                        ${category.name}
                    </h3>
                </div>

            </div>

        </div>
    `;
    });

    const categoryCards = document.querySelectorAll(".category-card");

    categoryCards.forEach((card) => {
      card.addEventListener("click", async function (e) {
        displayMeals(await getMealsByCategory(this.dataset.category));
      });
    });
  } catch (error) {
    console.log("The Error is: " + error);
  }
}

const mealsSection = document.getElementById("recipes-grid");
async function getRandomMeals() {
  try {
    let url = await fetch(
      "https://nutriplan-api.vercel.app/api/meals/random?count=25",
    );

    let data = await url.json();
    let meals = data.results;
    return meals;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getMealsByCategory(cat) {
  try {
    let url = await fetch(
      `https://nutriplan-api.vercel.app/api/meals/filter?category=${cat}&page=1&limit=25`,
    );

    let data = await url.json();

    let meals = data.results;
    return meals || [];
  } catch (error) {
    console.log("The Error is: " + error);
  }
}
async function getMealsByName(term) {
  try {
    let url = await fetch(
      `https://nutriplan-api.vercel.app/api/meals/search?q=${term}&page=1&limit=25`,
    );

    let data = await url.json();

    let meals = data.results;

    return meals || [];
  } catch (error) {
    console.log("The Error is: " + error);
  }
}
async function getMealsByIngredient(ing) {
  try {
    let url = await fetch(
      `https://nutriplan-api.vercel.app/api/meals/filter?ingredient=${ing}&page=1&limit=25`,
    );

    let data = await url.json();

    let meals = data.results;

    return meals || [];
  } catch (error) {
    console.log("The Error is: " + error);
  }
}
async function getMealsByArea(area) {
  try {
    let url = await fetch(
      `https://nutriplan-api.vercel.app/api/meals/filter?area=${area}&page=1&limit=25`,
    );

    let data = await url.json();

    let meals = data.results;

    return meals || [];
  } catch (error) {
    console.log("The Error is: " + error);
  }
}
async function getMealById(id) {
  try {
    let url = await fetch(`https://nutriplan-api.vercel.app/api/meals/${id}`);

    let data = await url.json();

    let meal = data.result;

    return meal || [];
  } catch (error) {
    console.log("The Error is: " + error);
  }
}
const searchInput = document.getElementById("search-input");

async function searchMeals(term) {
  const byName = await getMealsByName(term);

  if (byName.length > 0) {
    displayMeals(byName);
    return;
  }
  const byArea = await getMealsByArea(term);

  if (byArea.length > 0) {
    displayMeals(byArea);
    return;
  }

  const byIngredient = await getMealsByIngredient(term);

  if (byIngredient.length > 0) {
    displayMeals(byIngredient);
    return;
  }
  document.getElementById("recipes-count").textContent = "Showing 0 recipes";
  mealsSection.innerHTML = `
    <div class="flex flex-col items-center justify-center py-12 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i class="text-2xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-magnifying-glass" data-prefix="fas" data-icon="magnifying-glass" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg></i>
            </div>
            <p class="text-gray-500 text-lg">No recipes found. Try a different search term.</p>
        </div>
    
    `;
}
searchInput.addEventListener("input", function () {
  searchMeals(searchInput.value.trim());
});
function displayMeals(meals) {
  mealsSection.innerHTML = "";
  if (meals.length == 0) {
    document.getElementById("recipes-count").textContent = "Showing 0 recipes";
    mealsSection.innerHTML = `
    <div class="flex flex-col items-center justify-center py-12 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i class="text-2xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-magnifying-glass" data-prefix="fas" data-icon="magnifying-glass" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg></i>
            </div>
            <p class="text-gray-500 text-lg">No recipes found. Try a different search term.</p>
        </div>
    
    `;
  } else {
    document.getElementById("recipes-count").textContent =
      `Showing ${meals.length} recipes`;
    meals.forEach((recipe) => {
      mealsSection.innerHTML += `
                   <div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-id="${recipe.id}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${recipe.thumbnail}"
                  alt="${recipe.name}"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${recipe.category}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${recipe.area ? recipe.area : "Unknown"}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${recipe.name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${recipe.instructions}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${recipe.category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                     ${recipe.area ? recipe.area : "Unknown"}
                  </span>
                </div>
              </div>
            </div>
        
        
        
        `;
    });
  }
  listViewBtn.addEventListener("click", function () {
    listViewBtn.classList.add("bg-white", "rounded-md","shadow-sm");
    gridViewBtn.classList.remove("bg-white", "rounded-md","shadow-sm");
    recipeCards.forEach((card) => {
      card.classList.add("flex", "flex-row", "h-40");
      card.parentElement.classList.replace("grid-cols-4", "grid-cols-2");
      card.parentElement.classList.replace("gap-5", "gap-4");
      card.firstElementChild.classList.replace("h-48", "h-full");
      card.firstElementChild.classList.add("w-48","flex-shrink-0");
      card.firstElementChild.firstElementChild.nextElementSibling.classList.add(
        "hidden",
      );
    });
  });

  gridViewBtn.addEventListener("click", function () {
    listViewBtn.classList.remove("bg-white", "rounded-md","shadow-sm");
    gridViewBtn.classList.add("bg-white", "rounded-md","shadow-sm");
    recipeCards.forEach((card) => {
      card.classList.remove("flex", "flex-row", "h-40");
      card.parentElement.classList.replace("grid-cols-2", "grid-cols-4");
      card.parentElement.classList.replace("gap-4", "gap-5");
      card.firstElementChild.classList.replace("h-full", "h-48");
      card.firstElementChild.classList.remove("w-48","flex-shrink-0");
      card.firstElementChild.firstElementChild.nextElementSibling.classList.remove(
        "hidden",
      );
    });
  });
  const recipeCards = document.querySelectorAll(".recipe-card");
  recipeCards.forEach((card) => {
    card.addEventListener("click", async function () {
      mealDetailsSection.classList.remove("hidden");
      sections.slice(0, 3).forEach((section) => {
        section.classList.add("hidden");
      });
      header.innerHTML = `<div class="px-8 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4 flex-1">
              <button id="header-menu-btn" aria-label="Toggle menu">
                <i class="fa-solid fa-bars"></i>
              </button>
              <div>
                <h1 class="text-2xl font-bold text-gray-900">
                  Recipe Details
                </h1>
                <p class="text-sm text-gray-500 mt-1">
                  View full recipe information and nutrition facts
                </p>
              </div>
            </div>
          </div>
        </div>`;

      const meal = await getMealById(this.dataset.id);
      mealDetailsSection.innerHTML = `        <div class="max-w-7xl mx-auto">
          <!-- Back Button -->
          <button
            id="back-to-meals-btn"
            class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors"
          >
            <i class="fa-solid fa-arrow-left"></i>
            <span>Back to Recipes</span>
          </button>

          <!-- Hero Section -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div class="relative h-80 md:h-96">
              <img
                src="${meal.thumbnail}"
                alt="${meal.name}"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              ></div>
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <div class="flex items-center gap-3 mb-3">
                  <span
                    class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full"
                    >${meal.category}</span
                  >
                  <span
                    class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full"
                    >${meal.area}</span
                  >
                  <span
                    class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full ${meal.tags.length > 0 ? "" : "hidden"}"
                    >${meal.tags[0]}</span
                  >
                </div>
                <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                  ${meal.name}
                </h1>
                <div class="flex items-center gap-6 text-white/90">
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-clock"></i>
                    <span>30 min</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-utensils"></i>
                    <span id="hero-servings">4 servings</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-fire"></i>
                    <span id="hero-calories">Calculating....</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-3 mb-8">
            <button
              id="log-meal-btn"
              class="flex items-center gap-2 px-6 py-3 bg-gray-300 text-gray-500 rounded-xl font-semibold cursor-not-allowed transition-all"
              disabled
              title="Waiting for data"
              data-meal-id="${meal.id}"
            >
              <i class="fa-solid fa-spinner"></i>
              <span>Calculating....</span>
            </button>
          </div>

          <!-- Main Content Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column - Ingredients & Instructions -->
            <div class="lg:col-span-2 space-y-8">
              <!-- Ingredients -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-list-check text-emerald-600"></i>
                  Ingredients
                  <span class="text-sm font-normal text-gray-500 ml-auto"
                    >${meal.ingredients.length} items</span
                  >
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  ${meal.ingredients
                    .map(
                      (item) => `
                    <div
                      class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                      />
                      <span class="text-gray-700">
                        <span class="font-medium text-gray-900">${item.measure}</span>
                        ${item.ingredient}
                      </span>
                    </div>
                  `,
                    )
                    .join("")}
                </div>
              </div>

              <!-- Instructions -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
                  Instructions
                </h2>
                <div class="space-y-4">
                  ${meal.instructions
                    .map(
                      (step, index) => `
                    <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                                         ${index + 1}
                                      </div> 
                      <p class="text-gray-700 leading-relaxed pt-2">${step}</p>
                    </div>
                  `,
                    )
                    .join("")}
                </div>
              </div>

              <!-- Video Section -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-video text-red-500"></i>
                  Video Tutorial
                </h2>
                <div
                  class="relative aspect-video rounded-xl overflow-hidden bg-gray-100"
                >
                  <iframe
                    src="${meal.youtube?.replace("watch?v=", "embed/")}"
                    class="absolute inset-0 w-full h-full"
                    frameborder="0"
                    allow="
                      accelerometer;
                      autoplay;
                      clipboard-write;
                      encrypted-media;
                      gyroscope;
                      picture-in-picture;
                    "
                    allowfullscreen
                  >
                  </iframe>
                </div>
              </div>
            </div>

            <!-- Right Column - Nutrition -->
            <div class="space-y-6">
              <!-- Nutrition Facts -->
              <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                  Nutrition Facts
                </h2>
                <div id="nutrition-facts-container">
                  <h3>Loading.......</h3>
                </div>
              </div>
            </div>
          </div>
        </div>`;
      const nutrition = await getNutrition(meal);

      displayNutrition(nutrition, meal);
    });
  });
}

const listViewBtn = document.getElementById("list-view-btn");
const gridViewBtn = document.getElementById("grid-view-btn");

mealDetailsSection.addEventListener("click", function (e) {
  if (e.target.closest("#back-to-meals-btn")) {
    mealDetailsSection.classList.add("hidden");
    sections.slice(0, 3).forEach((section) => {
      section.classList.remove("hidden");
    });
  }
});

async function getNutrition(meal) {
  try {
    const response = await fetch(
      "https://nutriplan-api.vercel.app/api/nutrition/analyze",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "pAjVaMVrNq3cjTagJp6ySuxQOp7xxohfvdNm5lGK",
        },
        body: JSON.stringify({
          recipeName: meal.name,
          ingredients: meal.ingredients.map(
            (item) => `${item.measure} ${item.ingredient}`,
          ),
        }),
      },
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function displayNutrition(nutrition, meal) {
  const perServing = nutrition.data.perServing;
  const total = nutrition.data.totals;

  const container = document.getElementById("nutrition-facts-container");
  const heroCalories = document.getElementById("hero-calories");
  const logMealBtn = document.getElementById("log-meal-btn");
  logMealBtn.classList.replace("bg-gray-300", "bg-blue-600");
  logMealBtn.classList.replace("text-gray-500", "text-white");
  logMealBtn.classList.add("hover:bg-blue-700");
  logMealBtn.classList.remove("cursor-not-allowed");
  logMealBtn.removeAttribute("disabled");
  logMealBtn.removeAttribute("title");
  logMealBtn.innerHTML = `
               <i class="fa-solid fa-clipboard-list"></i>
              <span>Log This Meal</span>
 `;
  logMealBtn.addEventListener("click", async function () {
    const quantity = await askForQuantity({
      title: meal.name,
      image: meal.thumbnail,
      unitLabel: "serving",
      caloriesPerUnit: perServing.calories,
      mealPerServing: perServing,
    });
    if (!quantity) return;
    addMealToFoodLog(meal, perServing, quantity);
    Swal.fire({
      title: "Meal Logged!",
      text: `${meal.name} was added to your Food Log.`,
      icon: "success",
      confirmButtonColor: "#059669",
      timer: 1800,
      showConfirmButton: false,
    });
  });
  heroCalories.innerHTML = `${perServing.calories} cal/serving`;

  container.innerHTML = `
      <p class="text-sm text-gray-500 mb-4">
        Per serving
      </p>

      <div
        class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl"
      >
        <p class="text-sm text-gray-600">Calories per serving</p>

        <p class="text-4xl font-bold text-emerald-600">
          ${perServing.calories}
        </p>

        <p class="text-xs text-gray-500 mt-1">
          Total: ${total.calories} cal
        </p>
      </div>

      <div class="space-y-4">

        ${nutritionRow("Protein", "emerald", perServing.protein, 50)}

        ${nutritionRow("Carbs", "blue", perServing.carbs, 300)}

        ${nutritionRow("Fat", "purple", perServing.fat, 70)}

        ${nutritionRow("Fiber", "orange", perServing.fiber, 30)}

        ${nutritionRow("Sugar", "pink", perServing.sugar, 50)}

        ${nutritionRow("SaturatedFat", "red", perServing.saturatedFat, 50)}

      </div>

  `;
}
function nutritionRow(name, color, value, max) {
  const percentage = Math.min((value / max) * 100, 100);

  return `
      <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-${color}-500"></div>
              <span class="text-gray-700">${name}</span>
          </div>

          <span class="font-bold text-gray-900">
              ${value}g
          </span>
      </div>

      <div class="w-full bg-gray-100 rounded-full h-2">
          <div
              class="bg-${color}-500 h-2 rounded-full"
              style="width:${percentage}%"
          ></div>
      </div>
  `;
}

async function getProudctsByName(term) {
  try {
    let url = await fetch(
      `https://nutriplan-api.vercel.app/api/products/search?q=${term}&page=1&limit=24`,
    );

    let data = await url.json();

    let products = data.results;

    return products || [];
  } catch (error) {
    console.log("The Error is: " + error);
  }
}
async function getProudctByBarcode(term) {
  try {
    let url = await fetch(
      `https://nutriplan-api.vercel.app/api/products/barcode/${term}`,
    );

    let data = await url.json();

    let product = data.result;

    return [product] || [];
  } catch (error) {
    console.log("The Error is: " + error);
  }
}
const nutriScoreStyles = {
  A: {
    bg: "bg-green-500",
    text: "text-white",
  },

  B: {
    bg: "bg-lime-500",
    text: "text-white",
  },

  C: {
    bg: "bg-yellow-500",
    text: "text-gray-900",
  },

  D: {
    bg: "bg-orange-500",
    text: "text-white",
  },

  E: {
    bg: "bg-red-500",
    text: "text-white",
  },
};
const nutriNumberStyles = {
  1: {
    bg: "bg-green-500",
    text: "text-white",
  },

  2: {
    bg: "bg-lime-500",
    text: "text-white",
  },

  3: {
    bg: "bg-yellow-500",
    text: "text-gray-900",
  },

  4: {
    bg: "bg-orange-500",
    text: "text-white",
  },

  5: {
    bg: "bg-red-500",
    text: "text-white",
  },
};
function displayProducts(products) {
  const productsSection = document.getElementById("products-grid");
  productsSection.innerHTML = "";
  if (products.length == 0) {
    productsSection.innerHTML = `<div id="products-empty" class="py-12">
    <div class="text-center">
    <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
    <i class="text-3xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-box-open" data-prefix="fas" data-icon="box-open" role="img" viewBox="0 0 640 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z"></path></svg></i>
    </div>
    <p class="text-gray-500 text-lg mb-2">No products to display</p>
    <p class="text-gray-400 text-sm">Search for a product or browse by category</p>
    </div>
    </div>`;
    return;
  } else if (products.length > 1) {
    products.forEach((product) => {
      const nutriStyle = nutriScoreStyles[
        product.nutritionGrade.toUpperCase()
      ] || {
        bg: "bg-gray-400",
        text: "text-white",
      };
      const numberStyle = nutriNumberStyles[product.novaGroup] || {
        bg: "bg-gray-400",
        text: "text-white",
      };

      productsSection.innerHTML += `
      <div class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-barcode="${product.barcode}">
                <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" src="${product.image}" alt="${product.name}" loading="lazy">

                  <!-- Nutri-Score Badge -->
                  <div class="absolute top-2 left-2 ${nutriStyle.bg} ${nutriStyle.text} text-xs font-bold px-2 py-1 rounded uppercase">
                    Nutri-Score ${product.nutritionGrade.toUpperCase()}
                  </div>

                  <!-- NOVA Badge -->
                  <div class="${!product.novaGroup ? "hidden" : ""} absolute top-2 right-2 ${numberStyle.bg} ${numberStyle.text} text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center" title="NOVA ${product.novaGroup}">
                    ${product.novaGroup}
                  </div>
                </div>

                <div class="p-4">
                  <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">
                    ${product.brand}
                  </p>
                  <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    ${product.name}
                  </h3>

                  <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span><i class="mr-1" data-fa-i2svg=""><svg class="svg-inline--fa fa-fire" data-prefix="fas" data-icon="fire" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M160.5-26.4c9.3-7.8 23-7.5 31.9 .9 12.3 11.6 23.3 24.4 33.9 37.4 13.5 16.5 29.7 38.3 45.3 64.2 5.2-6.8 10-12.8 14.2-17.9 1.1-1.3 2.2-2.7 3.3-4.1 7.9-9.8 17.7-22.1 30.8-22.1 13.4 0 22.8 11.9 30.8 22.1 1.3 1.7 2.6 3.3 3.9 4.8 10.3 12.4 24 30.3 37.7 52.4 27.2 39.5 54.4 88.1 54.4 138.3 0 66.3-53.7 120-120 120-66.3 0-120-53.7-120-120 0-50.2 27.2-98.8 54.4-138.3z"></path></svg></i>${product.nutrients.calories.toFixed(1)} kcal/100g</span>
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${product.nutrients.protein.toFixed(1)}g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${product.nutrients.carbs.toFixed(1)}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${product.nutrients.fat.toFixed(1)}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${product.nutrients.sugar.toFixed(1)}g</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>
  `;
    });
  } else {
    const product = products[0];
    const nutriStyle = nutriScoreStyles[
      product.nutritionGrade.toUpperCase()
    ] || {
      bg: "bg-gray-400",
      text: "text-white",
    };
    const numberStyle = nutriNumberStyles[product.novaGroup] || {
      bg: "bg-gray-400",
      text: "text-white",
    };
    productsSection.innerHTML += `
      <div class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-barcode="${product.barcode}">
                <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" src="${product.image}" alt="${product.name}" loading="lazy">

                  <!-- Nutri-Score Badge -->
                  <div class="absolute top-2 left-2 ${nutriStyle.bg} ${nutriStyle.text} text-xs font-bold px-2 py-1 rounded uppercase">
                    Nutri-Score ${product.nutritionGrade.toUpperCase()}
                  </div>

                  <!-- NOVA Badge -->
                  <div class="${!product.novaGroup ? "hidden" : ""} absolute top-2 right-2 ${numberStyle.bg} ${numberStyle.text} text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center" title="NOVA ${product.novaGroup}">
                    ${product.novaGroup}
                  </div>
                </div>

                <div class="p-4">
                  <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">
                    ${product.brand}
                  </p>
                  <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    ${product.name}
                  </h3>

                  <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span><i class="mr-1" data-fa-i2svg=""><svg class="svg-inline--fa fa-fire" data-prefix="fas" data-icon="fire" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M160.5-26.4c9.3-7.8 23-7.5 31.9 .9 12.3 11.6 23.3 24.4 33.9 37.4 13.5 16.5 29.7 38.3 45.3 64.2 5.2-6.8 10-12.8 14.2-17.9 1.1-1.3 2.2-2.7 3.3-4.1 7.9-9.8 17.7-22.1 30.8-22.1 13.4 0 22.8 11.9 30.8 22.1 1.3 1.7 2.6 3.3 3.9 4.8 10.3 12.4 24 30.3 37.7 52.4 27.2 39.5 54.4 88.1 54.4 138.3 0 66.3-53.7 120-120 120-66.3 0-120-53.7-120-120 0-50.2 27.2-98.8 54.4-138.3z"></path></svg></i>${product.nutrients.calories.toFixed(1)} kcal/100g</span>
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${product.nutrients.protein.toFixed(1)}g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${product.nutrients.carbs.toFixed(1)}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${product.nutrients.fat.toFixed(1)}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${product.nutrients.sugar.toFixed(1)}g</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>
  `;
  }

  const productCard = document.querySelectorAll(".product-card");
  productCard.forEach((card) => {
    card.addEventListener("click", async function () {
      const productDetailsSection = document.getElementById(
        "product-details-section",
      );
      const products = await getProudctByBarcode(this.dataset.barcode);
      const product = products[0];
      const nutriStyle = nutriScoreStyles[
        product.nutritionGrade.toUpperCase()
      ] || {
        bg: "bg-gray-400",
        text: "text-white",
      };
      const numberStyle = nutriNumberStyles[product.novaGroup] || {
        bg: "bg-gray-400",
        text: "text-white",
      };
      productDetailsSection.innerHTML = `
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" id="product-detail-modal">
            <div class="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                
        <div class="p-6">
            <!-- Header -->
            <div class="flex items-start gap-6 mb-6">
                <div class="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                    
                        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-contain">
                    
                </div>
                <div class="flex-1">
                    <p class="text-sm text-emerald-600 font-semibold mb-1">${product.brand}</p>
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">${product.name}</h2>
                    <p class="text-sm text-gray-500 mb-3"></p>
                    
                    <div class="flex items-center gap-3">                        
                            <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg ${nutriStyle.bg}">
                                <span class="w-8 h-8 rounded flex items-center justify-center text-white font-bold">
                                    ${
                                      product.nutritionGrade.toUpperCase() ===
                                        "UNKNOWN" ||
                                      product.nutritionGrade.toUpperCase() ===
                                        "NOT-APPLICABLE"
                                        ? "N/A"
                                        : product.nutritionGrade.toUpperCase()
                                    }
                                </span>
                                <div>
                                    <p class="text-xs font-bold">Nutri-Score</p>
                                </div>
                            </div>
                        
                        
                        
                            <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg ${numberStyle.bg} ${product.novaGroup ? "" : "hidden"}">
                                <span class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style="background-color: ${numberStyle.bg}">
                                    ${product.novaGroup}
                                </span>
                                <div>
                                    <p class="text-xs font-bold" style="color: ${numberStyle.bg}">NOVA</p>
                                </div>
                            </div>
                        
                    </div>
                </div>
                <button class="close-product-modal text-gray-400 hover:text-gray-600">
                    <i class="text-2xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-xmark" data-prefix="fas" data-icon="xmark" role="img" viewBox="0 0 384 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"></path></svg></i>
                </button>
            </div>
            
            <!-- Nutrition Facts -->
            <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 mb-6 border border-emerald-200">
                <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i class="text-emerald-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-chart-pie" data-prefix="fas" data-icon="chart-pie" role="img" viewBox="0 0 576 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M512.4 240l-176 0c-17.7 0-32-14.3-32-32l0-176c0-17.7 14.4-32.2 31.9-29.9 107 14.2 191.8 99 206 206 2.3 17.5-12.2 31.9-29.9 31.9zM222.6 37.2c18.1-3.8 33.8 11 33.8 29.5l0 197.3c0 5.6 2 11 5.5 15.3L394 438.7c11.7 14.1 9.2 35.4-6.9 44.1-34.1 18.6-73.2 29.2-114.7 29.2-132.5 0-240-107.5-240-240 0-115.5 81.5-211.9 190.2-234.8zM477.8 288l64 0c18.5 0 33.3 15.7 29.5 33.8-10.2 48.4-35 91.4-69.6 124.2-12.3 11.7-31.6 9.2-42.4-3.9L374.9 340.4c-17.3-20.9-2.4-52.4 24.6-52.4l78.2 0z"></path></svg></i>
                    Nutrition Facts <span class="text-sm font-normal text-gray-500">(per 100g)</span>
                </h3>
                
                <div class="text-center mb-4 pb-4 border-b border-emerald-200">
                    <p class="text-4xl font-bold text-gray-900">${product.nutrients.calories.toFixed(1)}</p>
                    <p class="text-sm text-gray-500">Calories</p>
                </div>
                
                <div class="grid grid-cols-4 gap-4">
                    <div class="text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div class="bg-emerald-500 h-2 rounded-full" style="width: ${(product.nutrients.protein / 100) * 100}%"></div>
                        </div>
                        <p class="text-lg font-bold text-emerald-600">${product.nutrients.protein.toFixed(1)}g</p>
                        <p class="text-xs text-gray-500">Protein</p>
                    </div>
                    <div class="text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div class="bg-blue-500 h-2 rounded-full" style="width: ${(product.nutrients.carbs / 100) * 100}%"></div>
                        </div>
                        <p class="text-lg font-bold text-blue-600">${product.nutrients.carbs.toFixed(1)}g</p>
                        <p class="text-xs text-gray-500">Carbs</p>
                    </div>
                    <div class="text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div class="bg-purple-500 h-2 rounded-full" style="width: ${(product.nutrients.fat / 100) * 100}%"></div>
                        </div>
                        <p class="text-lg font-bold text-purple-600">${product.nutrients.fat.toFixed(1)}g</p>
                        <p class="text-xs text-gray-500">Fat</p>
                    </div>
                    <div class="text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div class="bg-orange-500 h-2 rounded-full" style="width: ${(product.nutrients.sugar / 100) * 100}%"></div>
                        </div>
                        <p class="text-lg font-bold text-orange-600">${product.nutrients.sugar.toFixed(1)}g</p>
                        <p class="text-xs text-gray-500">Sugar</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-emerald-200">
                    <div class="text-center">
                        <p class="text-sm font-semibold text-gray-900">${product.nutrients.fiber.toFixed(1)}g</p>
                        <p class="text-xs text-gray-500">Fiber</p>
                    </div>
                    <div class="text-center">
                        <p class="text-sm font-semibold text-gray-900">${(product.nutrients.sodium / 1000).toFixed(1)}g</p>
                        <p class="text-xs text-gray-500">Salt</p>
                    </div>
                </div>
            </div>
            <!-- Actions -->
            <div class="flex gap-3">
                <button class="add-product-to-log flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all" data-barcode="${product.barcode}">
                    <i class="mr-2" data-fa-i2svg=""><svg class="svg-inline--fa fa-plus" data-prefix="fas" data-icon="plus" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"></path></svg></i>Log This Food
                </button>
                <button class="close-product-modal flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                    Close
                </button>
            </div>
        </div>
    
            </div>
        </div>
    `;

      const closeModalBtn = document.querySelectorAll(".close-product-modal");
      closeModalBtn.forEach((btn) => {
        btn.addEventListener("click", function () {
          const productDetailsSection = document.getElementById(
            "product-details-section",
          );
          productDetailsSection.innerHTML = "";
        });
      });

      const addProductToLogBtn = document.querySelector(".add-product-to-log");
      if (addProductToLogBtn) {
        addProductToLogBtn.addEventListener("click", async function () {
          addProductToFoodLog(product, 1);
          const productDetailsSection = document.getElementById(
            "product-details-section",
          );
          productDetailsSection.innerHTML = "";
          Swal.fire({
            title: "Food Logged!",
            text: `${product.name} was added to your Food Log.`,
            icon: "success",
            confirmButtonColor: "#059669",
            timer: 1800,
            showConfirmButton: false,
          });
        });
      }
    });
  });
}
const proudctsSearchInput = document.getElementById("product-search-input");
const searchProductBtn = document.getElementById("search-product-btn");
searchProductBtn.addEventListener("click", async function () {
  showProductsLoading();
  await delay(1000);
  currentProducts = await getProudctsByName(proudctsSearchInput.value.trim());
  displayProducts(currentProducts);
});

const barcodeInput = document.getElementById("barcode-input");
const lookupBarcodeBtn = document.getElementById("lookup-barcode-btn");
lookupBarcodeBtn.addEventListener("click", async function () {
  showProductsLoading();
  await delay(1000);
  displayProducts(await getProudctByBarcode(barcodeInput.value.trim()));
});
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function showProductsLoading() {
  const productsSection = document.getElementById("products-grid");
  productsSection.innerHTML = `            <div id="products-loading" class="  py-12">
              <div class="flex items-center justify-center py-12">
                <div
                  class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"
                ></div>
              </div>
            </div>`;
}

const productCategories = document.getElementById("product-categories");
const productCategoryStyles = {
  snacks: {
    bg: "from-purple-500 to-pink-500",
    icon: "fa-cookie-bite",
  },

  beverages: {
    bg: "from-blue-500 to-cyan-500",
    icon: "fa-bottle-water",
  },

  dairies: {
    bg: "from-sky-400 to-blue-500",
    icon: "fa-glass-water",
  },

  cheeses: {
    bg: "from-yellow-400 to-amber-500",
    icon: "fa-cheese",
  },

  yogurts: {
    bg: "from-pink-400 to-rose-500",
    icon: "fa-jar",
  },

  chocolates: {
    bg: "from-amber-500 to-rose-500",
    icon: "fa-candy-cane",
  },

  biscuits: {
    bg: "from-orange-500 to-amber-500",
    icon: "fa-cookie",
  },

  "ice-creams": {
    bg: "from-cyan-500 to-blue-600",
    icon: "fa-ice-cream",
  },

  "breakfast-cereals": {
    bg: "from-orange-500 to-yellow-500",
    icon: "fa-wheat-awn",
  },

  breads: {
    bg: "from-amber-500 to-orange-500",
    icon: "fa-bread-slice",
  },
};
async function getProductsCategories() {
  try {
    let url = await fetch(
      "https://nutriplan-api.vercel.app/api/products/categories",
    );

    let data = await url.json();

    let catigories = data.results.slice(0, 10);

    catigories.forEach((category) => {
      const style = productCategoryStyles[category.id] || {
        bg: "from-gray-500 to-gray-600",
        icon: "fa-box",
      };

      productCategories.innerHTML += `
    <button
      class="product-category-btn
             flex-shrink-0
             px-5 py-3
             bg-gradient-to-r ${style.bg}
             text-white
             rounded-xl
             font-semibold
             hover:shadow-lg
             hover:scale-105
             transition-all duration-300"
      data-category="${category.id}">

      <i class="fa-solid ${style.icon} mr-2"></i>
      ${category.name}

    </button>
  `;
    });

    const productCategoryBtns = document.querySelectorAll(
      ".product-category-btn",
    );

    productCategoryBtns.forEach((btn) => {
      btn.addEventListener("click", async function () {
        showProductsLoading();
        await delay(1000);
        currentProducts = await getProductsByCategory(this.dataset.category);
        displayProducts(currentProducts);
      });
    });
  } catch (error) {
    console.log("The Error is: " + error);
  }
}

async function getProductsByCategory(term) {
  try {
    let url = await fetch(
      `https://nutriplan-api.vercel.app/api/products/category/${term}`,
    );

    let data = await url.json();

    let products = data.results;

    return products || [];
  } catch (error) {
    console.log("The Error is: " + error);
  }
}

let currentProducts = [];
const nutritionBtns = document.querySelectorAll(".nutri-score-filter");

nutritionBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const grade = this.dataset.grade;
    nutritionBtns.forEach((b) => b.classList.remove("ring-2", "ring-gray-900"));
    this.classList.add("ring-2", "ring-gray-900");
    if (grade === "ALL") {
      displayProducts(currentProducts);
      return;
    }

    const filteredProducts = currentProducts.filter(
      (product) =>
        (product.nutritionGrade || "UNKNOWN").toUpperCase() === grade,
    );
    console.log(filteredProducts);

    displayProducts(filteredProducts);
  });
});

// -----------------------------------------------------
function displayTodayDate() {
  const todayDate = document.getElementById("foodlog-date");
  todayDate.textContent = `
${new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
})}`;
}


const FOODLOG_GOALS = {
  calories: 2000,
  protein: 50,
  carbs: 250,
  fat: 65,
};

let foodLog = JSON.parse(localStorage.getItem("food_log")) || [];

function saveFoodLog() {
  localStorage.setItem("food_log", JSON.stringify(foodLog));
}

function askForQuantity({
  title,
  image,
  unitLabel,
  caloriesPerUnit,
  mealPerServing,
}) {
  return Swal.fire({
    title: "Add to Food Log",
    html: `
      <div class="flex items-center gap-3 mb-4 text-left">
        <img src="${image || ""}" onerror="this.style.display='none'" class="w-14 h-14 rounded-xl object-cover"/>
        <div>
          <p class="font-bold text-gray-900">${title}</p>
          <p class="text-sm text-gray-500">${Math.round(caloriesPerUnit)} kcal / ${unitLabel}</p>
        </div>
      </div>
      <div class="flex items-center justify-center gap-3">
        <button type="button" id="qty-decrease" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-bold">-</button>
        <input type="number" id="qty-input" value="1" min="1" step="1" class="w-20 text-center text-xl font-bold border-2 border-gray-200 rounded-lg py-2"/>
        <button type="button" id="qty-increase" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-bold">+</button>
      </div>
      <div class="bg-emerald-50 rounded-xl p-4 mb-6">
                    <p class="text-sm text-gray-600 mb-2">Estimated nutrition per serving:</p>
                    <div class="grid grid-cols-4 gap-2 text-center">
                        <div>
                            <p class="text-lg font-bold text-emerald-600" id="modal-calories">${mealPerServing.calories}</p>
                            <p class="text-xs text-gray-500">Calories</p>
                        </div>
                        <div>
                            <p class="text-lg font-bold text-blue-600" id="modal-protein">${mealPerServing.protein}g</p>
                            <p class="text-xs text-gray-500">Protein</p>
                        </div>
                        <div>
                            <p class="text-lg font-bold text-amber-600" id="modal-carbs">${mealPerServing.carbs}g</p>
                            <p class="text-xs text-gray-500">Carbs</p>
                        </div>
                        <div>
                            <p class="text-lg font-bold text-purple-600" id="modal-fat">${mealPerServing.fat}g</p>
                            <p class="text-xs text-gray-500">Fat</p>
                        </div>
                    </div>
                </div>
    `,
    showCancelButton: true,
    confirmButtonText: "Add to Log",
    confirmButtonColor: "#059669",
    cancelButtonText: "Cancel",
    focusConfirm: false,
    didOpen: () => {
      const input = document.getElementById("qty-input");
      document.getElementById("qty-decrease").addEventListener("click", () => {
        const value = Math.max(1, parseInt(input.value) - 1);
        input.value = value;
      });
      document.getElementById("qty-increase").addEventListener("click", () => {
        const value = parseInt(input.value) + 1;
        input.value = value;
      });
    },
    preConfirm: () => {
      const value = parseInt(document.getElementById("qty-input").value);
      if (!value || value < 1) {
        Swal.showValidationMessage("Please enter a quantity of 1 or more");
        return false;
      }
      return value;
    },
  }).then((result) => (result.isConfirmed ? result.value : null));
}

function addMealToFoodLog(meal, perServing, quantity) {
  foodLog.push({
    logId: Date.now() + Math.random(),
    type: "meal",
    refId: meal.id,
    name: meal.name,
    image: meal.thumbnail,
    unitLabel: "serving",
    caloriesPerUnit: perServing.calories || 0,
    proteinPerUnit: perServing.protein || 0,
    carbsPerUnit: perServing.carbs || 0,
    fatPerUnit: perServing.fat || 0,
    quantity: quantity,
    loggedAt: new Date().toISOString(),
  });

  saveFoodLog();
  renderFoodLog();
}

function addProductToFoodLog(product, quantity) {
  foodLog.push({
    logId: Date.now() + Math.random(),
    type: "product",
    refId: product.barcode,
    name: product.name,
    image: product.image,
    unitLabel: "x100g",
    caloriesPerUnit: product.nutrients.calories || 0,
    proteinPerUnit: product.nutrients.protein || 0,
    carbsPerUnit: product.nutrients.carbs || 0,
    fatPerUnit: product.nutrients.fat || 0,
    quantity: quantity,
    loggedAt: new Date().toISOString(),
  });

  saveFoodLog();
  renderFoodLog();
}

function addCustomEntryToFoodLog(entry) {
  foodLog.push({
    logId: Date.now() + Math.random(),
    type: "custom",
    refId: null,
    name: entry.name,
    image: null,
    unitLabel: "entry",
    caloriesPerUnit: entry.calories,
    proteinPerUnit: entry.protein,
    carbsPerUnit: entry.carbs,
    fatPerUnit: entry.fat,
    quantity: 1,
    loggedAt: new Date().toISOString(),
  });

  saveFoodLog();
  renderFoodLog();
}

function getFoodLogTotals() {
  return foodLog.reduce(
    (totals, item) => {
      totals.calories += item.caloriesPerUnit * item.quantity;
      totals.protein += item.proteinPerUnit * item.quantity;
      totals.carbs += item.carbsPerUnit * item.quantity;
      totals.fat += item.fatPerUnit * item.quantity;
      return totals;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );
}

function updateFoodLogProgressBars() {
  const totals = getFoodLogTotals();

  const bars = [
    { key: "calories", unit: "kcal", value: Math.round(totals.calories) },
    { key: "protein", unit: "g", value: Math.round(totals.protein) },
    { key: "carbs", unit: "g", value: Math.round(totals.carbs) },
    { key: "fat", unit: "g", value: Math.round(totals.fat) },
  ];

  bars.forEach((bar) => {
    const goal = FOODLOG_GOALS[bar.key];
    const percentage = Math.min(Math.round((bar.value / goal) * 100), 100);

    const text = document.getElementById(`${bar.key}-progress-text`);
    const fill = document.getElementById(`${bar.key}-progress-bar`);

    if (text) text.textContent = `${bar.value} / ${goal} ${bar.unit}`;
    if (fill) fill.style.width = `${percentage}%`;
  });
}

function createLoggedItemMarkup(item, index) {
  const totalCalories = Math.round(item.caloriesPerUnit * item.quantity);
  const iconClass =
    item.type === "product"
      ? "fa-box"
      : "fa-utensils";
  const badgeColor =
    item.type === "product"
      ? "bg-blue-100 text-blue-700"
      : "bg-emerald-100 text-emerald-700";
  const badgeLabel =
    item.type === "product"
      ? "Product"
        : "Recipe";

  return `
    <div class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all" data-log-id="${item.logId}">
      <div class="flex items-center gap-4">
        ${
          item.image
            ? `<img src="${item.image}" alt="${item.name}" class="w-14 h-14 rounded-xl object-cover"/>`
            : `<div class="w-14 h-14 ${badgeColor} rounded-xl flex items-center justify-center"><i class="fa-solid ${iconClass} text-xl"></i></div>`
        }
        <div>
          <p class="font-semibold text-gray-900">${item.name}</p>
          <p class="text-sm text-gray-500">
            <span class="px-2 py-0.5 rounded-full text-xs font-semibold ${badgeColor}">${badgeLabel}</span>
            <span class="mx-1">•</span>
            ${Math.round(item.caloriesPerUnit)} kcal / ${item.unitLabel}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <button class="foodlog-qty-decrease w-8 h-8 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 flex items-center justify-center" data-log-id="${item.logId}">
            <i class="fa-solid fa-minus text-gray-600 text-xs"></i>
          </button>
          <span class="w-6 text-center font-semibold text-gray-900">${item.quantity}</span>
          <button class="foodlog-qty-increase w-8 h-8 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 flex items-center justify-center" data-log-id="${item.logId}">
            <i class="fa-solid fa-plus text-gray-600 text-xs"></i>
          </button>
        </div>
        <div class="text-right w-20">
          <p class="text-lg font-bold text-emerald-600">${totalCalories}</p>
          <p class="text-xs text-gray-500">kcal</p>
        </div>
        <button class="foodlog-remove-item text-gray-400 hover:text-red-500 transition-all p-2" data-log-id="${item.logId}">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  `;
}
function renderWeeklyOverview() {
  const container = document.getElementById("weekly-chart");
  if (!container) return;

  const today = new Date();
  const days = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    days.push(date);
  }

  const dayStats = days.map((date) => {
    const dayKey = date.toDateString();
    const dayItems = foodLog.filter(
      (item) => new Date(item.loggedAt).toDateString() === dayKey,
    );
    const calories = Math.round(
      dayItems.reduce(
        (sum, item) => sum + item.caloriesPerUnit * item.quantity,
        0,
      ),
    );
    return {
      date,
      calories,
      itemsCount: dayItems.length,
      isToday: dayKey === today.toDateString(),
    };
  });

  container.innerHTML = dayStats
    .map(
      (day) => `
      <div class="text-center p-3 rounded-xl border border-gray-100 ${day.isToday ? "bg-indigo-100 border-indigo-200" : "bg-gray-50"}">
        <p class="text-xs ${day.isToday ? "text-indigo-600 font-semibold" : "text-gray-500"} mb-1">${day.date.toLocaleDateString("en-US", { weekday: "short" })}</p>
        <p class="text-sm font-medium text-gray-900 mb-2">${day.date.getDate()}</p>
        <p class="text-lg font-bold ${day.calories > 0 ? "text-emerald-600" : "text-gray-300"}">${day.calories}</p>
        <p class="text-xs ${day.calories > 0 ? "text-gray-500" : "text-gray-300"}">kcal</p>
        ${day.itemsCount > 0 ? `<p class="text-xs text-gray-400 mt-1">${day.itemsCount} item${day.itemsCount !== 1 ? "s" : ""}</p>` : ""}
      </div>
    `,
    )
    .join("");

  const totalWeekCalories = dayStats.reduce(
    (sum, day) => sum + day.calories,
    0,
  );
  const totalWeekItems = dayStats.reduce((sum, day) => sum + day.itemsCount, 0);
  const daysOnGoal = dayStats.filter(
    (day) =>
      day.calories > 0 &&
      day.calories >= FOODLOG_GOALS.calories * 0.8 &&
      day.calories <= FOODLOG_GOALS.calories * 1.2,
  ).length;

  const avgEl = document.getElementById("weekly-avg-calories");
  const itemsEl = document.getElementById("weekly-total-items");
  const goalEl = document.getElementById("weekly-days-on-goal");

  if (avgEl)
    avgEl.textContent = `${totalWeekCalories > 0 ? Math.round(totalWeekCalories / 7) : 0} kcal`;
  if (itemsEl) itemsEl.textContent = `${totalWeekItems} items`;
  if (goalEl) goalEl.textContent = `${daysOnGoal} / 7`;
}
function renderFoodLog() {
  const container = document.getElementById("logged-items-list");
  const countEl = document.getElementById("logged-items-count");
  const clearBtn = document.getElementById("clear-foodlog");

  if (!container) return;

  if (foodLog.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-gray-500">
        <i class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"></i>
        <p class="font-medium">No meals logged today</p>
        <p class="text-sm">Add meals from the Meals page or scan products</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mx-auto">
      <button
              id="quick-log-meal-btn"
              class="quick-log-btn bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-emerald-500 transition-all text-left flex items-center gap-4"
            >
              <div
                class="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center"
              >
                <i class="fa-solid fa-plus text-emerald-600 text-xl"></i>
              </div>
              <div>
                <p class="font-semibold text-gray-900">Log a Meal</p>
                <p class="text-sm text-gray-500">Add from recipes</p>
              </div>
            </button>

            <button
              id="quick-scan-product-btn"
              class="quick-log-btn bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-teal-500 transition-all text-left flex items-center gap-4"
            >
              <div
                class="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center"
              >
                <i class="fa-solid fa-barcode text-teal-600 text-xl"></i>
              </div>
              <div>
                <p class="font-semibold text-gray-900">Scan Product</p>
                <p class="text-sm text-gray-500">Use barcode scanner</p>
              </div>
            </button>
      </div>
    `;
  } else {
    container.innerHTML = foodLog
      .map((item, index) => createLoggedItemMarkup(item, index))
      .join("");
  }

  if (countEl) countEl.textContent = foodLog.length;
  if (clearBtn) clearBtn.style.display = foodLog.length > 0 ? "" : "none";

  updateFoodLogProgressBars();
  renderWeeklyOverview();
}

function removeFoodLogItem(logId) {
  foodLog = foodLog.filter((item) => item.logId != logId);
  saveFoodLog();
  renderFoodLog();
}

function changeFoodLogItemQuantity(logId, delta) {
  const item = foodLog.find((item) => item.logId == logId);
  if (!item) return;
  item.quantity = Math.max(1, item.quantity + delta);
  saveFoodLog();
  renderFoodLog();
}

const loggedItemsList = document.getElementById("logged-items-list");
loggedItemsList.addEventListener("click", function (e) {
  const decreaseBtn = e.target.closest(".foodlog-qty-decrease");
  const increaseBtn = e.target.closest(".foodlog-qty-increase");
  const removeBtn = e.target.closest(".foodlog-remove-item");

  if (decreaseBtn) {
    changeFoodLogItemQuantity(decreaseBtn.dataset.logId, -1);
  }
  if (increaseBtn) {
    changeFoodLogItemQuantity(increaseBtn.dataset.logId, 1);
  }
  if (removeBtn) {
    removeFoodLogItem(removeBtn.dataset.logId);
  }
});

const clearFoodLogBtn = document.getElementById("clear-foodlog");
clearFoodLogBtn.addEventListener("click", function () {
  Swal.fire({
    title: "Clear Today's Log?",
    text: "This will remove all logged food items.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, clear it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      foodLog = [];
      saveFoodLog();
      renderFoodLog();
      Swal.fire({
        title: "Cleared!",
        text: "Your food log has been cleared.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
});

async function init() {
  const meals = await getRandomMeals();
  displayMeals(meals);

  getAllCategories();
  getAllAreas();
  getProductsCategories();
  displayTodayDate();
  renderFoodLog();
}

init();

const quickLogMealBtn = document.getElementById("quick-log-meal-btn");
document.addEventListener("click", function (e) {
  if (e.target.closest("#quick-log-meal-btn")) {
    links[0].click();
  }
});

const quickScanProductBtn = document.getElementById("quick-scan-product-btn");
document.addEventListener("click", function (e) {
  if (e.target.closest("#quick-scan-product-btn")) {
    links[1].click();
  }
});


const loadingOverlay = document.getElementById("app-loading-overlay");

setTimeout(function () {
  loadingOverlay.classList.toggle("loading");
}, 1000);
