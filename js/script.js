var open = document.getElementById('open');
var modal_container = document.getElementById('modal-container');
var modal_container2 = document.getElementById('modal-container-2');
var closeSignIn = document.getElementById('closeSignIn');
var closeSignUp = document.getElementById('closeSignUp');
var moveToSignUp = document.getElementById('moveToSignUp');
var moveToSignIn = document.getElementById('moveToSignIn');

open.addEventListener('click', () => {
    modal_container.classList.add('show')
});

closeSignIn.addEventListener('click', () => {
    modal_container.classList.remove('show')
});
moveToSignUp.addEventListener('click', () => {
    modal_container.classList.remove('show')
    modal_container2.classList.add('show')
});
moveToSignIn.addEventListener('click', () => {
    modal_container2.classList.remove('show')
    modal_container.classList.add('show')
});
closeSignUp.addEventListener('click', () => {
    modal_container2.classList.remove('show')
});