"use strict";

const STORAGE_KEY = "kedaiMatematikProgress";
const SOUND_STORAGE_KEY = "kedaiMatematikSoundEnabled";
const LEGACY_SOUND_STORAGE_KEY = "kedaiMatematikSound";
const totalCustomers = 10;

const audioFiles = {
  buttonClick: "assets/audio/button-click.mp3",
  correct: "assets/audio/correct.mp3",
  wrong: "assets/audio/wrong.mp3",
  customerIn: "assets/audio/customer-in.mp3",
  missionUnlock: "assets/audio/mission-unlock.mp3",
  sessionComplete: "assets/audio/session-complete.mp3"
};

// Konfigurasi tahap. Hanya Tahap 1 mempunyai penjana soalan buat masa ini.
const levels = [
  { id: 1, name: "Dua Barang, Satu Jumlah!", implemented: true },
  { id: 2, name: "Troli Makin Penuh!", implemented: true },
  { id: 3, name: "Borong Sikit!", implemented: true },
  { id: 4, name: "Jaga Baki RM10", implemented: true },
  { id: 5, name: "Jaga Baki RM20", implemented: true },
  { id: 6, name: "Juruwang Cekap", implemented: true },
  { id: 7, name: "Wang dan Sen", implemented: true },
  { id: 8, name: "Sen & Baki", implemented: true },
  { id: 9, name: "Cabaran Campuran", implemented: true },
  { id: 10, name: "Kedai Sibuk!", implemented: true }
];

const shopItems = [
  { emoji: "🍞", name: "Roti", price: 2 },
  { emoji: "🥛", name: "Susu", price: 4 },
  { emoji: "🍎", name: "Epal", price: 3 },
  { emoji: "🍌", name: "Pisang", price: 2 },
  { emoji: "🥚", name: "Telur", price: 5 },
  { emoji: "🧃", name: "Jus", price: 4 },
  { emoji: "🍪", name: "Biskut", price: 3 },
  { emoji: "🍫", name: "Coklat", price: 5 },
  { emoji: "🧀", name: "Keju", price: 6 },
  { emoji: "🍚", name: "Beras", price: 8 },
  { emoji: "🍜", name: "Mi", price: 3 },
  { emoji: "🥤", name: "Air Kotak", price: 2 },
  { emoji: "🍊", name: "Oren", price: 3 },
  { emoji: "🍐", name: "Pir", price: 4 },
  { emoji: "🍇", name: "Anggur", price: 6 },
  { emoji: "🍉", name: "Tembikai", price: 7 },
  { emoji: "🥕", name: "Lobak", price: 2 },
  { emoji: "🌽", name: "Jagung", price: 3 },
  { emoji: "🥔", name: "Kentang", price: 4 },
  { emoji: "🧅", name: "Bawang", price: 2 },
  { emoji: "✏️", name: "Pensel", price: 1 },
  { emoji: "🖊️", name: "Pen", price: 2 },
  { emoji: "📒", name: "Buku Nota", price: 4 },
  { emoji: "🧼", name: "Sabun", price: 3 },
  { emoji: "🦷", name: "Ubat Gigi", price: 4 },
  { emoji: "🧻", name: "Tisu", price: 3 },
  { emoji: "🧴", name: "Syampu", price: 7 },
  { emoji: "🧽", name: "Span", price: 2 }
];

// Harga khusus Misi 7 disimpan sebagai integer sen untuk mengelakkan ralat perpuluhan.
const missionSevenPrices = {
  Roti: 250,
  Susu: 320,
  Epal: 150,
  Pisang: 225,
  Telur: 350,
  Jus: 280,
  Biskut: 350,
  Coklat: 475,
  Keju: 625,
  Beras: 850,
  Mi: 320,
  "Air Kotak": 180,
  Oren: 175,
  Pir: 250,
  Anggur: 450,
  Tembikai: 675,
  Lobak: 120,
  Jagung: 220,
  Kentang: 275,
  Bawang: 150,
  Pensel: 120,
  Pen: 180,
  "Buku Nota": 450,
  Sabun: 325,
  "Ubat Gigi": 480,
  Tisu: 250,
  Syampu: 790,
  Span: 175
};

const missionSevenItems = shopItems.map((item) => ({
  emoji: item.emoji,
  name: item.name,
  priceCents: missionSevenPrices[item.name]
}));

const customers = [
  { name: "Aynaa", avatar: "assets/customers/Aynaa.png" },
  { name: "Ammar", avatar: "assets/customers/Ammar.png" },
  { name: "Mei Ling", avatar: "assets/customers/Mei-Ling.png" },
  { name: "Kumar", avatar: "assets/customers/Kumar.png" },
  { name: "Sofia", avatar: "assets/customers/Sofia.png" },
  { name: "Azzam", avatar: "assets/customers/Azzam.png" },
  { name: "Ayyash", avatar: "assets/customers/Ayyash.png" },
  { name: "Ivy Chian", avatar: "assets/customers/Ivy-Chian.png" },
  { name: "Maria", avatar: "assets/customers/Maria.png" },
  { name: "Affan", avatar: "assets/customers/Affan.png" }
];

const praiseMessages = ["Betul! ⭐", "Hebat! 🎉", "Bagus! 🌟", "Tepat sekali!", "Pandainya! 👏", "Mantap!"];
const tryAgainMessages = ["Hampir!", "Cuba lagi!", "Tak apa, teruskan!", "Lain kali mesti boleh!"];
const helperMessages = [
  "Pelanggan dah menunggu!",
  "Jom buka kedai!",
  "Hari ini ramai pelanggan!",
  "Bersedia untuk kira?"
];

const elements = {
  gameHeader: document.querySelector("#game-header"),
  mainMenuScreen: document.querySelector("#main-menu-screen"),
  levelScreen: document.querySelector("#level-screen"),
  gameScreen: document.querySelector("#game-screen"),
  gameOverScreen: document.querySelector("#game-over-screen"),
  startMenuButton: document.querySelector("#start-menu-button"),
  menuHighestMission: document.querySelector("#menu-highest-mission"),
  menuBestScore: document.querySelector("#menu-best-score"),
  howToButton: document.querySelector("#how-to-button"),
  howToCard: document.querySelector("#how-to-card"),
  helperMessage: document.querySelector("#helper-message"),
  soundToggleButton: document.querySelector("#sound-toggle-button"),
  fullscreenButton: document.querySelector("#fullscreen-button"),
  backToMenuButton: document.querySelector("#back-to-menu-button"),
  levelGrid: document.querySelector("#level-grid"),
  levelNotice: document.querySelector("#level-notice"),
  starCount: document.querySelector("#star-count"),
  customerProgress: document.querySelector("#customer-progress"),
  customerName: document.querySelector("#customer-name"),
  customerPanel: document.querySelector(".customer-panel"),
  customerAvatar: document.querySelector("#customer-avatar"),
  avatarFallback: document.querySelector("#avatar-fallback"),
  itemsList: document.querySelector("#items-list"),
  itemsAndQuestion: document.querySelector(".items-and-question"),
  questionTimer: document.querySelector("#question-timer"),
  timerSeconds: document.querySelector("#timer-seconds"),
  timerBar: document.querySelector("#timer-bar"),
  transactionSummary: document.querySelector("#transaction-summary"),
  purchaseTotal: document.querySelector("#purchase-total"),
  paymentAmount: document.querySelector("#payment-amount"),
  questionText: document.querySelector("#question-text"),
  answers: document.querySelector("#answers"),
  feedback: document.querySelector("#feedback"),
  resultLevel: document.querySelector("#result-level"),
  finalScore: document.querySelector("#final-score"),
  finalAccuracy: document.querySelector("#final-accuracy"),
  finalBest: document.querySelector("#final-best"),
  finalRating: document.querySelector("#final-rating"),
  levelUnlocked: document.querySelector("#level-unlocked"),
  playAgainButton: document.querySelector("#play-again-button"),
  chooseLevelButton: document.querySelector("#choose-level-button"),
  nextLevelButton: document.querySelector("#next-level-button")
};

let progress = loadProgress();
let currentLevel = 1;
let stars = 0;
let currentCustomer = 1;
let sessionCustomers = [];
let mixedQuestionPlan = [];
let correctAnswer = 0;
let answersUseCents = false;
let questionLocked = true;
let questionTimerId = null;
let questionDeadline = 0;
const audioManager = createAudioManager();

function defaultProgress() {
  return { highestUnlockedLevel: 1, bestScores: {} };
}

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object") return defaultProgress();

    const highest = Number(saved.highestUnlockedLevel);
    const bestScores = {};

    if (saved.bestScores && typeof saved.bestScores === "object") {
      levels.forEach((level) => {
        const score = Number(saved.bestScores[level.id]);
        if (Number.isInteger(score) && score >= 0 && score <= totalCustomers) {
          bestScores[level.id] = score;
        }
      });
    }

    return {
      highestUnlockedLevel: Number.isInteger(highest)
        ? Math.min(Math.max(highest, 1), levels.length)
        : 1,
      bestScores
    };
  } catch (error) {
    return defaultProgress();
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    // Game masih boleh dimainkan jika storage disekat atau penuh.
  }
}

function loadSoundPreference() {
  try {
    const savedValue = localStorage.getItem(SOUND_STORAGE_KEY);
    if (savedValue === "off" || savedValue === "false") return false;
    if (savedValue === "on" || savedValue === "true") return true;

    // Kekalkan pilihan daripada versi toggle UI terdahulu jika ada.
    return localStorage.getItem(LEGACY_SOUND_STORAGE_KEY) !== "off";
  } catch (error) {
    return true;
  }
}

function createAudioManager() {
  const sounds = {};

  Object.entries(audioFiles).forEach(([name, source]) => {
    try {
      const audio = new Audio(source);
      audio.preload = "metadata";
      audio.volume = 0.55;
      sounds[name] = audio;
    } catch (error) {
      // Audio mungkin tidak disokong; manager akan kekal senyap.
    }
  });

  return {
    enabled: loadSoundPreference(),

    play(name) {
      if (!this.enabled || !sounds[name]) return;

      try {
        const sound = sounds[name];
        sound.pause();
        sound.currentTime = 0;
        const playAttempt = sound.play();
        if (playAttempt && typeof playAttempt.catch === "function") {
          playAttempt.catch(() => {});
        }
      } catch (error) {
        // Fail hilang atau sekatan autoplay tidak boleh menghentikan game.
      }
    },

    stopAll() {
      Object.values(sounds).forEach((sound) => {
        try {
          sound.pause();
          sound.currentTime = 0;
        } catch (error) {
          // Abaikan audio yang tidak dapat dihentikan.
        }
      });
    },

    setEnabled(value) {
      this.enabled = Boolean(value);
      if (!this.enabled) this.stopAll();

      try {
        localStorage.setItem(SOUND_STORAGE_KEY, this.enabled ? "on" : "off");
      } catch (error) {
        // State dalam memori masih berfungsi jika storage tidak tersedia.
      }
    }
  };
}

function updateSoundButton() {
  elements.soundToggleButton.textContent = audioManager.enabled ? "🔊" : "🔇";
  elements.soundToggleButton.setAttribute("aria-pressed", String(!audioManager.enabled));
  elements.soundToggleButton.setAttribute("aria-label", audioManager.enabled ? "Tutup bunyi" : "Buka bunyi");
}

function toggleSound() {
  audioManager.setEnabled(!audioManager.enabled);
  updateSoundButton();
}

function updateFullscreenButton() {
  const isFullscreen = Boolean(document.fullscreenElement);
  elements.fullscreenButton.textContent = isFullscreen ? "↙" : "⛶";
  elements.fullscreenButton.setAttribute("aria-pressed", String(isFullscreen));
  elements.fullscreenButton.setAttribute(
    "aria-label",
    isFullscreen ? "Keluar skrin penuh" : "Buka skrin penuh"
  );
}

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else if (document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen();
    }
  } catch (error) {
    // Sesetengah browser menyekat fullscreen; game diteruskan seperti biasa.
  }
  updateFullscreenButton();
}

function resetProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    // Tetapkan semula memori walaupun localStorage tidak tersedia.
  }

  progress = defaultProgress();
  currentLevel = 1;
  renderLevelCards();
  return progress;
}

// Didedahkan untuk kegunaan development melalui browser console.
window.resetProgress = resetProgress;

function randomIndex(length) {
  return Math.floor(Math.random() * length);
}

function formatMoney(cents) {
  const ringgit = Math.floor(cents / 100);
  const sen = cents % 100;
  return `RM${ringgit}.${String(sen).padStart(2, "0")}`;
}

function shuffle(array) {
  const copy = [...array];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = randomIndex(index + 1);
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function createAnswerChoices(
  answer,
  suggestedDistractors = [],
  nearbyOffsets = [-4, -3, -2, -1, 1, 2, 3, 4]
) {
  const choices = new Set([answer]);

  // Tahap tertentu boleh mencadangkan kesilapan matematik yang munasabah.
  for (const distractor of shuffle(suggestedDistractors)) {
    if (distractor > 0 && distractor !== answer) choices.add(distractor);
    if (choices.size === 4) break;
  }

  for (const offset of shuffle(nearbyOffsets)) {
    if (choices.size >= 4) break;
    const choice = answer + offset;
    if (choice > 0) choices.add(choice);
  }

  let fallback = 1;
  while (choices.size < 4) {
    if (fallback !== answer) choices.add(fallback);
    fallback += 1;
  }

  return shuffle([...choices]);
}

// Penjana bersama untuk tahap tambah. Shuffle dan slice memastikan barang berbeza.
function generateAdditionQuestion(itemCount) {
  const items = shuffle(shopItems).slice(0, itemCount);
  return {
    items,
    answer: items.reduce((total, item) => total + item.price, 0)
  };
}

function generateQuantityQuestion() {
  const selectedItems = shuffle(shopItems).slice(0, 2);
  const items = selectedItems.map((item) => ({
    ...item,
    quantity: randomIndex(3) + 1
  }));

  // Elakkan kedua-dua kuantiti bernilai 1 supaya soalan benar-benar menguji darab.
  if (items.every((item) => item.quantity === 1)) {
    items[randomIndex(items.length)].quantity = randomIndex(2) + 2;
  }

  const answer = items.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  return {
    items,
    answer,
    distractors: [
      items[0].price + items[1].price,
      items[0].price + (items[1].price * items[1].quantity),
      (items[0].price * items[0].quantity) + items[1].price,
      answer - 1,
      answer + 1
    ]
  };
}

function findValidPurchases(itemCount, minimumTotal, paymentAmount) {
  const validPurchases = [];

  function buildCombination(startIndex, selectedItems) {
    if (selectedItems.length === itemCount) {
      const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
      if (total >= minimumTotal && total < paymentAmount) {
        validPurchases.push([...selectedItems]);
      }
      return;
    }

    for (let index = startIndex; index < shopItems.length; index += 1) {
      selectedItems.push(shopItems[index]);
      buildCombination(index + 1, selectedItems);
      selectedItems.pop();
    }
  }

  buildCombination(0, []);
  return validPurchases;
}

function generateChangeQuestion(paymentAmount, itemCounts, minimumTotal) {
  // Pilih bilangan barang dahulu supaya setiap variasi mendapat peluang yang sama.
  const itemCount = itemCounts[randomIndex(itemCounts.length)];
  const validPurchases = findValidPurchases(itemCount, minimumTotal, paymentAmount);
  const items = validPurchases[randomIndex(validPurchases.length)];
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const answer = paymentAmount - total;

  return {
    items,
    answer,
    questionType: "change",
    transaction: { total, paymentAmount },
    distractors: [answer - 1, answer + 1, answer - 2, answer + 2, total]
  };
}

function generateQuantityChangeQuestion(paymentAmount, minimumTotal) {
  const validPurchases = [];

  for (let firstIndex = 0; firstIndex < shopItems.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < shopItems.length; secondIndex += 1) {
      for (let firstQuantity = 1; firstQuantity <= 3; firstQuantity += 1) {
        for (let secondQuantity = 1; secondQuantity <= 3; secondQuantity += 1) {
          if (firstQuantity === 1 && secondQuantity === 1) continue;

          const firstItem = { ...shopItems[firstIndex], quantity: firstQuantity };
          const secondItem = { ...shopItems[secondIndex], quantity: secondQuantity };
          const total = (firstItem.price * firstItem.quantity) +
            (secondItem.price * secondItem.quantity);

          if (total >= minimumTotal && total < paymentAmount) {
            validPurchases.push({ items: [firstItem, secondItem], total });
          }
        }
      }
    }
  }

  const purchase = validPurchases[randomIndex(validPurchases.length)];
  const [firstItem, secondItem] = purchase.items;
  const answer = paymentAmount - purchase.total;

  return {
    items: purchase.items,
    answer,
    questionType: "change",
    transaction: { total: purchase.total, paymentAmount },
    distractors: [
      paymentAmount - (firstItem.price + (secondItem.price * secondItem.quantity)),
      paymentAmount - ((firstItem.price * firstItem.quantity) + secondItem.price),
      paymentAmount - (firstItem.price + secondItem.price),
      answer - 1,
      answer + 1
    ]
  };
}

function findCentsPurchases(itemCount, maximumCents) {
  const validPurchases = [];

  function buildCombination(startIndex, selectedItems, totalCents) {
    if (selectedItems.length === itemCount) {
      if (totalCents < maximumCents) {
        validPurchases.push({ items: [...selectedItems], totalCents });
      }
      return;
    }

    for (let index = startIndex; index < missionSevenItems.length; index += 1) {
      const item = missionSevenItems[index];
      const nextTotal = totalCents + item.priceCents;
      if (nextTotal >= maximumCents) continue;

      selectedItems.push(item);
      buildCombination(index + 1, selectedItems, nextTotal);
      selectedItems.pop();
    }
  }

  buildCombination(0, [], 0);
  return validPurchases;
}

function generateCentsAdditionQuestion() {
  const itemCount = randomIndex(2) + 2;
  const validPurchases = findCentsPurchases(itemCount, 2001);
  const purchase = validPurchases[randomIndex(validPurchases.length)];

  return {
    items: purchase.items,
    answer: purchase.totalCents,
    usesCents: true,
    distractors: [
      purchase.totalCents - 100,
      purchase.totalCents + 100,
      purchase.totalCents - 50,
      purchase.totalCents + 50,
      purchase.totalCents - 25,
      purchase.totalCents + 25
    ],
    choiceOffsets: [-100, 100, -50, 50, -25, 25, -20, 20]
  };
}

function generateCentsChangeQuestion() {
  const itemCount = randomIndex(2) + 2;
  const validPurchases = findCentsPurchases(itemCount, 2000);
  const purchase = validPurchases[randomIndex(validPurchases.length)];
  const paymentCents = purchase.totalCents < 1000
    ? (randomIndex(2) === 0 ? 1000 : 2000)
    : 2000;
  const answer = paymentCents - purchase.totalCents;

  return {
    items: purchase.items,
    answer,
    usesCents: true,
    questionType: "change",
    transaction: {
      total: purchase.totalCents,
      paymentAmount: paymentCents,
      usesCents: true
    },
    distractors: [
      answer - 100,
      answer + 100,
      answer - 50,
      answer + 50,
      answer - 25,
      answer + 25,
      answer - 20,
      answer + 20
    ],
    choiceOffsets: [-100, 100, -50, 50, -25, 25, -20, 20]
  };
}

function createMixedQuestionPlan() {
  const generatorIds = [1, 2, 3, 4, 5, 6, 7, 8];
  const twoExtraTypes = shuffle(generatorIds).slice(0, 2);
  return shuffle([...generatorIds, ...twoExtraTypes]);
}

function generateMixedQuestion() {
  const generatorId = mixedQuestionPlan[currentCustomer - 1];
  return questionGenerators[generatorId]();
}

const questionGenerators = {
  1: () => generateAdditionQuestion(2),
  2: () => generateAdditionQuestion(3),
  3: generateQuantityQuestion,
  4: () => generateChangeQuestion(10, [1, 2], 2),
  5: () => generateChangeQuestion(20, [2, 3], 10),
  6: () => generateQuantityChangeQuestion(20, 5),
  7: generateCentsAdditionQuestion,
  8: generateCentsChangeQuestion,
  9: generateMixedQuestion,
  10: generateMixedQuestion
};

function showScreen(screenName) {
  if (screenName !== "game") stopQuestionTimer();

  const screens = {
    menu: elements.mainMenuScreen,
    levels: elements.levelScreen,
    game: elements.gameScreen,
    results: elements.gameOverScreen
  };

  Object.values(screens).forEach((screen) => screen.classList.add("hidden"));
  elements.gameHeader.classList.toggle("hidden", screenName !== "game");
  screens[screenName].classList.remove("hidden");
}

function showMainMenu() {
  questionLocked = true;
  const savedScores = Object.values(progress.bestScores).filter(Number.isInteger);
  const bestScore = savedScores.length > 0 ? Math.max(...savedScores) : 0;
  elements.menuHighestMission.textContent = `Misi ${progress.highestUnlockedLevel}`;
  elements.menuBestScore.textContent = `${bestScore}/${totalCustomers}`;
  elements.howToCard.classList.add("hidden");
  elements.howToButton.setAttribute("aria-expanded", "false");
  showScreen("menu");
  elements.startMenuButton.focus();
}

function toggleHowTo() {
  const willOpen = elements.howToCard.classList.contains("hidden");
  elements.howToCard.classList.toggle("hidden", !willOpen);
  elements.howToButton.setAttribute("aria-expanded", String(willOpen));
}

function showLevelSelect(message = "") {
  questionLocked = true;
  renderLevelCards();
  elements.levelNotice.textContent = message;
  showScreen("levels");
}

function renderLevelCards() {
  elements.levelGrid.innerHTML = levels.map((level) => {
    const unlocked = level.id <= progress.highestUnlockedLevel;
    const bestScore = progress.bestScores[level.id];
    const played = Number.isInteger(bestScore);
    const newlyUnlocked = unlocked && !played && level.id === progress.highestUnlockedLevel && level.id > 1;
    const scoreText = Number.isInteger(bestScore)
      ? `⭐ Rekod: ${bestScore}/${totalCustomers}`
      : (unlocked ? "Jom cuba!" : "Tunggu giliran!");
    const stateClass = [
      unlocked ? "unlocked" : "locked",
      played ? "played" : "",
      newlyUnlocked ? "newly-unlocked" : "",
      unlocked && !level.implemented ? "coming-soon" : ""
    ].filter(Boolean).join(" ");
    const stateLabel = !unlocked
      ? '<span class="level-lock" aria-hidden="true">🔒</span>'
      : (!level.implemented ? '<span class="coming-label">AKAN DATANG</span>' : "");

    return `
      <button class="level-card ${stateClass}" type="button" data-level="${level.id}"
        ${unlocked ? "" : "disabled"} aria-label="Misi ${level.id}, ${level.name}${unlocked ? "" : ", berkunci"}">
        ${stateLabel}
        <span class="level-number">Misi ${level.id}</span>
        <span class="level-name">${level.name}</span>
        <span class="level-best">${scoreText}</span>
      </button>
    `;
  }).join("");
}

function handleLevelSelection(event) {
  const card = event.target.closest(".level-card");
  if (!card || card.disabled) return;

  const levelId = Number(card.dataset.level);
  const level = levels.find((entry) => entry.id === levelId);
  if (!level || levelId > progress.highestUnlockedLevel) return;

  if (!level.implemented) {
    elements.levelNotice.textContent = `Misi ${levelId} sudah dibuka dan akan datang!`;
    return;
  }

  startGame(levelId);
}

function renderItems(items) {
  elements.itemsList.classList.toggle("three-items", items.length === 3);
  elements.itemsList.innerHTML = items.map((item) => `
    <article class="item-card">
      <span class="item-emoji" aria-hidden="true">${item.emoji}</span>
      <p class="item-name">${item.name}</p>
      <p class="item-price${item.priceCents !== undefined ? " money-cents" : ""}">${item.priceCents !== undefined
        ? formatMoney(item.priceCents)
        : `RM${item.price}`}${item.quantity
        ? ` <span class="item-quantity">× ${item.quantity}</span>`
        : ""}</p>
    </article>
  `).join("");
}

function renderAnswers(choices) {
  elements.answers.innerHTML = choices.map((choice) =>
    `<button class="answer-button" type="button" data-value="${choice}" disabled>${answersUseCents
      ? formatMoney(choice)
      : `RM${choice}`}</button>`
  ).join("");
}

function updateStats() {
  elements.starCount.textContent = stars;
  elements.customerProgress.textContent = `Pelanggan ${currentCustomer} / ${totalCustomers}`;
}

function stopQuestionTimer() {
  if (questionTimerId !== null) {
    clearInterval(questionTimerId);
    questionTimerId = null;
  }
  questionDeadline = 0;
}

function updateQuestionTimer() {
  if (questionLocked || currentLevel !== 10) {
    stopQuestionTimer();
    return;
  }

  const remainingMilliseconds = Math.max(0, questionDeadline - Date.now());
  const remainingSeconds = Math.ceil(remainingMilliseconds / 1000);
  const remainingPercent = (remainingMilliseconds / 20000) * 100;
  elements.timerSeconds.textContent = `${remainingSeconds}s`;
  elements.timerBar.style.width = `${remainingPercent}%`;
  elements.questionTimer.classList.toggle("timer-low", remainingSeconds <= 5);

  if (remainingMilliseconds <= 0) handleTimeExpired();
}

function startQuestionTimer() {
  stopQuestionTimer();
  if (currentLevel !== 10 || questionLocked) return;

  questionDeadline = Date.now() + 20000;
  elements.timerSeconds.textContent = "20s";
  elements.timerBar.style.width = "100%";
  elements.questionTimer.classList.remove("timer-low");
  questionTimerId = setInterval(updateQuestionTimer, 100);
}

function handleTimeExpired() {
  if (questionLocked) return;

  questionLocked = true;
  stopQuestionTimer();
  elements.timerSeconds.textContent = "0s";
  elements.timerBar.style.width = "0%";
  elements.answers.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });
  elements.feedback.textContent = "Masa habis! ⏱️";
  elements.feedback.className = "feedback error";
  audioManager.play("wrong");
  elements.customerPanel.classList.remove("customer-active");
  elements.customerPanel.classList.add("customer-wrong");
}

function newQuestion() {
  stopQuestionTimer();
  questionLocked = true;
  elements.feedback.textContent = "";
  elements.feedback.className = "feedback";
  elements.itemsAndQuestion.classList.add("question-waiting");
  elements.questionTimer.classList.toggle("hidden", currentLevel !== 10);
  elements.timerSeconds.textContent = "20s";
  elements.timerBar.style.width = "100%";
  elements.questionTimer.classList.remove("timer-low");

  const customer = sessionCustomers[currentCustomer - 1];
  const generator = questionGenerators[currentLevel];
  const question = generator();
  correctAnswer = question.answer;
  answersUseCents = Boolean(question.usesCents);

  elements.questionText.textContent = question.questionType === "change"
    ? `Berapa baki ${customer.name}?`
    : "Semua sekali berapa?";
  elements.transactionSummary.classList.toggle("hidden", !question.transaction);
  if (question.transaction) {
    elements.purchaseTotal.textContent = "?";
    elements.paymentAmount.textContent = question.transaction.usesCents
      ? formatMoney(question.transaction.paymentAmount)
      : `RM${question.transaction.paymentAmount}`;
  }

  elements.customerName.textContent = customer.name;
  elements.customerAvatar.classList.remove("hidden");
  elements.avatarFallback.classList.add("hidden");
  elements.customerAvatar.alt = `Avatar ${customer.name}`;
  elements.customerAvatar.src = customer.avatar;
  renderItems(question.items);
  renderAnswers(createAnswerChoices(
    correctAnswer,
    question.distractors,
    question.choiceOffsets
  ));

  elements.customerPanel.className = "customer-panel";
  void elements.customerPanel.offsetWidth;
  elements.customerPanel.classList.add("customer-enter");
}

function getRating(score) {
  if (score === 10) return "Hebat! Pakar Matematik!";
  if (score >= 8) return "Cemerlang!";
  if (score >= 6) return "Bagus!";
  if (score >= 4) return "Teruskan Berlatih!";
  return "Cuba Lagi!";
}

function showGameOver() {
  stopQuestionTimer();
  questionLocked = true;
  const accuracy = Math.round((stars / totalCustomers) * 100);
  const previousBest = progress.bestScores[currentLevel] || 0;
  const previousHighestLevel = progress.highestUnlockedLevel;
  const passed = stars >= 8;

  progress.bestScores[currentLevel] = Math.max(previousBest, stars);
  if (passed && currentLevel < levels.length) {
    progress.highestUnlockedLevel = Math.max(progress.highestUnlockedLevel, currentLevel + 1);
  }
  saveProgress();

  const nextLevelUnlocked = currentLevel < levels.length &&
    progress.highestUnlockedLevel >= currentLevel + 1;
  const passedWithNextLevel = passed && currentLevel < levels.length;
  const unlockedNewMission = progress.highestUnlockedLevel > previousHighestLevel;
  const allMissionsCompleted = passed && currentLevel === levels.length;

  elements.resultLevel.textContent = `Misi ${currentLevel}`;
  elements.finalScore.textContent = `${stars} / ${totalCustomers}`;
  elements.finalAccuracy.textContent = `${accuracy}%`;
  elements.finalBest.textContent = `${progress.bestScores[currentLevel]} / ${totalCustomers}`;
  elements.finalRating.textContent = allMissionsCompleted
    ? "Anda Juruwang Matematik!"
    : getRating(stars);
  elements.levelUnlocked.textContent = allMissionsCompleted
    ? "🏆 Kedai Hebat! Semua Misi Selesai!"
    : "🎉 Misi Baru Dibuka!";
  elements.levelUnlocked.classList.toggle("hidden", !(passedWithNextLevel || allMissionsCompleted));
  elements.nextLevelButton.classList.toggle("hidden", !nextLevelUnlocked);
  showScreen("results");
  audioManager.play(unlockedNewMission ? "missionUnlock" : "sessionComplete");
  elements.playAgainButton.focus();
}

function handleAnswer(event) {
  const button = event.target.closest(".answer-button");
  if (!button || questionLocked) return;

  questionLocked = true;
  stopQuestionTimer();
  const selectedValue = Number(button.dataset.value);
  const isCorrect = selectedValue === correctAnswer;

  if (isCorrect) {
    stars += 1;
    audioManager.play("correct");
    button.classList.add("correct");
    elements.feedback.textContent = praiseMessages[randomIndex(praiseMessages.length)];
    elements.feedback.className = "feedback success";
  } else {
    audioManager.play("wrong");
    button.classList.add("wrong");
    elements.feedback.textContent = tryAgainMessages[randomIndex(tryAgainMessages.length)];
    elements.feedback.className = "feedback error";
  }

  elements.answers.querySelectorAll("button").forEach((answerButton) => {
    answerButton.disabled = true;
  });
  updateStats();
  elements.customerPanel.classList.remove("customer-active");
  elements.customerPanel.classList.add(isCorrect ? "customer-correct" : "customer-wrong");
}

function startGame(levelId = currentLevel) {
  stopQuestionTimer();
  const level = levels.find((entry) => entry.id === levelId);
  if (!level || !level.implemented || levelId > progress.highestUnlockedLevel) return;

  currentLevel = levelId;
  stars = 0;
  currentCustomer = 1;
  sessionCustomers = shuffle(customers);
  mixedQuestionPlan = levelId === 9 || levelId === 10 ? createMixedQuestionPlan() : [];
  questionLocked = true;
  updateStats();
  showScreen("game");
  newQuestion();
}

function handleCustomerAnimationEnd(event) {
  if (event.target !== elements.customerPanel) return;

  if (elements.customerPanel.classList.contains("customer-enter")) {
    elements.customerPanel.classList.remove("customer-enter");
    elements.customerPanel.classList.add("customer-active");
    elements.itemsAndQuestion.classList.remove("question-waiting");
    elements.answers.querySelectorAll("button").forEach((button) => {
      button.disabled = false;
    });
    questionLocked = false;
    audioManager.play("customerIn");
    startQuestionTimer();
    return;
  }

  if (
    elements.customerPanel.classList.contains("customer-correct") ||
    elements.customerPanel.classList.contains("customer-wrong")
  ) {
    elements.customerPanel.classList.remove("customer-correct", "customer-wrong");
    elements.customerPanel.classList.add("customer-exit");
    elements.itemsAndQuestion.classList.add("question-waiting");
    return;
  }

  if (elements.customerPanel.classList.contains("customer-exit")) {
    elements.customerPanel.classList.remove("customer-exit");
    if (currentCustomer >= totalCustomers) {
      showGameOver();
      return;
    }

    currentCustomer += 1;
    updateStats();
    newQuestion();
  }
}

function goToNextLevel() {
  const nextLevelId = currentLevel + 1;
  const nextLevel = levels.find((level) => level.id === nextLevelId);

  if (nextLevel && nextLevel.implemented && nextLevelId <= progress.highestUnlockedLevel) {
    startGame(nextLevelId);
    return;
  }

  showLevelSelect(`Misi ${nextLevelId} sudah dibuka dan akan datang!`);
}

// Semua event listener didaftarkan sekali sahaja.
elements.startMenuButton.addEventListener("click", () => showLevelSelect());
elements.howToButton.addEventListener("click", toggleHowTo);
elements.soundToggleButton.addEventListener("click", toggleSound);
elements.fullscreenButton.addEventListener("click", toggleFullscreen);
document.addEventListener("fullscreenchange", updateFullscreenButton);
document.addEventListener("click", (event) => {
  const mainButton = event.target.closest(
    "#start-menu-button, #back-to-menu-button, #play-again-button, " +
    "#choose-level-button, #next-level-button, .level-card:not(:disabled)"
  );
  if (mainButton) audioManager.play("buttonClick");
});
elements.backToMenuButton.addEventListener("click", showMainMenu);
elements.levelGrid.addEventListener("click", handleLevelSelection);
elements.answers.addEventListener("click", handleAnswer);
elements.playAgainButton.addEventListener("click", () => startGame(currentLevel));
elements.chooseLevelButton.addEventListener("click", () => showLevelSelect());
elements.nextLevelButton.addEventListener("click", goToNextLevel);
elements.customerPanel.addEventListener("animationend", handleCustomerAnimationEnd);
elements.customerAvatar.addEventListener("load", () => {
  elements.customerAvatar.classList.remove("hidden");
  elements.avatarFallback.classList.add("hidden");
});
elements.customerAvatar.addEventListener("error", () => {
  elements.customerAvatar.classList.add("hidden");
  elements.avatarFallback.classList.remove("hidden");
});

elements.helperMessage.textContent = helperMessages[randomIndex(helperMessages.length)];
updateSoundButton();
if (!document.fullscreenEnabled) {
  elements.fullscreenButton.disabled = true;
  elements.fullscreenButton.title = "Skrin penuh tidak disokong";
}
updateFullscreenButton();
renderLevelCards();
showMainMenu();
