function tagChoice(id) {   
    const name = id.substring(5)
    
    const tagColor = document.getElementById(`hidden-${name}`);
    const inputColor = document.getElementById('input-color');
    const inputTag= document.getElementById('input-tag');
        
    inputTag.value = name;
    inputColor.value= tagColor.value  == 'None' ?  '#FFFFFF' : tagColor.value ;
}