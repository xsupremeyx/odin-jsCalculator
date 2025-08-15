let a = 0;
let b;
flag = 0; 
disabledAll = 0;
decimal = 0;
let crntbttn;

//flag = 0
//flag = 1 (operator pressed)
//flag = 2 (second operand in process)

function roundTo(num, decimalPlaces) {
    const factor = 10 ** decimalPlaces;
    return Math.round(num * factor) / factor;
}

function disableBttns(buttons){
    buttons.forEach(bttn => {
        bttn.classList.add("disabled");
    });
}

function add(a,b){
    return roundTo(a+b,5);
}
function sub(a,b){
    return roundTo(a-b,5);
}
function multiply(a,b){
    return roundTo(a*b,5);
}
function divide(a,b){
    if(b === 0){
        return Infinity;
    }
    return roundTo(a/b,5);
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
        b = 0;
        if(disabledAll){
                buttons.forEach(bttn => {
                bttn.classList.remove("disabled");
                disabledAll = 0;
            });
        }
        decimal = 0;
        document.getElementById("decimal").classList.remove("disabled");
        flag = 0;
        resetOperatorActive(buttons);
        
    }
    else if(disabledAll){
        return;
    }

    else if( bttn.id === 'backspace'){
        display.value = display.value.slice(0,-1);
        if(display.value === '') display.value = '0';
        if(!display.value.includes(".")){
            decimal = 0;
            document.getElementById("decimal").classList.remove("disabled");
        }
    }

    else if(["multiply","minus","add","divide"].includes(bttn.id)){
        if(flag === 2){
            b = +getOutputContent(display);
            display.value = operate(a,b,crntbttn);
            b = 0;
        }

        resetOperatorActive(buttons);
        a = +getOutputContent(display);
        if(a === Infinity || Number.isNaN(a)){
            disableBttns(buttons);
            disabledAll = 1;
            document.getElementById("clear").classList.remove("disabled");
            return;
        }
        
        bttn.classList.add("active");
        flag = 1;
        crntbttn = bttn.id;

        decimal = display.value.includes('.') ? 1 : 0;
        document.getElementById("decimal").classList.toggle("disabled", decimal === 1);
    }

    else if(bttn.id === "submit"){
        if(flag === 2){
            b = +getOutputContent(display);
            display.value = operate(a,b,crntbttn);
            b = 0;
            a = +getOutputContent(display);
            flag = 0;

            decimal = display.value.includes('.') ? 1 : 0;
            document.getElementById("decimal").classList.toggle("disabled", decimal === 1);

            if(a === Infinity || Number.isNaN(a)){
                disableBttns(buttons);
                disabledAll = 1;
                document.getElementById("clear").classList.remove("disabled");
                return;
            }
        }
    }
    else{
        if(flag === 1){
            display.value = '';
            resetOperatorActive(buttons);
            decimal = 0;
            document.getElementById("decimal").classList.remove("disabled");
            flag = 2;
        }

        if(bttn.id === "decimal"){
            if(decimal){
                return;
            }
            decimal = 1;
            document.getElementById("decimal").classList.add("disabled");
            const val = bttn.textContent;
            display.value += val;
            display.scrollTo({
                left: display.scrollWidth,
                behavior: "smooth"
            });
            return;
        }

        const val = bttn.textContent;
        display.value += val;
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

function checkTheme() {
    const themeBttns = document.querySelectorAll(".themebttn");

    themeBttns.forEach(bttn => {
        bttn.addEventListener("click", event => {
            const theme = event.target.id; // "original" or "panda"
            applyTheme(theme);
        });
    });
}

function applyTheme(theme) {
    const calcBody = document.getElementById("calculator-body");
    const display = document.getElementById("input");
    const buttons = document.querySelectorAll(".button");
    const operators = document.querySelectorAll(".divide, .multiply, .minus, .add");
    const specials = document.querySelectorAll(".submit, .backspace, .clear");

    // Remove previous theme classes
    calcBody.classList.remove("themeOriginal-bg", "themePanda-bg");
    display.classList.remove("themeOriginal-input", "themePanda-input");
    buttons.forEach(btn => btn.classList.remove("themeOriginal-button", "themePanda-button"));
    operators.forEach(op => op.classList.remove("themeOriginal-operator", "themePanda-operator"));
    specials.forEach(sp => sp.classList.remove("themeOriginal-special", "themePanda-special"));

    // Apply the new theme
    if (theme === "original") {
        calcBody.classList.add("themeOriginal-bg");
        display.classList.add("themeOriginal-input");
        buttons.forEach(btn => btn.classList.add("themeOriginal-button"));
        operators.forEach(op => op.classList.add("themeOriginal-operator"));
        specials.forEach(sp => sp.classList.add("themeOriginal-special"));
    } 
    else if (theme === "panda") {
        calcBody.classList.add("themePanda-bg");
        display.classList.add("themePanda-input");
        buttons.forEach(btn => btn.classList.add("themePanda-button"));
        operators.forEach(op => op.classList.add("themePanda-operator"));
        specials.forEach(sp => sp.classList.add("themePanda-special"));
    }
}

checkTheme();

const buttons = document.querySelectorAll(".button");
const display = document.querySelector("#input");

checkClick(buttons,display);