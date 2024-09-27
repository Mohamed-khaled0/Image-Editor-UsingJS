// Get references to all necessary elements
let saturate = document.getElementById('saturate');
    let contrast = document.getElementById('contrast');
    let brightness = document.getElementById('brightness');
    let sepia = document.getElementById('sepia');
    let grayscale = document.getElementById('grayscale');
    let blur = document.getElementById('blur');
    let heuRotate = document.getElementById('heu-rotate');
    let img = document.getElementById('img');
    let downloadBtn = document.getElementById('download');
    let resetBtn = document.getElementById('reset');
    let uploadBtn = document.getElementById('upload');
    let imgBox = document.querySelector('.img-box')
    let canvas = document.getElementById("canvas")
    const ctx = canvas.getContext('2d')
// Function to reset filter values to default
    function resetValue(){
        img.style.filter = 'none';
        saturate.value = '100';
        contrast.value = '100';
        brightness.value = '100';
        sepia.value = '0';
        grayscale.value = '0';
        blur.value = '0';
        heuRotate.value = '0';
        }

// Set up initial state when the window loads
    window.onload = function (){
        downloadBtn.style.display = 'none'
        resetBtn.style.display = 'none'
        imgBox.style.display = 'none'
    }
// Handle the upload button's onchange event
    uploadBtn.onchange = function(){
        resetValue()
        downloadBtn.style.display = 'block'
        resetBtn.style.display = 'block'
        imgBox.style.display = 'block'
        let file = new FileReader ();
        file.readAsDataURL(uploadBtn.files[0]);
        // Once the file is loaded, set the image source to the file's result
        file.onload = function (){
            img.src = file.result;
        }

        // Draw the image on the canvas once it has loaded
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0,canvas.width,canvas.height);
            img.style.display = 'none'
        }
    }

// Apply filters whenever any input value changes
    let filters = document.querySelectorAll("ul li input");
    filters.forEach(filter => {
        filter.addEventListener('input', function(){
            ctx.filter = `
                saturate(${saturate.value}%)
                contrast(${contrast.value}%)
                brightness(${brightness.value}%)
                sepia(${sepia.value}%)
                blur(${blur.value}px)
                grayscale(${grayscale.value})
                hue-rotate(${heuRotate.value}deg)`
            ctx.drawImage(img,0,0,canvas.width,canvas.height);
        });
    });
    
// Download the image when the download button is clicked
    downloadBtn.onclick = function(){
        download.href = canvas.toDataURL() //PNG  format 
    }