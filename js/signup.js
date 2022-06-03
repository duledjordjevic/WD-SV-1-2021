korisniciURL = "https://web-dizajn---projekat-default-rtdb.europe-west1.firebasedatabase.app/korisnici.json";
let email = document.getElementById("email");
let passwordSignUp = document.getElementById("passwordSignUp");
let username = document.getElementById('username');
let name = document.getElementById('name');
let lastname = document.getElementById('lastname');
let birthday = document.getElementById('birthday');
let address = document.getElementById('address');
let phone = document.getElementById('phone');
let regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
var regexPsw = /^[A-Za-z]\w{7,14}$/;
var regexPhone = /[a-zA-Z]/g;
let btnSignUp = document.getElementById('btnSignUp');

btnSignUp.addEventListener('click', function(e){
    e.preventDefault();

    let korisnik = {}
    korisnik.adresa = address.value.trim();
    korisnik.datumRodjenja = birthday.value.trim();
    korisnik.email = email.value.trim();
    korisnik.ime = name.value.trim();
    korisnik.korisnickoIme = username.value.trim();
    korisnik.lozinka = passwordSignUp.value.trim();
    korisnik.prezime = lastname.value.trim();
    korisnik.telefon = phone.value.trim();


    if(korisnik.adresa == "" || korisnik.datumRodjenja == "" || korisnik.email == "" || korisnik.ime == "" || korisnik.korisnickoIme == "" || korisnik.lozinka == "" || korisnik.prezime == "" || korisnik.telefon == "" ){
        alert("Morate uneti sve podatke")
    }else if(korisnik.adresa.length  < 5){
        alert("Polje adresa mora imati najmanje 5 karaktera")
    }else if(! regexEmail.test(korisnik.email) ){
        alert("Email mora biti u validnom formatu")
    }else if(korisnik.ime.length < 3 || /[0-9]/.test(korisnik.ime)){
        alert("Ime mora biti najmanje duzine 2 i ne sme sadrzati brojeve.")
    }else if(korisnik.korisnickoIme.length < 5 ){
        alert("Korisnicko ime mora biti najmanje duzine 5")
    }else if(! regexPsw.test(korisnik.lozinka)){
        alert("Lozinka mora biti najmanje duzine 7 i mora sadrzati brojeve.")
    }
    else if(korisnik.prezime.length < 3 || /[0-9]/.test(korisnik.prezime)){
        alert("Prezime mora biti najmanje duzine 2 i ne sme sadrzati brojeve.")
    }
    else if(korisnik.telefon.length < 9 ||  regexPhone.test(korisnik.telefon)){
        alert("Telefon mora sadrzati najmanje 9 karaktera bez slova")
    }else{
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    let korisnici = JSON.parse(this.responseText);
                    let tf = false;
                    for (let key in korisnici) {
                        let korisnik1 = korisnici[key];
                        if (korisnik1.email == email.value.trim()){
                            tf = true;
                            break
                        }
                    }
                    if (tf){
                        email.setAttribute('value', "");
                        alert("Korisnik sa ovakvom adresom vec postoji. Pokusajte neku drugu email adresu.")
                    }else{
                        postUser(korisnik)
                    }

                } else {
                alert("Greska: " + this.status);
                }
            }
            };
        request.open("GET", korisniciURL);
        request.send();
        
    }
    
})
function postUser(korisnik){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                alert("Uspesno ste se registrovali")
                closeSignUp.click();
                localStorage.setItem('user', JSON.stringify(korisnik));
                replaceSignInButton();
            } else {
            alert("Greska: " + this.status);
            }
        }
        };
    request.open("POST", korisniciURL);
    request.send(JSON.stringify(korisnik));
    
}