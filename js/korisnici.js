let korisniciURL = "https://web-dizajn---projekat-default-rtdb.europe-west1.firebasedatabase.app/korisnici.json";

let tbody = document.getElementById('tbody');

let request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
        let korisnici = JSON.parse(this.responseText);

        for (let key in korisnici) {
            let korisnik = korisnici[key];
            makeRow(korisnik, key);
        }

    } else {
      alert("Greska: " + this.status);
    }
  }
};
request.open("GET", korisniciURL);
request.send();

function makeRow(korisnik, key){

    let tr = document.createElement('tr');

    let th1 = document.createElement('th');
    th1.innerHTML = korisnik.korisnickoIme;

    let th2 = document.createElement('th');
    th2.innerHTML = korisnik.email;

    let th3 = document.createElement('th');
    th3.innerHTML = korisnik.ime;

    let th4 = document.createElement('th');
    th4.innerHTML = korisnik.prezime;

    let th5 = document.createElement('th');
    let a1 = document.createElement('a');
    let i = document.createElement('i');
    i.classList.add("fa", "fa-trash");
    i.setAttribute('aria-hidden', true);
    a1.setAttribute('href', "")
    th5.appendChild(a1);
    a1.appendChild(i);
    
    let th6 = document.createElement('th');
    let a2 = document.createElement('a');
    
    const url = new URL(window.location.href.split('/korisnici.html')[0] + '/izmena_korisnika.html');
    url.searchParams.set("id", key);
    a2.setAttribute('href', url);
    
    let img = document.createElement("img");
    img.setAttribute('src', "Images/user.png");
    th6.appendChild(a2);
    a2.appendChild(img);

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    tr.appendChild(th6);
    tbody.appendChild(tr);

}