let capture;
let canvas;
let width = 1000;
let height = (width * 0.75);
let scalefactor = 5;
let pixelated;
let img;

function onChangeSlider() {
	scalefactor = parseInt(document.getElementById("slider").value);
}

async function setup() {
	let container = document.getElementById("canvasparent");
	let reason;

	width = container.clientWidth;
	height = (width * 0.75);

	document.getElementById("takepicbtn").addEventListener("click", takePic);

	canvas = createCanvas(width, height);
	canvas.parent('canvasparent');

	img = loadImage('assets/osborn.jpg');
	frameRate(3);
	capture = createCapture(VIDEO);
	capture.size(width, height);
	capture.hide();
}

function draw() {
	image(capture, 0, 0, width, height);
	loadPixels();
	background(255);

	const d = pixelDensity();

	for (let x = 0; x < width; x = x + scalefactor) {
		for (let y = 0; y < height; y = y + scalefactor) {
			const i = 4 * d * (y * d * width + x);
			const [r, g, b] = [pixels[i], pixels[i + 1], pixels[i + 2]]; // get colors

			noStroke();
			fill(r, g, b);
			rect(x, y, scalefactor, scalefactor);
		}
	}
}

function takePic(event) {
	let date = new Date();
	save(canvas, `${date.getTime()}.jpg`);
}
