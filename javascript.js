import {featureProductNav} from "./Data/featureProductNav.js"
import  {imageSlider} from "./Data/imageSlider.js"
import {marvelProductData} from "./Data/marvelProduct.js"
import {narutoProductData} from "./Data/narutoProduct.js"

let input_search = document.getElementById("search_input")
let form_search = document.getElementById("search_form")
let recent_SearchEl = document.querySelector(".recent_Search")

let recentArray = ["Mobile","Phone"]
form_search.addEventListener("submit",(e)=>{
    e.preventDefault()
    recentArray.unshift(input_search.value)
    console.log(recentArray)
    renderRecent()    
})


function renderRecent() {
    let recent_Search_html = ''
    recentArray.forEach(el => {
    recent_Search_html += `
        <div class="recent_list">
           <i class="fa-solid fa-clock-rotate-left"></i>
           <p>${el}</p>
        </div>
        `  
    })

    recent_SearchEl.innerHTML = recent_Search_html;
}
renderRecent()


/*********feature product js********/
let featureProduct_listE1 =document.querySelector(".featureProduct_list")
let featureProductListHTML = ''
// console.log(featureProductNav)

featureProductNav.forEach(el => {
    featureProductListHTML += `
        <div class="featureProduct_item">
            <a href="${el.link}">
                <div class="featureProduct_image">
                    <img src="${el.img}"   />
                </div>
                <p class="featureProduct_name">
                    ${el.name}
 
                    ${el.subNavigation ?  `<i class="fa-solid fa-angle-down featureProduct_icon_more" ></i>` : ""}
                 </p> 
            </a>
        </div>
    `        
})
featureProduct_listE1.innerHTML = featureProductListHTML
// console.log(featureProductListHTML)


/************image Slider ******************/
let imageSliderListE1 = document.querySelector(".imageSliderList")
let imageSliderListHTML = ''
console.log(imageSlider)


imageSlider.forEach(el =>{
    imageSliderListHTML +=`
    <div class="imageSliderItem">
        <a href="${el.link}">
            <img src="${el.img}"/>
        </a>
    </div>
    `
})
imageSliderListE1.innerHTML = imageSliderListHTML

let prev_imageBtnE1 = document.getElementById("prev_imageBtn")
let next_imageBtnE1 = document.getElementById("next_imageBtn")
let start = 0;
let end = -400;

prev_imageBtnE1.addEventListener("click",handlePrevImage)
next_imageBtnE1.addEventListener("click",handleNextImage)

function handlePrevImage(){
    let imageSliderList = document.querySelectorAll(".imageSliderItem")
    console.log(imageSliderList)
    if(start < 0)
    start+=100
    imageSliderList.forEach(el=>{
        el.style.transform = `translateX(${start}%)`
    })

}
function handleNextImage(){
    let imageSliderList = document.querySelectorAll(".imageSliderItem")
    console.log(imageSliderList)
    if(start > end)
    start-=100
    imageSliderList.forEach(el=>{
        el.style.transform = `translateX(${start}%)`
    })
}

function renderImageSlider(){
    if(start > end){
        handleNextImage()
    }
    else{
        start = 100
    }
}

setInterval(renderImageSlider,4000)



/************************bestofMarvel_Product_item **************************/
let bestofMarvel_Product_itemE1 = document.querySelector(".bestofMarvel_Product_item")
let bestofMarvelProduct_html = ""

console.log(marvelProductData)
marvelProductData.forEach(el =>{
    bestofMarvelProduct_html += `
    <div class="bestofMarvel_item">
        <div class="bestofMarvel_image_Product">
            <img src="${el.img}"/>
        </div>
        <div class="bestofMarvelmoreOption">
            <p class="bestofMarvel_image_Product_name">${el.name}</p>
            <p class="bestofMarvel_discount">${el.discount}</p>
            <p class="bestofMarvel_brand">${el.brand}</p>
        </div>
    </div>`
})

bestofMarvel_Product_itemE1.innerHTML = bestofMarvelProduct_html



/************************bestofNaruto_Product_item **************************/
let bestofNaruto_Product_itemE1 = document.querySelector(".bestofNaruto_Product_item")
let bestofNarutoProduct_html = ""

console.log(narutoProductData)
narutoProductData.forEach(el =>{
    bestofNarutoProduct_html += `
    <div class="bestofNaruto_item">
        <div class="bestofNaruto_image_Product">
            <img src="${el.img}"/>
        </div>
        <div class="bestofNarutomoreOption">
            <p class="bestofNaruto_image_Product_name">${el.name}</p>
            <p class="bestofNaruto_discount">${el.discount}</p>
            <p class="bestofNaruto_brand">${el.brand}</p>
        </div>
    </div>`
})

bestofNaruto_Product_itemE1.innerHTML = bestofNarutoProduct_html