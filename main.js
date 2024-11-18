const imageInput = document.querySelector("#image-input");
const topText = document.querySelector("#top-text");
const bottomText = document.querySelector("#bottom-text");
const generateButton = document.querySelector("#generate-button");
const canvas = document.querySelector("#meme");

let image;

imageInput.addEventListener("change", () => {
    const imageDataURL = URL.createObjectURL(imageInput.files[0]);
    image = new Image();
    image.src = imageDataURL;
    image.addEventListener("load", () => {
        updateMemeCanvas(canvas, image, topText.value, bottomText.value);
    }, {once: true});
});

generateButton.addEventListener("click", () => {
    updateMemeCanvas(canvas, image, topText.value, bottomText.value);
});

// Add new download button event listener
const downloadButton = document.querySelector("#download-button");
downloadButton.addEventListener("click", () => {
    // Create a temporary link element
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL("image/png");
    
    // Programmatically click the link to trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

function updateMemeCanvas(canvas, image, topText, bottomText) {
    const ctx = canvas.getContext("2d");
    
    // Calculate dimensions to fit in the container (500px max-width from CSS)
    const maxWidth = 500;
    const scale = Math.min(maxWidth / image.width, 1);
    const width = image.width * scale;
    const height = image.height * scale;
    
    // Set canvas dimensions first to avoid clearing the context settings
    canvas.width = width;
    canvas.height = height;

    // Draw image scaled to fit
    ctx.drawImage(image, 0, 0, width, height);

    // Configure text settings with scaled font size
    const fontSize = Math.floor(width / 10);
    const yOffset = height / 25;
    
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.lineWidth = Math.ceil(fontSize / 15); // Scale stroke with font size
    ctx.strokeStyle = "black";

    // Draw top text
    ctx.strokeText(topText, width / 2, yOffset + fontSize); // Add fontSize to yOffset for better positioning
    ctx.fillText(topText, width / 2, yOffset + fontSize);

    // Draw bottom text
    ctx.strokeText(bottomText, width / 2, height - yOffset);
    ctx.fillText(bottomText, width / 2, height - yOffset);
}   
