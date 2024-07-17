const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
for (let opt of dropdowns) {
    for (ele in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = ele;
        newOption.value = ele;
        opt.append(newOption);
        if (opt.name === "from" && ele === "USD") {
            newOption.selected = "selected";
        }
        else if (opt.name === "to" && ele === "INR") {
            newOption.selected = "selected";
        }
    }
    opt.addEventListener("change", (evt) => {
        updateFlag(evt.target);
        updateExchangeRate();
    })

}
let btn = document.querySelector("button");
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal == "" || amtVal < 1) { amtVal = 1; }
    let URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    msg.innerText = `${1 * amtVal}  ${fromCurr.value} = ${rate * amtVal} ${toCurr.value}`;
}
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let img = element.parentElement.querySelector("img");
    let url = `https://flagsapi.com/${countryCode}/flat/64.png`
    img.src = url;
}
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});
window.addEventListener("load", () => {
    updateExchangeRate();
});
let arrow=document.querySelector(".arrow");
arrow.addEventListener("click",()=>{
    let tempValue=fromCurr.value;
    fromCurr.value=toCurr.value;
    toCurr.value=tempValue;
    let tempImg1= fromCurr.parentElement.querySelector("img");    
    let tempImg2= toCurr.parentElement.querySelector("img");    
    let temp=tempImg1.src;
    tempImg1.setAttribute("src",tempImg2.src);
    tempImg2.setAttribute("src",temp);   
    updateExchangeRate();
});