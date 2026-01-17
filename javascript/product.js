let responsiveSlider = function () {

  let slider = document.getElementById("slider");
  let sliderWidth = slider.offsetWidth;
  let slideList = document.getElementById("sliderWrap");
  let items = slideList.querySelectorAll("li").length;

  let count = 0;

  let num = document.getElementById("num");
  slideNums = num.querySelectorAll("div");

  let prev = document.getElementById("prev");
  let next = document.getElementById("next");

  const addColor = function (pos) {
    slideNums[pos].style.boxShadow = "0 0 10px 2px rgb(196, 253, 255)";
    slideNums[pos].style.background = "#fff";
  };

  let removeColor = function (pos) {
    slideNums[pos].style.boxShadow = "0 0 10px 2px transparent";
    slideNums[pos].style.background = "rgba(255, 255, 255, .3)";
  };

  addColor(0);

  slideNums[0].addEventListener("click", function () {
    removeColor(count);
    count = 0;
    addColor(count);
    slideList.style.left = "0px";
  });
  slideNums[1].addEventListener("click", function () {
    removeColor(count);
    count = 1;
    addColor(count);
    slideList.style.left = "-" + count * sliderWidth + "px";
  });
  slideNums[2].addEventListener("click", function () {
    removeColor(count);
    count = 2;
    addColor(count);
    slideList.style.left = "-" + count * sliderWidth + "px";
  });
  slideNums[3].addEventListener("click", function () {
    removeColor(count);
    count = 3;
    addColor(count);
    slideList.style.left = "-" + count * sliderWidth + "px";
  });
  slideNums[4].addEventListener("click", function () {
    removeColor(count);
    count = 4;
    addColor(count);
    slideList.style.left = "-" + count * sliderWidth + "px";
  });

  window.addEventListener("resize", function () {
    sliderWidth = slider.offsetWidth;
    slideList.style.left = "-" + count * sliderWidth + "px";
  });

  let prevSlide = function () {
    removeColor(count);
    if (!count) count = items - 1;
    else count--;
    addColor(count);
    slideList.style.left = "-" + count * sliderWidth + "px";
  };

  let nextSlide = function () {
    removeColor(count);
    if (count == items - 1) count = 0;
    else count++;
    addColor(count);
    slideList.style.left = "-" + count * sliderWidth + "px";
  };

  next.addEventListener("click", function (e) {
    e.preventDefault();
    nextSlide();
  });

  prev.addEventListener("click", function (e) {
    e.preventDefault();
    prevSlide();
  });

  setInterval(function () {
    nextSlide();
  }, 8000);
}

document.addEventListener('DOMContentLoaded', function () {
  responsiveSlider();
})




// product section
class CartItem {
  constructor(name, desc, img, price) {
    this.name = name
    this.img = img
    this.price = price
    this.desc = desc
    this.quantity = 1
  }
}

class LocalCart {
  static key = 'cartItems'

  static getLocalCartItems() {
    let cartMap = new Map()
    const cart = localStorage.getItem(LocalCart.key)
    if (cart !== null && cart.length > 0)
      return new Map(Object.entries(JSON.parse(cart)))
    return new Map()
  }
  static addItemToLocalCart(id, item) {
    let cart = LocalCart.getLocalCartItems()
    if (cart.has(id)) {
      let mapitem = cart.get(id)
      mapitem.quantity += 1
      cart.set(id, mapitem)
    }
    else
      cart.set(id, item)
    localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cart)))
    updateCartUI()
  }

  static removeItemFromCart(id) {
    let cart = LocalCart.getLocalCartItems()
    if (cart.has(id)) {
      let mapItem = cart.get(id)
      if (mapItem.quantity > 1) {
        mapItem.quantity -= 1
        cart.set(id, mapItem)
      }

      else
        cart.delete(id)
    }
    if (cart.size === 0)
      localStorage.clear()
    else
      localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cart)))
    updateCartUI()
  }
}

const cartIcon = document.querySelector('.fa-cart-arrow-down')
const wholeCartWindow = document.querySelector('.whole-cart-window')
wholeCartWindow.inWindow = 0
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn')
addToCartBtns.forEach((btn) => {
  btn.addEventListener('click', addItemFunction)
})

cartIcon.addEventListener('mouseover', () => {
  if (wholeCartWindow.classList.contains('hide'))
    (wholeCartWindow.classList.remove('hide'))
})

function addItemFunction(e) {
  const cardItem = e.target.parentElement.parentElement
  const id = cardItem.getAttribute("data-id")
  const img = cardItem.querySelector('img').src
  const name = cardItem.querySelector('h3').textContent
  const desc = cardItem.querySelector('p span').textContent
  let price = cardItem.querySelector('.price').textContent
  price = price.replace("$", '').trim()
  const item = new CartItem(name, desc, img, price)
  LocalCart.addItemToLocalCart(id, item)
  
  // Get the updated quantity from cart
  const cartItems = LocalCart.getLocalCartItems()
  const quantity = cartItems.get(id).quantity
  
  // Show notification
  showNotification(name, quantity)
  console.log(price)
}

function showNotification(productName, quantity) {
  // Create notification element
  const notification = document.createElement('div')
  notification.classList.add('cart-notification')
  notification.innerHTML = `
    <div class="notification-content">
      <p><strong>${productName}</strong> added to cart</p>
      <p>Quantity: <strong>${quantity}</strong></p>
    </div>
  `
  
  // Add to page
  document.body.appendChild(notification)
  
  // Trigger animation
  setTimeout(() => {
    notification.classList.add('show')
  }, 10)
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show')
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, 3000)
}

cartIcon.addEventListener('mouseleave', () => {
  // if (wholeCartWindow.classList.contains('hide'))
  setTimeout(() => {
    if (wholeCartWindow.inWindow == 0)
      wholeCartWindow.classList.add('hide')

  }, 500)

})

// Support touch/click on mobile to open/close the cart window
cartIcon.addEventListener('click', () => {
  wholeCartWindow.classList.toggle('hide')
})

wholeCartWindow.addEventListener('mouseover', () => {
  wholeCartWindow.inWindow = 1
})

wholeCartWindow.addEventListener('mouseleave', () => {
  wholeCartWindow.inWindow = 0
  wholeCartWindow.classList.add('hide')
})

function updateCartUI() {
  const cartWrapper = document.querySelector('.cart-wrapper')
  cartWrapper.innerHTML = ""
  const items = LocalCart.getLocalCartItems()
  if (items === null) return
  let count = 0
  let total = 0
  for (const [key, value] of items.entries()) {
    const cartItem = document.createElement('div')
    cartItem.classList.add('cart-item')
    let price = parseFloat(value.price) * value.quantity
    count += 1
    total += price
    cartItem.innerHTML =
      `
        <img src="${value.img}" alt="">
                        <div class="details">
                            <h3>${value.name}</h3>
                            <p>${value.desc}</p>
                            <span class="quantity">Quantity: ${value.quantity}</span>
                            <span class="price">Price: $ ${price.toFixed(2)}</span>
                        </div>
                        <div class="cancle"><i class="fas far fa-window-close"></i></div>

    `

    cartItem.lastElementChild.addEventListener('click', () => {
      LocalCart.removeItemFromCart(key)
    })
    cartWrapper.append(cartItem)
  }

  if (count > 0) {
    cartIcon.classList.add('non-empty')
    let root = document.querySelector(':root')
    root.style.setProperty('--after-content', `"${count}"`)
    const subtotal = document.querySelector('.subtotal')
    subtotal.innerHTML = `SubTotal: $ ${total.toFixed(2)}`
  }
  else
    cartIcon.classList.remove('non-empty')

}

document.addEventListener('DOMContentLoaded', () => { updateCartUI() })



