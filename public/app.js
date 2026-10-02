const API = '/api';


async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const msg = data?.error || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

function toast(message, isError = false) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.className = 'toast' + (isError ? ' error' : '');
  setTimeout(() => (el.className = 'toast hidden'), 2500);
}

function renderList(ulId, items, renderItem, onDelete) {
  const ul = document.getElementById(ulId);
  ul.innerHTML = '';
  if (!items.length) {
    ul.innerHTML = '<li class="empty">Пусто</li>';
    return;
  }
  for (const item of items) {
    const li = document.createElement('li');
    li.innerHTML = `<span>${renderItem(item)}</span>`;
    const btn = document.createElement('button');
    btn.className = 'del';
    btn.textContent = 'Удалить';
    btn.onclick = () => onDelete(item.id);
    li.appendChild(btn);
    ul.appendChild(li);
  }
}


async function loadProducts() {
  const items = await request('/products');
  renderList('products-list', items,
    (p) => `${p.title} — ${p.price} ₽ <span class="meta">#${p.id}</span>`,
    deleteProduct,
  );
}

async function addProduct(e) {
  e.preventDefault();
  const form = e.target;
  const body = Object.fromEntries(new FormData(form));
  body.price = Number(body.price);
  try {
    await request('/products', { method: 'POST', body: JSON.stringify(body) });
    form.reset();
    toast('Товар добавлен');
    loadProducts();
  } catch (err) {
    toast(err.message, true);
  }
}

async function deleteProduct(id) {
  try {
    await request(`/products/${id}`, { method: 'DELETE' });
    toast('Товар удалён');
    loadProducts();
  } catch (err) {
    toast(err.message, true);
  }
}


async function loadUsers() {
  const items = await request('/users');
  renderList('users-list', items,
    (u) => `${u.name} <span class="meta">${u.email} · #${u.id}</span>`,
    deleteUser,
  );
}

async function addUser(e) {
  e.preventDefault();
  const form = e.target;
  const body = Object.fromEntries(new FormData(form));
  try {
    await request('/users', { method: 'POST', body: JSON.stringify(body) });
    form.reset();
    toast('Пользователь добавлен');
    loadUsers();
  } catch (err) {
    toast(err.message, true);
  }
}

async function deleteUser(id) {
  try {
    await request(`/users/${id}`, { method: 'DELETE' });
    toast('Пользователь удалён');
    loadUsers();
  } catch (err) {
    toast(err.message, true);
  }
}

// ---------- заказы ----------

async function loadOrders() {
  const items = await request('/orders');
  renderList('orders-list', items,
    (o) => `Заказ #${o.id} — ${o.total} ₽ <span class="meta">user ${o.userId} · ${o.status}</span>`,
    deleteOrder,
  );
}

async function addOrder(e) {
  e.preventDefault();
  const form = e.target;
  const body = Object.fromEntries(new FormData(form));
  body.userId = Number(body.userId);
  body.total = Number(body.total);
  try {
    await request('/orders', { method: 'POST', body: JSON.stringify(body) });
    form.reset();
    toast('Заказ создан');
    loadOrders();
  } catch (err) {
    toast(err.message, true);
  }
}

async function deleteOrder(id) {
  try {
    await request(`/orders/${id}`, { method: 'DELETE' });
    toast('Заказ удалён');
    loadOrders();
  } catch (err) {
    toast(err.message, true);
  }
}


document.getElementById('product-form').addEventListener('submit', addProduct);
document.getElementById('user-form').addEventListener('submit', addUser);
document.getElementById('order-form').addEventListener('submit', addOrder);

loadProducts();
loadUsers();
loadOrders();