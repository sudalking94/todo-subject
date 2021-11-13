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

function httprequestHandler(id,toggleValue){
    //todo 완료 여부 request

    const xhr = new XMLHttpRequest();
    xhr.open('PUT',`/edit/`)        
    const csrftoken = getCookie('csrftoken');
    xhr.setRequestHeader('X-CSRFToken', csrftoken);
    
    const data = {"toggleValue": toggleValue, pk:id};
    xhr.send(JSON.stringify(data));
    xhr.onload = function() {
        if (xhr.status == 200){
            window.location.href = '/';
        }else {
            alert("error");
        }
    };
}

function checkToggleHandler(id){    
    const toggleValue = document.getElementById(`${id}-hidden`).value;
    httprequestHandler(id,toggleValue);
}

function unCheckToggleHandler(id){    
    const unchedckedToggle = document.getElementById(`${id}-hidden`).value;
    httprequestHandler(id,unchedckedToggle);
}