const getGoods = function () {
    const links = document.querySelectorAll(".navigation-link")
    const viewAll = document.querySelector("a.more")

    const renderGoods = function(goods){
        const container = document.querySelector(".long-goods-list")
        container.innerHTML = ""
        goods.forEach(good=>{
            const elem = document.createElement("div")
            elem.classList.add("col-lg-3", "col-sm-6")
            elem.innerHTML = `     
            <div class="goods-card">
                ${good.label?`<span class="label">${good.label}</span>`:""}
                <img src="/db/${good.img}" alt="${good.name}" class="goods-image">
                <h3 class="goods-title">${good.name}</h3>
                <p class="goods-description">${good.description}</p>
                <button class="button goods-card-btn add-to-cart" data-id="${good.id}">
                    <span class="button-price">$${good.price}</span>
                </button>
            </div>
            `
            container.appendChild(elem)
        })
    }
    
    const getData = function(cat, val){
        fetch("https://wildb-98f37-default-rtdb.europe-west1.firebasedatabase.app/db.json")
        .then(res=>res.json())
        .then(data=>{
            let array = cat?data.filter(good=>good[cat]===val):data

            localStorage.setItem("goods", JSON.stringify(array))

            if(window.location.pathname === "/goods.html"){
               renderGoods(array)
            } else {
                window.location.href = "/goods.html"
            }
        })
    }
    

    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault()

            const value = link.textContent
            const category = link.dataset.field
            getData(category, value)
        })
    })


    viewAll?.addEventListener("click", e=>{
        e.preventDefault()
        getData()
    })

    if(localStorage.getItem("goods") && window.location.pathname === "/goods.html") 
        renderGoods(JSON.parse(localStorage.getItem("goods")))
    
    
}

getGoods()