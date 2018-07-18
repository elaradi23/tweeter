$(document).ready(function() {

  const maxChar = 140;
  const textArea = $('#new-tweet');

  textArea.on('input', findCharsLeft);

  function findCharsLeft(){
    // Why not use siblings?
    const counter = $(this).siblings('.counter');
    // let textCount = this.value.length;
    let textCount = $(this).val().length;
    let charLeft = maxChar - textCount;

    if(charLeft < 0){
      counter.text(charLeft).css('color', 'red');
    } else {
      counter.text(charLeft).css('color', '');
    }
  }
});