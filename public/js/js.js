let shopping = document.getElementById("shopping")
let partShop=document.getElementById("part-shop")
let LOGIN=document.getElementById("LOGIN")
let REGISTER=document.getElementById("REGISTER")

shopping.addEventListener("click",()=>{
    if(partShop.style.display==="grid"){
        partShop.style.display="none"
    }else{
        partShop.style.display="grid"
    }
})