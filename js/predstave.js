let predstaveURL = "https://web-dizajn---projekat-default-rtdb.europe-west1.firebasedatabase.app/predstave.json";

let section_1 = document.getElementById('section-1');
let section_1_container = document.getElementById("section-1-container");

const url = new URL(window.location.href);
const id = url.href.split("id=")[1];

let request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
        let predstave = JSON.parse(this.responseText);

        for (let key1 in predstave) {
            for (let key2 in predstave[key1]){
                if (key1 == id){
                    let predstava = predstave[key1][key2]
                    makeCard(predstava, key2);
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

function makeCard(predstava, key) {
    let card = document.createElement('div');
    card.classList.add('card');

    let img = document.createElement('img');
    img.setAttribute('src', predstava.slika);

    const url = new URL(window.location.href.split('/predstave.html')[0] + '/pojedinacna_predstava.html');
    url.searchParams.set("id", key);
    
    let a = document.createElement('a');
    a.innerHTML = predstava.naziv;
    a.setAttribute('href', url );

    card.appendChild(img);
    card.appendChild(a);
    section_1_container.appendChild(card);
            
}