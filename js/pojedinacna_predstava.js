let predstaveURL = "https://web-dizajn---projekat-default-rtdb.europe-west1.firebasedatabase.app/predstave.json";

let picture = document.getElementById('picture');
let title = document.getElementById('title');
let code = document.getElementById('code');
let duration = document.getElementById('duration');
let genre = document.getElementById('genre');
let price = document.getElementById('price');
let max_people = document.getElementById('max_people');
let avg_mark = document.getElementById('avg_mark');
let description = document.getElementById('description');
let link = document.getElementById('link');
let delete_link = document.getElementById('delete-link');

const url = new URL(window.location.href);
const id = url.href.split("id=")[1].split("&")[0];
const parentId = url.href.split("id=")[1].split("&")[1].split("Id=")[1];

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
    
    let span1 = document.createElement('span');
    span1.innerHTML = predstava.kod;
    code.appendChild(span1);

    let span2 = document.createElement('span');
    span2.innerHTML = predstava.trajanje + "min";
    duration.appendChild(span2);

    let span3 = document.createElement('span');
    span3.innerHTML = predstava.zanr;
    genre.appendChild(span3);

    let span4 = document.createElement('span');
    span4.innerHTML = predstava.maxOsobe;
    max_people.appendChild(span4);

    let span5 = document.createElement('span');
    span5.innerHTML = predstava.cena;
    price.appendChild(span5);

    let span6 = document.createElement('span');
    span6.innerHTML = predstava.ocena;
    avg_mark.appendChild(span6);

    let span7 = document.createElement('span');
    span7.innerHTML = predstava.opis;
    description.appendChild(span7);

    const url = new URL(window.location.href.split('/pojedinacna_predstava.html')[0] + '/izmena_predstave.html');
    url.searchParams.set("id", id);
    url.searchParams.set("parentId", parentId);

    link.setAttribute('href', url);
}

delete_link.addEventListener('click', function(e){
    

    let confirm_dialog = confirm("Da li ste sigurni da zelite da obrisete korisnika?");
    if (confirm_dialog){
		let predstavaURL = predstaveURL.split(".json")[0] + "/" + parentId + "/" + id + ".json";
    	
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            window.location.href = "predstave.html?id=" + parentId ;
    
          } else {
          alert("Greska: " + this.status);
          }
        }
        };
        request.open("DELETE", predstavaURL);
        request.send();
    }
});
