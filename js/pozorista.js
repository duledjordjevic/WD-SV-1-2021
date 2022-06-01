let pozoristaURL = "https://web-dizajn---projekat-default-rtdb.europe-west1.firebasedatabase.app/pozorista.json";

let section_1 = document.getElementById('section-1');
let section_1_container = document.getElementById("section-1-container");

let request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
        let pozorista = JSON.parse(this.responseText);

        for (let key in pozorista) {
            let pozoriste = pozorista[key];
            makeCard(pozoriste);
        }

    } else {
      alert("Greska: " + this.status);
    }
  }
};
request.open("GET", pozoristaURL);
request.send();

function makeCard(pozoriste) {
    let card = document.createElement('div');
    card.classList.add('card');

    let img = document.createElement('img');
    img.setAttribute('src', pozoriste.slika);

    const url = new URL(window.location.href.split('/index.html')[0] + '/predstave.html');
    url.searchParams.set("id", pozoriste.idPredstava)
    
    let a = document.createElement('a');
    a.innerHTML = pozoriste.naziv;
    a.setAttribute('href', url );

    card.appendChild(img);
    card.appendChild(a);
    section_1_container.appendChild(card);
            
}