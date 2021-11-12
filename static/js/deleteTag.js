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

function deleteTag(id) {
    console.log(id);
    const xhr = new XMLHttpRequest();
    xhr.open('PUT',`/edit/`)        
    const csrftoken = getCookie('csrftoken');
    xhr.setRequestHeader('X-CSRFToken', csrftoken);
    
    const data = { pk:id };
    xhr.send(JSON.stringify(data));
    xhr.onload = function() {
        if (xhr.status == 200){
            window.location.href = '/';
        }else {
            alert("error");
        }
    };
}