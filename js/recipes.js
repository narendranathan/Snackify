let cart = [];
let allRecipes = [];

document.addEventListener('DOMContentLoaded', () => {
  const recipeList = document.getElementById('recipeList');

  if (recipeList) {
    fetch('https://dummyjson.com/recipes?limit=0')
      .then(res => res.json())
      .then(data => {
        allRecipes = data.recipes.map(r => ({
          id: r.id,
          name: r.name,
          image: r.image,
          cuisine: r.cuisine,
          price: Math.floor(Math.random() * 200) + 100
        }));
        renderRecipes(allRecipes);
        renderCuisineCategories(allRecipes);
      });
  }

  updateCartCount();
});

function renderRecipes(recipes) {
  const container = document.getElementById('recipeList');
  container.innerHTML = '';

  recipes.forEach(recipe => {
    const div = document.createElement('div');
    div.className = 'recipe-card';
    div.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}" />
      <h3>${recipe.name}</h3>
      <p><strong>Price:</strong> ₹${recipe.price}</p>
      <p><strong>Cuisine:</strong> ${recipe.cuisine}</p>
      <button onclick="addToCart(${recipe.id}, '${recipe.name}', ${recipe.price})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

function renderCuisineCategories(recipes) {
  const cuisines = [...new Set(recipes.map(r => r.cuisine))];

  const categoryBar = document.getElementById('categoryBar');
  categoryBar.innerHTML = '';

  const allBtn = document.createElement('button');
  allBtn.textContent = 'All';
  allBtn.onclick = () => renderRecipes(allRecipes);
  categoryBar.appendChild(allBtn);

  cuisines.forEach(cuisine => {
    const btn = document.createElement('button');
    btn.textContent = cuisine;
    btn.onclick = () => {
      const filtered = allRecipes.filter(r => r.cuisine === cuisine);
      renderRecipes(filtered);
    };
    categoryBar.appendChild(btn);
  });
}

function addToCart(id, name, price) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
  updateCartCount();
  // alert(`${name} added to cart!`);
}

function updateCartCount() {
  const cartLink = document.getElementById('cartCount');
  if (cartLink) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartLink.textContent = `Cart (${totalItems})`;
  }
}

document.getElementById("confirmOrder").addEventListener("click", (e) => {
  e.preventDefault();
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  sessionStorage.setItem("cartData", JSON.stringify(cart));
  sessionStorage.setItem("cartTotal", calculateTotal(cart));
  window.location.href = "payment.html";
});

function calculateTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
function toggleCart() {
  const sidebar = document.getElementById("cartSidebar");
  if (!sidebar.classList.contains("visible")) {
    updateCartSidebar(); // refresh content before showing
  }
  sidebar.classList.toggle("visible");
}

function updateCartSidebar() {
  const container = document.getElementById("cartItemsPreview");
  const totalEl = document.getElementById("cartPreviewTotal");
  container.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    const row = document.createElement("div");
    row.innerHTML = `
      ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}
    `;
    container.appendChild(row);
    total += item.price * item.quantity;
  });

  totalEl.textContent = total;
}

function goToPayment() {
  sessionStorage.setItem("cartData", JSON.stringify(cart));
  sessionStorage.setItem("cartTotal", calculateTotal(cart));
  window.location.href = "payment.html";
}

// Optional: re-attach cart button handler if not already
document.getElementById("cartCount").addEventListener("click", (e) => {
  e.preventDefault();
  toggleCart();
});
