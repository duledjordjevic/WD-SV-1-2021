predstaveURL = "https://web-dizajn---projekat-default-rtdb.europe-west1.firebasedatabase.app/predstave.json";
let request = new XMLHttpRequest();
request.onreadystatechange = function () {
if (this.readyState == 4) {
    if (this.status == 200) {
        let predstave = JSON.parse(this.responseText);
        for (let key1 in predstave) {
            for (let key2 in predstave[key1]){
                if (key2 == id){
                    let predstava = predstave[key1][key2]
                    makeBar(predstava)
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

function makeBar(predstava){
    var avg;
    var count = 0;
    var one = 0;
    var two = 0;
    var three = 0;
    var four = 0;
    var five = 0;
    for (let key in predstava.ocene){
        count += predstava.ocene[key];
        if(key == 0){
            one += predstava.ocene[key];
        }else if(key == 1){
            two += predstava.ocene[key];
        }else if(key == 2){
            three += predstava.ocene[key];
        }else if(key == 3){
            four += predstava.ocene[key];
        }else if(key == 4){
            five += predstava.ocene[key];
        }
    }
    avg = (one * 1 + two * 2 + three * 3 + four * 4 + five *5)/count

    let five_span = document.getElementById('five');
    let four_span = document.getElementById('four');
    let three_span = document.getElementById('three');
    let two_span = document.getElementById('two');
    let one_span = document.getElementById('one');
    
    five_span.style.width = five/count * 100 + "%";
    four_span.style.width = four/count * 100 + "%";
    three_span.style.width = three/count * 100 + "%";
    two_span.style.width = two/count * 100 + "%";
    one_span.style.width = one/count * 100 + "%";

    let avg_span = document.getElementById('avg');
    avg_span.innerHTML = avg.toFixed(1);
    let count_span = document.getElementById('count');
    count_span.innerHTML = count;

    avg = Math.round(avg);
    let ul_rating = document.querySelector("#ul-rating");
    if (avg == 5){
        ul_rating.innerHTML = `<li><i class="fa-solid fa-star"></i></li>
        <li><i class="fa-solid fa-star"></i></li>
        <li><i class="fa-solid fa-star"></i></li>
        <li><i class="fa-solid fa-star"></i></li>
        <li><i class="fa-solid fa-star"></i></li>`;
    }else if(avg == 4){
        ul_rating.innerHTML = `<li><i class="fa-solid fa-star"></i></li>
        <li><i class="fa-solid fa-star"></i></li>
        <li><i class="fa-solid fa-star"></i></li>
        <li><i class="fa-solid fa-star"></i></li>
        <li><i class="fa-regular fa-star"></i></li>`;
    }
    else if(avg == 3){
        ul_rating.innerHTML = `<li><i class="fa-solid fa-star"></i></li>
        <li><i class="fa-solid fa-star"></i></li>
        <li><i class="fa-solid fa-star"></i></li>
        <li><i class="fa-regular fa-star"></i></li>
        <li><i class="fa-regular fa-star"></i></li>`;
    }else if(avg == 2){
        ul_rating.innerHTML = `<li><i class="fa-solid fa-star"></i></li>
        <li><i class="fa-solid fa-star"></i></li>
        <li><i class="fa-regular fa-star"></i></li>
        <li><i class="fa-regular fa-star"></i></li>
        <li><i class="fa-regular fa-star"></i></li>`;
    }else if(avg == 1){
        ul_rating.innerHTML = `<li><i class="fa-solid fa-star"></i></li>
        <li><i class="fa-regular fa-star"></i></li>
        <li><i class="fa-regular fa-star"></i></li>
        <li><i class="fa-regular fa-star"></i></li>
        <li><i class="fa-regular fa-star"></i></li>`;
    }

}


// const container = document.querySelector('.rating');
// const items = container.querySelectorAll('.rating-item')
// container.onclick = e => {
//     const elClass = e.target.classList;
    
//     if (!elClass.contains('active')) {
//         items.forEach( 
//             item => item.classList.remove('active')
//         );
//         console.log(e.target.getAttribute("data-rate"));
//         elClass.add('active'); 
//     }
// };