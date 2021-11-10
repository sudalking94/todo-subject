function editTag(id) {
    
    const tag = document.getElementById(`${id}-tag`);
    const btn = document.getElementById(`${id}-tag-btn`);
    const icon = document.getElementById(`${id}-tag-icon`);
    btn.classList.remove("hidden");
    icon.classList.add("hidden");
    tag.disabled = false;
    tag.focus();


    btn.addEventListener('click', function(e){
        const xhr = new XMLHttpRequest();
        xhr.open('PUT',`/edit/`)
        xhr.setRequestHeader('Content-type', 'application/json');
        
        const data = {"tag": tag.value, pk:id};
        xhr.send(JSON.stringify(data));
        
        icon.classList.remove("hidden");
        btn.classList.add("hidden");
        tag.disabled = true;
    })
}

function editContent(id) {
    const tag = document.getElementById(`${id}-content`);
    tag.disabled = false;
    tag.focus();
}

