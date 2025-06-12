document.addEventListener("DOMContentLoaded",function(){const e=document.getElementById("cart-items-list"),a=document.getElementById("empty-cart-message"),r=document.getElementById("cart-subtotal"),c=document.getElementById("cart-tax"),o=document.getElementById("cart-total"),p=document.getElementById("checkout-btn"),g=document.getElementById("clear-cart-btn");function l(){const n=s(),t=n.length===0;e&&(e.style.display=t?"none":"block"),a&&(a.style.display=t?"flex":"none"),t||(C(n),h(n)),p&&(p.disabled=t),g&&(g.style.display=t?"none":"block")}function C(n){e&&(e.innerHTML=n.map(t=>`
        <div class="cart-item" data-product-id="${t.id}" data-variant-id="${t.variantId}">
          <div class="item-image">
            <img src="${t.image||"/placeholder.jpg"}" alt="${t.name}">
          </div>
          
          <div class="item-details">
            <h3 class="item-name">${t.name}</h3>
            <p class="item-variant">${t.variant}</p>
            <p class="item-price">$${t.price.toFixed(2)} each</p>
          </div>
          
          <div class="item-controls">
            <div class="quantity-controls">
              <button onclick="updateCartItemQuantity('${t.id}', '${t.variantId}', ${t.quantity-1})" ${t.quantity<=1?"disabled":""}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <input type="number" class="quantity-input" value="${t.quantity}" min="1" 
                     onchange="updateCartItemQuantity('${t.id}', '${t.variantId}', parseInt(this.value))">
              <button onclick="updateCartItemQuantity('${t.id}', '${t.variantId}', ${t.quantity+1})">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div class="item-total">$${(t.price*t.quantity).toFixed(2)}</div>
            
            <button class="remove-item" onclick="removeFromCart('${t.id}', '${t.variantId}')" title="Remove item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      `).join(""))}function h(n){const t=n.reduce((v,d)=>v+d.price*d.quantity,0),i=t*.1,u=t+i;r&&(r.textContent=`$${t.toFixed(2)}`),c&&(c.textContent=`$${i.toFixed(2)}`),o&&(o.textContent=`$${u.toFixed(2)}`)}window.updateCartItemQuantity=function(n,t,i){if(i<=0)w(n,t);else{const u=s(),v=u.find(d=>d.id===n&&d.variantId===t);v&&(v.quantity=Math.max(1,i),y(u),l(),m())}},p?.addEventListener("click",()=>{s().length>0&&alert("Checkout functionality will be implemented soon!")}),g?.addEventListener("click",()=>{confirm("Are you sure you want to clear your cart?")&&(f(),l(),m())}),l(),window.addEventListener("cartUpdated",l)});function s(){try{const e=localStorage.getItem("cart");return e?JSON.parse(e):[]}catch(e){return console.error("Error getting cart:",e),[]}}function y(e){try{localStorage.setItem("cart",JSON.stringify(e)),window.dispatchEvent(new CustomEvent("cartUpdated",{detail:e}))}catch(a){console.error("Error saving cart:",a)}}function f(){localStorage.removeItem("cart"),window.dispatchEvent(new CustomEvent("cartUpdated",{detail:[]}))}function w(e,a){const c=s().filter(o=>!((o.productId||o.id)===e&&o.variantId===a));y(c)}function m(){const a=s().reduce((c,o)=>c+o.quantity,0),r=document.querySelector(".cart-count");r&&(r.textContent=a,r.style.display=a>0?"block":"none")}
