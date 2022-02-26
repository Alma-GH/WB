const search = function () {
    const input = document.querySelector(".search-block > input")
    const searchBtn = document.querySelector(".search-block > button")

    const renderGoods = function(goods){
        const container = document.querySelector(".long-goods-list")
        container.innerHTML = ""
        goods.forEach(good=>{
            const elem = document.createElement("div")
            elem.classList.add("col-lg-3", "col-sm-6")
            elem.innerHTML = `     
            <div class="goods-card">
                ${good.label?`<span class="label">${good.label}</span>`:""}
                <img src="/db/${good.img}" alt="image: Hoodie" class="goods-image">
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

    const getData = function(search){
        fetch("https://wildb-98f37-default-rtdb.europe-west1.firebasedatabase.app/db.json")
        .then(res=>res.json())
        .then(data=>{
            let array = search?data.filter(good=>good.name.toLowerCase().includes(search.toLowerCase())):data
            localStorage.setItem("goods", JSON.stringify(array))

            if(window.location.pathname === "/goods.html"){
               renderGoods(array)
            } else {
                window.location.href = "/goods.html"
            }
        })
    }

    searchBtn.addEventListener("click", ()=>{
        getData(input.value)
    })
}

search()