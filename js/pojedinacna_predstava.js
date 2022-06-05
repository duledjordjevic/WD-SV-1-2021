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

function loadPage(){
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
}
loadPage();


function makeDescription(predstava){
	let comments = document.getElementById('comments');
	
	if(comments.childElementCount == 1){
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
	
		makeComments(predstava)
		addFunctionalityToTextarea()
	}else{
		comments.innerHTML = `<div class="input-box">
		<textarea placeholder="Add a comment..." required></textarea>
		<div class="buttons">
			<button class="btn-cancel"  id="btn-cancel">Cancel</button>
			<button class="btn-comment" id="btn-comment">Comment</button>
		</div>
		
		</div>`;
		makeComments(predstava)
		addFunctionalityToTextarea()
	}
}
function makeComments(predstava){
	for (let key in predstava.komentari) {
		let commented = predstava.komentari[key].slice(predstava.komentari[key].indexOf('-') + 1)
		let user = predstava.komentari[key].slice(0, predstava.komentari[key].indexOf('-'))
		
		let comments = document.getElementById('comments');
		let comment = document.createElement('div');
		comment.classList.add('comment');

		let username = document.createElement('p');
		username.classList.add('username');
		username.innerHTML = user;
		comment.appendChild(username);

		let comment_text = document.createElement('p');
		comment_text.classList.add('comment-text');
		comment_text.innerHTML = "- " + commented;
		comment.appendChild(comment_text);

		let btn_reply = document.createElement('button');
		btn_reply.innerHTML = `<i class="fa-solid fa-reply"></i> Reply`;
		btn_reply.classList.add('btn-reply');
		btn_reply.addEventListener('click', (e) => {
			if(korisnik == null){
				alert("Morati biti ulogavni da biste komentarisali predstavu!")
			}else{
				reply_textarea.innerHTML = `<div class="input-box">
				<textarea placeholder="Add a comment..." required></textarea>
				<div class="buttons">
					<button class="btn-cancel"  >Cancel</button>
					<button class="btn-comment" >Comment</button>
				</div>
				</div>`;
				// console.log(e.path[1].childNodes[3].lastChild.childNodes[3].childNodes[3])
				// console.log(e.path[1])
				let btn_cancel_reply = e.path[1].childNodes[3].lastChild.childNodes[3].childNodes[1];
				let btn_comment_reply = e.path[1].childNodes[3].lastChild.childNodes[3].childNodes[3];
				
				
				btn_cancel_reply.addEventListener('click', () => {
					reply_textarea.innerHTML = "";
				})
				btn_comment_reply.addEventListener('click', () => {
					if (reply_textarea.firstChild.childNodes[1].value != ''){
						let request = new XMLHttpRequest();
						request.onreadystatechange = function () {
						if (this.readyState == 4) {
							if (this.status == 200) {
								let predstave = JSON.parse(this.responseText);
								for (let key1 in predstave) {
									for (let key2 in predstave[key1]){
										if (key2 == id){
											let predstava = predstave[key1][key2]
											postReply(predstava, key, reply_textarea.firstChild.childNodes[1], btn_cancel_reply)
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
				
					}
				})
			}
		})
		comment.appendChild(btn_reply);

		let reply_textarea = document.createElement('div');
		reply_textarea.classList.add('reply-textarea');
		comment.appendChild(reply_textarea);
		if (predstava.reply != undefined){
			for(let i in predstava.reply[key]){
				// console.log(predstava.reply[key][i])
				let commented_reply = predstava.reply[key][i].slice(predstava.reply[key][i].indexOf('-') + 1);
				let user_reply = predstava.reply[key][i].slice(0, predstava.reply[key][i].indexOf('-'))
				
				let reply_div = document.createElement('div');
				reply_div.classList.add('reply');
				
				let username_p = document.createElement('p');
				username_p.classList.add('username');
				username_p.innerHTML = user_reply;
				reply_div.appendChild(username_p);

				let comment_text_p = document.createElement('p');
				comment_text_p.classList.add('comment-text');
				comment_text_p.innerText = "- " + commented_reply;
				reply_div.appendChild(comment_text_p);

				comment.appendChild(reply_div)
			}
		}


		comments.appendChild(comment);
	}
}

function postReply(predstava, key, reply_textarea, btn_cancel_reply){
	var korisnik = JSON.parse(localStorage.getItem('user'));
	var korisnickoIme = korisnik.korisnickoIme;
	console.log(predstava.reply)
	// console.log(predstaveURL.split('.json')[0] + "/" + parentId + "/" + id+ ".json")
	if(korisnik == null){
		alert("Morati biti ulogavni da biste komentarisali predstavu!")
	}else{
		if(predstava.reply == undefined){
			var korisnik = JSON.parse(localStorage.getItem('user'));
			var korisnickoIme = korisnik.korisnickoIme;
			predstava.reply =  {} ; 
			predstava.reply[key] = { 0 : korisnickoIme + "-" + reply_textarea.value};
			let request = new XMLHttpRequest();
			request.onreadystatechange = function (e) {
				e.preventDefault();
				if (this.readyState == 4) {
					if (this.status == 200) {
						loadPage();
						reply_textarea.value = "";
						btn_cancel_reply.click();
					} else {
					alert("Greska: " + this.status);
					}
				}
			};
			request.open("PUT", predstaveURL.split('.json')[0] + "/" + parentId + "/" + id+ ".json");
			request.send(JSON.stringify(predstava));
		}
		else{
			var last_key;
			for (let key1 in predstava.reply[key]) {
				last_key = key1;
			}
			last_key = parseInt(last_key) + 1
			
			var korisnik = JSON.parse(localStorage.getItem('user'));
			var korisnickoIme = korisnik.korisnickoIme;
			predstava.reply[key][last_key] =  korisnickoIme + "-" + reply_textarea.value;
			let request = new XMLHttpRequest();
			request.onreadystatechange = function (e) {
				e.preventDefault();
				if (this.readyState == 4) {
					if (this.status == 200) {
						loadPage();
						reply_textarea.value = "";
						btn_cancel_reply.click();

					} else {
					alert("Greska: " + this.status);
					}
				}
			};
			request.open("PUT", predstaveURL.split('.json')[0] + "/" + parentId + "/" + id+ ".json");
			request.send(JSON.stringify(predstava));
		}
		
	}

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

// Textarea
let textarea = document.querySelector("textarea");
let btn_comment = document.getElementById('btn-comment');
let btn_cancel = document.getElementById('btn-cancel');
function addFunctionalityToTextarea(){
	textarea = document.querySelector("textarea");
	btn_comment = document.getElementById('btn-comment');
	btn_cancel = document.getElementById('btn-cancel');

	textarea.addEventListener('keyup', e => {
		textarea.style.height = "auto";
		let scHeight = e.target.scrollHeight;
		textarea.style.height = `${scHeight}px`;

	})
	btn_cancel.addEventListener('click', () => {
		textarea.value = "";
	})
	btn_comment.addEventListener('click', () => {
		if (textarea.value != ''){
			let request = new XMLHttpRequest();
			request.onreadystatechange = function () {
			if (this.readyState == 4) {
				if (this.status == 200) {
					let predstave = JSON.parse(this.responseText);
					for (let key1 in predstave) {
						for (let key2 in predstave[key1]){
							if (key2 == id){
								let predstava = predstave[key1][key2]
								postComment(predstava)
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

			
		}
		
	})
}
addFunctionalityToTextarea()

function postComment(predstava){
	var korisnik = JSON.parse(localStorage.getItem('user'));
	// console.log(predstava.komentari)
	// console.log(predstaveURL.split('.json')[0] + "/" + parentId + "/" + id+ ".json")
	if(korisnik == null){
		alert("Morati biti ulogavni da biste komentarisali predstavu!")
	}else{
		if(predstava.komentari == undefined){
			var korisnik = JSON.parse(localStorage.getItem('user'));
			var korisnickoIme = korisnik.korisnickoIme;
			predstava.komentari = { 0 :  korisnickoIme + "-" + textarea.value } 
			let request = new XMLHttpRequest();
			request.onreadystatechange = function (e) {
				e.preventDefault();
				if (this.readyState == 4) {
					if (this.status == 200) {
						loadPage();
						textarea.value = "";
					} else {
					alert("Greska: " + this.status);
					}
				}
			};
			request.open("PUT", predstaveURL.split('.json')[0] + "/" + parentId + "/" + id+ ".json");
			request.send(JSON.stringify(predstava));
		}
		else{
			var last_key;
			for (let key in predstava.komentari) {
				console.log(key)
				last_key = key;
			}
			last_key = parseInt(last_key) + 1
			var korisnik = JSON.parse(localStorage.getItem('user'));
			var korisnickoIme = korisnik.korisnickoIme;
			predstava.komentari[last_key] =  korisnickoIme + "-" + textarea.value;
			let request = new XMLHttpRequest();
			request.onreadystatechange = function (e) {
				e.preventDefault();
				if (this.readyState == 4) {
					if (this.status == 200) {
						loadPage();
						textarea.value = "";
					} else {
					alert("Greska: " + this.status);
					}
				}
			};
			request.open("PUT", predstaveURL.split('.json')[0] + "/" + parentId + "/" + id+ ".json");
			request.send(JSON.stringify(predstava));
		}
	}

}









	
