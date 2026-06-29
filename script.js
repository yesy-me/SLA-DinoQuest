const DINO_IMAGES = {
  trex: 'https://www.nickgowman.com/wp-content/uploads/cartoon-tyrannosaurus-rex.jpg',
  triceratops: 'https://www.nickgowman.com/wp-content/uploads/cartoon-triceratops.jpg',
  stegosaurus: 'https://www.nickgowman.com/wp-content/uploads/cartoon-stegosaurus.jpg',
  ankylosaurus: 'https://www.nickgowman.com/wp-content/uploads/cartoon-ankylosaurus.jpg',
  brachiosaurus: 'https://www.nickgowman.com/wp-content/uploads/cartoon-brachiosaurus.jpg',
  parasaurolophus: 'https://www.nickgowman.com/wp-content/uploads/cartoon-parasaurolophus.jpg'
};

const DEVELOPER_NAME = 'Yesy M.E';

/* =====================================================================
   DATA DINOSAURUS
===================================================================== */
const DINOS = [
  { id:'trex', name:'Tyrannosaurus Rex', desc:'It is a very big dinosaur. It has sharp, big teeth and strong legs. It eats meat.', searchWord:'TYRANNOSAURUSREX' },
  { id:'triceratops', name:'Triceratops', desc:'It is a dinosaur with three horns. It has a big bony frill on its head. It eats plants.', searchWord:'TRICERATOPS' },
  { id:'stegosaurus', name:'Stegosaurus', desc:'It is a dinosaur with sharp spikes on its tail. It has bony plates on its back. It eats plants.', searchWord:'STEGOSAURUS' },
  { id:'ankylosaurus', name:'Ankylosaurus', desc:'It is a dinosaur with a hard, bumpy body. It has a big round club on its tail. It eats plants.', searchWord:'ANKYLOSAURUS' },
  { id:'brachiosaurus', name:'Brachiosaurus', desc:'It is a dinosaur with a very long neck. It is one of the biggest dinosaurs. It eats plants.', searchWord:'BRACHIOSAURUS' },
  { id:'parasaurolophus', name:'Parasaurolophus', desc:'It is a dinosaur with a long, curved crest on its head. It has a duck-like mouth. It eats plants.', searchWord:'PARASAUROLOPHUS' }
];

document.getElementById('developer-credit').textContent = 'Developed by: ' + DEVELOPER_NAME;
document.getElementById('developer-credit-2').textContent = 'Developed by: ' + DEVELOPER_NAME;

const DINO_COLORS = {
  trex: '#ff1111',
  triceratops: '#00ff2a',
  stegosaurus: '#FFFF00',
  ankylosaurus: '#a200ff',
  brachiosaurus: '#3300FF',
  parasaurolophus: '#FF4911'
};

const ICON_PHOTO_PLACEHOLDER =
  '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="6" y="6" width="88" height="88" rx="10" fill="#fff" stroke="#000" stroke-width="5" stroke-dasharray="9 7"/>' +
    '<circle cx="34" cy="36" r="9" fill="#FFFF00" stroke="#000" stroke-width="4"/>' +
    '<path d="M14,78 L40,46 L58,64 L72,46 L90,78 Z" fill="#7DF9FF" stroke="#000" stroke-width="4" stroke-linejoin="round"/>' +
  '</svg>';

const ICON_LOCK =
  '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="14" y="28" width="32" height="26" rx="4" fill="#D9D9D9" stroke="#000" stroke-width="4"/>' +
    '<path d="M20,28 V18 a10,10 0 0 1 20,0 V28" fill="none" stroke="#000" stroke-width="4"/>' +
    '<circle cx="30" cy="41" r="4" fill="#000"/>' +
  '</svg>';

const ICON_CHECK =
  '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">' +
    '<polyline points="14,32 26,44 48,16" fill="none" stroke="#000" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>' +
  '</svg>';

const ICON_CHEST =
  '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="10" y="28" width="40" height="22" rx="3" fill="#FF4911" stroke="#000" stroke-width="4"/>' +
    '<path d="M10,28 a20,14 0 0 1 40,0" fill="#FF00F5" stroke="#000" stroke-width="4"/>' +
    '<rect x="25" y="32" width="10" height="9" rx="2" fill="#FFFF00" stroke="#000" stroke-width="3"/>' +
  '</svg>';

const ICON_DINO_BACK =
  '<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">' +
    '<ellipse cx="55" cy="46" rx="36" ry="20" fill="currentColor" stroke="#000" stroke-width="4"/>' +
    '<polygon points="32,28 39,12 47,28" fill="currentColor" stroke="#000" stroke-width="3"/>' +
    '<polygon points="49,25 57,8 65,25" fill="currentColor" stroke="#000" stroke-width="3"/>' +
    '<polygon points="66,28 74,14 80,28" fill="currentColor" stroke="#000" stroke-width="3"/>' +
    '<circle cx="22" cy="42" r="13" fill="currentColor" stroke="#000" stroke-width="4"/>' +
    '<circle cx="16" cy="38" r="2.6" fill="#000"/>' +
    '<path d="M90,52 Q108,48 110,62 Q104,66 94,60 Z" fill="currentColor" stroke="#000" stroke-width="4"/>' +
  '</svg>';

function imgSlotHTML(key, name){
  const url = DINO_IMAGES[key];
  if(url){
    return '<img class="dino-photo" src="' + url + '" alt="' + name + '">';
  }
  return '<div class="placeholder-photo">' + ICON_PHOTO_PLACEHOLDER + '<small>' + name + ' photo here<br>(square 1:1)</small></div>';
}

/* =====================================================================
   NAVIGATION / STATE
===================================================================== */
const levelMeta = [
  { id:1, x:9,  y:83.3, label:'Meet the Dinosaurs' },
  { id:2, x:25, y:63.0, label:'Story Time' },
  { id:3, x:43, y:81.5, label:'Word Search' },
  { id:4, x:61, y:59.3, label:'Guess & Reveal' },
  { id:5, x:78, y:77.8, label:'What Did We Learn?' }
];
const chestMeta = { id:6, x:91, y:46.3, label:'Treasure!' };
let unlockedLevel = 1;
const completedLevels = new Set();

function showScreen(id){
  document.querySelectorAll('.screen').forEach(function(s){ s.classList.remove('active'); });
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
}

function goToMap(){
  renderMap();
  showScreen('screen-map');
}

function renderMap(){
  const container = document.getElementById('map-nodes');
  container.innerHTML = '';

  levelMeta.forEach(function(meta){
    let stateClass = 'locked';
    if(completedLevels.has(meta.id)) stateClass = 'completed';
    else if(meta.id === unlockedLevel) stateClass = 'active-node';
    else if(meta.id < unlockedLevel) stateClass = 'completed';

    const node = document.createElement('button');
    node.className = 'map-node map-node-' + meta.id + ' ' + stateClass;
    node.style.left = meta.x + '%';
    node.style.top = meta.y + '%';

    let badgeContent;
    if(stateClass === 'locked') badgeContent = ICON_LOCK;
    else if(stateClass === 'completed') badgeContent = ICON_CHECK;
    else badgeContent = '<span class="map-node-num">' + meta.id + '</span>';

    node.innerHTML =
      '<span class="map-node-badge">' + badgeContent + '</span>' +
      '<span class="map-node-label">Level ' + meta.id + '</span>';

    if(stateClass !== 'locked'){
      node.onclick = function(){ openLevel(meta.id); };
    }
    container.appendChild(node);
  });

  // Treasure chest sits beyond level 5, only reachable once all 5 levels are done
  const chestState = completedLevels.has(6) ? 'completed' : (unlockedLevel >= 6 ? 'active-node' : 'locked');
  const chestNode = document.createElement('button');
  chestNode.className = 'map-node chest-node ' + chestState;
  chestNode.style.left = chestMeta.x + '%';
  chestNode.style.top = chestMeta.y + '%';
  const chestBadge = chestState === 'locked' ? ICON_LOCK : (chestState === 'completed' ? ICON_CHECK : ICON_CHEST);
  chestNode.innerHTML =
    '<span class="map-node-badge">' + chestBadge + '</span>' +
    '<span class="map-node-label">Prize</span>';
  if(chestState !== 'locked'){
    chestNode.onclick = function(){ openLevel(6); };
  }
  container.appendChild(chestNode);
}

function openLevel(id){
  if(id === 6){
    showScreen('screen-treasure');
    resetTreasure();
    return;
  }
  if(id > unlockedLevel) return;
  if(id === 1){ initLevel1(); showScreen('screen-level1'); }
  if(id === 2){ initLevel2(); showScreen('screen-level2'); }
  if(id === 3){ initLevel3(); showScreen('screen-level3'); }
  if(id === 4){ initLevel4(); showScreen('screen-level4'); }
  if(id === 5){ initLevel5(); showScreen('screen-level5'); }
}

function completeLevel(id){
  completedLevels.add(id);
  unlockedLevel = Math.max(unlockedLevel, id + 1);
  playFanfare();
  const modalTitle = document.getElementById('modal-title');
  const modalText = document.getElementById('modal-text');
  const modalBtn = document.getElementById('modal-btn');
  modalTitle.textContent = 'Level ' + id + ' Complete!';
  if(id < 5){
    modalText.textContent = 'Great job, explorers! Ready for the next adventure?';
    modalBtn.textContent = 'Back to Map';
    modalBtn.onclick = function(){ closeModal(); goToMap(); };
  } else {
    unlockedLevel = Math.max(unlockedLevel, 6);
    modalText.textContent = 'Amazing! All 5 levels done! A surprise is waiting on the map!';
    modalBtn.textContent = 'Back to Map';
    modalBtn.onclick = function(){ closeModal(); goToMap(); };
  }
  document.getElementById('modal-overlay').classList.add('active');
}

function closeModal(){
  document.getElementById('modal-overlay').classList.remove('active');
}

/* =====================================================================
   LEVEL 1 - FLASHCARDS
===================================================================== */
let l1Index = 0;
function initLevel1(){
  l1Index = 0;
  renderL1();
}
function renderL1(){
  const dino = DINOS[l1Index];
  document.getElementById('l1-photo-slot').innerHTML = imgSlotHTML(dino.id, dino.name);
  const nameEl = document.getElementById('l1-name');
  nameEl.textContent = dino.name;
  nameEl.style.color = DINO_COLORS[dino.id];
  document.getElementById('l1-desc').textContent = dino.desc;
  document.getElementById('l1-desc').style.borderColor = DINO_COLORS[dino.id];
  document.getElementById('l1-counter').textContent = (l1Index + 1) + ' / ' + DINOS.length;
  document.getElementById('l1-prev').disabled = (l1Index === 0);
  document.getElementById('l1-next').disabled = (l1Index === DINOS.length - 1);
}
function l1Prev(){ if(l1Index > 0){ l1Index--; renderL1(); } }
function l1Next(){ if(l1Index < DINOS.length - 1){ l1Index++; renderL1(); } }

/* =====================================================================
   LEVEL 2 - STORY WITH BLANKS
===================================================================== */
const STORY_SENTENCES = [
  { pre:'Once upon a time, six dinosaurs lived together in a green forest.', blank:null, post:'' },
  { pre:'Tyrannosaurus Rex was very big. It had sharp, big', blank:'teeth', post:'.' },
  { pre:'Triceratops had three', blank:'horns', post:'on its face and a big bony frill on its head.' },
  { pre:'Stegosaurus had sharp', blank:'spikes', post:'on its tail and bony plates on its back.' },
  { pre:'Ankylosaurus had a hard, bumpy body and a big club on its', blank:'tail', post:'.' },
  { pre:'Brachiosaurus had a very long', blank:'neck', post:'. It was one of the biggest dinosaurs.' },
  { pre:'Parasaurolophus had a long, curved crest on its head and a', blank:'duck-like', post:'mouth.' },
  { pre:'All six dinosaurs were special and had their own unique features.', post:''}
];
const WORD_BANK_WORDS = ['horns','spikes','neck','teeth','tail','duck-like'];

function shuffleArray(arr){
  const a = arr.slice();
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

function initLevel2(){
  const box = document.getElementById('story-box');
  let html = '';
  STORY_SENTENCES.forEach(function(sentence, idx){
    html += sentence.pre + ' ';
    if(sentence.blank){
      html += '<span class="blank" data-answer="' + sentence.blank + '" onclick="revealBlank(this)"></span> ';
    }
    html += sentence.post + ' ';
  });
  box.innerHTML = html;

  const bank = document.getElementById('word-bank');
  bank.innerHTML = '';
  shuffleArray(WORD_BANK_WORDS).forEach(function(word){
    const chip = document.createElement('span');
    chip.className = 'word-chip';
    chip.id = 'chip-' + word;
    chip.textContent = word;
    bank.appendChild(chip);
  });
}

function revealBlank(el){
  if(el.classList.contains('revealed')) return;
  const answer = el.dataset.answer;
  el.classList.add('revealed');
  el.textContent = answer;
  const chip = document.getElementById('chip-' + answer);
  if(chip) chip.classList.add('used');
  playCorrect();
}

/* =====================================================================
   LEVEL 3 - WORD SEARCH
===================================================================== */
const GRID_SIZE = 16;

const FIXED_GRID = [["X","Z","S","N","Y","H","B","P","M","U","G","T","I","L","L","T"],
                    ["B","K","C","T","M","X","H","B","I","O","Y","K","Y","D","H","Y"],
                    ["U","P","L","G","E","K","G","T","A","L","X","C","V","R","C","R"],
                    ["A","T","O","G","P","G","Z","O","Z","Q","H","V","Q","U","K","A"],
                    ["B","R","A","C","H","I","O","S","A","U","R","U","S","R","Q","N"],
                    ["P","I","Y","P","C","P","O","S","P","E","P","U","I","J","H","N"],
                    ["Y","C","N","G","F","U","E","O","A","E","N","X","T","C","G","O"],
                    ["C","E","B","X","D","F","P","S","H","U","N","Q","D","V","W","S"],
                    ["G","R","Z","M","Q","Y","S","M","M","S","R","N","M","F","J","A"],
                    ["K","A","L","N","W","J","Y","L","Y","M","Y","U","D","Y","G","U"],
                    ["R","T","P","S","A","P","B","V","M","E","L","X","S","V","P","R"],
                    ["Z","O","R","S","W","S","B","O","B","X","N","U","A","U","L","U"],
                    ["C","P","A","R","A","S","A","U","R","O","L","O","P","H","U","S"],
                    ["G","S","F","G","B","I","P","B","V","X","L","T","T","D","X","R"],
                    ["V","Y","G","T","J","F","F","Z","O","S","N","H","D","W","W","E"],
                    ["A","N","K","Y","L","O","S","A","U","R","U","S","G","E","G","X"]];

const FIXED_PLACEMENTS = {"TYRANNOSAURUSREX":[[0,15],[1,15],[2,15],[3,15],[4,15],[5,15],[6,15],[7,15],[8,15],[9,15],[10,15],[11,15],[12,15],[13,15],[14,15],[15,15]],
                          "BRACHIOSAURUS":[[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],[4,9],[4,10],[4,11],[4,12]],
                          "TRICERATOPS":[[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[13,1]],
                          "PARASAUROLOPHUS":[[12,1],[12,2],[12,3],[12,4],[12,5],[12,6],[12,7],[12,8],[12,9],[12,10],[12,11],[12,12],[12,13],[12,14],[12,15]],
                          "ANKYLOSAURUS":[[15,0],[15,1],[15,2],[15,3],[15,4],[15,5],[15,6],[15,7],[15,8],[15,9],[15,10],[15,11]],
                          "STEGOSAURUS":[[0,2],[1,3],[2,4],[3,5],[4,6],[5,7],[6,8],[7,9],[8,10],[9,11],[10,12]]};

let l3Data = { grid: FIXED_GRID, placements: FIXED_PLACEMENTS };
let l3Selected = new Set();
let l3Target = null;
const l3Found = new Set();

function initLevel3(){
  l3Selected = new Set();
  l3Target = null;
  renderL3Grid();
  renderL3Targets();
  document.getElementById('l3-feedback').textContent = '';
}

function renderL3Targets(){
  const list = document.getElementById('target-list');
  list.innerHTML = '';
  DINOS.forEach(function(dino){
    const btn = document.createElement('button');
    btn.className = 'target-btn';
    btn.textContent = dino.name;
    if(l3Found.has(dino.searchWord)){
      btn.classList.add('found-target');
      btn.innerHTML = '<span class="target-check">' + ICON_CHECK + '</span>' + dino.name;
      btn.disabled = true;
    } else {
      if(l3Target === dino.searchWord) btn.classList.add('active-target');
      btn.onclick = function(){
        l3Target = dino.searchWord;
        l3Selected = new Set();
        renderL3Targets();
        renderL3Grid();
        document.getElementById('l3-feedback').textContent = '';
      };
    }
    list.appendChild(btn);
  });
}

function renderL3Grid(){
  const gridEl = document.getElementById('ws-grid');
  gridEl.innerHTML = '';
  const foundCellSet = new Set();
  l3Found.forEach(function(word){
    l3Data.placements[word].forEach(function(cell){
      foundCellSet.add(cell[0] + ',' + cell[1]);
    });
  });
  for(let r = 0; r < GRID_SIZE; r++){
    for(let c = 0; c < GRID_SIZE; c++){
      const cell = document.createElement('div');
      cell.className = 'ws-cell';
      cell.textContent = l3Data.grid[r][c];
      const key = r + ',' + c;
      if(foundCellSet.has(key)){
        cell.classList.add('found');
      } else if(l3Selected.has(key)){
        cell.classList.add('selected');
      }
      cell.onclick = function(){
        if(!l3Target){
          document.getElementById('l3-feedback').textContent = 'Choose a dinosaur name first!';
          document.getElementById('l3-feedback').className = 'l3-feedback bad';
          return;
        }
        // Allow clicking overlap cells (already found by another word) so they
        // can be included in the current selection for words that share letters.
        if(l3Selected.has(key)){ l3Selected.delete(key); }
        else { l3Selected.add(key); }
        renderL3Grid();
      };
      gridEl.appendChild(cell);
    }
  }
}

function l3Clear(){
  l3Selected = new Set();
  renderL3Grid();
  document.getElementById('l3-feedback').textContent = '';
}

function l3Submit(){
  const feedback = document.getElementById('l3-feedback');
  if(!l3Target){
    feedback.textContent = 'Choose a dinosaur name first!';
    feedback.className = 'l3-feedback bad';
    return;
  }
  const correctCells = l3Data.placements[l3Target];
  if(!correctCells){
    feedback.textContent = 'Hmm, something went wrong. Try another word!';
    feedback.className = 'l3-feedback bad';
    return;
  }
  // Build set of cells already found by OTHER words (overlap/shared letters)
  const foundCellSet = new Set();
  l3Found.forEach(function(word){
    l3Data.placements[word].forEach(function(cell){
      foundCellSet.add(cell[0] + ',' + cell[1]);
    });
  });

  // Every correct cell must be either selected by the player OR already found (overlap)
  const correctKeys = correctCells.map(function(c){ return c[0] + ',' + c[1]; });
  const allCorrect = correctKeys.every(function(key){
    return l3Selected.has(key) || foundCellSet.has(key);
  });
  // Player must not have selected any extra wrong cells
  const noExtras = Array.from(l3Selected).every(function(key){
    return correctKeys.indexOf(key) !== -1;
  });
  const match = allCorrect && noExtras;
  if(match){
    feedback.textContent = 'Correct! Great job!';
    feedback.className = 'l3-feedback ok';
    playCorrect();
    l3Found.add(l3Target);
    l3Target = null;
    l3Selected = new Set();
    renderL3Targets();
    renderL3Grid();
  } else {
    feedback.textContent = 'Not quite, try again!';
    feedback.className = 'l3-feedback bad';
    playWrong();
  }
}

/* =====================================================================
   LEVEL 4 - REVEAL CARDS (numbered 1-6, guess then reveal name)
===================================================================== */
function initLevel4(){
  const grid = document.getElementById('l4-grid');
  grid.innerHTML = '';
  // Card colors cycle through the neo-brutalism palette via CSS (.l4-card:nth-child)
  const shuffledDinos = shuffleArray(DINOS);
  shuffledDinos.forEach(function(dino, idx){
    const card = document.createElement('div');
    card.className = 'l4-card';
    card.dataset.revealed = 'false';
    card.dataset.nameRevealed = 'false';

    card.dataset.dinoId = dino.id;
    card.dataset.dinoName = dino.name;
    card.dataset.dinoColor = DINO_COLORS[dino.id];
    card.dataset.idx = idx;

    const frontPhotoHtml = DINO_IMAGES[dino.id]
      ? '<img class="l4-photo" src="' + DINO_IMAGES[dino.id] + '" alt="' + dino.name + '">'
      : '<div class="l4-placeholder">' + ICON_PHOTO_PLACEHOLDER + '</div>';

    card.innerHTML =
      '<div class="l4-num">' + (idx + 1) + '</div>' +
      '<div class="l4-card-inner">' +
        '<div class="l4-card-face l4-card-back">' +
          '<div class="l4-card-pattern">' + ICON_DINO_BACK + '</div>' +
          '<button type="button" class="reveal-btn">Who am I?</button>' +
        '</div>' +
        '<div class="l4-card-face l4-card-front">' +
          frontPhotoHtml +
          '<div class="l4-name-revealed" style="display:none;"></div>' +
          '<button type="button" class="reveal-name-btn">I am ...</button>' +
        '</div>' +
      '</div>';

    card.querySelector('.reveal-btn').addEventListener('click', function(e){
      e.stopPropagation();
      flipL4Card(card);
    });
    card.querySelector('.reveal-name-btn').addEventListener('click', function(e){
      e.stopPropagation();
      revealL4Name(card, dino.name, DINO_COLORS[dino.id]);
    });
    grid.appendChild(card);
  });
}

function flipL4Card(card){
  if(card.dataset.revealed === 'true') return;
  card.dataset.revealed = 'true';
  card.classList.add('flipped');
  playCorrect();
}

function revealL4Name(card, name, color){
  if(card.dataset.nameRevealed === 'true') return;
  card.dataset.nameRevealed = 'true';
  const nameEl = card.querySelector('.l4-name-revealed');
  nameEl.textContent = name;
  nameEl.style.background = color;
  nameEl.style.color = '#000';
  nameEl.style.display = 'block';
  const btn = card.querySelector('.reveal-name-btn');
  if(btn) btn.style.display = 'none';
  playCorrect();
}

/* =====================================================================
   LEVEL 5 - SUMMARY
===================================================================== */
function initLevel5(){
  const summary = 'Today we learned about six amazing dinosaurs! Tyrannosaurus Rex is a very big dinosaur with sharp, big teeth. Triceratops has three horns and a big bony frill. Stegosaurus has sharp spikes on its tail and bony plates on its back. Ankylosaurus has a hard, bumpy body and a club on its tail. Brachiosaurus has a very long neck and is one of the biggest dinosaurs. Parasaurolophus has a long, curved crest and a duck-like mouth. Some dinosaurs eat plants, and some dinosaurs eat meat. Now we know many types of dinosaurs!';
  document.getElementById('summary-box').textContent = summary;
}

/* =====================================================================
   TREASURE SCREEN
===================================================================== */
function resetTreasure(){
  const chest = document.getElementById('chest-icon');
  chest.classList.remove('opened');
  document.getElementById('chest-wrap').style.display = 'block';
  document.getElementById('chest-hint').style.display = 'block';
  document.getElementById('treasure-step-2').style.display = 'none';
}
function openTreasureBox(){
  const chest = document.getElementById('chest-icon');
  if(chest.classList.contains('opened')) return;
  chest.classList.add('opened');
  playChestOpen();
  setTimeout(function(){
    document.getElementById('chest-wrap').style.display = 'none';
    document.getElementById('chest-hint').style.display = 'none';
    document.getElementById('treasure-step-2').style.display = 'block';
    launchConfetti();
    playFanfare();
    playSparkle();
  }, 180);
}
function launchConfetti(){
  const layer = document.createElement('div');
  layer.className = 'confetti-layer';
  document.body.appendChild(layer);
  const colors = ['#7DF9FF','#2FFF2F','#FF00F5','#3300FF','#FFFF00','#FF4911'];
  for(let i = 0; i < 60; i++){
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.animationDuration = (2 + Math.random() * 2.5) + 's';
    piece.style.animationDelay = (Math.random() * 0.7) + 's';
    piece.style.setProperty('--spin', (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random()*360) + 'deg');
    layer.appendChild(piece);
  }
  setTimeout(function(){ layer.remove(); }, 5500);
}

/* =====================================================================
   CLOSING SCREEN
===================================================================== */
function goToClosing(){
  const list = document.getElementById('closing-list');
  list.innerHTML = '';
  DINOS.forEach(function(dino, idx){
    const chip = document.createElement('span');
    chip.className = 'closing-chip';
    chip.style.background = DINO_COLORS[dino.id];
    chip.textContent = dino.name;
    list.appendChild(chip);
  });
  showScreen('screen-closing');
}


/* =====================================================================
   RESTART GAME
===================================================================== */
function restartGame(){
  completedLevels.clear();
  unlockedLevel = 1;
  showScreen('screen-title');
}

/* =====================================================================
   SOUND EFFECTS (Web Audio API - no external files needed)
===================================================================== */
let audioCtx = null;
function getAudioCtx(){
  if(!audioCtx){
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if(audioCtx.state === 'suspended'){ audioCtx.resume(); }
  return audioCtx;
}

function playTone(freq, startTime, duration, type, volume){
  try{
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type || 'square';
    osc.frequency.value = freq;
    const t0 = ctx.currentTime + startTime;
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(volume || 0.15, t0 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.03);
  } catch(e){ /* audio not available, fail silently */ }
}

function playClick(){
  playTone(520, 0, 0.06, 'square', 0.10);
}
function playCorrect(){
  playTone(523.25, 0, 0.10, 'square', 0.14);
  playTone(659.25, 0.09, 0.12, 'square', 0.14);
  playTone(783.99, 0.18, 0.18, 'square', 0.14);
}
function playWrong(){
  playTone(220, 0, 0.18, 'sawtooth', 0.10);
  playTone(170, 0.12, 0.22, 'sawtooth', 0.10);
}
function playFanfare(){
  const notes = [523.25, 523.25, 523.25, 659.25, 783.99, 1046.50];
  const timings = [0, 0.12, 0.24, 0.40, 0.56, 0.74];
  notes.forEach(function(freq, i){ playTone(freq, timings[i], 0.30, 'square', 0.15); });
}
function playChestOpen(){
  playTone(300, 0, 0.08, 'triangle', 0.16);
  playTone(450, 0.07, 0.10, 'triangle', 0.16);
  playTone(600, 0.15, 0.16, 'triangle', 0.16);
}
function playSparkle(){
  for(let i = 0; i < 6; i++){
    playTone(800 + i * 150, i * 0.06, 0.12, 'sine', 0.10);
  }
}

/* Generic click sound for any button-like element across the game */
document.addEventListener('click', function(e){
  const el = e.target.closest('.btn, .map-node:not(.locked), .target-btn:not(:disabled), .ws-cell, .reveal-btn');
  if(el) playClick();
}, true);
