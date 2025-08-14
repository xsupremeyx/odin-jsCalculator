function add(a,b){
    return a+b;
}
function sub(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}

function operate(opr1,opr2,operator){
    if(operator === "+") return add(opr1,opr2);
    else if(operator === "-") return sub(opr1,opr2);
    else if(operator === "*") return multiply(opr1,opr2);
    else if(operator === "/") return divide(opr1,opr2);
    else return NaN;
}

function populateDisplay(bttn,display){
    if(bttn.id === 'clear'){
        display.value = '';
    }
    else if( bttn.id === 'backspace'){
        display.value = display.value.slice(0,-1);
    }
    else if(["multiply","minus","add","divide"].includes(bttn.id)){
        // Operator here
    }
    else if(bttn.id === "submit"){
        //Submit here
    }
    else{
        const val = bttn.textContent;
        display.value += val;
    }
    
}

function checkClick(buttons,display){
    buttons.forEach(element => {
        element.addEventListener("click", (event) =>{
            const bttn = event.target;
            populateDisplay(bttn,display);
        });
    });
}

const buttons = document.querySelectorAll(".button");
const display = document.querySelector("#input");

checkClick(buttons,display);