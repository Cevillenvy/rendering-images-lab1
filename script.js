const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const sizeInfo = document.getElementById('size-info');
const colorInfo = document.getElementById('color-info');
const savedColorInfo = document.getElementById('saved-color-info');
canvas.addEventListener('click', handleClick);

let image;
let savedColors = [];

document.getElementById('upload-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    loadImageFromFile(file);
});

document.getElementById('load-url-btn').addEventListener('click', function() {
    const url = document.getElementById('url-input').value;
    loadImageFromURL(url);
});

function loadImageFromFile(file) {
    const reader = new FileReader();
  
    reader.onload = function(e) {
        loadImage(e.target.result);
    }
  
    reader.readAsDataURL(file);
}

function loadImageFromURL(url) {
    loadImage(url);
}

function loadImage(src) {
    const img = new Image();
    while (savedColors.length > 0) {
        savedColors.pop()
    }
    savedColorInfo.innerHTML = ""
    img.crossOrigin = "Anonymous"
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        showImageInfo();
    }
    img.src = src;
}

function showImageInfo() {
    sizeInfo.textContent = `Image Width: ${canvas.width}px, Image Height: ${canvas.height}px`;
}

function handleClick(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const color = `RGB(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    const currentColor = `Color at (${x}, ${y}): ${color}`;
    colorInfo.innerHTML = currentColor;

    if (savedColors.length >= 3) {
        savedColors.pop();
    }
    savedColors.unshift(currentColor);
    savedColorInfo.innerHTML = "";
    console.log(savedColors)
    for (let i = 0; i < savedColors.length; i++) {
        savedColorInfo.innerHTML += `<p>${savedColors[i]}</p>`;
    }
}

canvas.addEventListener('mousemove', function(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const color = `RGB(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    colorInfo.innerHTML = `Color at (${x}, ${y}): ${color}`;
});