const cards = Array.from({ length: 16 }, (_, i) => `cards/card${i + 1}.png`);

const selector = document.getElementById("selector");
const canvas = document.getElementById("previewCanvas");
const ctx = canvas.getContext("2d");
const twitterInput = document.getElementById("twitter");
const downloadBtn = document.getElementById("downloadBtn");

let selectedCard = null;

// Build card selector
cards.forEach((src) => {
  const img = document.createElement("img");
  img.src = src;

  img.addEventListener("click", () => {
    document
      .querySelectorAll(".selector img")
      .forEach((i) => i.classList.remove("active"));

    img.classList.add("active");
    selectedCard = src;
    render();
  });

  selector.appendChild(img);
});

// Re-render on input change
twitterInput.addEventListener("input", () => {
  render();
});

function render() {
  if (!selectedCard) return;

  const username = twitterInput.value.replace("@", "");
  const image = new Image();
  image.src = selectedCard;

  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);

    // Glass box
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    ctx.fillRect(
      canvas.width / 2 - 260,
      canvas.height - 160,
      520,
      80
    );

    // Text
    ctx.font = "36px Playfair Display";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(`@${username}`, canvas.width / 2, canvas.height - 105);

    downloadBtn.disabled = false;
  };
}

// Download
downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "altius-christmas-card.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
