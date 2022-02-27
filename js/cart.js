const cart = function () {
    const cartBtn = document.querySelector(".button-cart")
    const over = document.getElementById("modal-cart")
    const modal = over.querySelector(".modal")
    const modalForm = modal.querySelector(".modal-form")
    const closeModal = document.querySelector(".modal-close")

    const goodCont = document.querySelector(".long-goods-list")

    const plusGoodCart = function(id){
        const cart = JSON.parse(localStorage.getItem("cart"))
        const good = cart.find(good=>good.id === id)
        good.count++
        localStorage.setItem("cart", JSON.stringify(cart))
        renderCart(cart)
    }
    const minusGoodCart = function(id){
        const cart = JSON.parse(localStorage.getItem("cart"))
        const good = cart.find(good=>good.id === id)

        if(good.count>0)
            good.count--
        localStorage.setItem("cart", JSON.stringify(cart))
        renderCart(cart)
    }
    const deleteGoodCart = function(id){
        const cart = JSON.parse(localStorage.getItem("cart"))
        const newCart = cart.filter(el=>el.id !== id)

        localStorage.setItem("cart", JSON.stringify(newCart))
        renderCart(newCart)
    }

    const addToCart = function(id){
        const stor = JSON.parse(localStorage.getItem("goods")) 
        const addGood = stor.find(good=>good.id === id)
        
        const cart = localStorage.getItem("cart")?
            JSON.parse(localStorage.getItem("cart")):[]

        if(cart.some(good=>good.id === id)){
            cart.find(good=>good.id === id).count++
        }else{
            addGood.count = 1
            cart.push(addGood)
        }
        
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    const renderCart = function(arr){
        const cont = document.querySelector(".cart-table__goods")
        const total = document.querySelector(".card-table__total")
        let sum = 0
        total.innerHTML = ""
        cont.innerHTML = ""
        arr?.forEach(good=>{
            const elem = document.createElement("tr")
            elem.innerHTML = `
                <td>${good.name}</td>
                <td>${good.price}$</td>
                <td><button class="cart-btn-minus" "="">-</button></td>
                <td>${good.count}</td>
                <td><button class=" cart-btn-plus" "="">+</button></td>
                <td>${good.price * good.count}$</td>
                <td><button class="cart-btn-delete" "="">x</button></td>
            `
            cont.append(elem)
            sum += good.price * good.count

            elem.addEventListener("click", e=>{
                if(e.target.closest(".cart-btn-plus")){
                    plusGoodCart(good.id)
                } else if(e.target.closest(".cart-btn-minus")){
                    minusGoodCart(good.id)
                } else if(e.target.closest(".cart-btn-delete")){
                    deleteGoodCart(good.id)
                }
            })
        })
        total.innerHTML = `${sum}$`

    }




    cartBtn.addEventListener("click", () => {
        renderCart(JSON.parse(localStorage.getItem("cart")))
        over.style.display = "flex"
    })

    closeModal.addEventListener("click", () => {
        over.style = ""
    })

    over.addEventListener("click", () => {
        over.style = ""
    })

    modal.addEventListener("click", e => {
        e.stopPropagation()
    })

    goodCont.addEventListener("click", e=>{
        
        if(e.target.closest(".add-to-cart")){
            const goodId = e.target.closest(".add-to-cart").dataset.id 
            addToCart(goodId)
        }
    })

    const sendForm = function(name,phone){
        const cart = localStorage.getItem("cart")?
            JSON.parse(localStorage.getItem("cart")):[]
        
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify({
                cart,
                name,
                phone,
            })
        })
        .then(()=>{
            over.style = ""
            localStorage.setItem("cart", "[]")
            modalForm[0].value = ""
            modalForm[1].value = ""
        })
    }

    modalForm.addEventListener("submit", e=>{
        e.preventDefault()
        const name = modalForm[0].value
        const phone = modalForm[1].value
        sendForm(name,phone)
    })
}

cart()