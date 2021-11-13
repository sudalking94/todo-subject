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


function tagDeleteInCreatePage(id){    
    // todo 생성페이지에서 tag 삭제
    
    const tagColor = document.getElementById(`hidden-${id}`).value;    
    const tagName = document.getElementById(`input-${id}`).value;    

    const xhr = new XMLHttpRequest();
        xhr.open('PUT',`/delete-tag/`)        
        const csrftoken = getCookie('csrftoken');
        xhr.setRequestHeader('X-CSRFToken', csrftoken);
        
        const data = {"tag": tagName,"tag_color":tagColor};
        xhr.send(JSON.stringify(data));
        xhr.onload = function() {
            if (xhr.status == 200){
                window.location.href = '/create/';
            }else {
                alert("error");
            }
        };
    

}

function tagEditInCreatePage(id){
    //수정 클릭전
    const iconContainer = document.getElementById(`div-${id}`);
    const spanTag = document.getElementById(`span-${id}`);
    
    //수정 클릭후
    const updateColor = document.getElementById(`update-color-${id}`);
    const btnContainer = document.getElementById(`btn-${id}`);
    const inputTag = document.getElementById(`input-${id}`);
    const btnCancel = document.getElementById(`btn-cancel-${id}`);
    const btnEdit = document.getElementById(`btn-edit-${id}`);
    
    //최초 데이터
    const initTagName = inputTag.value;

    const initTagColor = document.getElementById(`hidden-${id}`).value;
    updateColor.value = initTagColor;
    
    
    
    updateColor.classList.remove('hidden');
    iconContainer.classList.add('hidden');
    spanTag.classList.add('hidden');
    btnContainer.classList.remove('hidden');
    inputTag.focus();


    btnEdit.addEventListener('click',function(){
        const tagName = inputTag.value;    
        const tagColor = updateColor.value;                  

        const xhr = new XMLHttpRequest();
        xhr.open('PUT',`/edit-tag/`);        
        const csrftoken = getCookie('csrftoken');
        xhr.setRequestHeader('X-CSRFToken', csrftoken);
        
        const data = {"initTagName": initTagName,"initTagColor":initTagColor,"tagName":tagName,"tagColor":tagColor};
        xhr.send(JSON.stringify(data));
        xhr.onload = function() {
            if (xhr.status == 200){
                window.location.href = '/create/';
            }else {
                alert("error");
            }
        };
    });

    btnCancel.addEventListener('click',function(){
        //취소 클릭시
        inputTag.value = initTagName;        
        updateColor.classList.add('hidden');
        iconContainer.classList.remove('hidden');
        spanTag.classList.remove('hidden');
        btnContainer.classList.add('hidden');
    });
}