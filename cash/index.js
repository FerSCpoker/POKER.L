
const app = document.getElementById("app");

const positions = ["UTG", "MP", "CO", "BTN", "SB", "BB"];
const hands = [
  "AA","AKs","AQs","AJs","ATs","A9s","A8s","A7s","A6s","A5s","A4s","A3s","A2s",
  "KAs","KK","KQs","KJs","KTs","K9s","K8s","K7s","K6s","K5s","K4s","K3s","K2s",
  "QAs","QKs","QQ","QJs","QTs","Q9s","Q8s","Q7s","Q6s","Q5s","Q4s","Q3s","Q2s",
  "JAs","JKs","JQs","JJ","JTs","J9s","J8s","J7s","J6s","J5s","J4s","J3s","J2s",
  "TAs","TKs","TQs","TJs","TT","T9s","T8s","T7s","T6s","T5s","T4s","T3s","T2s",
  "98s","97s","96s","95s","94s","93s","92s",
  "87s","86s","85s","84s","83s","82s",
  "76s","75s","74s","73s","72s",
  "65s","64s","63s","62s",
  "54s","53s","52s",
  "43s","42s",
  "32s"
];

const matrix = [];
const ranks = ["A","K","Q","J","T","9","8","7","6","5","4","3","2"];
for (let i = 0; i < 13; i++) {
  const row = [];
  for (let j = 0; j < 13; j++) {
    let hand = ranks[i] + ranks[j];
    if (i < j) hand += "s";
    else if (i > j) hand += "o";
    row.push(hand);
  }
  matrix.push(row);
}

const ranges = {
  UTG: {
    raise: ["AA","KK","QQ","JJ","AKs","AQs","AKo"],
    call: [],
    limp: [],
    fold: []
  },
  MP: {
    raise: ["AA","KK","QQ","JJ","TT","AKs","AQs","AJs","KQs","AKo","AQo"],
    call: ["99","88","ATs"],
    limp: [],
    fold: []
  },
  CO: {
    raise: ["AA","KK","QQ","JJ","TT","99","88","AKs","AQs","AJs","ATs","KQs","KJs","AKo","AQo","AJo"],
    call: ["77","66","A9s","QJs","JTs"],
    limp: [],
    fold: []
  },
  BTN: {
    raise: ["AA","KK","QQ","JJ","TT","99","88","77","66","AKs","AQs","AJs","ATs","A9s","KQs","KJs","QJs","JTs","AKo","AQo","AJo","KQo"],
    call: ["55","A8s","A7s","KTs","QTs","J9s","T9s"],
    limp: ["44","33","22","A6s","A5s","KJo"],
    fold: []
  },
  SB: {
    raise: ["AA","KK","QQ","JJ","TT","99","88","77","AKs","AQs","AJs","KQs","AKo","AQo","AJo"],
    call: ["66","55","ATs","A9s","KJs"],
    limp: ["44","33","22","A8s","KTs"],
    fold: []
  },
  BB: {
    raise: ["AA","KK","QQ","JJ","AKs","AQs","AKo"],
    call: ["TT","99","88","AQo","AJs"],
    limp: ["77","66","55","KQs"],
    fold: []
  }
};

let currentPosition = "UTG";

function render() {
  app.innerHTML = "";

  const title = document.createElement("h1");
  title.textContent = `Posición: ${currentPosition}`;
  app.appendChild(title);

  const posSelector = document.createElement("div");
  posSelector.className = "selector";
  positions.forEach(pos => {
    const btn = document.createElement("button");
    btn.textContent = pos;
    if (pos === currentPosition) btn.classList.add("active");
    btn.onclick = () => {
      currentPosition = pos;
      render();
    };
    posSelector.appendChild(btn);
  });
  app.appendChild(posSelector);

  const grid = document.createElement("div");
  grid.className = "grid";
  matrix.forEach(row => {
    row.forEach(hand => {
      const div = document.createElement("div");
      div.className = "cell";

      if (ranges[currentPosition].raise.includes(hand)) div.classList.add("raise");
      else if (ranges[currentPosition].call.includes(hand)) div.classList.add("call");
      else if (ranges[currentPosition].limp.includes(hand)) div.classList.add("limp");
      else div.classList.add("fold");

      div.textContent = hand;
      grid.appendChild(div);
    });
  });

  app.appendChild(grid);
}

document.addEventListener("DOMContentLoaded", render);
