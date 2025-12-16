const TOTAL = 16;

/* ELEMENTS */
const selector = document.getElementById("selector");
const canvas = document.getElementById("previewCanvas");
const ctx = canvas.getContext("2d");
const twitterInput = document.getElementById("twitter");
const downloadBtn = document.getElementById("downloadBtn");
const tweetBtn = document.getElementById("tweetBtn");
const santa = document.getElementById("santa-bg");

/* CANVAS SIZE */
canvas.width = 760;
canvas.height = 506;

let selectedCard = 16;

/* ===============================
   TEXT STYLE PER CARD
================================ */
function getTextStyle(card) {
  // مشکی
  if ([3,4,9,10,11,12,13,14,15,16].includes(card)) {
    return { color: "#000" };
  }

  // سفید
  if ([1,2,5,6,7,8].includes(card)) {
    return { color: "#fff" };
  }

  // fallback
  return { color: "#000" };
}

/* ===============================
   BUILD CARD SELECTOR
================================ */
for (let i = 1; i <= TOTAL; i++) {
  const img = document.createElement("img");
  img.src = `cards/card${i}.png`;

  img.addEventListener("click", () => {
    document.querySelectorAll(".selector img")
      .forEach(e => e.classList.remove("active"));

    img.classList.add("active");
    selectedCard = i;
    render();
  });

  if (i === 16) img.classList.add("active");
  selector.appendChild(img);
}

/* ===============================
   INPUT HANDLING
================================ */
twitterInput.addEventListener("input", () => {
  const valid = twitterInput.value.trim() !== "";
  downloadBtn.disabled = !valid;
  tweetBtn.disabled = !valid;
  render();
});

/* ===============================
   RENDER CARD
================================ */
function render() {
  const username = twitterInput.value.replace("@", "").trim();
  const img = new Image();
  img.src = `files/card${selectedCard}.png`;

  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, 760, 506);

    if (!username) return;

    const style = getTextStyle(selectedCard);

    ctx.font = "36px Playfair Display";
    ctx.textAlign = "center";
    ctx.fillStyle = style.color;
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";

    ctx.fillText(
      `@${username}`,
      canvas.width / 2,
      canvas.height * 0.86
    );
  };
}

/* ===============================
   DOWNLOAD
================================ */
downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "altius-christmas-card.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

/* ===============================
   TWITTER SHARE
================================ */
tweetBtn.addEventListener("click", () => {
  const username = twitterInput.value.replace("@", "").trim();
  const text = `🎄 My Altius Christmas Card is ready!\n\n@${username}\n\nCreate yours 👇`;

  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(location.href)}`,
    "_blank"
  );
});

/* ===============================
   INITIAL RENDER
================================ */
render();

/* ===============================
   🎅 SANTA SCROLL (Right → Left)
================================ */
window.addEventListener("scroll", () => {
  const moveX = window.scrollY * -0.4;
  santa.style.transform = `translateX(${moveX}px)`;
});

/* ===============================
   ❄️ SNOW EFFECT
================================ */
const snowCanvas = document.getElementById("snow");
const sctx = snowCanvas.getContext("2d");

function resizeSnow() {
  snowCanvas.width = window.innerWidth;
  snowCanvas.height = window.innerHeight;
}
resizeSnow();

const flakes = Array.from({ length: 120 }, () => ({
  x: Math.random() * snowCanvas.width,
  y: Math.random() * snowCanvas.height,
  r: Math.random() * 2 + 1,
  d: Math.random() + 0.5
}));

function snow() {
  sctx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
  sctx.fillStyle = "rgba(255,255,255,0.8)";
  sctx.beginPath();

  flakes.forEach(f => {
    sctx.moveTo(f.x, f.y);
    sctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    f.y += f.d;

    if (f.y > snowCanvas.height) {
      f.y = -10;
      f.x = Math.random() * snowCanvas.width;
    }
  });

  sctx.fill();
}

setInterval(snow, 30);
window.addEventListener("resize", resizeSnow);
