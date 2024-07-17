function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let body=document.querySelector(".result-game");
let option=document.querySelectorAll(".option");
option.forEach((opt)=>{
    opt.addEventListener("click",()=>{
        console.log(opt.id);
        var computerResponse = getRandomInt(1, 3);
        console.log(computerResponse);
        if(opt.id==="rock"){
            if(computerResponse===2){
                body.innerHTML="Lose";
                console.log("lose!!");
            }
                
            else if(computerResponse===3){
                body.innerHTML="Win";
                console.log("Win!!");
            }
            else if(computerResponse===1){
                body.innerHTML="Draw";
                console.log("Draw!!");
            }
        }
        else if(opt.id==="paper"){
            if(computerResponse===2){
                body.innerHTML="Draw";
                console.log("Draw!!");
            }
            else if(computerResponse===3){
                body.innerHTML="Lose";
                console.log("lose!!");
            }
            else if(computerResponse===1){
                body.innerHTML="Win";
                console.log("Win!!");
            }
        }
        else{
            if(computerResponse===2){
                body.innerHTML="Win";
                console.log("Win!!");
            }
            else if(computerResponse===3){
                body.innerHTML="Draw";
                console.log("Draw!!");
            }
            else if(computerResponse===1){
                body.innerHTML="Lose";
                console.log("lose!!");
            }
        }

    })
})
body.addEventListener("click",()=>{
    location.reload();
}
)