let korisniciURL = "https://web-dizajn---projekat-default-rtdb.europe-west1.firebasedatabase.app/korisnici.json";
let emailSignIn = document.getElementById("emailSignIn");
let passwordSignIn = document.getElementById("passwordSignIn");
let btnSignIn = document.getElementById('btnSignIn');
// let closeSignIn = document.getElementById('closeSignIn');

btnSignIn.addEventListener('click', function(e){
    e.preventDefault();

    if(false){

    }else{
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    let korisnici = JSON.parse(this.responseText);
                    let tf = false;
                    for (let key in korisnici) {
                        let korisnik = korisnici[key];
                        if (korisnik.lozinka == passwordSignIn.value & korisnik.email == emailSignIn.value){
                            tf = true;
                            
                        }
                    }
                    if(tf){
                        alert("Uspesno ste se ulogovali")
                        closeSignIn.click();
                    }else{
                        alert("Pogresno ste uneli podatke. Molim vas da pokusate ponovo.")
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

