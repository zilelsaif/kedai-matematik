"use strict";

const GAME_VERSION = "1.7.0";
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

const practiceCategories = {
  money: { icon: "🛒", label: "WANG & KEDAI" },
  time: { icon: "🕐", label: "MASA & JAM" },
  measurement: { icon: "⚖️", label: "UKURAN" },
  fraction: { icon: "🍰", iconImage: "assets/menu/icon-fraction.webp", label: "PECAHAN" }
};

const practiceTypes = [
  { id: 1, name: "Tambah 2 Barang", category: "money" },
  { id: 2, name: "Tambah 3 Barang", category: "money" },
  { id: 3, name: "Kuantiti Barang", category: "money" },
  { id: 4, name: "Baki RM10", category: "money" },
  { id: 5, name: "Baki RM20", category: "money" },
  { id: 6, name: "Kuantiti & Baki", category: "money" },
  { id: 7, name: "Wang dan Sen", category: "money" },
  { id: 8, name: "Sen & Baki", category: "money" },
  { id: 9, name: "Cabaran Campuran", category: "money" },
  { id: 10, name: "Kedai Sibuk", category: "money" },
  { id: "time-1", name: "Baca Jam Tepat", category: "time", timeLevel: 1 },
  { id: "time-2", name: "Setengah Jam", category: "time", timeLevel: 2 },
  { id: "time-3", name: "Suku Jam", category: "time", timeLevel: 3 },
  { id: "time-4", name: "Tempoh Masa", category: "time", timeLevel: 4 },
  { id: "time-5", name: "Masa Siap", category: "time", timeLevel: 5 },
  { id: "time-6", name: "Pagi atau Petang", category: "time", timeLevel: 6 },
  { id: "time-7", name: "AM & PM", category: "time", timeLevel: 7 },
  { id: "time-8", name: "Jadual Kedai", category: "time", timeLevel: 8 },
  { id: "time-9", name: "Cabaran Masa Campuran", category: "time", timeLevel: 9 },
  { id: "time-10", name: "Kedai Sibuk: Masa", category: "time", timeLevel: 10 },
  { id: "measurement-1", name: "Berat Barang", category: "measurement", measurementLevel: 1 },
  { id: "measurement-2", name: "Gram & Kilogram", category: "measurement", measurementLevel: 2 },
  { id: "measurement-3", name: "Isipadu Minuman", category: "measurement", measurementLevel: 3 },
  { id: "measurement-4", name: "Panjang & Pembungkusan", category: "measurement", measurementLevel: 4 },
  { id: "measurement-5", name: "Cabaran Ukuran", category: "measurement", measurementLevel: 5 },
  { id: "measurement-6", name: "Campur Berat", category: "measurement", measurementLevel: 6 },
  { id: "measurement-7", name: "Campur Isipadu", category: "measurement", measurementLevel: 7 },
  { id: "measurement-8", name: "Campur Panjang", category: "measurement", measurementLevel: 8 },
  { id: "measurement-9", name: "Pilih Unit Betul", category: "measurement", measurementLevel: 9 },
  { id: "measurement-10", name: "Kedai Sibuk: Ukuran", category: "measurement", measurementLevel: 10 },
  { id: "fraction-1", name: "Kenal 1/2", category: "fraction", fractionLevel: 1 },
  { id: "fraction-2", name: "Kenal 1/4", category: "fraction", fractionLevel: 2 },
  { id: "fraction-3", name: "Kenal 3/4", category: "fraction", fractionLevel: 3 },
  { id: "fraction-4", name: "Bahagian daripada Objek", category: "fraction", fractionLevel: 4 },
  { id: "fraction-5", name: "Bahagian daripada Kumpulan", category: "fraction", fractionLevel: 5 },
  { id: "fraction-6", name: "Pecahan Setara", category: "fraction", fractionLevel: 6 },
  { id: "fraction-7", name: "Banding Pecahan", category: "fraction", fractionLevel: 7 },
  { id: "fraction-8", name: "Lengkapkan Keseluruhan", category: "fraction", fractionLevel: 8 },
  { id: "fraction-9", name: "Campuran Pecahan", category: "fraction", fractionLevel: 9 },
  { id: "fraction-10", name: "Kedai Sibuk: Pecahan", category: "fraction", fractionLevel: 10 }
];

const timeMissions = [
  { id: 1, name: "Pukul Berapa?", implemented: true },
  { id: 2, name: "Setengah Jam", implemented: true },
  { id: 3, name: "Suku Jam", implemented: true },
  { id: 4, name: "Berapa Lama?", implemented: true },
  { id: 5, name: "Pukul Berapa Siap?", implemented: true },
  { id: 6, name: "Pagi atau Petang", implemented: true },
  { id: 7, name: "AM & PM", implemented: true },
  { id: 8, name: "Jadual Kedai", implemented: true },
  { id: 9, name: "Cabaran Masa Campuran", implemented: true },
  { id: 10, name: "Kedai Sibuk: Masa", implemented: true }
];

const measurementMissions = MeasurementModule.missions;
const fractionMissions = FractionModule.missions;

const skillDefinitions = [
  { id: "addition", name: "Tambah", icon: "➕", practiceId: 1 },
  { id: "quantity", name: "Kuantiti", icon: "📦", practiceId: 3 },
  { id: "change", name: "Baki", icon: "💰", practiceId: 4 },
  { id: "moneyCents", name: "Wang & Sen", icon: "🪙", practiceId: 7 },
  { id: "mixed", name: "Campuran", icon: "🎯", practiceId: 9 },
  { id: "time", name: "Masa & Jam", icon: "🕐", practiceId: "time-1" },
  { id: "measurement", name: "Ukuran", icon: "⚖️", practiceId: "measurement-1" },
  { id: "fraction", name: "Pecahan", icon: "🍰", iconImage: "assets/menu/icon-fraction.webp", practiceId: "fraction-1" }
];

const timeContextTemplates = [
  { customer: true, dialog: "Saya datang ambil barang nanti!", question: (name) => `Pukul berapa ${name} akan datang?` },
  { customer: true, dialog: "Saya datang semula pada waktu ini ya!", question: (name) => `Pukul berapa ${name} akan kembali?` },
  { customer: true, dialog: "Saya akan ambil tempahan pada waktu ini!", question: (name) => `Pukul berapa ${name} mengambil tempahan?` },
  { customer: true, dialog: "Saya akan membuat pembayaran nanti.", question: (name) => `Pukul berapa ${name} akan membayar?` },
  { customer: false, dialog: "Kedai Matematik akan dibuka pada waktu ini.", question: () => "Pukul berapa kedai dibuka?" },
  { customer: false, dialog: "Kedai Matematik akan ditutup pada waktu ini.", question: () => "Pukul berapa kedai ditutup?" },
  { customer: false, dialog: "Penghantaran stok akan sampai pada waktu ini.", question: () => "Pukul berapa stok akan sampai?" },
  { customer: false, dialog: "Masa rehat pekerja bermula pada waktu ini.", question: () => "Pukul berapa waktu rehat bermula?" },
  { customer: false, dialog: "Promosi istimewa bermula pada waktu ini.", question: () => "Pukul berapa promosi bermula?" },
  { customer: false, dialog: "Promosi kedai tamat pada waktu ini.", question: () => "Pukul berapa promosi tamat?" },
  { customer: false, dialog: "Tempahan pelanggan siap pada waktu ini.", question: () => "Pukul berapa tempahan siap?" },
  { customer: false, dialog: "Pekerja mula bertugas pada waktu ini.", question: () => "Pukul berapa pekerja mula bertugas?" }
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
  { id: "starKing", icon: "👑", name: "Raja Bintang", description: "Kumpul 30/30 bintang." },
  { id: "onTime", icon: "🕐", name: "Tepat Pada Masanya", description: "Lulus Misi Masa 1." },
  { id: "timeKeeper", icon: "⏰", name: "Penjaga Waktu", description: "Lulus Misi Masa 5." },
  { id: "fractionHalfway", icon: "🍰", name: "Separuh Jalan Pecahan", description: "Lulus Misi Pecahan 5." },
  { id: "fractionExpert", icon: "🏅", name: "Pakar Pecahan", description: "Lulus Misi Pecahan 10." }
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
  { name: "Aynaa", avatar: "assets/customers/Aynaa.webp" },
  { name: "Ammar", avatar: "assets/customers/Ammar.webp" },
  { name: "Mei Ling", avatar: "assets/customers/Mei-Ling.webp" },
  { name: "Kumar", avatar: "assets/customers/Kumar.webp" },
  { name: "Sofia", avatar: "assets/customers/Sofia.webp" },
  { name: "Azzam", avatar: "assets/customers/Azzam.webp" },
  { name: "Ayyash", avatar: "assets/customers/Ayyash.webp" },
  { name: "Ivy", avatar: "assets/customers/Ivy-Chian.webp" },
  { name: "Maria", avatar: "assets/customers/Maria.webp" },
  { name: "Affan", avatar: "assets/customers/Affan.webp" }
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

function prepareGameplayAssets() {
  // Muat aset gameplay selepas interaksi pertama; menu utama kekal ringan.
  document.querySelectorAll("#game-header img[data-src]").forEach((image) => {
    image.src = image.dataset.src;
    image.removeAttribute("data-src");
  });
  preloadCustomerAvatars();
  preloadItemImages();
}

const mainMenuAssetPreloadCache = [];

function preloadMainMenuAssets() {
  if (mainMenuAssetPreloadCache.length > 0) return;
  document.querySelectorAll("#main-menu-screen img[data-src]").forEach((image) => {
    image.decoding = "async";
    image.src = image.dataset.src;
    image.removeAttribute("data-src");
    mainMenuAssetPreloadCache.push(image);
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
  titleScreen: document.querySelector("#title-screen"),
  mainMenuScreen: document.querySelector("#main-menu-screen"),
  statsScreen: document.querySelector("#stats-screen"),
  practiceScreen: document.querySelector("#practice-screen"),
  profileScreen: document.querySelector("#profile-screen"),
  achievementsScreen: document.querySelector("#achievements-screen"),
  dailyScreen: document.querySelector("#daily-screen"),
  settingsScreen: document.querySelector("#settings-screen"),
  timeLevelScreen: document.querySelector("#time-level-screen"),
  measurementLevelScreen: document.querySelector("#measurement-level-screen"),
  fractionLevelScreen: document.querySelector("#fraction-level-screen"),
  levelScreen: document.querySelector("#level-screen"),
  gameScreen: document.querySelector("#game-screen"),
  gameOverScreen: document.querySelector("#game-over-screen"),
  startMenuButton: document.querySelector("#start-menu-button"),
  titleBackButton: document.querySelector("#title-back-button"),
  menuHighestMission: document.querySelector("#menu-highest-mission"),
  menuBestScore: document.querySelector("#menu-best-score"),
  moneyStarTotal: document.querySelector("#money-star-total"),
  timeStarTotal: document.querySelector("#time-star-total"),
  measurementStarTotal: document.querySelector("#measurement-star-total"),
  fractionStarTotal: document.querySelector("#fraction-star-total"),
  howToButton: document.querySelector("#how-to-button"),
  statisticsButton: document.querySelector("#statistics-button"),
  practiceMenuButton: document.querySelector("#practice-menu-button"),
  practiceBackButton: document.querySelector("#practice-back-button"),
  practiceGrid: document.querySelector("#practice-grid"),
  moneyCategoryButton: document.querySelector("#money-category-button"),
  timeCategoryButton: document.querySelector("#time-category-button"),
  measurementCategoryButton: document.querySelector("#measurement-category-button"),
  fractionCategoryButton: document.querySelector("#fraction-category-button"),
  timeLevelBackButton: document.querySelector("#time-level-back-button"),
  timeLevelGrid: document.querySelector("#time-level-grid"),
  timeLevelNotice: document.querySelector("#time-level-notice"),
  measurementLevelBackButton: document.querySelector("#measurement-level-back-button"),
  measurementLevelGrid: document.querySelector("#measurement-level-grid"),
  measurementLevelNotice: document.querySelector("#measurement-level-notice"),
  fractionLevelBackButton: document.querySelector("#fraction-level-back-button"),
  fractionLevelGrid: document.querySelector("#fraction-level-grid"),
  fractionLevelNotice: document.querySelector("#fraction-level-notice"),
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
  customerAction: document.querySelector("#customer-action"),
  customerPanel: document.querySelector(".customer-panel"),
  customerAvatar: document.querySelector("#customer-avatar"),
  avatarFallback: document.querySelector("#avatar-fallback"),
  itemsList: document.querySelector("#items-list"),
  itemsAndQuestion: document.querySelector(".items-and-question"),
  questionTimer: document.querySelector("#question-timer"),
  timerSeconds: document.querySelector("#timer-seconds"),
  timerBar: document.querySelector("#timer-bar"),
  transactionSummary: document.querySelector("#transaction-summary"),
  moneyVisualStage: document.querySelector("#money-visual-stage"),
  purchaseTotal: document.querySelector("#purchase-total"),
  paymentAmount: document.querySelector("#payment-amount"),
  visualHelp: document.querySelector("#visual-help"),
  clockStage: document.querySelector("#clock-stage"),
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
let answersUseTime = false;
let answersUseMeasurement = false;
let answersUseFraction = false;
let currentAnswerKind = "money";
let currentMeasurementDimension = "mass";
let questionLocked = true;
let questionTimerId = null;
let questionDeadline = 0;
let currentStreak = 0;
let currentSkillCategory = "mixed";
let currentTimeLevel = 1;
let lastTimeHour = null;
let lastTimeTemplateIndex = null;
let timeQuestionPlan = [];
let currentTimeSubSkill = "readClock";
let currentMeasurementLevel = 1;
let currentMeasurementSubSkill = "weight";
let measurementQuestionPlan = [];
let currentFractionLevel = 1;
let currentFractionSubSkill = "half";
let fractionQuestionPlan = [];
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

function defaultTimeSkillStats() {
  return Object.fromEntries(["readClock", "halfHour", "quarterHour", "duration", "endTime", "dayPeriod", "amPm", "schedule"]
    .map((id) => [id, { answered: 0, correct: 0 }]));
}

function defaultMeasurementSkillStats() {
  return Object.fromEntries(["weight", "massConversion", "volume", "length", "unitChoice"]
    .map((id) => [id, { answered: 0, correct: 0 }]));
}

function defaultFractionSkillStats() {
  return Object.fromEntries(["half", "quarter", "visualFraction", "groupFraction", "equivalentFraction", "compareFraction", "completeWhole"]
    .map((id) => [id, { answered: 0, correct: 0 }]));
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
    timeProgress: { highestUnlockedLevel: 1, bestScores: {}, stars: {} },
    timeSkillStats: defaultTimeSkillStats(),
    measurementProgress: { highestUnlockedLevel: 1, bestScores: {}, stars: {} },
    measurementSkillStats: defaultMeasurementSkillStats(),
    fractionProgress: { highestUnlockedLevel: 1, bestScores: {}, stars: {} },
    fractionSkillStats: defaultFractionSkillStats(),
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
    const timeProgress = { highestUnlockedLevel: 1, bestScores: {}, stars: {} };
    const timeSkillStats = defaultTimeSkillStats();
    const measurementProgress = { highestUnlockedLevel: 1, bestScores: {}, stars: {} };
    const measurementSkillStats = defaultMeasurementSkillStats();
    const fractionProgress = { highestUnlockedLevel: 1, bestScores: {}, stars: {} };
    const fractionSkillStats = defaultFractionSkillStats();
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

    if (saved.timeProgress && typeof saved.timeProgress === "object") {
      const savedTime = saved.timeProgress;
      const highestTime = Number(savedTime.highestUnlockedLevel);
      if (Number.isInteger(highestTime)) {
        timeProgress.highestUnlockedLevel = Math.min(Math.max(highestTime, 1), timeMissions.length);
      }
      timeMissions.forEach((mission) => {
        const score = Number(savedTime.bestScores?.[mission.id]);
        const rating = Number(savedTime.stars?.[mission.id]);
        if (Number.isInteger(score) && score >= 0 && score <= totalCustomers) timeProgress.bestScores[mission.id] = score;
        if (Number.isInteger(rating) && rating >= 0 && rating <= 3) timeProgress.stars[mission.id] = rating;
      });
      // Pemain v1.5 yang sudah lulus misi akhir lama terus menerima Misi Masa 6.
      if (Number(timeProgress.bestScores[5]) >= 8) {
        timeProgress.highestUnlockedLevel = Math.max(timeProgress.highestUnlockedLevel, 6);
      }
    }

    if (saved.timeSkillStats && typeof saved.timeSkillStats === "object") {
      Object.keys(timeSkillStats).forEach((key) => {
        const record = saved.timeSkillStats[key];
        const answered = Number(record?.answered);
        const correct = Number(record?.correct);
        if (Number.isInteger(answered) && answered >= 0) timeSkillStats[key].answered = answered;
        if (Number.isInteger(correct) && correct >= 0) timeSkillStats[key].correct = Math.min(correct, timeSkillStats[key].answered);
      });
    }

    if (saved.measurementProgress && typeof saved.measurementProgress === "object") {
      const savedMeasurement = saved.measurementProgress;
      const highestMeasurement = Number(savedMeasurement.highestUnlockedLevel);
      if (Number.isInteger(highestMeasurement)) {
        measurementProgress.highestUnlockedLevel = Math.min(
          Math.max(highestMeasurement, 1),
          measurementMissions.length
        );
      }
      measurementMissions.forEach((mission) => {
        const score = Number(savedMeasurement.bestScores?.[mission.id]);
        const rating = Number(savedMeasurement.stars?.[mission.id]);
        if (Number.isInteger(score) && score >= 0 && score <= totalCustomers) {
          measurementProgress.bestScores[mission.id] = score;
        }
        if (Number.isInteger(rating) && rating >= 0 && rating <= 3) {
          measurementProgress.stars[mission.id] = rating;
        }
      });
      // Pemain v1.5 yang sudah lulus misi akhir lama terus menerima Misi Ukuran 6.
      if (Number(measurementProgress.bestScores[5]) >= 8) {
        measurementProgress.highestUnlockedLevel = Math.max(measurementProgress.highestUnlockedLevel, 6);
      }
    }

    if (saved.measurementSkillStats && typeof saved.measurementSkillStats === "object") {
      Object.keys(measurementSkillStats).forEach((key) => {
        const record = saved.measurementSkillStats[key];
        const answered = Number(record?.answered);
        const correct = Number(record?.correct);
        if (Number.isInteger(answered) && answered >= 0) measurementSkillStats[key].answered = answered;
        if (Number.isInteger(correct) && correct >= 0) {
          measurementSkillStats[key].correct = Math.min(correct, measurementSkillStats[key].answered);
        }
      });
    }

    if (saved.fractionProgress && typeof saved.fractionProgress === "object") {
      const savedFraction = saved.fractionProgress;
      const highestFraction = Number(savedFraction.highestUnlockedLevel);
      if (Number.isInteger(highestFraction)) {
        fractionProgress.highestUnlockedLevel = Math.min(Math.max(highestFraction, 1), fractionMissions.length);
      }
      fractionMissions.forEach((mission) => {
        const score = Number(savedFraction.bestScores?.[mission.id]);
        const rating = Number(savedFraction.stars?.[mission.id]);
        if (Number.isInteger(score) && score >= 0 && score <= totalCustomers) fractionProgress.bestScores[mission.id] = score;
        if (Number.isInteger(rating) && rating >= 0 && rating <= 3) fractionProgress.stars[mission.id] = rating;
      });
    }

    if (saved.fractionSkillStats && typeof saved.fractionSkillStats === "object") {
      Object.keys(fractionSkillStats).forEach((key) => {
        const record = saved.fractionSkillStats[key];
        const answered = Number(record?.answered);
        const correct = Number(record?.correct);
        if (Number.isInteger(answered) && answered >= 0) fractionSkillStats[key].answered = answered;
        if (Number.isInteger(correct) && correct >= 0) fractionSkillStats[key].correct = Math.min(correct, fractionSkillStats[key].answered);
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
    achievements.onTime ||= Number(timeProgress.bestScores[1]) >= 8;
    achievements.timeKeeper ||= Number(timeProgress.bestScores[5]) >= 8;
    achievements.fractionHalfway ||= Number(fractionProgress.bestScores[5]) >= 8;
    achievements.fractionExpert ||= Number(fractionProgress.bestScores[10]) >= 8;
    if (!playerProfile.featuredBadge && achievementDefinitions.some((achievement) =>
      achievement.id === requestedBadge && achievements[achievement.id] === true
    )) {
      playerProfile.featuredBadge = requestedBadge;
    }

    return {
      highestUnlockedLevel,
      bestScores,
      stars: savedStars,
      timeProgress,
      timeSkillStats,
      measurementProgress,
      measurementSkillStats,
      fractionProgress,
      fractionSkillStats,
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

function checkAchievements({ missionScore = null, missionLevel = null, missionPassed = false, allowMissionAchievements = false, timeMissionLevel = null, fractionMissionLevel = null } = {}) {
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
  if (timeMissionLevel !== null && missionPassed) {
    conditions.onTime = timeMissionLevel === 1;
    conditions.timeKeeper = timeMissionLevel === 5;
  }
  if (fractionMissionLevel !== null && missionPassed) {
    conditions.fractionHalfway = fractionMissionLevel === 5;
    conditions.fractionExpert = fractionMissionLevel === 10;
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
  const timeSubRecord = currentSkillCategory === "time"
    ? progress.timeSkillStats[currentTimeSubSkill]
    : null;
  const measurementSubRecord = currentSkillCategory === "measurement"
    ? progress.measurementSkillStats[currentMeasurementSubSkill]
    : null;
  const fractionSubRecord = currentSkillCategory === "fraction"
    ? progress.fractionSkillStats[currentFractionSubSkill]
    : null;
  if (timeSubRecord) timeSubRecord.answered += 1;
  if (measurementSubRecord) measurementSubRecord.answered += 1;
  if (fractionSubRecord) fractionSubRecord.answered += 1;

  if (isCorrect) {
    progress.stats.totalCorrect += 1;
    skillRecord.correct += 1;
    if (timeSubRecord) timeSubRecord.correct += 1;
    if (measurementSubRecord) measurementSubRecord.correct += 1;
    if (fractionSubRecord) fractionSubRecord.correct += 1;
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
  const icon = elements.soundToggleButton.querySelector("img");
  if (icon) {
    icon.src = audioManager.enabled
      ? "assets/ui/icon-sound-on.webp"
      : "assets/ui/icon-sound-off.webp";
  }
  elements.soundToggleButton.setAttribute("aria-pressed", String(!audioManager.enabled));
  elements.soundToggleButton.setAttribute("aria-label", audioManager.enabled ? "Tutup bunyi" : "Buka bunyi");
}

function toggleSound() {
  audioManager.setEnabled(!audioManager.enabled);
  updateSoundButton();
}

function updateFullscreenButton() {
  const isFullscreen = Boolean(document.fullscreenElement);
  elements.fullscreenButton.classList.toggle("is-fullscreen", isFullscreen);
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

function normalizeClockMinutes(minutes) {
  return ((minutes % 720) + 720) % 720;
}

function formatClockTime(minutes) {
  const normalized = normalizeClockMinutes(minutes);
  const hour = Math.floor(normalized / 60) || 12;
  const minute = normalized % 60;
  return `${hour}:${String(minute).padStart(2, "0")}`;
}

function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} minit`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return `${hours} jam${remainder ? ` ${remainder} minit` : ""}`;
}

function formatTimePeriod(periodId) {
  return ["Pagi", "Tengah hari", "Petang", "Malam"][periodId] || "Pagi";
}

function formatClockTimeAmPm(minutes) {
  const normalized = ((minutes % 1440) + 1440) % 1440;
  const hour24 = Math.floor(normalized / 60);
  const minute = normalized % 60;
  const hour12 = hour24 % 12 || 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${hour24 < 12 ? "AM" : "PM"}`;
}

function createClockMomentPool(minutes) {
  return minutes.flatMap((minute) =>
    Array.from({ length: 12 }, (_, index) => ({ moment: ((index + 1) % 12) * 60 + minute }))
  );
}

function createDurationPool(durationValues, maximumHour) {
  return durationValues.flatMap((duration) => [0, 30].flatMap((startMinute) => {
    const maximumStartHour = Math.max(1, Math.floor((690 - duration - startMinute) / 60));
    return Array.from(
      { length: Math.min(maximumStartHour, maximumHour) },
      (_, index) => ({ start: (index + 1) * 60 + startMinute, duration })
    );
  }));
}

const dayPeriodMomentPools = [
  [360, 390, 420, 450, 480, 510, 540, 570, 600, 630, 660, 690],
  [720, 750, 780, 810],
  [840, 870, 900, 930, 960, 990, 1020, 1050, 1080, 1110],
  [1140, 1170, 1200, 1230, 1260, 1290]
];

function createSchedulePool() {
  const activityNames = [
    "Kedai buka", "Stok sampai", "Pelanggan ambil tempahan",
    "Waktu rehat", "Promosi bermula", "Promosi tamat", "Kedai tutup"
  ];
  const offsets = [0, 60, 150, 240, 330, 420, 540];
  return Array.from({ length: 6 }, (_, variant) => {
    const start = 420 + variant * 30;
    const schedule = activityNames.map((label, index) => [label, start + offsets[index]]);
    return schedule.map((_, queryIndex) => ({ schedule, queryIndex }));
  }).flat();
}

function getTimeSpecPool(levelId) {
  if (levelId === 1) return createClockMomentPool([0]);
  if (levelId === 2) return createClockMomentPool([0, 30]);
  if (levelId === 3) return createClockMomentPool([0, 15, 30, 45]);
  if (levelId === 4) return createDurationPool([30, 60, 90, 120, 150, 180], 8);
  if (levelId === 5) return createDurationPool([30, 60, 90, 120], 9);
  if (levelId === 6) {
    return dayPeriodMomentPools.flatMap((moments, period) =>
      moments.map((moment) => ({ period, moment }))
    );
  }
  if (levelId === 7) {
    return Array.from({ length: 32 }, (_, index) => ({ moment: 360 + index * 30 }));
  }
  return createSchedulePool();
}

function createMixedTimePlan() {
  const typePlan = [...shuffle([1, 2, 3, 4, 5, 6, 7, 8]), ...shuffle([1, 2])];
  const pools = Object.fromEntries(
    Array.from({ length: 8 }, (_, index) => [index + 1, shuffle(getTimeSpecPool(index + 1))])
  );
  return typePlan.map((selectedLevel) => ({
    levelId: selectedLevel,
    ...pools[selectedLevel].shift()
  }));
}

function createTimeQuestionPlan(levelId) {
  if (levelId === 9 || levelId === 10) return createMixedTimePlan();
  if (levelId === 2) {
    return shuffle([
      ...shuffle(createClockMomentPool([0])).slice(0, 5),
      ...shuffle(createClockMomentPool([30])).slice(0, 5)
    ]);
  }
  if (levelId === 3) {
    return shuffle([0, 15, 30, 45].flatMap((minute, index) =>
      shuffle(createClockMomentPool([minute])).slice(0, [2, 3, 3, 2][index])
    ));
  }
  if (levelId === 6) {
    return shuffle(dayPeriodMomentPools.flatMap((moments, period) =>
      shuffle(moments).slice(0, [3, 2, 3, 2][period]).map((moment) => ({ period, moment }))
    ));
  }
  if (levelId === 7) {
    const pool = getTimeSpecPool(7);
    return shuffle([
      ...shuffle(pool.filter(({ moment }) => moment < 720)).slice(0, 5),
      ...shuffle(pool.filter(({ moment }) => moment >= 720)).slice(0, 5)
    ]);
  }
  return shuffle(getTimeSpecPool(levelId)).slice(0, 10);
}

function createClockChoices(answerMinutes, stepMinutes) {
  const choices = new Set([normalizeClockMinutes(answerMinutes)]);
  shuffle([-2, -1, 1, 2, 3, -3]).forEach((offset) => {
    if (choices.size < 4) choices.add(normalizeClockMinutes(answerMinutes + offset * stepMinutes));
  });
  return shuffle([...choices]);
}

function pickTimeContext(customer) {
  let templateIndex;
  do templateIndex = randomIndex(timeContextTemplates.length);
  while (templateIndex === lastTimeTemplateIndex);
  lastTimeTemplateIndex = templateIndex;
  const template = timeContextTemplates[templateIndex];
  return {
    usesCustomer: template.customer,
    dialog: template.dialog,
    question: template.question(customer.name)
  };
}

function generateClockReadingQuestion(customer, levelId) {
  const planned = timeQuestionPlan[currentCustomer - 1];
  const allowedMinutes = levelId === 1 ? [0] : (levelId === 2 ? [0, 30] : [0, 15, 30, 45]);
  const plannedMoment = Number.isInteger(planned?.moment) ? planned.moment : null;
  const minute = plannedMoment === null
    ? allowedMinutes[randomIndex(allowedMinutes.length)]
    : plannedMoment % 60;
  let hour;
  let moment;
  if (plannedMoment !== null) {
    moment = normalizeClockMinutes(plannedMoment);
  } else do {
    hour = randomIndex(12) + 1;
    moment = normalizeClockMinutes((hour % 12) * 60 + minute);
  } while (moment === lastTimeHour);
  lastTimeHour = moment;
  currentTimeSubSkill = levelId === 1 ? "readClock" : (levelId === 2 ? "halfHour" : "quarterHour");

  return {
    answer: moment,
    choices: createClockChoices(moment, levelId === 1 ? 60 : (levelId === 2 ? 30 : 15)),
    answerKind: "clock",
    isTime: true,
    skillCategory: "time",
    clocks: [{ minutes: moment }],
    context: pickTimeContext(customer)
  };
}

function generateDurationQuestion(customer) {
  const planned = timeQuestionPlan[currentCustomer - 1];
  const durationOptions = [30, 60, 90, 120, 150, 180];
  const duration = durationOptions.includes(planned?.duration)
    ? planned.duration
    : durationOptions[randomIndex(durationOptions.length)];
  const start = Number.isInteger(planned?.start)
    ? planned.start
    : (() => {
      const startMinute = randomIndex(2) * 30;
      const maximumStartHour = Math.max(1, Math.floor((690 - duration - startMinute) / 60));
      return (randomIndex(Math.min(maximumStartHour, 8)) + 1) * 60 + startMinute;
    })();
  const end = start + duration;
  const usesCustomer = randomIndex(2) === 0;
  currentTimeSubSkill = "duration";

  return {
    answer: duration,
    choices: shuffle([duration, ...shuffle(durationOptions.filter((value) => value !== duration)).slice(0, 3)]),
    answerKind: "duration",
    isTime: true,
    isTimeline: true,
    skillCategory: "time",
    clocks: [{ label: "MULA", minutes: start }, { label: "TAMAT", minutes: end }],
    context: usesCustomer ? {
      usesCustomer: true,
      dialog: `Saya datang pukul ${formatClockTime(start)}. Pesanan siap pukul ${formatClockTime(end)}.`,
      question: `Berapa lama ${customer.name} menunggu?`
    } : {
      usesCustomer: false,
      dialog: `Kedai dibuka pukul ${formatClockTime(start)}. Stok sampai pukul ${formatClockTime(end)}.`,
      question: "Berapa lama selepas kedai dibuka stok sampai?"
    }
  };
}

function generateEndTimeQuestion(customer) {
  const planned = timeQuestionPlan[currentCustomer - 1];
  const durationValues = [30, 60, 90, 120];
  const duration = durationValues.includes(planned?.duration)
    ? planned.duration
    : durationValues[randomIndex(durationValues.length)];
  const start = Number.isInteger(planned?.start)
    ? planned.start
    : (() => {
      const startMinute = randomIndex(2) * 30;
      const maximumStartHour = Math.max(1, Math.floor((690 - duration - startMinute) / 60));
      return (randomIndex(Math.min(maximumStartHour, 9)) + 1) * 60 + startMinute;
    })();
  const end = start + duration;
  const usesCustomer = randomIndex(2) === 0;
  currentTimeSubSkill = "endTime";

  return {
    answer: normalizeClockMinutes(end),
    choices: createClockChoices(end, 30),
    answerKind: "clock",
    isTime: true,
    isEndTime: true,
    skillCategory: "time",
    clocks: [{ label: "MULA", minutes: start }],
    duration,
    context: usesCustomer ? {
      usesCustomer: true,
      dialog: `Pesanan saya mula dibungkus pukul ${formatClockTime(start)} dan mengambil masa ${formatDuration(duration)}.`,
      question: `Pukul berapa pesanan ${customer.name} siap?`
    } : {
      usesCustomer: false,
      dialog: `Tempahan bakeri mula disediakan pukul ${formatClockTime(start)} dan mengambil masa ${formatDuration(duration)}.`,
      question: "Pukul berapa tempahan bakeri siap?"
    }
  };
}

function generateDayPeriodQuestion(customer) {
  const planned = timeQuestionPlan[currentCustomer - 1];
  const period = Number.isInteger(planned?.period) && planned.period >= 0 && planned.period <= 3
    ? planned.period
    : randomIndex(4);
  const moment = Number.isInteger(planned?.moment)
    ? planned.moment
    : dayPeriodMomentPools[period][randomIndex(dayPeriodMomentPools[period].length)];
  const usesCustomer = randomIndex(2) === 0;
  const situationHints = [
    "Kedai baru sahaja dibuka untuk pelanggan.",
    "Pekerja berhenti sebentar untuk makan.",
    "Pelanggan datang selepas waktu sekolah.",
    "Kedai akan ditutup sebentar lagi."
  ];
  currentTimeSubSkill = "dayPeriod";
  return {
    answer: period,
    choices: shuffle([0, 1, 2, 3]),
    answerKind: "time-period",
    isTime: true,
    skillCategory: "time",
    clocks: [{ minutes: moment }],
    timeCaption: formatClockTimeAmPm(moment).replace(/ (AM|PM)$/, ""),
    context: usesCustomer ? {
      usesCustomer: true,
      dialog: `${situationHints[period]} Saya datang pukul ${formatClockTimeAmPm(moment).replace(/ (AM|PM)$/, "")}.`,
      question: `${customer.name} datang pada waktu hari yang mana?`
    } : {
      usesCustomer: false,
      dialog: `${situationHints[period]} Jam menunjukkan ${formatClockTimeAmPm(moment).replace(/ (AM|PM)$/, "")}.`,
      question: "Ini waktu pagi, tengah hari, petang atau malam?"
    }
  };
}

function createAmPmChoices(answer) {
  const choices = new Set([answer, (answer + 720) % 1440]);
  [60, -60, 120, -120].forEach((offset) => {
    if (choices.size < 4) choices.add((answer + offset + 1440) % 1440);
  });
  return shuffle([...choices].slice(0, 4));
}

function generateAmPmQuestion(customer) {
  const planned = timeQuestionPlan[currentCustomer - 1];
  const moments = getTimeSpecPool(7).map(({ moment }) => moment);
  const answer = Number.isInteger(planned?.moment)
    ? planned.moment
    : moments[randomIndex(moments.length)];
  const isMorning = answer < 720;
  currentTimeSubSkill = "amPm";
  return {
    answer,
    choices: createAmPmChoices(answer),
    answerKind: "clock-ampm",
    isTime: true,
    skillCategory: "time",
    clocks: [{ minutes: answer }],
    context: {
      usesCustomer: true,
      dialog: `Saya datang pada waktu ${isMorning ? "pagi" : "petang atau malam"} ini.`,
      question: `Pilih waktu AM atau PM yang betul untuk ${customer.name}.`
    }
  };
}

function generateScheduleQuestion(customer) {
  const planned = timeQuestionPlan[currentCustomer - 1];
  const fallback = getTimeSpecPool(8)[randomIndex(getTimeSpecPool(8).length)];
  const schedules = Array.isArray(planned?.schedule) ? planned.schedule : fallback.schedule;
  const selectedIndex = Number.isInteger(planned?.queryIndex) ? planned.queryIndex : fallback.queryIndex;
  const answer = schedules[selectedIndex][1];
  currentTimeSubSkill = "schedule";
  return {
    answer,
    choices: shuffle([
      answer,
      ...shuffle(schedules.filter((_, index) => index !== selectedIndex).map((entry) => entry[1])).slice(0, 3)
    ]),
    answerKind: "clock-ampm",
    isTime: true,
    isSchedule: true,
    skillCategory: "time",
    clocks: [],
    schedule: schedules,
    context: {
      usesCustomer: false,
      dialog: "Semak jadual operasi Kedai Matematik hari ini.",
      question: `Pukul berapa ${schedules[selectedIndex][0].toLowerCase()}?`
    }
  };
}

function generateTimeQuestion(customer, levelId) {
  const selectedLevel = levelId >= 9 ? (timeQuestionPlan[currentCustomer - 1]?.levelId || 1) : levelId;
  if (selectedLevel <= 3) return generateClockReadingQuestion(customer, selectedLevel);
  if (selectedLevel === 4) return generateDurationQuestion(customer);
  if (selectedLevel === 5) return generateEndTimeQuestion(customer);
  if (selectedLevel === 6) return generateDayPeriodQuestion(customer);
  if (selectedLevel === 7) return generateAmPmQuestion(customer);
  return generateScheduleQuestion(customer);
}

function createAnalogClockSvg(minutes, label = "") {
  const numbers = Array.from({ length: 12 }, (_, index) => {
    const number = index + 1;
    const angle = number * 30 * Math.PI / 180;
    const x = 100 + Math.sin(angle) * 76;
    const y = 100 - Math.cos(angle) * 76;
    return `<text x="${x.toFixed(2)}" y="${y.toFixed(2)}" text-anchor="middle" dominant-baseline="central">${number}</text>`;
  }).join("");

  const normalized = normalizeClockMinutes(minutes);
  const hour = Math.floor(normalized / 60);
  const minute = normalized % 60;
  const hourAngle = hour * 30 + minute * 0.5;
  const minuteAngle = minute * 6;
  return `<div class="clock-unit">${label ? `<strong class="clock-label">${label}</strong>` : ""}
    <svg class="analog-clock" viewBox="0 0 200 200" role="img" aria-label="Jam analog ${label || "untuk dibaca"}">
      <circle class="clock-face" cx="100" cy="100" r="94"></circle>
      ${numbers}
      <line class="clock-hand hour-hand" x1="100" y1="108" x2="100" y2="48" transform="rotate(${hourAngle} 100 100)"></line>
      <line class="clock-hand minute-hand" x1="100" y1="110" x2="100" y2="25" transform="rotate(${minuteAngle} 100 100)"></line>
      <circle class="clock-pin" cx="100" cy="100" r="7"></circle>
    </svg></div>`;
}

function renderTimeDisplay(question) {
  if (question.isSchedule) {
    elements.clockStage.classList.remove("dual-clock");
    elements.clockStage.innerHTML = `<div class="shop-schedule" aria-label="Jadual Kedai Matematik">
      ${question.schedule.map(([label, minutes]) => `<div><strong>${label}</strong><span>${formatClockTimeAmPm(minutes)}</span></div>`).join("")}
    </div>`;
    elements.clockStage.classList.remove("hidden");
    return;
  }
  const clocks = question.clocks.map((clock) => createAnalogClockSvg(clock.minutes, clock.label)).join(
    question.clocks.length > 1 ? '<span class="clock-arrow" aria-hidden="true">→</span>' : ""
  );
  elements.clockStage.classList.toggle("dual-clock", question.clocks.length > 1);
  elements.clockStage.innerHTML = `<div class="clock-display">${clocks}</div>
    ${question.isEndTime ? `<div class="duration-chip">+ ${formatDuration(question.duration)} → ?</div>` : ""}
    ${question.timeCaption ? `<div class="duration-chip">${question.timeCaption}</div>` : ""}
    <div class="clock-legend" aria-label="Petunjuk jarum"><span><i class="legend-hour"></i>Jarum Jam</span><span><i class="legend-minute"></i>Jarum Minit</span></div>`;
  elements.clockStage.classList.remove("hidden");
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
    title: elements.titleScreen,
    menu: elements.mainMenuScreen,
    stats: elements.statsScreen,
    practice: elements.practiceScreen,
    profile: elements.profileScreen,
    achievements: elements.achievementsScreen,
    daily: elements.dailyScreen,
    settings: elements.settingsScreen,
    timeLevels: elements.timeLevelScreen,
    measurementLevels: elements.measurementLevelScreen,
    fractionLevels: elements.fractionLevelScreen,
    levels: elements.levelScreen,
    game: elements.gameScreen,
    results: elements.gameOverScreen
  };

  Object.values(screens).forEach((screen) => screen.classList.add("hidden"));
  elements.gameHeader.classList.toggle("hidden", screenName !== "game");
  screens[screenName].classList.remove("hidden");
}

function showTimeLevelSelect(message = "") {
  questionLocked = true;
  elements.timeLevelNotice.textContent = message;
  elements.timeLevelGrid.innerHTML = timeMissions.map((mission) => {
    const unlocked = mission.id <= progress.timeProgress.highestUnlockedLevel;
    const available = unlocked && mission.implemented;
    const best = progress.timeProgress.bestScores[mission.id];
    const rating = progress.timeProgress.stars[mission.id] || 0;
    const icon = mission.id <= 3 ? "🕐" : (mission.id === 4 ? "⏱️" : "⏰");
    return `<button class="level-card time-level-card ${available ? "unlocked" : "locked"}" type="button" data-time-level="${mission.id}" ${available ? "" : "disabled"}>
      ${available ? "" : '<span class="level-lock" aria-hidden="true">🔒</span>'}
      <span class="level-number">Misi Masa ${mission.id}</span>
      <span class="level-name">${icon} ${mission.name}</span>
      <span class="level-stars">${formatStarRating(rating)}</span>
      <span class="level-best">${Number.isInteger(best) ? `⭐ Rekod: ${best}/10` : (available ? "Jom cuba!" : "Selesaikan misi sebelumnya")}</span>
    </button>`;
  }).join("");
  showScreen("timeLevels");
}

function handleTimeLevelSelection(event) {
  const card = event.target.closest("[data-time-level]");
  const levelId = Number(card?.dataset.timeLevel);
  if (!card || card.disabled || levelId > progress.timeProgress.highestUnlockedLevel) return;
  startTimeGame(levelId, "time-mission");
}

function showMeasurementLevelSelect(message = "") {
  questionLocked = true;
  elements.measurementLevelNotice.textContent = message;
  elements.measurementLevelGrid.innerHTML = measurementMissions.map((mission) => {
    const unlocked = mission.id <= progress.measurementProgress.highestUnlockedLevel;
    const best = progress.measurementProgress.bestScores[mission.id];
    const rating = progress.measurementProgress.stars[mission.id] || 0;
    return `<button class="level-card measurement-level-card ${unlocked ? "unlocked" : "locked"}" type="button" data-measurement-level="${mission.id}" ${unlocked ? "" : "disabled"}>
      ${unlocked ? "" : '<span class="level-lock" aria-hidden="true">🔒</span>'}
      <span class="level-number">Misi Ukuran ${mission.id}</span>
      <span class="level-name">⚖️ ${mission.name}</span>
      <span class="level-stars">${formatStarRating(rating)}</span>
      <span class="level-best">${Number.isInteger(best) ? `⭐ Rekod: ${best}/10` : (unlocked ? "Jom cuba!" : "Selesaikan misi sebelumnya")}</span>
    </button>`;
  }).join("");
  showScreen("measurementLevels");
  elements.measurementLevelGrid.querySelector("button:not(:disabled)")?.focus();
}

function handleMeasurementLevelSelection(event) {
  const card = event.target.closest("[data-measurement-level]");
  const levelId = Number(card?.dataset.measurementLevel);
  if (!card || card.disabled || levelId > progress.measurementProgress.highestUnlockedLevel) return;
  startMeasurementGame(levelId, "measurement-mission");
}

function showFractionLevelSelect(message = "") {
  questionLocked = true;
  elements.fractionLevelNotice.textContent = message;
  elements.fractionLevelGrid.innerHTML = fractionMissions.map((mission) => {
    const unlocked = mission.id <= progress.fractionProgress.highestUnlockedLevel;
    const best = progress.fractionProgress.bestScores[mission.id];
    const rating = progress.fractionProgress.stars[mission.id] || 0;
    return `<button class="level-card fraction-level-card ${unlocked ? "unlocked" : "locked"}" type="button" data-fraction-level="${mission.id}" ${unlocked ? "" : "disabled"}>
      ${unlocked ? "" : '<span class="level-lock" aria-hidden="true">🔒</span>'}
      <span class="level-number">Misi Pecahan ${mission.id}</span>
      <span class="level-name"><img class="fraction-inline-icon" src="assets/menu/icon-fraction.webp" alt=""> ${mission.name}</span>
      <span class="level-stars">${formatStarRating(rating)}</span>
      <span class="level-best">${Number.isInteger(best) ? `⭐ Rekod: ${best}/10` : (unlocked ? "Jom cuba!" : "Selesaikan misi sebelumnya")}</span>
    </button>`;
  }).join("");
  showScreen("fractionLevels");
  elements.fractionLevelGrid.querySelector("button:not(:disabled)")?.focus();
}

function handleFractionLevelSelection(event) {
  const card = event.target.closest("[data-fraction-level]");
  const levelId = Number(card?.dataset.fractionLevel);
  if (!card || card.disabled || levelId > progress.fractionProgress.highestUnlockedLevel) return;
  startFractionGame(levelId, "fraction-mission");
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
  elements.practiceGrid.innerHTML = Object.entries(practiceCategories).map(([categoryId, category]) => {
    const categoryIcon = category.iconImage
      ? `<img class="practice-category-icon" src="${category.iconImage}" alt="">`
      : `<span aria-hidden="true">${category.icon}</span>`;
    const cards = practiceTypes.filter((practice) => practice.category === categoryId).map((practice) => `
        <button class="practice-card" type="button" data-practice="${practice.id}">
          <span class="practice-number">${categoryIcon} ${category.label}</span>
          <strong>${practice.name}</strong>
          <span>10 soalan</span>
        </button>
      `).join("");
    return `<section class="practice-group" aria-labelledby="practice-${categoryId}-title">
      <h3 id="practice-${categoryId}-title">${categoryIcon} ${category.label}</h3>
      <div class="practice-group-grid">${cards}</div>
    </section>`;
  }).join("");
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

  const rawPracticeId = card.dataset.practice;
  const practiceId = /^\d+$/.test(rawPracticeId) ? Number(rawPracticeId) : rawPracticeId;
  const practice = practiceTypes.find((entry) => entry.id === practiceId);
  if (!practice) return;
  if (practice.category === "time") return startTimeGame(practice.timeLevel, "time-practice");
  if (practice.category === "measurement") {
    return startMeasurementGame(practice.measurementLevel, "measurement-practice");
  }
  if (practice.category === "fraction") return startFractionGame(practice.fractionLevel, "fraction-practice");
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
    const skillIcon = skill.iconImage
      ? `<img class="skill-category-icon" src="${skill.iconImage}" alt="">`
      : `<span aria-hidden="true">${skill.icon}</span>`;
    card.innerHTML = `
      <div class="skill-stat-heading">${skillIcon}<strong>${skill.name}</strong></div>
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
  const rawPracticeId = statElements.skillRecommendationButton.dataset.practice;
  const practiceId = /^\d+$/.test(rawPracticeId) ? Number(rawPracticeId) : rawPracticeId;
  const practice = practiceTypes.find((entry) => entry.id === practiceId);
  if (!practice) return;
  if (practice.category === "time") return startTimeGame(practice.timeLevel, "time-practice");
  if (practice.category === "measurement") {
    return startMeasurementGame(practice.measurementLevel, "measurement-practice");
  }
  if (practice.category === "fraction") return startFractionGame(practice.fractionLevel, "fraction-practice");
  startGame(practiceId, "practice");
}

function showMainMenu() {
  questionLocked = true;
  preloadMainMenuAssets();
  const savedScores = Object.values(progress.bestScores).filter(Number.isInteger);
  const bestScore = savedScores.length > 0 ? Math.max(...savedScores) : 0;
  elements.menuHighestMission.textContent = `Misi ${progress.highestUnlockedLevel}`;
  elements.menuBestScore.textContent = `${bestScore}/${totalCustomers}`;
  elements.moneyStarTotal.textContent = `⭐ ${Object.values(progress.stars).reduce((sum, value) => sum + (Number(value) || 0), 0)}/30`;
  elements.timeStarTotal.textContent = `⭐ ${Object.values(progress.timeProgress.stars).reduce((sum, value) => sum + (Number(value) || 0), 0)}/30`;
  elements.measurementStarTotal.textContent = `⭐ ${Object.values(progress.measurementProgress.stars).reduce((sum, value) => sum + (Number(value) || 0), 0)}/30`;
  elements.fractionStarTotal.textContent = `⭐ ${Object.values(progress.fractionProgress.stars).reduce((sum, value) => sum + (Number(value) || 0), 0)}/30`;
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
  elements.moneyCategoryButton.focus();
}

function showTitleScreen() {
  questionLocked = true;
  elements.howToCard.classList.add("hidden");
  showScreen("title");
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

function getMoneyVisualData(question) {
  if (question.transaction) {
    return {
      valueSen: question.transaction.usesCents
        ? question.transaction.paymentAmount
        : question.transaction.paymentAmount * 100,
      label: "Wang diberi pelanggan"
    };
  }

  const item = question.items?.[0];
  if (!item) return null;
  return {
    valueSen: item.priceCents !== undefined ? item.priceCents : item.price * 100,
    label: `Contoh wang untuk harga ${item.name}`
  };
}

function renderMoneyVisual(question) {
  const visual = getMoneyVisualData(question);
  if (!visual || !Number.isInteger(visual.valueSen) || visual.valueSen <= 0) {
    elements.moneyVisualStage.replaceChildren();
    elements.moneyVisualStage.classList.add("hidden");
    return;
  }
  const variant = progress.accessibilitySettings.visualHelp ? 0 : currentCustomer + currentLevel;
  const markup = MoneyVisualModule.renderMoneyAmount(visual.valueSen, {
    label: visual.label,
    maxPieces: 8,
    variant,
    showAmount: true
  });
  elements.moneyVisualStage.innerHTML = markup;
  elements.moneyVisualStage.classList.toggle("hidden", !markup);
}

function renderVisualHelp(question) {
  const hints = [];
  if (question.isTime && !question.isTimeline) hints.push("🟣 Jarum pendek menunjukkan jam. 🟡 Jarum panjang menunjukkan minit.");
  if (question.isTimeline) hints.push("⏱️ MULA → TAMAT. Kira tempoh di antaranya.");
  if (question.isEndTime) hints.push("🕐 Masa mula + tempoh → masa siap.");
  if (question.items?.some((item) => item.quantity)) {
    hints.push("📦 Darab harga seunit dengan bilangan unit.");
  }
  if (question.transaction) {
    hints.push("💳 Bayar → kira Jumlah sendiri → cari Baki.");
  }
  if (question.usesCents) {
    hints.push("🪙 RM ialah Ringgit; dua angka selepas titik ialah sen.");
  }
  if (question.isMeasurement) {
    const help = {
      mass: "⚖️ 1000 g bersamaan 1 kg.",
      volume: "🧃 1000 mL bersamaan 1 L.",
      length: "📏 100 cm bersamaan 1 m."
    };
    hints.push(help[question.measurementDimension]);
  }
  if (question.isFraction) {
    hints.push("🍰 Garisan menunjukkan semua bahagian yang sama besar. Kira bahagian berwarna dan jumlah bahagiannya.");
  }
  if (!question.isTime && !question.isMeasurement && !question.isFraction) {
    hints.push("💵 Setiap wang mempunyai label nilai. Kira menggunakan nilai itu, bukan warnanya.");
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
    `<button class="answer-button" type="button" data-value="${choice}" disabled>${answersUseFraction
      ? FractionModule.format(choice, currentAnswerKind)
      : answersUseMeasurement
      ? MeasurementModule.format(choice, currentMeasurementDimension)
      : answersUseCents
      ? formatMoney(choice)
      : (answersUseTime
        ? (currentAnswerKind === "duration"
          ? formatDuration(choice)
          : currentAnswerKind === "time-period"
            ? formatTimePeriod(choice)
            : currentAnswerKind === "clock-ampm"
              ? formatClockTimeAmPm(choice)
              : formatClockTime(choice))
        : `RM${choice}`)}</button>`
  ).join("");
}

function renderMeasurementDisplay(question) {
  elements.itemsList.classList.remove("three-items");
  elements.itemsList.innerHTML = `<article class="measurement-display" aria-label="Maklumat ukuran">
    <span class="measurement-icon" aria-hidden="true">${question.visual.icon}</span>
    <span class="measurement-copy"><strong>${question.visual.title}</strong><b>${question.visual.equation}</b></span>
  </article>`;
}

function renderFractionDisplay(question) {
  elements.itemsList.classList.remove("three-items");
  elements.itemsList.innerHTML = FractionModule.render(question, progress.accessibilitySettings.visualHelp);
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
  const isTimeSession = gameMode === "time-mission" || gameMode === "time-practice";
  const isMeasurementSession = gameMode === "measurement-mission" || gameMode === "measurement-practice";
  const isFractionSession = gameMode === "fraction-mission" || gameMode === "fraction-practice";
  const question = isTimeSession
    ? generateTimeQuestion(customer, currentTimeLevel)
    : isMeasurementSession
      ? MeasurementModule.generate(
        currentMeasurementLevel,
        currentCustomer - 1,
        customer,
        randomIndex,
        shuffle,
        measurementQuestionPlan
      )
      : isFractionSession
        ? FractionModule.generate(
          currentFractionLevel,
          currentCustomer - 1,
          customer,
          randomIndex,
          shuffle,
          fractionQuestionPlan
        )
        : questionGenerators[currentLevel]();
  correctAnswer = question.answer;
  answersUseCents = Boolean(question.usesCents);
  answersUseTime = Boolean(question.isTime);
  answersUseMeasurement = Boolean(question.isMeasurement);
  answersUseFraction = Boolean(question.isFraction);
  currentAnswerKind = question.answerKind || (question.usesCents ? "money-cents" : "money");
  currentMeasurementDimension = question.measurementDimension || "mass";
  currentMeasurementSubSkill = question.measurementSubSkill || "weight";
  currentFractionSubSkill = question.fractionSubSkill || "visualFraction";
  currentSkillCategory = question.skillCategory || levelSkillCategories[currentLevel] || "mixed";

  elements.questionText.textContent = question.isTime || question.isMeasurement || question.isFraction
    ? question.context.question
    : question.questionType === "change"
    ? `Berapa baki ${customer.name}?`
    : "Semua sekali berapa?";
  elements.transactionSummary.classList.toggle("hidden", !question.transaction);
  if (question.transaction) {
    elements.purchaseTotal.textContent = "?";
    elements.paymentAmount.textContent = question.transaction.usesCents
      ? formatMoney(question.transaction.paymentAmount)
      : `RM${question.transaction.paymentAmount}`;
  }

  if (question.isTime || question.isMeasurement || question.isFraction) {
    elements.moneyVisualStage.replaceChildren();
    elements.moneyVisualStage.classList.add("hidden");
    elements.customerAction.textContent = "";
    elements.itemsAndQuestion.classList.toggle("time-question", Boolean(question.isTime));
    elements.itemsAndQuestion.classList.toggle("measurement-question", Boolean(question.isMeasurement));
    elements.itemsAndQuestion.classList.toggle("fraction-question", Boolean(question.isFraction));
    elements.customerName.textContent = question.context.usesCustomer
      ? `${customer.name}: “${question.context.dialog}”`
      : question.context.dialog;
    elements.customerAvatar.parentElement.classList.toggle("shop-dialog-badge", !question.context.usesCustomer);
    elements.customerAvatar.classList.remove("hidden");
    elements.avatarFallback.classList.add("hidden");
    if (question.context.usesCustomer) {
      elements.avatarFallback.textContent = "👤";
      elements.customerAvatar.alt = `Avatar ${customer.name}`;
      elements.customerAvatar.src = customer.avatar;
    } else {
      elements.avatarFallback.textContent = "KM";
      elements.customerAvatar.alt = "";
      elements.customerAvatar.src = "assets/branding/logo-icon.webp";
    }
    if (question.isTime) {
      elements.itemsList.innerHTML = "";
      elements.itemsList.classList.remove("three-items");
      renderTimeDisplay(question);
    } else if (question.isMeasurement) {
      elements.clockStage.classList.add("hidden");
      elements.clockStage.innerHTML = "";
      renderMeasurementDisplay(question);
    } else {
      elements.clockStage.classList.add("hidden");
      elements.clockStage.innerHTML = "";
      renderFractionDisplay(question);
    }
  } else {
    elements.customerAction.textContent = " membeli:";
    elements.itemsAndQuestion.classList.remove("time-question");
    elements.itemsAndQuestion.classList.remove("measurement-question");
    elements.itemsAndQuestion.classList.remove("fraction-question");
    elements.customerName.textContent = customer.name;
    elements.customerAvatar.classList.remove("hidden");
    elements.customerAvatar.parentElement.classList.remove("shop-dialog-badge");
    elements.avatarFallback.textContent = "👤";
    elements.avatarFallback.classList.add("hidden");
    elements.customerAvatar.alt = `Avatar ${customer.name}`;
    elements.customerAvatar.src = customer.avatar;
    elements.clockStage.classList.add("hidden");
    elements.clockStage.innerHTML = "";
    renderItems(question.items);
    renderMoneyVisual(question);
  }
  renderVisualHelp(question);
  renderAnswers(question.choices || createAnswerChoices(correctAnswer, question.distractors, question.choiceOffsets));

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
  if (gameMode === "time-practice") {
    showPracticeGameOver();
    return;
  }
  if (gameMode === "measurement-practice") {
    showPracticeGameOver();
    return;
  }
  if (gameMode === "fraction-practice") {
    showPracticeGameOver();
    return;
  }
  if (gameMode === "time-mission") {
    showTimeGameOver();
    return;
  }
  if (gameMode === "measurement-mission") {
    showMeasurementGameOver();
    return;
  }
  if (gameMode === "fraction-mission") {
    showFractionGameOver();
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
  elements.nextLevelButton.textContent = "Misi Seterusnya";
  elements.nextLevelButton.classList.toggle("hidden", !nextLevelUnlocked);
  showScreen("results");
  if (unlockedAchievementCount === 0) {
    audioManager.play(unlockedNewMission ? "missionUnlock" : "sessionComplete");
  }
  elements.playAgainButton.focus();
}

function showTimeGameOver() {
  sessionActive = false;
  elements.homeGameButton.disabled = true;
  const previousBest = progress.timeProgress.bestScores[currentTimeLevel] || 0;
  const previousStars = progress.timeProgress.stars[currentTimeLevel] || 0;
  const previousHighest = progress.timeProgress.highestUnlockedLevel;
  const rating = getStarRating(stars);
  const passed = stars >= 8;
  progress.timeProgress.bestScores[currentTimeLevel] = Math.max(previousBest, stars);
  progress.timeProgress.stars[currentTimeLevel] = Math.max(previousStars, rating);
  progress.stats.missionsPlayed += 1;
  if (passed) progress.stats.missionsPassed += 1;
  if (passed && currentTimeLevel < timeMissions.length) {
    progress.timeProgress.highestUnlockedLevel = Math.max(
      progress.timeProgress.highestUnlockedLevel,
      currentTimeLevel + 1
    );
  }
  const achievementCount = checkAchievements({
    missionScore: stars,
    missionPassed: passed,
    timeMissionLevel: currentTimeLevel
  });
  saveProgress();

  const mission = timeMissions.find((entry) => entry.id === currentTimeLevel);
  const nextMissionUnlocked = currentTimeLevel < timeMissions.length &&
    progress.timeProgress.highestUnlockedLevel >= currentTimeLevel + 1;
  const unlockedNewTimeMission = progress.timeProgress.highestUnlockedLevel > previousHighest;

  elements.gameOverTitle.textContent = "MASA REHAT SEKEJAP!";
  elements.resultLevel.textContent = `Misi Masa ${currentTimeLevel} — ${mission?.name || "Masa & Jam"}`;
  elements.finalLabel.textContent = "Keputusan kamu";
  elements.finalScoreIcon.textContent = "🕐";
  elements.finalScore.textContent = `${stars} / ${totalCustomers}`;
  elements.finalAccuracy.textContent = `${Math.round(stars / totalCustomers * 100)}%`;
  elements.sessionStars.textContent = formatStarRating(rating);
  elements.sessionStars.classList.remove("hidden");
  elements.newStarRecord.classList.toggle("hidden", rating <= previousStars);
  elements.finalBest.closest(".final-best").classList.remove("hidden");
  elements.finalBest.closest(".final-best").firstChild.textContent = "Rekod Terbaik: ";
  elements.finalBest.textContent = `${progress.timeProgress.bestScores[currentTimeLevel]} / 10`;
  elements.finalRating.textContent = getRating(stars);
  elements.finalRating.classList.remove("hidden");
  elements.levelUnlocked.textContent = currentTimeLevel === timeMissions.length && passed
    ? "🏆 Hebat! Semua Misi Masa Selesai!"
    : "🎉 Misi Masa Baru Dibuka!";
  elements.levelUnlocked.classList.toggle("hidden", !(unlockedNewTimeMission || (currentTimeLevel === timeMissions.length && passed)));
  elements.nextLevelButton.textContent = "Misi Masa Seterusnya";
  elements.nextLevelButton.classList.toggle("hidden", !nextMissionUnlocked);
  elements.playAgainButton.textContent = "Main Lagi";
  elements.chooseLevelButton.textContent = "Pilih Misi Masa";
  elements.chooseLevelButton.classList.remove("hidden");
  elements.resultMenuButton.classList.remove("hidden");
  showScreen("results");
  if (achievementCount === 0) audioManager.play(unlockedNewTimeMission ? "missionUnlock" : "sessionComplete");
  elements.playAgainButton.focus();
}

function showMeasurementGameOver() {
  sessionActive = false;
  elements.homeGameButton.disabled = true;
  const previousBest = progress.measurementProgress.bestScores[currentMeasurementLevel] || 0;
  const previousStars = progress.measurementProgress.stars[currentMeasurementLevel] || 0;
  const previousHighest = progress.measurementProgress.highestUnlockedLevel;
  const rating = getStarRating(stars);
  const passed = stars >= 8;

  progress.measurementProgress.bestScores[currentMeasurementLevel] = Math.max(previousBest, stars);
  progress.measurementProgress.stars[currentMeasurementLevel] = Math.max(previousStars, rating);
  progress.stats.missionsPlayed += 1;
  if (passed) progress.stats.missionsPassed += 1;
  if (passed && currentMeasurementLevel < measurementMissions.length) {
    progress.measurementProgress.highestUnlockedLevel = Math.max(
      progress.measurementProgress.highestUnlockedLevel,
      currentMeasurementLevel + 1
    );
  }
  saveProgress();

  const mission = measurementMissions.find((entry) => entry.id === currentMeasurementLevel);
  const nextMissionUnlocked = currentMeasurementLevel < measurementMissions.length &&
    progress.measurementProgress.highestUnlockedLevel >= currentMeasurementLevel + 1;
  const unlockedNewMission = progress.measurementProgress.highestUnlockedLevel > previousHighest;

  elements.gameOverTitle.textContent = "UKURAN SELESAI!";
  elements.resultLevel.textContent = `Misi Ukuran ${currentMeasurementLevel} — ${mission?.name || "Ukuran"}`;
  elements.finalLabel.textContent = "Keputusan kamu";
  elements.finalScoreIcon.textContent = "⚖️";
  elements.finalScore.textContent = `${stars} / ${totalCustomers}`;
  elements.finalAccuracy.textContent = `${Math.round(stars / totalCustomers * 100)}%`;
  elements.sessionStars.textContent = formatStarRating(rating);
  elements.sessionStars.classList.remove("hidden");
  elements.newStarRecord.classList.toggle("hidden", rating <= previousStars);
  elements.finalBest.closest(".final-best").classList.remove("hidden");
  elements.finalBest.closest(".final-best").firstChild.textContent = "Rekod Terbaik: ";
  elements.finalBest.textContent = `${progress.measurementProgress.bestScores[currentMeasurementLevel]} / 10`;
  elements.finalRating.textContent = getRating(stars);
  elements.finalRating.classList.remove("hidden");
  elements.levelUnlocked.textContent = currentMeasurementLevel === measurementMissions.length && passed
    ? "🏆 Hebat! Semua Misi Ukuran Selesai!"
    : "🎉 Misi Ukuran Baru Dibuka!";
  elements.levelUnlocked.classList.toggle("hidden", !(unlockedNewMission || (currentMeasurementLevel === measurementMissions.length && passed)));
  elements.nextLevelButton.textContent = "Misi Ukuran Seterusnya";
  elements.nextLevelButton.classList.toggle("hidden", !nextMissionUnlocked);
  elements.playAgainButton.textContent = "Main Lagi";
  elements.chooseLevelButton.textContent = "Pilih Misi Ukuran";
  elements.chooseLevelButton.classList.remove("hidden");
  elements.resultMenuButton.classList.remove("hidden");
  showScreen("results");
  audioManager.play(unlockedNewMission ? "missionUnlock" : "sessionComplete");
  elements.playAgainButton.focus();
}

function showFractionGameOver() {
  sessionActive = false;
  elements.homeGameButton.disabled = true;
  const previousBest = progress.fractionProgress.bestScores[currentFractionLevel] || 0;
  const previousStars = progress.fractionProgress.stars[currentFractionLevel] || 0;
  const previousHighest = progress.fractionProgress.highestUnlockedLevel;
  const rating = getStarRating(stars);
  const passed = stars >= 8;

  progress.fractionProgress.bestScores[currentFractionLevel] = Math.max(previousBest, stars);
  progress.fractionProgress.stars[currentFractionLevel] = Math.max(previousStars, rating);
  progress.stats.missionsPlayed += 1;
  if (passed) progress.stats.missionsPassed += 1;
  if (passed && currentFractionLevel < fractionMissions.length) {
    progress.fractionProgress.highestUnlockedLevel = Math.max(
      progress.fractionProgress.highestUnlockedLevel,
      currentFractionLevel + 1
    );
  }
  const achievementCount = checkAchievements({
    missionScore: stars,
    missionPassed: passed,
    fractionMissionLevel: currentFractionLevel
  });
  saveProgress();

  const mission = fractionMissions.find((entry) => entry.id === currentFractionLevel);
  const nextMissionUnlocked = currentFractionLevel < fractionMissions.length &&
    progress.fractionProgress.highestUnlockedLevel >= currentFractionLevel + 1;
  const unlockedNewMission = progress.fractionProgress.highestUnlockedLevel > previousHighest;

  elements.gameOverTitle.textContent = "PECAHAN SELESAI!";
  elements.resultLevel.textContent = `Misi Pecahan ${currentFractionLevel} — ${mission?.name || "Pecahan"}`;
  elements.finalLabel.textContent = "Keputusan kamu";
  elements.finalScoreIcon.innerHTML = '<img class="result-fraction-icon" src="assets/menu/icon-fraction.webp" alt="">';
  elements.finalScore.textContent = `${stars} / ${totalCustomers}`;
  elements.finalAccuracy.textContent = `${Math.round(stars / totalCustomers * 100)}%`;
  elements.sessionStars.textContent = formatStarRating(rating);
  elements.sessionStars.classList.remove("hidden");
  elements.newStarRecord.classList.toggle("hidden", rating <= previousStars);
  elements.finalBest.closest(".final-best").classList.remove("hidden");
  elements.finalBest.closest(".final-best").firstChild.textContent = "Rekod Terbaik: ";
  elements.finalBest.textContent = `${progress.fractionProgress.bestScores[currentFractionLevel]} / 10`;
  elements.finalRating.textContent = getRating(stars);
  elements.finalRating.classList.remove("hidden");
  elements.levelUnlocked.textContent = currentFractionLevel === fractionMissions.length && passed
    ? "🏆 Hebat! Semua Misi Pecahan Selesai!"
    : "🎉 Misi Pecahan Baru Dibuka!";
  elements.levelUnlocked.classList.toggle("hidden", !(unlockedNewMission || (currentFractionLevel === fractionMissions.length && passed)));
  elements.nextLevelButton.textContent = "Misi Pecahan Seterusnya";
  elements.nextLevelButton.classList.toggle("hidden", !nextMissionUnlocked);
  elements.playAgainButton.textContent = "Main Lagi";
  elements.chooseLevelButton.textContent = "Pilih Misi Pecahan";
  elements.chooseLevelButton.classList.remove("hidden");
  elements.resultMenuButton.classList.remove("hidden");
  showScreen("results");
  if (achievementCount === 0) audioManager.play(unlockedNewMission ? "missionUnlock" : "sessionComplete");
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
  prepareGameplayAssets();
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

function startTimeGame(levelId = 1, mode = "time-mission") {
  const timeMission = timeMissions.find((mission) => mission.id === levelId);
  if (!timeMission?.implemented || !["time-mission", "time-practice"].includes(mode)) return;
  if (mode === "time-mission" && levelId > progress.timeProgress.highestUnlockedLevel) return;
  stopQuestionTimer();
  prepareGameplayAssets();
  gameMode = mode;
  currentTimeLevel = levelId;
  if (mode === "time-practice") currentPracticeType = `time-${levelId}`;
  randomSource = Math.random;
  sessionActive = true;
  homeModalOpen = false;
  elements.homeModal.classList.add("hidden");
  stars = 0;
  currentCustomer = 1;
  sessionCustomers = shuffle(customers);
  currentStreak = 0;
  lastTimeHour = null;
  lastTimeTemplateIndex = null;
  timeQuestionPlan = createTimeQuestionPlan(levelId);
  questionLocked = true;
  elements.practiceBadge.classList.toggle("hidden", mode !== "time-practice");
  elements.practiceBadge.textContent = "🕐 LATIHAN MASA";
  updateStats();
  showScreen("game");
  newQuestion();
}

function startMeasurementGame(levelId = 1, mode = "measurement-mission") {
  const mission = measurementMissions.find((entry) => entry.id === levelId);
  if (!mission?.implemented || !["measurement-mission", "measurement-practice"].includes(mode)) return;
  if (mode === "measurement-mission" && levelId > progress.measurementProgress.highestUnlockedLevel) return;
  stopQuestionTimer();
  prepareGameplayAssets();
  gameMode = mode;
  currentMeasurementLevel = levelId;
  if (mode === "measurement-practice") currentPracticeType = `measurement-${levelId}`;
  randomSource = Math.random;
  sessionActive = true;
  homeModalOpen = false;
  elements.homeModal.classList.add("hidden");
  stars = 0;
  currentCustomer = 1;
  sessionCustomers = shuffle(customers);
  currentStreak = 0;
  measurementQuestionPlan = MeasurementModule.createPlan(levelId, shuffle);
  questionLocked = true;
  elements.practiceBadge.classList.toggle("hidden", mode !== "measurement-practice");
  elements.practiceBadge.textContent = "⚖️ LATIHAN UKURAN";
  updateStats();
  showScreen("game");
  newQuestion();
}

function startFractionGame(levelId = 1, mode = "fraction-mission") {
  const mission = fractionMissions.find((entry) => entry.id === levelId);
  if (!mission?.implemented || !["fraction-mission", "fraction-practice"].includes(mode)) return;
  if (mode === "fraction-mission" && levelId > progress.fractionProgress.highestUnlockedLevel) return;
  stopQuestionTimer();
  prepareGameplayAssets();
  gameMode = mode;
  currentFractionLevel = levelId;
  if (mode === "fraction-practice") currentPracticeType = `fraction-${levelId}`;
  randomSource = Math.random;
  sessionActive = true;
  homeModalOpen = false;
  elements.homeModal.classList.add("hidden");
  stars = 0;
  currentCustomer = 1;
  sessionCustomers = shuffle(customers);
  currentStreak = 0;
  fractionQuestionPlan = FractionModule.createPlan(levelId, shuffle);
  questionLocked = true;
  elements.practiceBadge.classList.toggle("hidden", mode !== "fraction-practice");
  elements.practiceBadge.innerHTML = '<img class="practice-badge-icon" src="assets/menu/icon-fraction.webp" alt=""> LATIHAN PECAHAN';
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
  if (gameMode === "fraction-mission") {
    const nextFractionLevel = currentFractionLevel + 1;
    if (nextFractionLevel <= progress.fractionProgress.highestUnlockedLevel && fractionMissions[nextFractionLevel - 1]?.implemented) {
      startFractionGame(nextFractionLevel, "fraction-mission");
      return;
    }
    showFractionLevelSelect();
    return;
  }
  if (gameMode === "measurement-mission") {
    const nextMeasurementLevel = currentMeasurementLevel + 1;
    if (
      nextMeasurementLevel <= progress.measurementProgress.highestUnlockedLevel &&
      measurementMissions[nextMeasurementLevel - 1]?.implemented
    ) {
      startMeasurementGame(nextMeasurementLevel, "measurement-mission");
      return;
    }
    showMeasurementLevelSelect();
    return;
  }
  if (gameMode === "time-mission") {
    const nextTimeLevel = currentTimeLevel + 1;
    if (nextTimeLevel <= progress.timeProgress.highestUnlockedLevel && timeMissions[nextTimeLevel - 1]?.implemented) {
      startTimeGame(nextTimeLevel, "time-mission");
      return;
    }
    showTimeLevelSelect();
    return;
  }
  const nextLevelId = currentLevel + 1;
  const nextLevel = levels.find((level) => level.id === nextLevelId);

  if (nextLevel && nextLevel.implemented && nextLevelId <= progress.highestUnlockedLevel) {
    startGame(nextLevelId, "mission");
    return;
  }

  showLevelSelect(`Misi ${nextLevelId} sudah dibuka dan akan datang!`);
}

// Semua event listener didaftarkan sekali sahaja.
elements.startMenuButton.addEventListener("click", showMainMenu);
elements.titleBackButton.addEventListener("click", showTitleScreen);
elements.moneyCategoryButton.addEventListener("click", () => showLevelSelect());
elements.timeCategoryButton.addEventListener("click", () => showTimeLevelSelect());
elements.measurementCategoryButton.addEventListener("click", () => showMeasurementLevelSelect());
elements.fractionCategoryButton.addEventListener("click", () => showFractionLevelSelect());
elements.timeLevelBackButton.addEventListener("click", showMainMenu);
elements.timeLevelGrid.addEventListener("click", handleTimeLevelSelection);
elements.measurementLevelBackButton.addEventListener("click", showMainMenu);
elements.measurementLevelGrid.addEventListener("click", handleMeasurementLevelSelection);
elements.fractionLevelBackButton.addEventListener("click", showMainMenu);
elements.fractionLevelGrid.addEventListener("click", handleFractionLevelSelection);
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
    "#start-menu-button, #title-back-button, #statistics-button, #stats-back-button, #practice-menu-button, " +
    "#practice-back-button, #profile-menu-button, #profile-save-button, #profile-cancel-button, " +
    "#achievements-menu-button, #achievements-back-button, #home-game-button, " +
    "#home-confirm-button, #home-continue-button, " +
    "#daily-menu-button, #daily-start-button, #daily-back-button, " +
    "#settings-menu-button, #settings-save-button, #settings-back-button, " +
    "#skill-recommendation-button, " +
    "#money-category-button, #time-category-button, #measurement-category-button, #fraction-category-button, " +
    "#time-level-back-button, #measurement-level-back-button, #fraction-level-back-button, " +
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
  else if (gameMode === "measurement-mission" || gameMode === "measurement-practice") {
    startMeasurementGame(currentMeasurementLevel, gameMode);
  }
  else if (gameMode === "fraction-mission" || gameMode === "fraction-practice") startFractionGame(currentFractionLevel, gameMode);
  else if (gameMode === "time-mission" || gameMode === "time-practice") startTimeGame(currentTimeLevel, gameMode);
  else startGame(currentLevel, gameMode);
});
elements.chooseLevelButton.addEventListener("click", () => {
  if (gameMode === "practice" || gameMode === "time-practice" || gameMode === "measurement-practice" || gameMode === "fraction-practice") showPracticeSelect();
  else if (gameMode === "fraction-mission") showFractionLevelSelect();
  else if (gameMode === "measurement-mission") showMeasurementLevelSelect();
  else if (gameMode === "time-mission") showTimeLevelSelect();
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
elements.appVersion.textContent = `v${GAME_VERSION} by Zil-el-Saif`;
document.querySelector('meta[name="application-version"]').content = GAME_VERSION;
updateSoundButton();
if (!document.fullscreenEnabled) {
  elements.fullscreenButton.disabled = true;
  elements.fullscreenButton.title = "Skrin penuh tidak disokong";
}
updateFullscreenButton();
renderLevelCards();
showTitleScreen();
