function tagChoice(span) {   
    // todo 생성페이지에서 tag 선택시 tag-nmae, tag-color 값 settting

    const id = span.id.substring(5);
    const name = span.textContent;        
    const tagColor = document.getElementById(`hidden-${id}`);    
    const inputColor = document.getElementById('input-color');
    const inputTag= document.getElementById('input-tag');
        
    inputTag.value = name;
    inputColor.value= tagColor.value  == 'None' ?  '#FFFFFF' : tagColor.value ;
}