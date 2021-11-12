function tagChoice(id) {    
    const tagColor = document.getElementById(`hidden-${id}`);
    const inputColor = document.getElementById('input-color');
    const inputTag= document.getElementById('input-tag');
        
    inputTag.value = id;
    inputColor.value= tagColor.value  == 'None' ?  '#FFFFFF' : tagColor.value ;
}