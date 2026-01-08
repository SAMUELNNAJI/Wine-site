
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
    console.log(price)
}

cartIcon.addEventListener('mouseleave', () => {
    // if (wholeCartWindow.classList.contains('hide'))
    setTimeout(() => {
        if (wholeCartWindow.inWindow == 0)
            wholeCartWindow.classList.add('hide')

    }, 500)

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
        let price = value.price * value.quantity
        count += 1
        total += price
        cartItem.innerHTML =
            `
        <img src="${value.img}" alt="">
                        <div class="details">
                            <h3>${value.name}</h3>
                            <p>${value.desc}</p>
                            <span class="quantity">Quantity: ${value.quantity}</span>
                            <span class="price">Price: $ ${price}</span>
                        </div>
                        <div class="cancle"><i class="fas far fa-window-close"></i></div>

    `

        cartItem.lastElementChild.addEventListener('click', () => {
            LocalCart.removeItemFromCart(key)
        })
        cartWrapper.append(cartItem)
    }

    if (count > 1) {
        cartIcon.classList.add('non-empty')
        let root = document.querySelector(':root')
        root.style.setProperty('--after-content', `"${count}"`)
        const subtotal = document.querySelector('.subtotal')
        subtotal.innerHTML = `SubTotal: $ ${total}`
    }
    else
        cartIcon.classList.remove('non-empty')
}

document.addEventListener('DOMContentLoaded', () => { updateCartUI() })

