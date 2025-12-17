const TOTAL = 16;

/* ELEMENTS */
const selector = document.getElementById("selector");
const canvasM = document.getElementById("previewCanvasMobile");
const canvasD = document.getElementById("previewCanvasDesktop");
const ctxM = canvasM.getContext("2d");
const ctxD = canvasD.getContext("2d");

const twitterInput = document.getElementById("twitter");
const downloadBtn = document.getElementById("downloadBtn");
const tweetBtn = document.getElementById("tweetBtn");
const santa = document.getElementById("santa-bg");

/* CANVAS SIZE */
[canvasM, canvasD].forEach(c => {
  c.width = 760;
  c.height = 506;
});

let selectedCard = 16;

/* TEXT COLOR */
function textColor(card) {
  if ([1,2,5,6,7,8].includes(card)) return "#fff";
  return "#000";
}

/* BUILD CARD SELECTOR */
for (let i = 1; i <= TOTAL; i++) {
  const img = document.createElement("img");
  img.src = `cards/card${i}.png`;

  img.onclick = () => {
    document.querySelectorAll(".selector img")
      .forEach(e => e.classList.remove("active"));
    img.classList.add("active");
    selectedCard = i;
    render();
  };

  if (i === 16) img.classList.add("active");
  selector.appendChild(img);
}

/* INPUT */
twitterInput.addEventListener("input", () => {
  const valid = twitterInput.value.trim().length > 0;
  downloadBtn.disabled = !valid;
  tweetBtn.disabled = !valid;
  render();
});

/* RENDER */
function render() {
  const username = twitterInput.value.trim();
  const img = new Image();
  img.src = `files/card${selectedCard}.png`;

  img.onload = () => {
    [ctxM, ctxD].forEach(ctx => {
      ctx.clearRect(0,0,760,506);
      ctx.drawImage(img,0,0,760,506);

      if (!username) return;

      ctx.font = "36px Playfair Display";
      ctx.textAlign = "center";
      ctx.fillStyle = textColor(selectedCard);
      ctx.fillText(`@${username}`, 380, 506 * 0.86);
    });
  };
}

/* DOWNLOAD */
downloadBtn.onclick = () => {
  const a = document.createElement("a");
  a.download = "altius-christmas-card.png";
  a.href = canvasD.toDataURL("image/png");
  a.click();
};

/* SHARE */
tweetBtn.onclick = () => {
  const text =
`🎄 My Altius Christmas Card is ready!

We are part of the @AltiusLabs community 🎄
Merry Christmas & Happy Holidays!

Get yours ready here 👇`;

  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(location.href)}`,
    "_blank"
  );
};

/* SANTA MOVE */
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  const x = -y * 0.3;
  const wave = Math.sin(y * 0.012) * 30;
  santa.style.transform = `translate(${x}px, ${wave}px)`;
});

/* SNOW */
const snow = document.getElementById("snow");
const sctx = snow.getContext("2d");

function resizeSnow() {
  snow.width = window.innerWidth;
  snow.height = window.innerHeight;
}
resizeSnow();
window.addEventListener("resize", resizeSnow);

const flakes = Array.from({ length: 120 }, () => ({
  x: Math.random() * snow.width,
  y: Math.random() * snow.height,
  r: Math.random() * 2 + 1,
  d: Math.random() + 0.6
}));

setInterval(() => {
  sctx.clearRect(0, 0, snow.width, snow.height);
  sctx.fillStyle = "rgba(255,255,255,0.8)";
  sctx.beginPath();

  flakes.forEach(f => {
    sctx.moveTo(f.x, f.y);
    sctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    f.y += f.d;
    if (f.y > snow.height) {
      f.y = -10;
      f.x = Math.random() * snow.width;
    }
  });

  sctx.fill();
}, 30);

render();
