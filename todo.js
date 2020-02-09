const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDoS';

let toDos = [];


function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const claenToDos = toDos.filter(function(toDo){ //return 조건을 만족하는 인덱스를 제외시키는 함수
        return toDo.id !== parseInt(li.id);
    });
    toDos = claenToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));  // HTML은 모든 것을 string으로 저장하려고 한다. 그래서 javascript의 object 안의 값을 JSON을 통해 string으로 바꿔준다.
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const newId = toDos.length + 1 ;
    const span = document.createElement("span");
    delBtn.innerHTML = "X"
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id : newId
    };
    toDos.push(toDoObj);    //toDoobj 를 toDos array에 집어넣고, 이 때 id를 toDos array의 크기 +1로 정해서 toDoobj를 넣을 때마다 id를 넣은 횟수로 지정해서 넣은 순서대로 id를 지정해준다.
    saveToDos();
}


function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}


function loadToDos (){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos); // JSON 통해 spring을 object로 변환
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });      // forEach는 각 인덱스마다 어떤 행위를 다 해라고 지시함. 안에 함수를 만들 수 있어서 이렇게 각 인데스별로 함수를 수행시킬 수 있다. 미친... 
        
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init ();

////시계 모듈 외에 달 신호를 가져와서 (getmonth()) 달마다 배경 url을 바꾸자. 아니면 사진을 미리 다운받아서 그 주소를 바꾸거나 그래서 달마다 사진들이 달라지게 만들고, 문구도 바꾸자. "Enjoy spring days", "Keep warm with cold weather" etc... 나는 css보다 기능으로 승부하겠다. 