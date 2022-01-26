// quem me ajudou e ensinou a fazer foi o Gabriel Mendes. (Dica do Atanes no momento de ajuda de recuperacao sobre esse projeto)

const cart = document.querySelector('.cart');
const cartSection = document.querySelector('.cart__items');

const totalPrice = document.createElement('h2');
totalPrice.className = 'total-price';
cart.appendChild(totalPrice);

let totalValue = Number(localStorage.getItem('price'));

const addValue = (price) => {
  totalValue += price;
  localStorage.setItem('price', totalValue);
  totalPrice.innerHTML = `${totalValue}`;
}
 
const subtractValue = (price) => {
  totalValue -= price;
  localStorage.setItem('price', totalValue);
  totalPrice.innerHTML = `${totalValue}`;
}

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ id: sku, title: name, thumbnail: image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const showProductList = async () => {
  const data = await fetchProducts('computador');
  const itemSection = document.querySelector('.items');
  data.results.forEach((computer) => {
    itemSection.appendChild(createProductItemElement(computer));
  });
};

const cartItemClickListener = ({ target }) => {
  cartSection.removeChild(target);
  saveCartItems(cartSection.innerHTML);
};

const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addOnCart = async (id) => {
  const selectedElement = await fetchItem(id);
   addValue(selectedElement.price);
  cartSection.appendChild(createCartItemElement(selectedElement));
  saveCartItems(cartSection.innerHTML);
};

const buttonaddOnCart = async () => {
  const addButtons = document.querySelectorAll('.item__add');
  const data = await fetchProducts('computador');
  addButtons.forEach((element, index) => {
    element.addEventListener('click', () => {
      addOnCart(data.results[index].id);
    });
  });
};

window.onload = async () => {
  await showProductList();
  cartSection.innerHTML = getSavedCartItems('cartItems');
 buttonaddOnCart();
 totalPrice.innerHTML = Number(localStorage.getItem('price'));
};