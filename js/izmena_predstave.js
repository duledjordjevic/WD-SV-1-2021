let predstaveURL = "https://web-dizajn---projekat-default-rtdb.europe-west1.firebasedatabase.app/predstave.json";

let picture = document.getElementById('picture');
let title = document.getElementById('title');
let code = document.getElementById('id');
let duration = document.getElementById('duration');
let genre = document.getElementById('genre');
let price = document.getElementById('price');
let numberOfViewers = document.getElementById('numberOfViewers');
let description = document.getElementById('description');


const url = new URL(window.location.href);
const id = url.href.split("id=")[1];

let request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
        let predstave = JSON.parse(this.responseText);

        for (let key1 in predstave) {
            for (let key2 in predstave[key1]){
                if (key2 == id){
                    let predstava = predstave[key1][key2]
                    makeDescription(predstava)
                }
            }
        }

    } else {
      alert("Greska: " + this.status);
    }
  }
};
request.open("GET", predstaveURL);
request.send();

function makeDescription(predstava){
    picture.setAttribute('src', predstava.slika);
    title.innerHTML = predstava.naziv;
    
    code.setAttribute('value', predstava.kod);
    duration.setAttribute('value', predstava.trajanje);
    genre.setAttribute('value', predstava.zanr);
    price.setAttribute('value', predstava.cena);
    numberOfViewers.setAttribute('value', predstava.maxOsobe);
    description.innerHTML = predstava.opis;
    
}