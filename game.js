"use strict";

const GAME_VERSION = "1.1.0";
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

const practiceTypes = [
  { id: 1, name: "Tambah 2 Barang" },
  { id: 2, name: "Tambah 3 Barang" },
  { id: 3, name: "Kuantiti Barang" },
  { id: 4, name: "Baki RM10" },
  { id: 5, name: "Baki RM20" },
  { id: 6, name: "Kuantiti & Baki" },
  { id: 7, name: "Wang dan Sen" },
  { id: 8, name: "Sen & Baki" },
  { id: 9, name: "Cabaran Campuran" }
];

const skillDefinitions = [
  { id: "addition", name: "Tambah", icon: "➕", practiceId: 1 },
  { id: "quantity", name: "Kuantiti", icon: "📦", practiceId: 3 },
  { id: "change", name: "Baki", icon: "💰", practiceId: 4 },
  { id: "moneyCents", name: "Wang & Sen", icon: "🪙", practiceId: 7 },
  { id: "mixed", name: "Campuran", icon: "🎯", practiceId: 9 }
];

const levelSkillCategories = {
  1: "addition",
  2: "addition",
  3: "quantity",
  4: "change",
  5: "change",
  6: "change",
  7: "moneyCents",
  8: "moneyCents",
  9: "mixed",
  10: "mixed"
};

const playerAvatars = [
  { id: "avatar-1", icon: "🐻", name: "Beruang Ceria" },
  { id: "avatar-2", icon: "🐱", name: "Kucing Comel" },
  { id: "avatar-3", icon: "🦊", name: "Musang Bijak" },
  { id: "avatar-4", icon: "🐼", name: "Panda Rajin" },
  { id: "avatar-5", icon: "🐰", name: "Arnab Pantas" },
  { id: "avatar-6", icon: "🐯", name: "Harimau Berani" }
];

const playerThemes = [
  { id: "purple", name: "Ungu", color: "#6546c7", dark: "#49319d", soft: "#eee8ff" },
  { id: "blue", name: "Biru", color: "#2688c9", dark: "#17618f", soft: "#e5f6ff" },
  { id: "green", name: "Hijau", color: "#2d9b61", dark: "#207044", soft: "#e8f9e9" },
  { id: "orange", name: "Jingga", color: "#e47b25", dark: "#a95218", soft: "#fff0dc" }
];

const legacyAvatarMap = {
  "😀": "avatar-1", "😎": "avatar-3", "🐻": "avatar-1", "🐱": "avatar-2",
  "🦊": "avatar-3", "⭐": "avatar-4", "🧒": "avatar-5", "👧": "avatar-6"
};

const achievementDefinitions = [
  { id: "firstStar", icon: "⭐", name: "Bintang Pertama", description: "Dapat sekurang-kurangnya 1 bintang dalam misi." },
  { id: "perfectMission", icon: "💯", name: "Sempurna!", description: "Dapat 10/10 dalam satu misi." },
  { id: "efficientCashier", icon: "🔥", name: "Juruwang Cekap", description: "Jawab 10 soalan betul berturut-turut." },
  { id: "halfway", icon: "🚩", name: "Separuh Jalan", description: "Buka sekurang-kurangnya Misi 5." },
  { id: "allMissions", icon: "🗺️", name: "Semua Misi Dibuka", description: "Buka kesemua Misi 1–10." },
  { id: "storeExpert", icon: "🏪", name: "Pakar Kedai", description: "Lulus Misi 10 sekurang-kurangnya sekali." },
  { id: "starCollector", icon: "🌟", name: "Pengumpul Bintang", description: "Kumpul sekurang-kurangnya 20/30 bintang." },
  { id: "starKing", icon: "👑", name: "Raja Bintang", description: "Kumpul 30/30 bintang." }
];

const shopItems = [
  { emoji: "🍞", image: "assets/items/roti.png", name: "Roti", price: 2 },
  { emoji: "🥛", image: "assets/items/susu.png", name: "Susu", price: 4 },
  { emoji: "🍎", image: "assets/items/epal.png", name: "Epal", price: 3 },
  { emoji: "🍌", image: "assets/items/pisang.png", name: "Pisang", price: 2 },
  { emoji: "🥚", image: "assets/items/telur.png", name: "Telur", price: 5 },
  { emoji: "🧃", image: "assets/items/jus.png", name: "Jus", price: 4 },
  { emoji: "🍪", image: "assets/items/biskut.png", name: "Biskut", price: 3 },
  { emoji: "🍫", image: "assets/items/coklat.png", name: "Coklat", price: 5 },
  { emoji: "🧀", image: "assets/items/keju.png", name: "Keju", price: 6 },
  { emoji: "🍚", image: "assets/items/beras.png", name: "Beras", price: 8 },
  { emoji: "🍜", image: "assets/items/mi.png", name: "Mi", price: 3 },
  { emoji: "🥤", image: "assets/items/air-kotak.png", name: "Air Kotak", price: 2 },
  { emoji: "🍊", image: "assets/items/oren.png", name: "Oren", price: 3 },
  { emoji: "🍐", image: "assets/items/pir.png", name: "Pir", price: 4 },
  { emoji: "🍇", image: "assets/items/anggur.png", name: "Anggur", price: 6 },
  { emoji: "🍉", image: "assets/items/tembikai.png", name: "Tembikai", price: 7 },
  { emoji: "🥕", image: "assets/items/lobak.png", name: "Lobak", price: 2 },
  { emoji: "🌽", image: "assets/items/jagung.png", name: "Jagung", price: 3 },
  { emoji: "🥔", image: "assets/items/kentang.png", name: "Kentang", price: 4 },
  { emoji: "🧅", image: "assets/items/bawang.png", name: "Bawang", price: 2 },
  { emoji: "✏️", image: "assets/items/pensel.png", name: "Pensel", price: 1 },
  { emoji: "🖊️", image: "assets/items/pen.png", name: "Pen", price: 2 },
  { emoji: "📒", image: "assets/items/buku-nota.png", name: "Buku Nota", price: 4 },
  { emoji: "🧼", image: "assets/items/sabun.png", name: "Sabun", price: 3 },
  { emoji: "🦷", image: "assets/items/ubat-gigi.png", name: "Ubat Gigi", price: 4 },
  { emoji: "🧻", image: "assets/items/tisu.png", name: "Tisu", price: 3 },
  { emoji: "🧴", image: "assets/items/syampu.png", name: "Syampu", price: 7 },
  { emoji: "🧽", image: "assets/items/span.png", name: "Span", price: 2 }
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
  image: item.image,
  name: item.name,
  priceCents: missionSevenPrices[item.name]
}));

// Kekalkan objek Image ini supaya ikon yang telah dipreload kekal dalam cache browser.
const itemImagePreloadCache = [];

function preloadItemImages() {
  if (itemImagePreloadCache.length > 0) return;

  shopItems.forEach((item) => {
    const image = new Image();
    image.decoding = "async";
    image.src = item.image;
    itemImagePreloadCache.push(image);
  });
}

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

const customerAvatarPreloadCache = [];

function preloadCustomerAvatars() {
  if (customerAvatarPreloadCache.length > 0) return;

  customers.forEach((customer) => {
    const image = new Image();
    image.decoding = "async";
    image.src = customer.avatar;
    customerAvatarPreloadCache.push(image);
  });
}

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
  statsScreen: document.querySelector("#stats-screen"),
  practiceScreen: document.querySelector("#practice-screen"),
  profileScreen: document.querySelector("#profile-screen"),
  achievementsScreen: document.querySelector("#achievements-screen"),
  dailyScreen: document.querySelector("#daily-screen"),
  settingsScreen: document.querySelector("#settings-screen"),
  levelScreen: document.querySelector("#level-screen"),
  gameScreen: document.querySelector("#game-screen"),
  gameOverScreen: document.querySelector("#game-over-screen"),
  startMenuButton: document.querySelector("#start-menu-button"),
  menuHighestMission: document.querySelector("#menu-highest-mission"),
  menuBestScore: document.querySelector("#menu-best-score"),
  howToButton: document.querySelector("#how-to-button"),
  statisticsButton: document.querySelector("#statistics-button"),
  practiceMenuButton: document.querySelector("#practice-menu-button"),
  practiceBackButton: document.querySelector("#practice-back-button"),
  practiceGrid: document.querySelector("#practice-grid"),
  profileMenuButton: document.querySelector("#profile-menu-button"),
  profileSaveButton: document.querySelector("#profile-save-button"),
  profileCancelButton: document.querySelector("#profile-cancel-button"),
  profileNameInput: document.querySelector("#profile-name-input"),
  profilePreviewName: document.querySelector("#profile-preview-name"),
  profilePreviewAvatar: document.querySelector("#profile-preview-avatar"),
  avatarOptions: document.querySelector("#avatar-options"),
  themeOptions: document.querySelector("#theme-options"),
  profileBadges: document.querySelector("#profile-badges"),
  featuredBadgeSelect: document.querySelector("#featured-badge-select"),
  menuPlayerGreeting: document.querySelector("#menu-player-greeting"),
  menuPlayerAvatar: document.querySelector("#menu-player-avatar"),
  menuPlayerBadge: document.querySelector("#menu-player-badge"),
  achievementsMenuButton: document.querySelector("#achievements-menu-button"),
  achievementsBackButton: document.querySelector("#achievements-back-button"),
  achievementsGrid: document.querySelector("#achievements-grid"),
  appVersion: document.querySelector("#app-version"),
  homeGameButton: document.querySelector("#home-game-button"),
  homeModal: document.querySelector("#home-modal"),
  homeConfirmButton: document.querySelector("#home-confirm-button"),
  homeContinueButton: document.querySelector("#home-continue-button"),
  achievementToast: document.querySelector("#achievement-toast"),
  achievementToastName: document.querySelector("#achievement-toast-name"),
  achievementToastDescription: document.querySelector("#achievement-toast-description"),
  dailyMenuButton: document.querySelector("#daily-menu-button"),
  dailyStartButton: document.querySelector("#daily-start-button"),
  dailyBackButton: document.querySelector("#daily-back-button"),
  dailyDate: document.querySelector("#daily-date"),
  dailyStreak: document.querySelector("#daily-streak"),
  dailyLongestStreak: document.querySelector("#daily-longest-streak"),
  dailyBest: document.querySelector("#daily-best"),
  dailyCalendar: document.querySelector("#daily-calendar"),
  dailyCompletedCount: document.querySelector("#daily-completed-count"),
  dailyAverageScore: document.querySelector("#daily-average-score"),
  dailyWeekMessage: document.querySelector("#daily-week-message"),
  dailyStatus: document.querySelector("#daily-status"),
  settingsMenuButton: document.querySelector("#settings-menu-button"),
  settingsForm: document.querySelector("#accessibility-form"),
  settingsSaveButton: document.querySelector("#settings-save-button"),
  settingsBackButton: document.querySelector("#settings-back-button"),
  settingReduceMotion: document.querySelector("#setting-reduce-motion"),
  settingVisualHelp: document.querySelector("#setting-visual-help"),
  settingSoftSound: document.querySelector("#setting-soft-sound"),
  systemMotionNote: document.querySelector("#system-motion-note"),
  statsBackButton: document.querySelector("#stats-back-button"),
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
  visualHelp: document.querySelector("#visual-help"),
  questionText: document.querySelector("#question-text"),
  answers: document.querySelector("#answers"),
  feedback: document.querySelector("#feedback"),
  practiceBadge: document.querySelector("#practice-badge"),
  gameOverTitle: document.querySelector("#game-over-title"),
  resultLevel: document.querySelector("#result-level"),
  finalLabel: document.querySelector("#final-label"),
  finalScoreIcon: document.querySelector("#final-score-icon"),
  finalScore: document.querySelector("#final-score"),
  sessionStars: document.querySelector("#session-stars"),
  newStarRecord: document.querySelector("#new-star-record"),
  finalAccuracy: document.querySelector("#final-accuracy"),
  finalBest: document.querySelector("#final-best"),
  finalRating: document.querySelector("#final-rating"),
  levelUnlocked: document.querySelector("#level-unlocked"),
  playAgainButton: document.querySelector("#play-again-button"),
  chooseLevelButton: document.querySelector("#choose-level-button"),
  nextLevelButton: document.querySelector("#next-level-button"),
  resultMenuButton: document.querySelector("#result-menu-button")
};

const statElements = {
  totalStars: document.querySelector("#stats-total-stars"),
  totalCorrect: document.querySelector("#stats-total-correct"),
  totalQuestions: document.querySelector("#stats-total-questions"),
  accuracy: document.querySelector("#stats-accuracy"),
  bestStreak: document.querySelector("#stats-best-streak"),
  missionsPlayed: document.querySelector("#stats-missions-played"),
  missionsPassed: document.querySelector("#stats-missions-passed"),
  skillGrid: document.querySelector("#skill-stats-grid"),
  skillRecommendation: document.querySelector("#skill-recommendation"),
  skillRecommendationButton: document.querySelector("#skill-recommendation-button")
};

let progress = loadProgress();
applyPlayerTheme(progress.playerProfile.theme);
let gameMode = "mission";
let currentLevel = 1;
let currentPracticeType = 1;
let stars = 0;
let currentCustomer = 1;
let sessionCustomers = [];
let mixedQuestionPlan = [];
let correctAnswer = 0;
let answersUseCents = false;
let questionLocked = true;
let questionTimerId = null;
let questionDeadline = 0;
let currentStreak = 0;
let currentSkillCategory = "mixed";
let selectedProfileAvatar = "avatar-1";
let selectedProfileTheme = "purple";
let randomSource = Math.random;
let activeDailyDate = "";
let sessionActive = false;
let homeModalOpen = false;
let homePausedMilliseconds = 0;
let achievementToastTimer = null;
const achievementToastQueue = [];
const audioManager = createAudioManager();
applyAccessibilitySettings(progress.accessibilitySettings);

function defaultStats() {
  return {
    totalQuestions: 0,
    totalCorrect: 0,
    bestStreak: 0,
    missionsPlayed: 0,
    missionsPassed: 0,
    totalStars: 0
  };
}

function defaultSkillStats() {
  return Object.fromEntries(
    skillDefinitions.map((skill) => [skill.id, { answered: 0, correct: 0 }])
  );
}

function defaultAccessibilitySettings() {
  return { largeText: false, reduceMotion: false, visualHelp: false, softSound: false };
}

function defaultAchievements() {
  return Object.fromEntries(achievementDefinitions.map((achievement) => [achievement.id, false]));
}

function defaultDailyChallenge() {
  return {
    lastCompletedDate: "",
    scoreDate: "",
    bestScore: 0,
    currentStreak: 0,
    longestStreak: 0,
    history: {}
  };
}

function defaultProgress() {
  return {
    highestUnlockedLevel: 1,
    bestScores: {},
    stars: {},
    stats: defaultStats(),
    skillStats: defaultSkillStats(),
    accessibilitySettings: defaultAccessibilitySettings(),
    playerProfile: { name: "Pemain", avatar: "avatar-1", theme: "purple", featuredBadge: "" },
    achievements: defaultAchievements(),
    dailyChallenge: defaultDailyChallenge()
  };
}

function sanitizePlayerName(value) {
  const normalized = typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
  return normalized.slice(0, 20).trim() || "Pemain";
}

function getPlayerAvatar(avatarId) {
  return playerAvatars.find((avatar) => avatar.id === avatarId) || playerAvatars[0];
}

function getPlayerTheme(themeId) {
  return playerThemes.find((theme) => theme.id === themeId) || playerThemes[0];
}

function getAchievement(achievementId) {
  return achievementDefinitions.find((achievement) => achievement.id === achievementId);
}

function applyPlayerTheme(themeId) {
  const theme = getPlayerTheme(themeId);
  const root = document.documentElement;
  root.style.setProperty("--player-accent", theme.color);
  root.style.setProperty("--player-accent-dark", theme.dark);
  root.style.setProperty("--player-accent-soft", theme.soft);
  root.dataset.playerTheme = theme.id;
}

function systemPrefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

function applyAccessibilitySettings(settings) {
  const root = document.documentElement;
  root.classList.toggle("text-large", settings.largeText === true);
  root.classList.toggle("visual-help-on", settings.visualHelp === true);
  root.classList.toggle("reduce-motion", settings.reduceMotion === true || systemPrefersReducedMotion());
  audioManager.setSoft(settings.softSound === true);
}

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object") return defaultProgress();

    const highest = Number(saved.highestUnlockedLevel);
    const highestUnlockedLevel = Number.isInteger(highest)
      ? Math.min(Math.max(highest, 1), levels.length)
      : 1;
    const bestScores = {};
    const savedStars = {};
    const savedStats = defaultStats();
    const savedSkillStats = defaultSkillStats();
    const accessibilitySettings = defaultAccessibilitySettings();
    const achievements = defaultAchievements();
    const dailyChallenge = defaultDailyChallenge();

    if (saved.achievements && typeof saved.achievements === "object") {
      achievementDefinitions.forEach((achievement) => {
        achievements[achievement.id] = saved.achievements[achievement.id] === true;
      });
    }

    const savedAvatar = saved.playerProfile?.avatar;
    const avatarId = playerAvatars.some((avatar) => avatar.id === savedAvatar)
      ? savedAvatar
      : legacyAvatarMap[savedAvatar] || "avatar-1";
    const themeId = playerThemes.some((theme) => theme.id === saved.playerProfile?.theme)
      ? saved.playerProfile.theme
      : "purple";
    const requestedBadge = typeof saved.playerProfile?.featuredBadge === "string"
      ? saved.playerProfile.featuredBadge
      : "";
    const playerProfile = {
      name: sanitizePlayerName(saved.playerProfile?.name),
      avatar: avatarId,
      theme: themeId,
      featuredBadge: achievementDefinitions.some((achievement) =>
        achievement.id === requestedBadge && achievements[achievement.id] === true
      ) ? requestedBadge : ""
    };

    if (saved.dailyChallenge && typeof saved.dailyChallenge === "object") {
      const daily = saved.dailyChallenge;
      const legacyLastDate = isValidDateKey(daily.lastCompletedDate)
        ? daily.lastCompletedDate
        : (isValidDateKey(daily.lastDate) ? daily.lastDate : "");
      const legacyScoreDate = isValidDateKey(daily.scoreDate)
        ? daily.scoreDate
        : (daily.playedToday === true ? legacyLastDate : "");
      dailyChallenge.lastCompletedDate = legacyLastDate;
      dailyChallenge.scoreDate = legacyScoreDate;
      ["bestScore", "currentStreak", "longestStreak"].forEach((key) => {
        const value = Number(daily[key]);
        if (Number.isInteger(value) && value >= 0) dailyChallenge[key] = value;
      });
      dailyChallenge.bestScore = Math.min(dailyChallenge.bestScore, totalCustomers);
      dailyChallenge.longestStreak = Math.max(dailyChallenge.longestStreak, dailyChallenge.currentStreak);

      if (daily.history && typeof daily.history === "object") {
        Object.entries(daily.history).forEach(([date, record]) => {
          if (!isValidDateKey(date) || !record || typeof record !== "object") return;
          const score = Number(record.bestScore);
          if (!Number.isInteger(score) || score < 0 || score > totalCustomers) return;
          dailyChallenge.history[date] = {
            date,
            bestScore: score,
            completed: record.completed === true
          };
        });
      }

      // Migrasi v1: bina rekod tunggal daripada tarikh/skor lama jika sejarah belum wujud.
      if (legacyScoreDate) {
        const previous = dailyChallenge.history[legacyScoreDate];
        dailyChallenge.history[legacyScoreDate] = {
          date: legacyScoreDate,
          bestScore: Math.max(previous?.bestScore || 0, dailyChallenge.bestScore),
          completed: true
        };
      }
      if (legacyLastDate && !dailyChallenge.history[legacyLastDate]) {
        dailyChallenge.history[legacyLastDate] = {
          date: legacyLastDate,
          bestScore: legacyLastDate === legacyScoreDate ? dailyChallenge.bestScore : 0,
          completed: true
        };
      }
      dailyChallenge.history = trimDailyHistory(dailyChallenge.history);
      const latestCompletedDate = Object.entries(dailyChallenge.history)
        .filter(([, record]) => record.completed === true)
        .map(([date]) => date)
        .sort((dateA, dateB) => dateB.localeCompare(dateA))[0] || "";
      if (latestCompletedDate && (!dailyChallenge.lastCompletedDate || latestCompletedDate > dailyChallenge.lastCompletedDate)) {
        dailyChallenge.lastCompletedDate = latestCompletedDate;
      }
      if (!dailyChallenge.scoreDate) dailyChallenge.bestScore = 0;
      if (!dailyChallenge.lastCompletedDate) dailyChallenge.currentStreak = 0;
    }

    if (saved.bestScores && typeof saved.bestScores === "object") {
      levels.forEach((level) => {
        const score = Number(saved.bestScores[level.id]);
        if (Number.isInteger(score) && score >= 0 && score <= totalCustomers) {
          bestScores[level.id] = score;
        }
      });
    }

    // Data lama mungkin belum mempunyai stars; rating bermula kosong tanpa
    // mengubah best score atau tahap tertinggi yang telah dibuka.
    if (saved.stars && typeof saved.stars === "object") {
      levels.forEach((level) => {
        const rating = Number(saved.stars[level.id]);
        if (Number.isInteger(rating) && rating >= 0 && rating <= 3) {
          savedStars[level.id] = rating;
        }
      });
    }

    if (saved.stats && typeof saved.stats === "object") {
      ["totalQuestions", "totalCorrect", "bestStreak", "missionsPlayed", "missionsPassed"].forEach((key) => {
        const value = Number(saved.stats[key]);
        if (Number.isInteger(value) && value >= 0) savedStats[key] = value;
      });
    }

    if (saved.skillStats && typeof saved.skillStats === "object") {
      skillDefinitions.forEach((skill) => {
        const storedSkill = saved.skillStats[skill.id];
        if (!storedSkill || typeof storedSkill !== "object") return;
        const answered = Number(storedSkill.answered);
        const correct = Number(storedSkill.correct);
        if (Number.isInteger(answered) && answered >= 0) {
          savedSkillStats[skill.id].answered = answered;
        }
        if (Number.isInteger(correct) && correct >= 0) {
          savedSkillStats[skill.id].correct = Math.min(correct, savedSkillStats[skill.id].answered);
        }
      });
    }

    if (saved.accessibilitySettings && typeof saved.accessibilitySettings === "object") {
      Object.keys(accessibilitySettings).forEach((key) => {
        if (typeof saved.accessibilitySettings[key] === "boolean") {
          accessibilitySettings[key] = saved.accessibilitySettings[key];
        }
      });
    }

    savedStats.totalCorrect = Math.min(savedStats.totalCorrect, savedStats.totalQuestions);
    savedStats.totalStars = Object.values(savedStars).reduce((total, rating) => total + rating, 0);

    // Migrasi senyap: data lama yang sudah memenuhi syarat dipaparkan sebagai
    // dibuka tanpa menghasilkan rentetan toast ketika game mula dimuatkan.
    achievements.firstStar ||= savedStats.totalStars >= 1;
    achievements.perfectMission ||= Object.values(bestScores).some((score) => score === 10);
    achievements.efficientCashier ||= savedStats.bestStreak >= 10;
    achievements.halfway ||= highestUnlockedLevel >= 5;
    achievements.allMissions ||= highestUnlockedLevel >= levels.length;
    achievements.storeExpert ||= Number(bestScores[10]) >= 8;
    achievements.starCollector ||= savedStats.totalStars >= 20;
    achievements.starKing ||= savedStats.totalStars >= 30;
    if (!playerProfile.featuredBadge && achievementDefinitions.some((achievement) =>
      achievement.id === requestedBadge && achievements[achievement.id] === true
    )) {
      playerProfile.featuredBadge = requestedBadge;
    }

    return {
      highestUnlockedLevel,
      bestScores,
      stars: savedStars,
      stats: savedStats,
      skillStats: savedSkillStats,
      accessibilitySettings,
      playerProfile,
      achievements,
      dailyChallenge
    };
  } catch (error) {
    return defaultProgress();
  }
}

function saveProgress() {
  progress.stats.totalStars = calculateTotalStars();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    // Game masih boleh dimainkan jika storage disekat atau penuh.
  }
}

function calculateTotalStars() {
  return Object.values(progress.stars).reduce((total, rating) => total + rating, 0);
}

function queueAchievementNotification(achievement) {
  achievementToastQueue.push(achievement);
  if (!achievementToastTimer) showNextAchievementToast();
}

function showNextAchievementToast() {
  const achievement = achievementToastQueue.shift();
  if (!achievement) {
    achievementToastTimer = null;
    elements.achievementToast.classList.add("hidden");
    return;
  }

  elements.achievementToastName.textContent = achievement.name;
  elements.achievementToastDescription.textContent = achievement.description;
  elements.achievementToast.classList.remove("hidden");
  audioManager.play("missionUnlock");
  achievementToastTimer = setTimeout(() => {
    elements.achievementToast.classList.add("hidden");
    achievementToastTimer = setTimeout(showNextAchievementToast, 250);
  }, 3000);
}

function checkAchievements({ missionScore = null, missionLevel = null, missionPassed = false, allowMissionAchievements = false } = {}) {
  const totalStars = calculateTotalStars();
  const conditions = {
    efficientCashier: progress.stats.bestStreak >= 10
  };

  if (allowMissionAchievements) {
    Object.assign(conditions, {
      firstStar: totalStars >= 1,
      perfectMission: missionScore === 10,
      halfway: progress.highestUnlockedLevel >= 5,
      allMissions: progress.highestUnlockedLevel >= levels.length,
      storeExpert: missionLevel === 10 && missionPassed,
      starCollector: totalStars >= 20,
      starKing: totalStars >= 30
    });
  }

  let unlockedCount = 0;
  achievementDefinitions.forEach((achievement) => {
    if (conditions[achievement.id] && !progress.achievements[achievement.id]) {
      progress.achievements[achievement.id] = true;
      queueAchievementNotification(achievement);
      unlockedCount += 1;
    }
  });
  return unlockedCount;
}

function recordQuestionResult(isCorrect) {
  progress.stats.totalQuestions += 1;
  const skillRecord = progress.skillStats[currentSkillCategory] || progress.skillStats.mixed;
  skillRecord.answered += 1;

  if (isCorrect) {
    progress.stats.totalCorrect += 1;
    skillRecord.correct += 1;
    currentStreak += 1;
    progress.stats.bestStreak = Math.max(progress.stats.bestStreak, currentStreak);
  } else {
    currentStreak = 0;
  }

  checkAchievements({ allowMissionAchievements: false });
  saveProgress();
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
  const normalVolume = 0.55;
  const softVolume = 0.27;
  let soft = progress.accessibilitySettings.softSound === true;

  Object.entries(audioFiles).forEach(([name, source]) => {
    try {
      const audio = new Audio(source);
      audio.preload = "metadata";
      audio.volume = soft ? softVolume : normalVolume;
      sounds[name] = audio;
    } catch (error) {
      // Audio mungkin tidak disokong; manager akan kekal senyap.
    }
  });

  return {
    enabled: loadSoundPreference(),

    get soft() {
      return soft;
    },

    get volume() {
      return soft ? softVolume : normalVolume;
    },

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
    },

    setSoft(value) {
      soft = Boolean(value);
      Object.values(sounds).forEach((sound) => {
        sound.volume = soft ? softVolume : normalVolume;
      });
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
  selectedProfileAvatar = progress.playerProfile.avatar;
  selectedProfileTheme = progress.playerProfile.theme;
  applyPlayerTheme(progress.playerProfile.theme);
  applyAccessibilitySettings(progress.accessibilitySettings);
  gameMode = "mission";
  randomSource = Math.random;
  activeDailyDate = "";
  currentLevel = 1;
  currentStreak = 0;
  renderLevelCards();
  return progress;
}

// Didedahkan untuk kegunaan development melalui browser console.
window.resetProgress = resetProgress;

function randomIndex(length) {
  return Math.floor(randomSource() * length);
}

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function localDateFromKey(dateKey) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return null;
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day, 12, 0, 0, 0);
  return getLocalDateKey(date) === dateKey ? date : null;
}

function isValidDateKey(dateKey) {
  return typeof dateKey === "string" && localDateFromKey(dateKey) !== null;
}

function addLocalDays(date, amount) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount, 12, 0, 0, 0);
}

function getLastSevenLocalDays(referenceDate = new Date()) {
  const localToday = new Date(
    referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate(), 12, 0, 0, 0
  );
  return Array.from({ length: 7 }, (_, index) => addLocalDays(localToday, index - 6));
}

function trimDailyHistory(history, maximumDays = 14) {
  return Object.fromEntries(
    Object.entries(history)
      .filter(([date]) => isValidDateKey(date))
      .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
      .slice(0, maximumDays)
  );
}

function formatLocalDate(date = new Date()) {
  return new Intl.DateTimeFormat("ms-MY", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

function dateKeyOrdinal(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return Math.floor(Date.UTC(year, month - 1, day) / 86400000);
}

function createDateSeededRandom(dateKey) {
  let seed = 2166136261;
  for (const character of dateKey) {
    seed ^= character.charCodeAt(0);
    seed = Math.imul(seed, 16777619);
  }

  return function seededRandom() {
    seed += 0x6D2B79F5;
    let value = seed;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
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
  return {
    ...questionGenerators[generatorId](),
    skillCategory: levelSkillCategories[generatorId] || "mixed"
  };
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
    stats: elements.statsScreen,
    practice: elements.practiceScreen,
    profile: elements.profileScreen,
    achievements: elements.achievementsScreen,
    daily: elements.dailyScreen,
    settings: elements.settingsScreen,
    levels: elements.levelScreen,
    game: elements.gameScreen,
    results: elements.gameOverScreen
  };

  Object.values(screens).forEach((screen) => screen.classList.add("hidden"));
  elements.gameHeader.classList.toggle("hidden", screenName !== "game");
  screens[screenName].classList.remove("hidden");
}

function showSettings() {
  const settings = progress.accessibilitySettings;
  const textSize = settings.largeText ? "large" : "normal";
  const textSizeInput = elements.settingsForm.querySelector(`input[name="text-size"][value="${textSize}"]`);
  if (textSizeInput) textSizeInput.checked = true;
  elements.settingReduceMotion.checked = settings.reduceMotion;
  elements.settingVisualHelp.checked = settings.visualHelp;
  elements.settingSoftSound.checked = settings.softSound;
  elements.systemMotionNote.classList.toggle("hidden", !systemPrefersReducedMotion());
  showScreen("settings");
  textSizeInput?.focus();
}

function saveAccessibilitySettings(event) {
  event.preventDefault();
  progress.accessibilitySettings = {
    largeText: elements.settingsForm.elements["text-size"].value === "large",
    reduceMotion: elements.settingReduceMotion.checked,
    visualHelp: elements.settingVisualHelp.checked,
    softSound: elements.settingSoftSound.checked
  };
  applyAccessibilitySettings(progress.accessibilitySettings);
  saveProgress();
  showMainMenu();
}

function showDailyChallenge() {
  const today = getLocalDateKey();
  const daily = progress.dailyChallenge;
  const todayRecord = daily.history[today];
  const playedToday = todayRecord?.completed === true;
  const sevenDays = getLastSevenLocalDays();
  const completedRecords = sevenDays
    .map((date) => daily.history[getLocalDateKey(date)])
    .filter((record) => record?.completed === true);
  const averageScore = completedRecords.length > 0
    ? completedRecords.reduce((total, record) => total + record.bestScore, 0) / completedRecords.length
    : 0;
  const lastCompletedDifference = daily.lastCompletedDate
    ? dateKeyOrdinal(today) - dateKeyOrdinal(daily.lastCompletedDate)
    : Number.POSITIVE_INFINITY;
  const visibleCurrentStreak = lastCompletedDifference === 0 || lastCompletedDifference === 1
    ? daily.currentStreak
    : 0;

  elements.dailyDate.textContent = formatLocalDate();
  elements.dailyStreak.textContent = `${visibleCurrentStreak} hari`;
  elements.dailyLongestStreak.textContent = `${daily.longestStreak} hari`;
  elements.dailyBest.textContent = playedToday
    ? `${todayRecord.bestScore}/${totalCustomers}`
    : "Belum cuba hari ini";
  elements.dailyCompletedCount.textContent = `${completedRecords.length} / 7`;
  elements.dailyAverageScore.textContent = completedRecords.length > 0
    ? `${averageScore.toFixed(1)} / ${totalCustomers}`
    : "—";
  elements.dailyWeekMessage.textContent = completedRecords.length > 0
    ? `${completedRecords.length} hari sudah dicatat. Teruskan!`
    : "Belum cukup data. Jom mula hari ini!";
  elements.dailyCalendar.innerHTML = sevenDays.map((date) => {
    const dateKey = getLocalDateKey(date);
    const record = daily.history[dateKey];
    const isToday = dateKey === today;
    const completed = record?.completed === true;
    const statusIcon = isToday ? (completed ? "🔥✅" : "🔥") : (completed ? "✅" : "—");
    const statusText = isToday
      ? (completed ? "Hari ini selesai" : "Hari ini belum dimainkan")
      : (completed ? "Selesai" : "Tiada rekod");
    const weekday = new Intl.DateTimeFormat("ms-MY", { weekday: "short" })
      .format(date).replace(".", "").toUpperCase();
    return `
      <article class="daily-day${isToday ? " today" : ""}${completed ? " completed" : " missed"}"
        aria-label="${weekday} ${date.getDate()}: ${statusText}${completed ? `, skor ${record.bestScore} daripada ${totalCustomers}` : ""}">
        <strong>${weekday}</strong>
        <small>${date.getDate()}</small>
        <span aria-hidden="true">${statusIcon}</span>
        <em>${statusText}</em>
        ${completed ? `<b>${record.bestScore}/${totalCustomers}</b>` : "<b>—</b>"}
      </article>
    `;
  }).join("");
  elements.dailyStatus.textContent = playedToday
    ? "Cabaran hari ini sudah selesai. Boleh cuba naikkan skor!"
    : "10 soalan campuran menanti kamu!";
  elements.dailyStartButton.textContent = playedToday ? "CUBA LAGI" : "MULA CABARAN";
  showScreen("daily");
  elements.dailyStartButton.focus();
}

function startDailyChallenge() {
  activeDailyDate = getLocalDateKey();
  startGame(9, "daily");
}

function completeDailyChallenge(score) {
  const daily = progress.dailyChallenge;
  const challengeDate = activeDailyDate || getLocalDateKey();

  const previousRecord = daily.history[challengeDate];
  if (previousRecord?.completed !== true) {
    const dayDifference = daily.lastCompletedDate
      ? dateKeyOrdinal(challengeDate) - dateKeyOrdinal(daily.lastCompletedDate)
      : 0;
    daily.currentStreak = dayDifference === 1 ? daily.currentStreak + 1 : 1;
    daily.longestStreak = Math.max(daily.longestStreak, daily.currentStreak);
    daily.lastCompletedDate = challengeDate;
  }

  const bestScore = Math.max(previousRecord?.bestScore || 0, score);
  daily.history[challengeDate] = { date: challengeDate, bestScore, completed: true };
  daily.history = trimDailyHistory(daily.history);
  daily.scoreDate = challengeDate;
  daily.bestScore = bestScore;

  saveProgress();
  return daily;
}

function getAchievementProgress(achievementId) {
  const totalStars = calculateTotalStars();
  if (achievementId === "starCollector") return `${Math.min(totalStars, 20)} / 20 bintang`;
  if (achievementId === "starKing") return `${Math.min(totalStars, 30)} / 30 bintang`;
  if (achievementId === "efficientCashier") return `${Math.min(progress.stats.bestStreak, 10)} / 10 berturut-turut`;
  return "";
}

function renderAchievements() {
  elements.achievementsGrid.innerHTML = achievementDefinitions.map((achievement) => {
    const unlocked = progress.achievements[achievement.id] === true;
    const numericProgress = getAchievementProgress(achievement.id);
    return `
      <article class="achievement-card ${unlocked ? "unlocked" : "locked"}">
        <span class="achievement-icon" aria-hidden="true">${unlocked ? achievement.icon : "🔒"}</span>
        <h3>${achievement.name}</h3>
        <p>${achievement.description}</p>
        ${numericProgress ? `<small>${numericProgress}</small>` : ""}
        <strong>${unlocked ? "✅ Dibuka" : "Belum dibuka"}</strong>
      </article>
    `;
  }).join("");
}

function showAchievements() {
  renderAchievements();
  showScreen("achievements");
  elements.achievementsBackButton.focus();
}

function updateProfilePreview() {
  const name = sanitizePlayerName(elements.profileNameInput.value);
  elements.profilePreviewName.textContent = name;
  elements.profilePreviewAvatar.textContent = getPlayerAvatar(selectedProfileAvatar).icon;
  elements.avatarOptions.querySelectorAll(".avatar-option").forEach((button) => {
    const selected = button.dataset.avatar === selectedProfileAvatar;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  elements.themeOptions.querySelectorAll(".theme-option").forEach((button) => {
    const selected = button.dataset.theme === selectedProfileTheme;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function renderAvatarOptions() {
  elements.avatarOptions.innerHTML = playerAvatars.map((avatar) => `
    <button class="avatar-option" type="button" data-avatar="${avatar.id}" aria-label="Pilih avatar ${avatar.name}" aria-pressed="false">
      <span aria-hidden="true">${avatar.icon}</span><small>${avatar.name}</small>
    </button>
  `).join("");
}

function renderThemeOptions() {
  elements.themeOptions.innerHTML = playerThemes.map((theme) => `
    <button class="theme-option" type="button" data-theme="${theme.id}" aria-label="Pilih tema ${theme.name}" aria-pressed="false">
      <span style="--theme-swatch: ${theme.color}" aria-hidden="true"></span>${theme.name}
    </button>
  `).join("");
}

function renderProfileBadges() {
  const unlocked = achievementDefinitions.filter((achievement) => progress.achievements[achievement.id] === true);
  elements.profileBadges.innerHTML = unlocked.length
    ? unlocked.map((achievement) => `<span class="profile-badge-chip">${achievement.icon} ${achievement.name}</span>`).join("")
    : "<p>Belum ada badge. Jom main lagi!</p>";

  elements.featuredBadgeSelect.innerHTML = [
    '<option value="">Tiada badge utama</option>',
    ...unlocked.map((achievement) => `<option value="${achievement.id}">${achievement.icon} ${achievement.name}</option>`)
  ].join("");
  elements.featuredBadgeSelect.value = unlocked.some((achievement) =>
    achievement.id === progress.playerProfile.featuredBadge
  ) ? progress.playerProfile.featuredBadge : "";
}

function showPlayerProfile() {
  selectedProfileAvatar = progress.playerProfile.avatar;
  selectedProfileTheme = progress.playerProfile.theme;
  elements.profileNameInput.value = progress.playerProfile.name;
  renderAvatarOptions();
  renderThemeOptions();
  renderProfileBadges();
  applyPlayerTheme(selectedProfileTheme);
  updateProfilePreview();
  showScreen("profile");
  elements.profileNameInput.focus();
}

function handleAvatarSelection(event) {
  const button = event.target.closest(".avatar-option");
  if (!button || !playerAvatars.some((avatar) => avatar.id === button.dataset.avatar)) return;
  selectedProfileAvatar = button.dataset.avatar;
  updateProfilePreview();
}

function handleThemeSelection(event) {
  const button = event.target.closest(".theme-option");
  if (!button || !playerThemes.some((theme) => theme.id === button.dataset.theme)) return;
  selectedProfileTheme = button.dataset.theme;
  applyPlayerTheme(selectedProfileTheme);
  updateProfilePreview();
}

function savePlayerProfile() {
  const requestedBadge = elements.featuredBadgeSelect.value;
  const featuredBadge = achievementDefinitions.some((achievement) =>
    achievement.id === requestedBadge && progress.achievements[achievement.id] === true
  ) ? requestedBadge : "";
  progress.playerProfile = {
    name: sanitizePlayerName(elements.profileNameInput.value),
    avatar: playerAvatars.some((avatar) => avatar.id === selectedProfileAvatar) ? selectedProfileAvatar : "avatar-1",
    theme: playerThemes.some((theme) => theme.id === selectedProfileTheme) ? selectedProfileTheme : "purple",
    featuredBadge
  };
  applyPlayerTheme(progress.playerProfile.theme);
  saveProgress();
  showMainMenu();
}

function renderPracticeCards() {
  elements.practiceGrid.innerHTML = practiceTypes.map((practice) => `
    <button class="practice-card" type="button" data-practice="${practice.id}">
      <span class="practice-number">Latihan ${practice.id}</span>
      <strong>${practice.name}</strong>
      <span>10 soalan</span>
    </button>
  `).join("");
}

function showPracticeSelect() {
  questionLocked = true;
  renderPracticeCards();
  showScreen("practice");
  elements.practiceBackButton.focus();
}

function handlePracticeSelection(event) {
  const card = event.target.closest(".practice-card");
  if (!card) return;

  const practiceId = Number(card.dataset.practice);
  if (!practiceTypes.some((practice) => practice.id === practiceId)) return;
  startGame(practiceId, "practice");
}

function showStatistics() {
  const stats = progress.stats;
  const accuracy = stats.totalQuestions > 0
    ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100)
    : 0;

  statElements.totalStars.textContent = `${calculateTotalStars()} / ${levels.length * 3}`;
  statElements.totalCorrect.textContent = stats.totalCorrect;
  statElements.totalQuestions.textContent = stats.totalQuestions;
  statElements.accuracy.textContent = `${accuracy}%`;
  statElements.bestStreak.textContent = stats.bestStreak;
  statElements.missionsPlayed.textContent = stats.missionsPlayed;
  statElements.missionsPassed.textContent = stats.missionsPassed;
  renderSkillStatistics();
  showScreen("stats");
  elements.statsBackButton.focus();
}

function getSkillAccuracy(skillRecord) {
  return skillRecord.answered > 0
    ? Math.round((skillRecord.correct / skillRecord.answered) * 100)
    : 0;
}

function getSkillStatus(accuracy, answered) {
  if (answered === 0) return "Belum ada data";
  if (accuracy >= 90) return "Hebat!";
  if (accuracy >= 75) return "Bagus";
  if (accuracy >= 60) return "Teruskan berlatih";
  return "Jom latihan lagi";
}

function renderSkillStatistics() {
  statElements.skillGrid.replaceChildren();

  skillDefinitions.forEach((skill) => {
    const record = progress.skillStats[skill.id];
    const accuracy = getSkillAccuracy(record);
    const card = document.createElement("article");
    card.className = "skill-stat-card";
    card.innerHTML = `
      <div class="skill-stat-heading"><span aria-hidden="true">${skill.icon}</span><strong>${skill.name}</strong></div>
      <div class="skill-stat-score">${accuracy}%</div>
      <div class="skill-progress" role="progressbar" aria-label="Ketepatan ${skill.name}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${accuracy}">
        <span style="width: ${accuracy}%"></span>
      </div>
      <small>${record.correct} betul / ${record.answered} soalan</small>
      <em>${getSkillStatus(accuracy, record.answered)}</em>
    `;
    statElements.skillGrid.append(card);
  });

  const recommendation = skillDefinitions
    .map((skill) => ({ ...skill, ...progress.skillStats[skill.id], accuracy: getSkillAccuracy(progress.skillStats[skill.id]) }))
    .filter((skill) => skill.answered >= 5)
    .sort((a, b) => a.accuracy - b.accuracy || b.answered - a.answered)[0];

  if (!recommendation) {
    statElements.skillRecommendation.textContent = "Main beberapa misi lagi untuk dapat cadangan latihan.";
    statElements.skillRecommendationButton.classList.add("hidden");
    statElements.skillRecommendationButton.removeAttribute("data-practice");
    return;
  }

  statElements.skillRecommendation.textContent = `Cadangan hari ini: Latihan ${recommendation.name}`;
  statElements.skillRecommendationButton.textContent = `Latihan ${recommendation.name}`;
  statElements.skillRecommendationButton.dataset.practice = recommendation.practiceId;
  statElements.skillRecommendationButton.classList.remove("hidden");
}

function startRecommendedPractice() {
  const practiceId = Number(statElements.skillRecommendationButton.dataset.practice);
  if (!practiceTypes.some((practice) => practice.id === practiceId)) return;
  startGame(practiceId, "practice");
}

function showMainMenu() {
  questionLocked = true;
  const savedScores = Object.values(progress.bestScores).filter(Number.isInteger);
  const bestScore = savedScores.length > 0 ? Math.max(...savedScores) : 0;
  elements.menuHighestMission.textContent = `Misi ${progress.highestUnlockedLevel}`;
  elements.menuBestScore.textContent = `${bestScore}/${totalCustomers}`;
  applyPlayerTheme(progress.playerProfile.theme);
  elements.menuPlayerAvatar.textContent = getPlayerAvatar(progress.playerProfile.avatar).icon;
  elements.menuPlayerGreeting.textContent = `Hai, ${progress.playerProfile.name}!`;
  const featuredBadge = getAchievement(progress.playerProfile.featuredBadge);
  const badgeIsValid = featuredBadge && progress.achievements[featuredBadge.id] === true;
  elements.menuPlayerBadge.textContent = badgeIsValid ? `${featuredBadge.icon} ${featuredBadge.name}` : "";
  elements.menuPlayerBadge.classList.toggle("hidden", !badgeIsValid);
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
    const starRating = progress.stars[level.id] || 0;
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
        <span class="level-stars" aria-label="${starRating} daripada 3 bintang">${formatStarRating(starRating)}</span>
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

  startGame(levelId, "mission");
}

function renderItems(items) {
  elements.itemsList.classList.toggle("three-items", items.length === 3);
  elements.itemsList.innerHTML = items.map((item) => `
    <article class="item-card">
      <div class="item-visual">
        <img class="item-image" src="${item.image}" alt="${item.name}" decoding="async">
        <span class="item-emoji item-image-fallback hidden" aria-hidden="true">${item.emoji}</span>
      </div>
      <p class="item-name">${item.name}</p>
      <p class="item-price${item.priceCents !== undefined ? " money-cents" : ""}">${item.priceCents !== undefined
        ? formatMoney(item.priceCents)
        : `RM${item.price}`}${item.quantity
        ? ` <span class="item-quantity">× ${item.quantity}</span>`
        : ""}</p>
      ${item.quantity ? `<span class="visual-unit-label">${item.quantity} unit</span>` : ""}
    </article>
  `).join("");
}

function renderVisualHelp(question) {
  const hints = [];
  if (question.items.some((item) => item.quantity)) {
    hints.push("📦 Darab harga seunit dengan bilangan unit.");
  }
  if (question.transaction) {
    hints.push("💳 Bayar → kira Jumlah sendiri → cari Baki.");
  }
  if (question.usesCents) {
    hints.push("🪙 RM ialah Ringgit; dua angka selepas titik ialah sen.");
  }
  elements.visualHelp.textContent = hints.join("  ");
  elements.visualHelp.classList.toggle(
    "hidden",
    !progress.accessibilitySettings.visualHelp || hints.length === 0
  );
}

function handleItemImageError(event) {
  const image = event.target.closest?.(".item-image");
  if (!image) return;

  image.classList.add("hidden");
  const fallback = image.nextElementSibling;
  if (fallback?.classList.contains("item-image-fallback")) {
    fallback.classList.remove("hidden");
  }
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

function isTimedMission() {
  return gameMode === "mission" && currentLevel === 10;
}

function updateQuestionTimer() {
  if (questionLocked || !isTimedMission()) {
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

function startQuestionTimer(durationMilliseconds = 20000) {
  stopQuestionTimer();
  if (!isTimedMission() || questionLocked) return;

  questionDeadline = Date.now() + durationMilliseconds;
  elements.timerSeconds.textContent = `${Math.ceil(durationMilliseconds / 1000)}s`;
  elements.timerBar.style.width = `${(durationMilliseconds / 20000) * 100}%`;
  elements.questionTimer.classList.remove("timer-low");
  questionTimerId = setInterval(updateQuestionTimer, 100);
}

function handleTimeExpired() {
  if (questionLocked) return;

  questionLocked = true;
  elements.homeGameButton.disabled = true;
  recordQuestionResult(false);
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
  elements.homeGameButton.disabled = true;
  elements.feedback.textContent = "";
  elements.feedback.className = "feedback";
  elements.itemsAndQuestion.classList.add("question-waiting");
  elements.questionTimer.classList.toggle("hidden", !isTimedMission());
  elements.timerSeconds.textContent = "20s";
  elements.timerBar.style.width = "100%";
  elements.questionTimer.classList.remove("timer-low");

  const customer = sessionCustomers[currentCustomer - 1];
  const generator = questionGenerators[currentLevel];
  const question = generator();
  correctAnswer = question.answer;
  answersUseCents = Boolean(question.usesCents);
  currentSkillCategory = question.skillCategory || levelSkillCategories[currentLevel] || "mixed";

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
  renderVisualHelp(question);
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

function getStarRating(score) {
  if (score === 10) return 3;
  if (score >= 8) return 2;
  if (score >= 6) return 1;
  return 0;
}

function formatStarRating(rating) {
  const safeRating = Math.min(Math.max(Number(rating) || 0, 0), 3);
  return `${"⭐".repeat(safeRating)}${"☆".repeat(3 - safeRating)}`;
}

function showPracticeGameOver() {
  sessionActive = false;
  elements.homeGameButton.disabled = true;
  const accuracy = Math.round((stars / totalCustomers) * 100);
  const practice = practiceTypes.find((entry) => entry.id === currentPracticeType);

  elements.gameOverTitle.textContent = "LATIHAN SELESAI!";
  elements.resultLevel.textContent = `Latihan: ${practice?.name || "Cabaran"}`;
  elements.finalLabel.textContent = "Skor latihan";
  elements.finalScoreIcon.textContent = "🎯";
  elements.finalScore.textContent = `${stars} / ${totalCustomers}`;
  elements.finalAccuracy.textContent = `${accuracy}%`;
  elements.sessionStars.classList.add("hidden");
  elements.newStarRecord.classList.add("hidden");
  elements.finalBest.closest(".final-best").classList.add("hidden");
  elements.finalRating.classList.add("hidden");
  elements.levelUnlocked.classList.add("hidden");
  elements.nextLevelButton.classList.add("hidden");
  elements.playAgainButton.textContent = "Latih Lagi";
  elements.chooseLevelButton.textContent = "Pilih Latihan";
  elements.resultMenuButton.classList.remove("hidden");
  elements.chooseLevelButton.classList.remove("hidden");
  showScreen("results");
  audioManager.play("sessionComplete");
  elements.playAgainButton.focus();
}

function showDailyGameOver() {
  sessionActive = false;
  elements.homeGameButton.disabled = true;
  const accuracy = Math.round((stars / totalCustomers) * 100);
  const daily = completeDailyChallenge(stars);

  elements.gameOverTitle.textContent = "CABARAN SELESAI!";
  elements.resultLevel.textContent = formatLocalDate(new Date(`${activeDailyDate}T12:00:00`));
  elements.finalLabel.textContent = "Skor cabaran";
  elements.finalScoreIcon.textContent = "☀️";
  elements.finalScore.textContent = `${stars} / ${totalCustomers}`;
  elements.finalAccuracy.textContent = `${accuracy}%`;
  elements.finalBest.closest(".final-best").classList.remove("hidden");
  elements.finalBest.closest(".final-best").firstChild.textContent = "Terbaik Hari Ini: ";
  elements.finalBest.textContent = `${daily.bestScore} / ${totalCustomers}`;
  elements.finalRating.classList.toggle("hidden", stars !== 10);
  elements.finalRating.textContent = "🌟 Sempurna Hari Ini!";
  elements.sessionStars.classList.add("hidden");
  elements.newStarRecord.classList.add("hidden");
  elements.levelUnlocked.classList.remove("hidden");
  elements.levelUnlocked.textContent = `🔥 Streak: ${daily.currentStreak} hari`;
  elements.nextLevelButton.classList.add("hidden");
  elements.chooseLevelButton.classList.add("hidden");
  elements.playAgainButton.textContent = "Cuba Lagi";
  elements.resultMenuButton.classList.remove("hidden");
  showScreen("results");
  audioManager.play("sessionComplete");
  elements.playAgainButton.focus();
}

function showGameOver() {
  stopQuestionTimer();
  questionLocked = true;
  if (gameMode === "practice") {
    showPracticeGameOver();
    return;
  }
  if (gameMode === "daily") {
    showDailyGameOver();
    return;
  }

  sessionActive = false;
  elements.homeGameButton.disabled = true;

  const accuracy = Math.round((stars / totalCustomers) * 100);
  const previousBest = progress.bestScores[currentLevel] || 0;
  const previousBestStars = progress.stars[currentLevel] || 0;
  const sessionStarRating = getStarRating(stars);
  const isNewStarRecord = sessionStarRating > previousBestStars;
  const previousHighestLevel = progress.highestUnlockedLevel;
  const passed = stars >= 8;

  progress.bestScores[currentLevel] = Math.max(previousBest, stars);
  progress.stars[currentLevel] = Math.max(previousBestStars, sessionStarRating);
  progress.stats.missionsPlayed += 1;
  if (passed) progress.stats.missionsPassed += 1;
  if (passed && currentLevel < levels.length) {
    progress.highestUnlockedLevel = Math.max(progress.highestUnlockedLevel, currentLevel + 1);
  }
  const unlockedAchievementCount = checkAchievements({
    missionScore: stars,
    missionLevel: currentLevel,
    missionPassed: passed,
    allowMissionAchievements: true
  });
  saveProgress();

  const nextLevelUnlocked = currentLevel < levels.length &&
    progress.highestUnlockedLevel >= currentLevel + 1;
  const passedWithNextLevel = passed && currentLevel < levels.length;
  const unlockedNewMission = progress.highestUnlockedLevel > previousHighestLevel;
  const allMissionsCompleted = passed && currentLevel === levels.length;

  elements.gameOverTitle.textContent = "KEDAI TUTUP SEKEJAP!";
  elements.finalLabel.textContent = "Keputusan kamu";
  elements.finalScoreIcon.textContent = "⭐";
  elements.resultLevel.textContent = `Misi ${currentLevel}`;
  elements.finalScore.textContent = `${stars} / ${totalCustomers}`;
  elements.sessionStars.textContent = formatStarRating(sessionStarRating);
  elements.sessionStars.setAttribute("aria-label", `${sessionStarRating} daripada 3 bintang`);
  elements.newStarRecord.classList.toggle("hidden", !isNewStarRecord);
  elements.sessionStars.classList.remove("hidden");
  elements.finalBest.closest(".final-best").classList.remove("hidden");
  elements.finalRating.classList.remove("hidden");
  elements.playAgainButton.textContent = "Main Lagi";
  elements.chooseLevelButton.textContent = "Pilih Misi";
  elements.chooseLevelButton.classList.remove("hidden");
  elements.resultMenuButton.classList.add("hidden");
  elements.finalAccuracy.textContent = `${accuracy}%`;
  elements.finalBest.closest(".final-best").firstChild.textContent = "Rekod Terbaik: ";
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
  if (unlockedAchievementCount === 0) {
    audioManager.play(unlockedNewMission ? "missionUnlock" : "sessionComplete");
  }
  elements.playAgainButton.focus();
}

function handleAnswer(event) {
  const button = event.target.closest(".answer-button");
  if (!button || questionLocked) return;

  questionLocked = true;
  elements.homeGameButton.disabled = true;
  stopQuestionTimer();
  const selectedValue = Number(button.dataset.value);
  const isCorrect = selectedValue === correctAnswer;
  recordQuestionResult(isCorrect);

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

function startGame(levelId = currentLevel, mode = gameMode) {
  stopQuestionTimer();
  const level = levels.find((entry) => entry.id === levelId);
  const isPractice = mode === "practice";
  const isDaily = mode === "daily";
  if (!level || !level.implemented) return;
  if (!isPractice && !isDaily && levelId > progress.highestUnlockedLevel) return;
  if (isPractice && !practiceTypes.some((practice) => practice.id === levelId)) return;
  if (isDaily && levelId !== 9) return;

  gameMode = isDaily ? "daily" : (isPractice ? "practice" : "mission");
  randomSource = isDaily
    ? createDateSeededRandom(activeDailyDate || getLocalDateKey())
    : Math.random;
  sessionActive = true;
  homeModalOpen = false;
  elements.homeModal.classList.add("hidden");
  currentLevel = levelId;
  if (isPractice) currentPracticeType = levelId;
  stars = 0;
  currentCustomer = 1;
  sessionCustomers = shuffle(customers);
  mixedQuestionPlan = levelId === 9 || levelId === 10 ? createMixedQuestionPlan() : [];
  currentStreak = 0;
  questionLocked = true;
  elements.practiceBadge.classList.toggle("hidden", !(isPractice || isDaily));
  elements.practiceBadge.textContent = isDaily ? "☀️ CABARAN HARIAN" : "🎯 MOD LATIHAN";
  updateStats();
  showScreen("game");
  newQuestion();
}

function handleCustomerAnimationEnd(event) {
  if (!sessionActive || homeModalOpen) return;
  if (event.target !== elements.customerPanel) return;

  if (elements.customerPanel.classList.contains("customer-enter")) {
    elements.customerPanel.classList.remove("customer-enter");
    elements.customerPanel.classList.add("customer-active");
    elements.itemsAndQuestion.classList.remove("question-waiting");
    elements.answers.querySelectorAll("button").forEach((button) => {
      button.disabled = false;
    });
    questionLocked = false;
    elements.homeGameButton.disabled = false;
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

function cleanupActiveSession() {
  sessionActive = false;
  homeModalOpen = false;
  homePausedMilliseconds = 0;
  questionLocked = true;
  stopQuestionTimer();
  audioManager.stopAll();
  elements.homeGameButton.disabled = true;
  elements.homeModal.classList.add("hidden");
  elements.answers.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });
  elements.customerPanel.classList.remove(
    "customer-enter", "customer-active", "customer-correct", "customer-wrong", "customer-exit"
  );
  elements.itemsAndQuestion.classList.add("question-waiting");
}

function openHomeConfirmation() {
  if (!sessionActive || questionLocked || homeModalOpen) return;
  homeModalOpen = true;
  questionLocked = true;
  homePausedMilliseconds = isTimedMission()
    ? Math.max(1, questionDeadline - Date.now())
    : 0;
  stopQuestionTimer();
  elements.homeGameButton.disabled = true;
  elements.homeModal.classList.remove("hidden");
  elements.homeContinueButton.focus();
}

function continueCurrentSession() {
  if (!homeModalOpen || !sessionActive) return;
  homeModalOpen = false;
  questionLocked = false;
  elements.homeModal.classList.add("hidden");
  elements.homeGameButton.disabled = false;
  if (isTimedMission()) startQuestionTimer(homePausedMilliseconds || 1);
  homePausedMilliseconds = 0;
}

function exitCurrentSession() {
  if (!homeModalOpen) return;
  cleanupActiveSession();
  showMainMenu();
}

function goToNextLevel() {
  const nextLevelId = currentLevel + 1;
  const nextLevel = levels.find((level) => level.id === nextLevelId);

  if (nextLevel && nextLevel.implemented && nextLevelId <= progress.highestUnlockedLevel) {
    startGame(nextLevelId, "mission");
    return;
  }

  showLevelSelect(`Misi ${nextLevelId} sudah dibuka dan akan datang!`);
}

// Semua event listener didaftarkan sekali sahaja.
elements.startMenuButton.addEventListener("click", () => showLevelSelect());
elements.howToButton.addEventListener("click", toggleHowTo);
elements.statisticsButton.addEventListener("click", showStatistics);
elements.statsBackButton.addEventListener("click", showMainMenu);
statElements.skillRecommendationButton.addEventListener("click", startRecommendedPractice);
elements.practiceMenuButton.addEventListener("click", showPracticeSelect);
elements.practiceBackButton.addEventListener("click", showMainMenu);
elements.profileMenuButton.addEventListener("click", showPlayerProfile);
elements.profileSaveButton.addEventListener("click", savePlayerProfile);
elements.profileCancelButton.addEventListener("click", showMainMenu);
elements.profileNameInput.addEventListener("input", updateProfilePreview);
elements.avatarOptions.addEventListener("click", handleAvatarSelection);
elements.themeOptions.addEventListener("click", handleThemeSelection);
elements.achievementsMenuButton.addEventListener("click", showAchievements);
elements.achievementsBackButton.addEventListener("click", showMainMenu);
elements.homeGameButton.addEventListener("click", openHomeConfirmation);
elements.homeConfirmButton.addEventListener("click", exitCurrentSession);
elements.homeContinueButton.addEventListener("click", continueCurrentSession);
elements.dailyMenuButton.addEventListener("click", showDailyChallenge);
elements.dailyStartButton.addEventListener("click", startDailyChallenge);
elements.dailyBackButton.addEventListener("click", showMainMenu);
elements.settingsMenuButton.addEventListener("click", showSettings);
elements.settingsForm.addEventListener("submit", saveAccessibilitySettings);
elements.settingsBackButton.addEventListener("click", showMainMenu);
elements.soundToggleButton.addEventListener("click", toggleSound);
elements.fullscreenButton.addEventListener("click", toggleFullscreen);
document.addEventListener("fullscreenchange", updateFullscreenButton);
document.addEventListener("click", (event) => {
  const mainButton = event.target.closest(
    "#start-menu-button, #statistics-button, #stats-back-button, #practice-menu-button, " +
    "#practice-back-button, #profile-menu-button, #profile-save-button, #profile-cancel-button, " +
    "#achievements-menu-button, #achievements-back-button, #home-game-button, " +
    "#home-confirm-button, #home-continue-button, " +
    "#daily-menu-button, #daily-start-button, #daily-back-button, " +
    "#settings-menu-button, #settings-save-button, #settings-back-button, " +
    "#skill-recommendation-button, " +
    "#result-menu-button, #back-to-menu-button, #play-again-button, #choose-level-button, " +
    "#next-level-button, .level-card:not(:disabled), .practice-card, .avatar-option"
  );
  if (mainButton) audioManager.play("buttonClick");
});
elements.backToMenuButton.addEventListener("click", showMainMenu);
elements.levelGrid.addEventListener("click", handleLevelSelection);
elements.practiceGrid.addEventListener("click", handlePracticeSelection);
elements.answers.addEventListener("click", handleAnswer);
// Acara error imej tidak bubble, jadi gunakan event delegation dalam capture phase.
elements.itemsList.addEventListener("error", handleItemImageError, true);
elements.playAgainButton.addEventListener("click", () => {
  if (gameMode === "daily") startDailyChallenge();
  else startGame(currentLevel, gameMode);
});
elements.chooseLevelButton.addEventListener("click", () => {
  if (gameMode === "practice") showPracticeSelect();
  else showLevelSelect();
});
elements.nextLevelButton.addEventListener("click", goToNextLevel);
elements.resultMenuButton.addEventListener("click", showMainMenu);
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
elements.appVersion.textContent = `v${GAME_VERSION}`;
document.querySelector('meta[name="application-version"]').content = GAME_VERSION;
updateSoundButton();
if (!document.fullscreenEnabled) {
  elements.fullscreenButton.disabled = true;
  elements.fullscreenButton.title = "Skrin penuh tidak disokong";
}
updateFullscreenButton();
renderLevelCards();
showMainMenu();
preloadItemImages();
preloadCustomerAvatars();
