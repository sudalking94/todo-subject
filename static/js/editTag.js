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

function editTag(id) {    
    // 메인페이지 태그 수정 스크립트
    const tagColorDiv = document.getElementById(`${id}-tag-color`);
    const tagColor = tagColorDiv.firstElementChild;
    const initTagColor = tagColorDiv.firstElementChild.value;        
    const tag = document.getElementById(`${id}-tag`);
    const initData = tag.value;
    const btn = document.getElementById(`${id}-tag-btn`);
    const cancel = document.getElementById(`${id}-tag-cancel`);
    const icon = document.getElementById(`${id}-tag-icon`);
    const deleteIcon = document.getElementById(`${id}-tag-delete`);

    tagColorDiv.classList.remove('hidden');
    btn.classList.remove("hidden");
    cancel.classList.remove("hidden");
    icon.classList.add("hidden");
    if (deleteIcon){
        deleteIcon.classList.add("hidden");
    }
    tag.disabled = false;
    tag.focus();

    function clickHandler(){
        // 취소 및 수정 클릭시 기본 값으로 전환
        icon.classList.remove("hidden");
        if (deleteIcon){
            deleteIcon.classList.remove("hidden");
        }
        btn.classList.add("hidden");
        tagColorDiv.classList.add("hidden");
        cancel.classList.add("hidden");
        tag.disabled = true;
    }

    btn.addEventListener('click', function(){
        // 수정 클릭시 수정된 데이터 장고 서버로 전송
        const xhr = new XMLHttpRequest();
        xhr.open('PUT',`/edit/`)        
        const csrftoken = getCookie('csrftoken');
        xhr.setRequestHeader('X-CSRFToken', csrftoken);
        
        const data = {"tag": tag.value, pk:id, "tag_color":tagColor.value};
        xhr.send(JSON.stringify(data));
        xhr.onload = function() {
            if (xhr.status == 200){
                window.location.href = '/';
            }else {
                alert("error");
            }
        };
        
        clickHandler();
    })

    cancel.addEventListener('click',function(){
        // 취소 클릭시
        clickHandler();
        tag.value = initData;        
        tagColor.value = initTagColor;
    })
}


function tagDeleteInCreatePage(name){
    const color = document.getElementById(`hidden-${name}`).value;    
    const xhr = new XMLHttpRequest();
        xhr.open('PUT',`/delete-tag/`)        
        const csrftoken = getCookie('csrftoken');
        xhr.setRequestHeader('X-CSRFToken', csrftoken);
        
        const data = {"tag": name,"tag_color":color};
        xhr.send(JSON.stringify(data));
        xhr.onload = function() {
            if (xhr.status == 200){
                window.location.href = '/create/';
            }else {
                alert("error");
            }
        };
    

}