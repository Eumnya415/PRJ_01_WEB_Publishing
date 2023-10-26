/*
웹 페이지에서 텍스트를 동적으로 쓰고 지우는 효과, 
스크롤 시 헤더에 클래스를 추가하는 효과, 
그리고 요소 간 부드러운 스크롤 기능을 구현하는 JavaScript 코드임.
*/

/* text_iife.js */
// 텍스트 작성과 삭제 즉시 실행 함수
// 이 코드 블록은 익명 함수 (IIFE)로 감싸져 있으며, 페이지가 로드될 때 실행됨
(function(){
  // 'main h2 span' 요소를 선택하고 spanEl에 할당
  const spanEl = document.querySelector("main h2 span");
  
  // 텍스트 배열을 선언하고 초기 텍스트를 설정
  const txtArr = ['grow a little bit every day.', 'grow more today than yesterday.', 'grow up tomorrow.',];
  
  // 인덱스와 현재 텍스트를 추적하는 변수를 초기화
  let index = 0;
  let currentTxt = txtArr[index].split("");

  // 텍스트를 화면에 쓰는 함수를 정의
  function writeTxt(){

    // span 요소에 한 글자를 추가
    spanEl.textContent  += currentTxt.shift(); 
    
    // currentTxt 배열이 빈 배열이 아닌 경우, 일정한 시간 후에 다음 글자를 추가
    if(currentTxt.length !== 0){ 
      setTimeout(writeTxt, Math.floor(Math.random() * 100));
    }else{
      // 모든 글자를 쓴 후에는 텍스트를 삭제하는 함수를 호출
      currentTxt = spanEl.textContent.split("");
      setTimeout(deleteTxt, 3000);
    }
  }

  // 텍스트를 삭제하는 함수를 정의
  function deleteTxt(){
    currentTxt.pop();
    spanEl.textContent = currentTxt.join("");
    
    // currentTxt 배열이 빈 배열이 아닌 경우, 일정한 시간 후에 다음 글자를 삭제
    if(currentTxt.length !== 0){
      setTimeout(deleteTxt, Math.floor(Math.random() * 100))
    }else{
      // 모든 글자를 삭제한 후에는 다음 인덱스의 텍스트를 쓰는 함수를 호출
      index = (index + 1) % txtArr.length;
      currentTxt = txtArr[index].split("");
      writeTxt();
    }
  }


  writeTxt();   // 초기에 텍스트를 쓰는 함수를 호출하여 시작
})();

/* scroll_request.js */
/* 수직 스크롤이 발생하면 header 태그에 active 클래스 추가 및 삭제 */
// 'header' 요소를 선택하고 headerEl에 할당
const headerEl = document.querySelector("header");

// 스크롤 이벤트를 감지하는 리스너를 추가
window.addEventListener('scroll', function(){
  // 스크롤 이벤트가 발생할 때마다 scrollCheck 함수를 호출
  requestAnimationFrame(scrollCheck);
});

// 스크롤을 검사하는 함수를 정의
function scrollCheck(){
  // 현재 페이지의 스크롤 위치를 가져옴
  let browserScrollY = window.scrollY ? window.scrollY : window.pageYOffset;
  
  // 스크롤 위치가 0보다 크면 'header' 요소에 'active' 클래스를 추가하고 그렇지 않으면 제거
  if(browserScrollY > 0){
    headerEl.classList.add("active");
  }else{
    headerEl.classList.remove("active");
  }
}
/* end scroll_request.js */


/* move.js */
/* 애니메이션 스크롤 이동 */
// 요소를 부드럽게 스크롤하는 함수를 정의
const animationMove = function(selector){
  // ① selector 매개변로 이동할 대상 요소 노드 가져오기
  const targetEl = document.querySelector(selector);
  // ② 현재 브라우저의 스크롤 정보(y 값)
  const browserScrollY = window.pageYOffset;
  // ③ 이동할 대상의 위치(y 값)
  const targetScorllY = targetEl.getBoundingClientRect().top + browserScrollY;
  // ④ 스크롤 이동
  window.scrollTo({ top: targetScorllY, behavior: 'smooth' });
};
// 스크롤 이벤트 연결하기
const scollMoveEl = document.querySelectorAll("[data-animation-scroll='true']");

// 모든 선택한 요소에 클릭 이벤트 리스너를 추가
for(let i = 0; i < scollMoveEl.length; i++){
  scollMoveEl[i].addEventListener('click', function(e){

// 클릭한 요소의 'data-target' 속성을 가져와서 해당 요소로 스크롤하는 함수를 호출
    const target = this.dataset.target;
    animationMove(target);
  });
}
/* End move.js */
