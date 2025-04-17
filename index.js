
const positions = {
  6: ["UTG", "HJ", "CO", "BTN", "SB", "BB"],
  7: ["UTG", "MP", "HJ", "CO", "BTN", "SB", "BB"],
  8: ["UTG", "UTG+1", "MP", "HJ", "CO", "BTN", "SB", "BB"],
  9: ["UTG", "UTG+1", "MP", "MP+1", "HJ", "CO", "BTN", "SB", "BB"]
};

const handRanges = {
  UTG: "AA-99, AKs-AQs, AKo",
  "UTG+1": "AA-99, AKs-AJs, AKo, KQs",
  MP: "AA-88, AKs-ATs, AKo-ATo, KQs",
  "MP+1": "AA-88, AKs-ATs, AKo-AJo, KQs, KJs",
  HJ: "AA-88, AKs-ATs, AKo-ATo, KQs",
  CO: "AA-77, AKs-A9s, AKo-AJo, KQs, KJs",
  BTN: "AA-55, AKs-A2s, AKo-ATo, KQs-KTs, QJs-QTs, JTs",
  SB: "AA-55, AKs-A2s, AKo-A9o, KQs-KTs, QJs-QTs, JTs, T9s, 98s",
  BB: "Libre (depende de la acción previa)"
};

let players = 6;
let selectedPos = null;

function render() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const title = document.createElement("h1");
  title.textContent = "Tabla Preflop";
  root.appendChild(title);

  const playerRow = document.createElement("div");
  [6, 7, 8, 9].forEach((p) => {
    const btn = document.createElement("button");
    btn.textContent = `${p} jugadores`;
    btn.className = players === p ? "default" : "outline";
    btn.onclick = () => {
      players = p;
      selectedPos = null;
      render();
    };
    playerRow.appendChild(btn);
  });
  root.appendChild(playerRow);

  const posRow = document.createElement("div");
  positions[players].forEach((pos) => {
    const btn = document.createElement("button");
    btn.textContent = pos;
    btn.className = selectedPos === pos ? "default" : "outline";
    btn.onclick = () => {
      selectedPos = pos;
      render();
    };
    posRow.appendChild(btn);
  });
  root.appendChild(posRow);

  if (selectedPos) {
    const card = document.createElement("div");
    card.className = "card";
    const subtitle = document.createElement("h2");
    subtitle.textContent = `Rango para ${selectedPos}`;
    const content = document.createElement("p");
    content.textContent = handRanges[selectedPos] || "Sin datos";
    card.appendChild(subtitle);
    card.appendChild(content);
    root.appendChild(card);
  }
}

document.addEventListener("DOMContentLoaded", render);
