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