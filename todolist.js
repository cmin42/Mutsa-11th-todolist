const todoFrm = document.getElementById("input_frm");
const todoText = document.getElementById("input_text");
const todoList = document.getElementById("work_list");
 
function handleSubmit(event) {
	event.preventDefault();  // 제출해도 새로고침 되지 않도록
	const newWork = todoText.value;
	todoText.value = "";  // 입력창 초기화
	appendWork(newWork);
}

function appendWork(newWork) {
	const list = document.createElement("li") ;
	const text = document.createElement("span");
    
    // 입력받은 내용을 텍스트에 넣기
	text.innerText = newWork;

    // 체크박스 구현
    const checkbox = document.createElement('input')
    checkbox.type='checkbox'
    checkbox.classList.add('checkbox');  // 클래스 동적 할당
    checkbox.addEventListener('change', checkWork);

    // 삭제버튼 구현
	const button = document.createElement("button");
	button.innerText = "x";
    button.classList.add('delete_btn');  // 클래스 동적 할당
	button.addEventListener("click", deleteWork);

    // 체크박스, 텍스트, 삭제버튼 li 태그에 넣기
    list.appendChild(checkbox);
	list.appendChild(text);
	list.appendChild(button);

    // list를 ul 태그에 넣기
	todoList.appendChild(list);		
}

// 할일 삭제 기능 구현
function deleteWork(event) {
	const delWork = event.target.parentElement;
	delWork.remove();
}

// 할일 완료 기능 구현
function checkWork(event) {
    const target = event.target;
    const text = target.nextSibling;
  
    if (target.checked) { // 완료시 취소선, 회색, 이탤릭체
      text.style.textDecoration = 'line-through';
      text.style.color = "gray";
      text.style.fontStyle = "italic";
    } else {
        text.style.textDecoration = "";
        text.style.color = "";
        text.style.fontStyle = "";
    }
}

todoFrm.addEventListener("submit", handleSubmit);