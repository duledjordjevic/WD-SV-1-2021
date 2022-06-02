let korisniciURL = "https://web-dizajn---projekat-default-rtdb.europe-west1.firebasedatabase.app/korisnici.json";

let username_title = document.getElementById('username-title');
let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let name = document.getElementById('name');
let lastname = document.getElementById('lastname');
let birthday = document.getElementById('birthday');
let address = document.getElementById('address');
let phone = document.getElementById('phone');
let btn = document.getElementById('btn');

const url = new URL(window.location.href);
const id = url.href.split("id=")[1];

let request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
        let korisnici = JSON.parse(this.responseText);

        for (let key in korisnici) {
            if (key == id){
                let korisnik = korisnici[key];
                changeInputs(korisnik, key);
            }
        }

    } else {
      alert("Greska: " + this.status);
    }
  }
};
request.open("GET", korisniciURL);
request.send();

function changeInputs(korisnik, key){
    username_title.innerHTML = korisnik.korisnickoIme;

    username.setAttribute('value', korisnik.korisnickoIme);
    email.setAttribute('value', korisnik.email);
    password.setAttribute('value', korisnik.lozinka);
    name.setAttribute('value', korisnik.ime);
    lastname.setAttribute('value', korisnik.prezime);
    birthday.setAttribute('value', korisnik.datumRodjenja);
    address.setAttribute('value', korisnik.adresa);
    phone.setAttribute('value', korisnik.telefon);
    
}


let korisnikURL = "https://web-dizajn---projekat-default-rtdb.europe-west1.firebasedatabase.app/korisnici/" + id + ".json";
let regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
let usernameRegex = /^[a-zA-Z0-9]+$/;
var regexPsw = /^[A-Za-z]\w{7,14}$/;
var regexPhone = /[a-zA-Z]/g;

btn.addEventListener('click', function(e){
    e.preventDefault();

    let korisnik = {};
    korisnik.adresa = address.value.trim();
    korisnik.datumRodjenja = birthday.value.trim();
    korisnik.email = email.value.trim();
    korisnik.ime = name.value.trim();
    korisnik.korisnickoIme = username.value.trim();
    korisnik.lozinka = password.value.trim();
    korisnik.prezime = lastname.value.trim();
    korisnik.telefon = phone.value.trim();
    
    if (korisnik.adresa == "" || korisnik.datumRodjenja == "" || korisnik.email == "" || korisnik.ime == "" || korisnik.korisnickoIme == "" || korisnik.lozinka == "" || korisnik.prezime == "" || korisnik.telefon == ""){
        alert("Sva polja moraju biti popunjena")

    }else if(korisnik.korisnickoIme.length < 5 || !usernameRegex.test(korisnik.korisnickoIme)){
        alert("Username mora biti najmanje duzine 5 i ne moze sadrzati simbole")

    }else if(! regexEmail.test(korisnik.email)){
        alert("Molim vas da unesete ispravan email.")

    }else if(regexPsw.test(korisnik.lozinka)){
        alert("Lozinka mora biti najmanje duzine 7 i mora sadrzati brojeve.")
    }
    else if(korisnik.ime.length < 3 || /[0-9]/.test(korisnik.ime)){
        alert("Ime mora biti najmanje duzine 2 i ne sme sadrzati brojeve.")
    }
    else if(korisnik.prezime.length < 3 || /[0-9]/.test(korisnik.prezime)){
        alert("Prezime mora biti najmanje duzine 2 i ne sme sadrzati brojeve.")
    }else if(korisnik.adresa < 5){
        alert("Adresa mora sadrzati najmanje 5 karaktera")
    }
    else if(korisnik.telefon < 9 ||  regexPhone.test(korisnik.telefon)){
        alert("Telefon mora sadrzati najmanje 9 karaktera bez slova")
    }else{
        let request = new XMLHttpRequest();
        request.onreadystatechange = function (e) {
            e.preventDefault();
            if (this.readyState == 4) {
                if (this.status == 200) {
                    window.location.href = "korisnici.html";
                    alert("Uspesno ste izmenili podatke")
                } else {
                alert("Greska: " + this.status);
                }
            }
        };
        request.open("PUT", korisnikURL);
        request.send(JSON.stringify(korisnik));
    }

    
});