const number = document.querySelector(".num");
const primaryDisp = document.querySelector(".main-calc-text");
const secondaryDisp = document.querySelector(".pre-calc");
const addOperator = document.querySelector(".addition");
var crntsizedesktop = 75;
var strlen;
var timesrun = 0;

var calculation=0;

function cleardisplay(){
    primaryDisp.innerHTML="";
    secondaryDisp.innerHTML="";
    calculation = 0;
}

function delnum(){
    var l = primaryDisp.innerHTML.length-1;
    primaryDisp.innerHTML=primaryDisp.innerHTML.slice(0,l);
    checkWidth();
}

function checkWidth(){
    if(screen.width>=1000){
        if(primaryDisp.clientWidth>=document.querySelector(".main-calc").clientWidth){
            strlen = primaryDisp.innerHTML.length;
            crntsizedesktop/=2;
            timesrun+=1;
            primaryDisp.style.fontSize =`${crntsizedesktop}px`;
        }else{
            if(timesrun>0 & primaryDisp.innerHTML.length<strlen){
                crntsizedesktop*=2;
                primaryDisp.style.fontSize =`${crntsizedesktop}px`;
                timesrun-=1
            }
        }
    }else{

    }
}

function displaynum(a){
    clickedNum = number.value;
    primaryDisp.innerHTML+=a;
    checkWidth();
}

function addnum(){
    primaryDisp.innerHTML+="+";
    checkWidth();
}

function subnum(){
    primaryDisp.innerHTML+="-";
    checkWidth();
}

function prodnum(){
    primaryDisp.innerHTML+="*";
    checkWidth();
}

function divnum(){
    primaryDisp.innerHTML+="/";
    checkWidth();
}
function decimal(){
    primaryDisp.innerHTML+=".";
    checkWidth();
}

function displayans(){

    var str1 = primaryDisp.innerHTML;
    const operator=['-','+','/','*'];
    const str = [];
    var temp = "";

    for(p=0;p<str1.length;p++){
        if(!operator.includes(str1[p])){
            temp+=str1[p];
        }
        else{
            str.push(parseFloat(temp));
            str.push(str1[p]);
            temp="";
        }
    }
    
    if(temp!=""){
        str.push(parseFloat(temp));
        temp="";
    }


    const opstack=[];
    const postfixexp=[];
    var top=-1;

    for(i=0;i<str.length;i++){
        if(operator.includes(str[i])){
            if(top==-1){
                opstack.push(str[i]);
                top+=1;
            }
            else{
                if(operator.indexOf(opstack[top])<=operator.indexOf(str[i])){
                    opstack.push(str[i]);
                    top+=1
                } 
                else{
                    while(operator.indexOf(opstack[top])>operator.indexOf(str[i])){
                        postfixexp.push(opstack.pop());
                        top-=1;
                    }
                    opstack.push(str[i]);
                    top+=1
                }
            }
        }
        else{
            postfixexp.push(str[i]);
        }
    }

    while(opstack.length!=0){
        postfixexp.push(opstack.pop());
        top-=1;
    }

    const numstack = [];

    for(j=0;j<postfixexp.length;j++){
        if(!operator.includes(postfixexp[j])){
            numstack.push(parseFloat(postfixexp[j]));
        }
        else{
            temp2 = parseFloat(numstack.pop());
            temp = parseFloat(numstack.pop());
            if(postfixexp[j]=='+'){
                numstack.push(temp+temp2);
            }
            else if(postfixexp[j]=='-'){
                numstack.push(temp-temp2);
            }
            else if(postfixexp[j]=='*'){
                numstack.push(temp*temp2);
            }
            else{
                numstack.push(temp/temp2);
            }
        }
    }
    calculation = numstack[0];

    secondaryDisp.innerHTML=primaryDisp.innerHTML;

    primaryDisp.innerHTML=calculation;
}