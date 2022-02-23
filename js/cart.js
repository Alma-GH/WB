const cart = function () {
    const cartBtn = document.querySelector(".button-cart")
    const over = document.getElementById("modal-cart")
    const modal = over.querySelector(".modal")
    const closeModal = document.querySelector(".modal-close")


    cartBtn.addEventListener("click", () => {
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

}

cart()