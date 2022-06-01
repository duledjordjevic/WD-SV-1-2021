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