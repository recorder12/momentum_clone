
const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 0 && hours < 12){
        hello = "Good Morning"; 
    }
    else if (hours >= 12 && hours < 18) {
        hello = "Good Afternoon";
    }
    else if (hours >=18 && hours < 24 ) {
        hello = "Good Evening";
    }

    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `${hello}, ${text}`;
}

function loadname(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    }else{
        paintGreeting(currentUser);
    }
}
function init() {
    loadname();
}

init();




// querySelector : 아무거나 제일 먼저 찾는 그것을 가져옴 class 이름, tag 이름 등등... 
// querySelectorAll : 그냥 다 가져옴  -> array에 다 집어넣음
// getElementbyID, getElementbytag : ID, tag 이름으로 가져옴, body, div 등등