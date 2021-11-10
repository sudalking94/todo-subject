function getCookie(name){
    //csrf token 생성
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function editContent(id) {
    // 내용 수정
    const textarea = document.getElementById(`${id}-content-textarea`);
    const initData = textarea.value;    
    const icon = document.getElementById(`${id}-content-icon`);    
    const btn = document.getElementById(`${id}-content-btn`);
    const cancel = document.getElementById(`${id}-content-cancel`);

    textarea.classList.remove("hidden");
    icon.classList.add("hidden");
    btn.classList.remove("hidden");
    cancel.classList.remove("hidden");

    function clickHandler(){
        cancel.classList.add("hidden");
        btn.classList.add("hidden");
        icon.classList.remove("hidden");
        textarea.classList.add("hidden");
    }

    btn.addEventListener("click",function(){
        // 수정 클릭시 수정된 데이터 장고 서버로 전송
        const xhr = new XMLHttpRequest();
        xhr.open('PUT',`/edit/`);
        
        const csrftoken = getCookie('csrftoken');
        
        xhr.setRequestHeader('X-CSRFToken', csrftoken);
        
        const data = {"content": textarea.value, pk:id};
        xhr.send(JSON.stringify(data));

        xhr.onload = function() {
            if (xhr.status == 200){
                window.location.href = '/';
            }else{
                alert("error");
            }
            
          };
        
        clickHandler();
    })
    

    cancel.addEventListener('click',function(){
        // 취소 클릭시
        clickHandler();
        textarea.value = initData;
    })
}
