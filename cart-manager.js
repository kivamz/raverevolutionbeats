// Global cart management functions
// This script provides cart functionality across the entire application

// Cart item interface (for TypeScript-like documentation)
// CartItem {
//   id: string,
//   name: string,
//   image: string,
//   price: number,
//   variant: string,
//   variantId: string,
//   quantity: number
// }

// Get cart from localStorage
function getCart() {
  try {
    const cart = localStorage.getItem('rave-cart');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error getting cart:', error);
    return [];
  }
}

// Save cart to localStorage
function saveCart(cart) {
  try {
    localStorage.setItem('rave-cart', JSON.stringify(cart));
    // Dispatch custom event for cart updates
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
  } catch (error) {
    console.error('Error saving cart:', error);
  }
}

// Add item to cart
function addToCart(productId, productName, productImage, price, variant, variantId) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === productId && item.variantId === variantId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: productName,
      image: productImage,
      price: price,
      variant: variant,
      variantId: variantId,
      quantity: 1
    });
  }
  
  saveCart(cart);
  updateCartCount();
  
  // Show notification
  showCartNotification(`${productName} added to cart!`);
}

// Remove item from cart
function removeFromCart(productId, variantId) {
  const cart = getCart();
  const updatedCart = cart.filter(item => !(item.id === productId && item.variantId === variantId));
  saveCart(updatedCart);
  updateCartCount();
}

// Clear entire cart
function clearCart() {
  saveCart([]);
  updateCartCount();
}

// Update cart count in header
function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.querySelector('.cart-count');
  
  if (cartCountElement) {
    cartCountElement.textContent = totalItems.toString();
    
    if (totalItems > 0) {
      cartCountElement.classList.add('show');
    } else {
      cartCountElement.classList.remove('show');
    }
    
    // Add animation for new items
    cartCountElement.classList.add('animate');
    setTimeout(() => {
      cartCountElement.classList.remove('animate');
    }, 600);
  }
}

// Show cart notification
function showCartNotification(message) {
  // Remove existing notification
  const existingNotification = document.querySelector('.cart-notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>${message}</span>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3);
    z-index: 10001;
    transform: translateX(400px);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  `;
  
  notification.querySelector('.notification-content').style.cssText = `
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 10);
  
  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
  
  // Listen for cart updates
  window.addEventListener('cartUpdated', function(event) {
    updateCartCount();
  });
});

// Global cart toggle function
function toggleCart() {
  const cartSidebar = document.getElementById('cart-sidebar');
  if (cartSidebar) {
    if (cartSidebar.classList.contains('open')) {
      cartSidebar.classList.remove('open');
      document.body.style.overflow = '';
    } else {
      cartSidebar.classList.add('open');
      document.body.style.overflow = 'hidden';
      
      // Update cart display when opening
      const updateEvent = new Event('updateCartDisplay');
      cartSidebar.dispatchEvent(updateEvent);
    }
  }
}

// Make functions globally available
window.getCart = getCart;
window.saveCart = saveCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.updateCartCount = updateCartCount;
window.showCartNotification = showCartNotification;
window.toggleCart = toggleCart;
