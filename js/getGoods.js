const getGoods = function () {
    const links = document.querySelectorAll(".navigation-link")
    
    const getData = function(){
        fetch("https://wildb-98f37-default-rtdb.europe-west1.firebasedatabase.app/db.json")
        .then(res=>res.json())
        .then(data=>{
            localStorage.setItem("goods", JSON.stringify(data))
        })
    }

    

    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault()
            console.log(e.target)
            getData()
            console.log(JSON.parse(localStorage.getItem("goods")))
        })
    })

    
}

getGoods()