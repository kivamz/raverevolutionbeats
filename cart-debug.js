// Script de depuración del carrito
// Ejecutar en la consola del navegador para probar la funcionalidad

console.log('=== CART DEBUG SCRIPT ===');

// 1. Verificar funciones disponibles
const cartFunctions = ['getCart', 'saveCart', 'addToCart', 'removeFromCart', 'openCart', 'closeCart'];
console.log('1. Checking cart functions:');
cartFunctions.forEach(func => {
  if (typeof window[func] === 'function') {
    console.log(`✓ ${func} is available`);
  } else {
    console.log(`✗ ${func} is NOT available`);
  }
});

// 2. Verificar contenido actual del carrito
console.log('\n2. Current cart contents:');
try {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  console.log('Cart items:', cart);
  console.log('Total items:', cart.reduce((sum, item) => sum + item.quantity, 0));
} catch (error) {
  console.error('Error reading cart:', error);
}

// 3. Probar agregar un item de prueba
console.log('\n3. Adding test item...');
const testItem = {
  productId: 'debug-test-123',
  variantId: 'debug-variant-456',
  name: 'Debug Test Product',
  color: 'Red',
  size: 'L',
  price: 19.99,
  quantity: 1,
  thumbnail: 'https://via.placeholder.com/150x150/ff0000/ffffff?text=TEST',
  currency: 'EUR'
};

try {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.push(testItem);
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('cartUpdated'));
  console.log('✓ Test item added successfully');
} catch (error) {
  console.error('✗ Error adding test item:', error);
}

// 4. Verificar contador del carrito
console.log('\n4. Checking cart counter:');
setTimeout(() => {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    console.log(`Cart count element shows: "${cartCount.textContent}"`);
    console.log(`Cart count is visible: ${cartCount.style.display !== 'none'}`);
  } else {
    console.error('Cart count element not found');
  }
}, 500);

// 5. Probar abrir el carrito
console.log('\n5. Testing cart sidebar:');
setTimeout(() => {
  if (window.openCart) {
    console.log('Opening cart sidebar...');
    window.openCart();
  } else {
    console.error('openCart function not available');
  }
}, 1000);

console.log('\n=== DEBUG SCRIPT COMPLETED ===');
console.log('Check the cart icon and try clicking it!');
