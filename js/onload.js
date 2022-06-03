let korisnik = JSON.parse(localStorage.getItem('user'));

function replaceSignInButton(){
    korisnik = JSON.parse(localStorage.getItem('user'));
    let open = document.getElementById('open');
    open.style.display = "none";
    let ul = document.getElementById('ul-navbar-right');
    // ul.innerHTML = `<li>Hi,${korisnik.korisnickoIme}</li>`;
    let li = document.createElement('li');
    li.setAttribute('id', 'close');
    let a = document.createElement('a');
    a.innerHTML = "Odjavite se, " + korisnik.korisnickoIme;
    a.style.cursor = "pointer";
    li.appendChild(a);
    ul.appendChild(li);
    
    a.addEventListener('click', function(){
        localStorage.removeItem('user');
        let close = document.getElementById('close');
        close.style.display = "none";
        open.style.display = "block";
        alert("Uspesno ste se izlogovali")
    })

}
if(korisnik != null){
    replaceSignInButton()
}