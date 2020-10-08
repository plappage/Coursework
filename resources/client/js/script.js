let w=0, h=0;
function pageLoad(){
    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');
    w=window.innerWidth;
    h=window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    context.fillStyle = 'rgb(20, 131, 20)';
    context.beginPath();
    context.rect(0, 0, w, h);
    context.fill();
}
function dropdownClick(x) {
    document.getElementById(x).classList.toggle("show");
}
let slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    let i = 0;
    let x = document.getElementsByClassName("ruleSlides");
    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length} ;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex-1].style.display = "block";
}
