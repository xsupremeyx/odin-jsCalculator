let a = 0;
let b;
flag = 0; 
let crntbttn;

//flag = 0
//flag = 1 (operator pressed)
//flag = 2 (second operand in process)

//problem: give operand, press +, then type operand 2, then pressing - would minus the op1 and p2 instead of adding it and using minus on next operation!
//fixed!

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

function getOutputContent(display){
    return display.value;
}

function resetOperatorActive(buttons){
    buttons.forEach(element => element.classList.remove("active"));
}

function operate(opr1,opr2,operator){
    if(operator === "add") return add(opr1,opr2);
    else if(operator === "minus") return sub(opr1,opr2);
    else if(operator === "multiply") return multiply(opr1,opr2);
    else if(operator === "divide") return divide(opr1,opr2);
    else return NaN;
}

function populateDisplay(buttons,bttn,display){
    if(bttn.id === 'clear'){
        display.value = '0';
        a = 0;
    }

    else if( bttn.id === 'backspace'){
        display.value = display.value.slice(0,-1);
        if(display.value === '') display.value = '0';
    }

    else if(["multiply","minus","add","divide"].includes(bttn.id)){
        // Operator here
        if(flag === 2){
            b = +getOutputContent(display);
            display.value = operate(a,b,crntbttn);
            b = 0;
        }

        resetOperatorActive(buttons);
        a = +getOutputContent(display);
        bttn.classList.add("active");
        flag = 1;
        crntbttn = bttn.id;
    }
    else if(bttn.id === "submit"){
        //Submit here
    }

    else{
        if(flag === 1){
            display.value = '';
            resetOperatorActive(buttons);
            flag = 2;
        }
        const val = bttn.textContent;
        display.value += val;
        // display.scrollLeft = display.scrollWidth; //replaced by scroll animation
        display.scrollTo({
            left: display.scrollWidth,
            behavior: "smooth"
        });
    }
    
}

function checkClick(buttons,display){
    buttons.forEach(element => {
        element.addEventListener("click", (event) =>{
            const bttn = event.target;
            populateDisplay(buttons,bttn,display);
        });
    });
}



const buttons = document.querySelectorAll(".button");
const display = document.querySelector("#input");

checkClick(buttons,display);