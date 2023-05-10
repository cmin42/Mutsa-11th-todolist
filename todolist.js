const todoFrm = document.getElementById("input_frm");
const todoText = document.getElementById("input_text");
const todoList = document.getElementById("work_list");

// 로컬에 저장된 할일 불러오기
function loadWorks() {
  let works = JSON.parse(localStorage.getItem('works')) || [];
  works = works.filter(work => work.text !== undefined);

  works.forEach(work => {
    appendWork(work.text, work.checked);
  });
}

// 로컬에 할일 저장하기
function saveWorks(works) {
  localStorage.setItem('works', JSON.stringify(works));
}

// 투두리스트 입력
function handleSubmit(event) {
	event.preventDefault();  // 제출해도 새로고침 되지 않도록
	const newWork = todoText.value.trim();
  if (newWork === '') {
    return;
  }
	todoText.value = "";  // 입력창 초기화
	appendWork(newWork);

  // 입력한 할일을 로컬에 저장
  const works = JSON.parse(localStorage.getItem('works')) || [];
  works.push({text: newWork, checked: false});
  saveWorks(works);
}

// 투두리스트 저장
function appendWork(newWork, isChecked) {
	const list = document.createElement("li") ;
	const text = document.createElement("span");
    
  // 입력받은 내용을 텍스트에 넣기
	text.innerText = newWork;

  // 체크박스 구현
  const checkbox = document.createElement('input')
  checkbox.type='checkbox'
  checkbox.checked = isChecked;  // 체크 여부를 bool로 저장
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

  // 이미 완료된 할일이라면 완료 표시와 함께 불러오기
  if (isChecked) {
    text.style.textDecoration = 'line-through';
    text.style.color = "gray";
    text.style.fontStyle = "italic";
  }

  // list를 ul 태그에 넣기
	todoList.appendChild(list);		
}

// 할일 삭제 기능 구현
function deleteWork(event) {
	const delWork = event.target.parentElement;
	delWork.remove();

  // 로컬에 저장된 할일도 삭제
  const works = JSON.parse(localStorage.getItem('works')) || [];
  const text = delWork.querySelector('span').innerText;
  const index = works.findIndex(work => work.text === text);
  if (index !== -1) {
    works.splice(index, 1);
    saveWorks(works);
  }

  // 삭제된 상태를 로컬에 저장
  localStorage.setItem('works', JSON.stringify(works));
}

// 할일 완료 기능 구현
function checkWork(event) {
    const target = event.target;
    const text = target.nextSibling;
  
    // 완료시 취소선, 회색, 이탤릭체로 표시
    if (target.checked) {
      text.style.textDecoration = 'line-through';
      text.style.color = "gray";
      text.style.fontStyle = "italic";
    } else {
        text.style.textDecoration = "";
        text.style.color = "";
        text.style.fontStyle = "";
    }

    // 완료된 상태를 로컬에 저장
    const works = JSON.parse(localStorage.getItem('works')) || [];
    const index = works.findIndex(work => work.text === text.innerText);
    if (index !== -1) {
      works[index].checked = target.checked;
      saveWorks(works);
    }
}

// 투두리스트 시작하기
function init() {
  todoFrm.addEventListener("submit", handleSubmit);
  loadWorks();
}

init();