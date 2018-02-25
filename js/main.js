
//---------------------------  Create VARIABLES --------------------------- 

var background = document.getElementById('background');
var lightbox = document.getElementById('main');
var horrorFilms = document.getElementById('horror').children;
var actionFilms = document.getElementById('action').children;
var crimeFilms = document.getElementById('crime').children;
var animatedFilms = document.getElementById('animated').children;
var close = document.getElementById('close');
var lightboxImage = document.getElementsByClassName('mainImage');
var caption = document.getElementsByClassName('caption');
var rightArrow = document.getElementById('js-right');
var leftArrow = document.getElementById('js-left');
var lightboxUnit = document.getElementById('js-lightboxUnit');
var imgCounter;
var currentGenre;
var newlightboxUnit

//---------------------------  Add EVENT LISTENERS --------------------------- 

console.log(horrorFilms[0].firstElementChild);

for(var i=0 ; i<12 ; i++){
	horrorFilms[i].addEventListener('click', show);
	actionFilms[i].addEventListener('click', show);
	crimeFilms[i].addEventListener('click', show);
	animatedFilms[i].addEventListener('click', show);
}

background.addEventListener('click', hide);
close.addEventListener('click', hide);
lightboxImage[0].addEventListener('click', hide);
rightArrow.addEventListener('click', next);
leftArrow.addEventListener('click', previous);

//---------------------------  FUNCTIONS --------------------------- 

/*--------------------------- Show image slider --------------------------- 
and change the image and caption to the one clicked on.*/

function show() {
	lightbox.style.display = "flex";
	caption[0].innerHTML= this.lastElementChild.innerHTML;
	lightboxImage[0].src = this.firstElementChild.src;
	imgCounter = this.getAttribute('data-counter');
	currentGenre = this.parentElement;
}

//---------------------------  Hide image slider --------------------------- 

function hide() {
	lightbox.style.display = "none";
}

//---------------------------  Generates a new lightbox unit --------------------------- 

function generateLightbox() {
	newlightboxUnit = document.createElement('span');
	newlightboxUnit.setAttribute("id", "js-lightboxUnit");
	newlightboxUnit.appendChild(document.createElement('img'));
	newlightboxUnit.appendChild(document.createElement('figcaption'));
	newlightboxUnit.firstElementChild.classList.add('mainImage');
	newlightboxUnit.firstElementChild.addEventListener('click', hide);
	newlightboxUnit.lastElementChild.classList.add('caption');
	newlightboxUnit.firstElementChild.src = currentGenre.children[imgCounter].firstElementChild.src;
	newlightboxUnit.lastElementChild.innerHTML = currentGenre.children[imgCounter].lastElementChild.innerHTML;
}

//--------------------------- Show next image --------------------------- 

function next() {
	//Add to our image index counter.
	imgCounter++;

	//Cycle back to the beginning of images if at the end.
	if(imgCounter>11) {
		imgCounter = 0;
	}

	//Move old Lightbox unit out of the way to the left
	lightbox.children[2].children[0].classList.add('moveLeft');
	lightbox.children[2].children[1].classList.add('moveLeft');

	//Remove the old lightbox from the DOM once it has moved.
	setTimeout(function() {
		lightbox.removeChild(lightbox.children[3]);
	},400);

	//Create new lightbox unit and position it to the right of screen.
	generateLightbox();
	newlightboxUnit.firstElementChild.classList.add('right');
	newlightboxUnit.lastElementChild.classList.add('right');

	//Insert new light box unit into the DOM
	lightbox.insertBefore(newlightboxUnit, lightbox.children[2]);

	/*Add class that will center our image, needs to be in a set timeout function 
	otherwsie the browser can't process the 'right' class and the 'center' class quickly 
	enough and just applies the center class.*/
	setTimeout(function() {
		newlightboxUnit.firstElementChild.classList.add('center');
		newlightboxUnit.lastElementChild.classList.add('center');
	},100);
}

//---------------------------  Show previous image --------------------------- 

function previous() {
	//Take away from our image index counter.
	imgCounter--;

	//Cycle to the end of images if at the beginning.
	if(imgCounter<0) {
		imgCounter = 11;
	}

	//Move old Lightbox unit out of the way to the right.
	lightbox.children[2].children[0].classList.add('moveRight');
	lightbox.children[2].children[1].classList.add('moveRight');

	//Create new lightbox unit and position it to the left of screen.
	generateLightbox();
	newlightboxUnit.firstElementChild.classList.add('left');
	newlightboxUnit.lastElementChild.classList.add('left');

	//Insert new light box unit into the DOM
	lightbox.insertBefore(newlightboxUnit, lightbox.children[2]);

	/*Add class that will center our image, needs to be in a set timeout function 
	otherwsie the browser can't process the 'left' class and the 'center' class quickly 
	enough and just applies the center class.*/
	setTimeout(function() {
		newlightboxUnit.firstElementChild.classList.add('center');
		newlightboxUnit.lastElementChild.classList.add('center');
	},100);
}