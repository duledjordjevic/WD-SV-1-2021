let predstaveURL = "https://web-dizajn---projekat-default-rtdb.europe-west1.firebasedatabase.app/predstave.json";

let picture = document.getElementById('picture');
let title = document.getElementById('title');
let code = document.getElementById('id');
let duration = document.getElementById('duration');
let genre = document.getElementById('genre');
let price = document.getElementById('price');
let numberOfViewers = document.getElementById('numberOfViewers');
let shortDescription = document.getElementById('shortDescription');
let description = document.getElementById('description');
let inputImage = document.getElementById('inputImage');
let avg_mark = document.getElementById('avg_mark');
let marks = document.getElementById('marks');
let comments = document.getElementById('comments');
let reply = document.getElementById('reply');

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
    
    code.setAttribute('value', predstava.kod);
    duration.setAttribute('value', predstava.trajanje);
    genre.setAttribute('value', predstava.zanr);
    price.setAttribute('value', predstava.cena);
    numberOfViewers.setAttribute('value', predstava.maxOsobe);
    description.innerHTML = predstava.opis;
	shortDescription.innerHTML = predstava.kratakOpis;
	inputImage.setAttribute('value', predstava.slika);
	avg_mark.setAttribute('value', predstava.ocena);
	marks.setAttribute('value', predstava.ocene);
	if(predstava.komentari != undefined){
		console.log(predstava.komentari)
		let komentari = "";
		for (let i = 0; i < predstava.komentari.length; i++) {
			if (i == predstava.komentari.length -1){
				komentari += predstava.komentari[i]
			}else{
				komentari += predstava.komentari[i] + ";;";
			}
		}
		comments.setAttribute('value', komentari);
	}
	if (predstava.reply != undefined) {
		console.log(predstava.reply)
		let reply_str = "";
		for (let i = 0; i < predstava.reply.length; i++) {
				console.log(predstava.reply[i])
				if(predstava.reply[i] != null){
					for (let x = 0; x < predstava.reply[i].length; x++) {
						reply_str += predstava.reply[i][x] + ","
					}
					reply_str = reply_str.slice(0, reply_str.length - 1)
					reply_str += ";;"
				}else{
					
					if (reply_str.slice(-2) == ';;'){
						reply_str += "null;;"
					}else{
						reply_str += ";;null;;"
					}
				}
				if (i == predstava.reply.length - 1){
					reply_str = reply_str.slice(0, reply_str.length - 2)
				}
			
		}
		console.log(reply_str)
		reply.setAttribute('value', reply_str);
	}
	
    
}

let predstavaURL = "https://web-dizajn---projekat-default-rtdb.europe-west1.firebasedatabase.app/predstave/" + parentId + "/" + id + ".json";
let btn = document.getElementById('btn');
console.log()
btn.addEventListener('click', function(e){
	e.preventDefault();

	let predstava= {};
	predstava.cena = price.value.trim();
	predstava.kod = code.value.trim();
	predstava.kratakOpis = shortDescription.value.trim();
	predstava.maxOsobe = numberOfViewers.value.trim();
	predstava.naziv = title.innerHTML;
	predstava.ocena = avg_mark.value.trim();
	let lista1 = marks.value.split(',');
	predstava.ocene = [];
	lista1.forEach(e => {
		predstava.ocene.push(parseInt(e))
	});
	predstava.opis = description.value.trim();
	predstava.slika = inputImage.value.trim();
	predstava.trajanje = duration.value.trim();
	predstava.zanr = genre.value.trim();

	lista1 = comments.value.split(';;')
	predstava.komentari = [];
	lista1.forEach(e => {
		predstava.komentari.push(e)
	});
	// console.log(predstava.komentari)
	
	lista1 = reply.value.split(';;')
	predstava.reply = []
	lista1.forEach(e => {
		if (e == "null"){
			predstava.reply.push(null)
		}else{
			predstava.reply.push(e.split(','))
		}
	});
	
	
	if(predstava.cena == "" || predstava.kod == "" ||  predstava.kratakOpis == "" || predstava.maxOsobe == "" || predstava.naziv == ""  || predstava.opis == ""  || predstava.trajanje == "" || predstava.zanr == "" ){
		alert("Ni jedno polje ne sme biti prazno")
	}else if(isNaN(predstava.kod)){
		alert("Polje kod ne sme sadrzati slova")
	}else if(isNaN(predstava.trajanje)){
		alert("Polje trajanje ne sme sadrzati slova")
	}else if(/[0-9]/.test(predstava.zanr)){
		alert("Polje zanr ne sme sadrzati brojeve")
	}else if(isNaN(predstava.cena)){
		alert("Polje cena ne sme sadrzati slova")
	}else if(isNaN(predstava.maxOsobe)){
		alert("Polje broj osoba ne sme sadrzati slova")
	}else if(predstava.kratakOpis < 20 ){
		alert("Kratak opis predstave mora imati najmanje 20 karaktera")
	}else if(predstava.kratakOpis < 50 ){
		alert("Kratak opis predstave mora imati najmanje 50 karaktera")
	}else{
		let request = new XMLHttpRequest();
        request.onreadystatechange = function (e) {
            e.preventDefault();
            if (this.readyState == 4) {
                if (this.status == 200) {
                    window.location.href = "pojedinacna_predstava.html?id=" + id +"&parentId=" + parentId ;
                    alert("Uspesno ste izmenili podatke")
                } else {
                alert("Greska: " + this.status);
                }
            }
        };
        request.open("PUT", predstavaURL);
        request.send(JSON.stringify(predstava));
	}
	

});
