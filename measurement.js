"use strict";

window.MeasurementModule = (() => {
  const missions = [
    { id: 1, name: "Berat Barang", implemented: true },
    { id: 2, name: "Gram & Kilogram", implemented: true },
    { id: 3, name: "Isipadu Minuman", implemented: true },
    { id: 4, name: "Panjang & Pembungkusan", implemented: true },
    { id: 5, name: "Cabaran Ukuran Kedai", implemented: true },
    { id: 6, name: "Campur Berat", implemented: true },
    { id: 7, name: "Campur Isipadu", implemented: true },
    { id: 8, name: "Campur Panjang", implemented: true },
    { id: 9, name: "Pilih Unit Betul", implemented: true },
    { id: 10, name: "Kedai Sibuk: Ukuran", implemented: true }
  ];

  const dimensions = {
    mass: { baseUnit: "g", largeUnit: "kg", largeValue: 1000 },
    volume: { baseUnit: "mL", largeUnit: "L", largeValue: 1000 },
    length: { baseUnit: "cm", largeUnit: "m", largeValue: 100 }
  };
  const weightAmounts = [100, 200, 250, 300, 400, 500, 750, 1000];
  const volumeAmounts = [100, 150, 200, 250, 300, 330, 400, 500, 750, 1000];
  const lengthAmounts = [10, 20, 25, 30, 40, 50, 75, 100, 150, 200];
  const additionValues = {
    mass: [100, 200, 250, 300, 400, 500, 750, 1000, 1500, 2000],
    volume: [100, 200, 250, 300, 330, 500, 750, 1000, 1500, 2000],
    length: [10, 20, 25, 30, 50, 75, 100, 150, 200, 250]
  };
  const itemVisuals = {
    scale: { id: "scale", name: "Alat timbang", emoji: "⚖️", kind: "generic" },
    tepung: { id: "tepung", name: "Tepung", emoji: "🥣", kind: "emoji" },
    beras: { id: "beras", name: "Beras", emoji: "🍚", image: "assets/items/beras.png", kind: "asset" },
    kentang: { id: "kentang", name: "Kentang", emoji: "🥔", image: "assets/items/kentang.png", kind: "asset" },
    epal: { id: "epal", name: "Epal", emoji: "🍎", image: "assets/items/epal.png", kind: "asset" },
    gula: { id: "gula", name: "Gula", emoji: "🧂", kind: "emoji" },
    bawang: { id: "bawang", name: "Bawang", emoji: "🧅", image: "assets/items/bawang.png", kind: "asset" },
    jus: { id: "jus", name: "Jus", emoji: "🧃", image: "assets/items/jus.png", kind: "asset" },
    susu: { id: "susu", name: "Susu", emoji: "🥛", image: "assets/items/susu.png", kind: "asset" },
    air: { id: "air", name: "Air", emoji: "💧", kind: "emoji" },
    "minuman-kotak": { id: "minuman-kotak", name: "Minuman kotak", emoji: "🥤", image: "assets/items/air-kotak.png", kind: "asset" },
    reben: { id: "reben", name: "Reben", emoji: "🎀", kind: "emoji" },
    tali: { id: "tali", name: "Tali", emoji: "🧵", kind: "emoji" },
    pita: { id: "pita", name: "Pita ukur", emoji: "📏", kind: "emoji" },
    "kertas-pembungkus": { id: "kertas-pembungkus", name: "Kertas pembungkus", emoji: "🎁", kind: "emoji" },
    "label-rak": { id: "label-rak", name: "Label rak", emoji: "🏷️", kind: "emoji" },
    pensel: { id: "pensel", name: "Pensel", emoji: "✏️", image: "assets/items/pensel.png", kind: "asset" },
    biskut: { id: "biskut", name: "Biskut", emoji: "🍪", image: "assets/items/biskut.png", kind: "asset" },
    keju: { id: "keju", name: "Keju", emoji: "🧀", image: "assets/items/keju.png", kind: "asset" },
    telur: { id: "telur", name: "Telur", emoji: "🥚", image: "assets/items/telur.png", kind: "asset" },
    tembikai: { id: "tembikai", name: "Tembikai", emoji: "🍉", image: "assets/items/tembikai.png", kind: "asset" },
    syampu: { id: "syampu", name: "Syampu", emoji: "🧴", image: "assets/items/syampu.png", kind: "asset" }
  };
  function visualItem(id, fallbackName = "Barang", fallbackEmoji = "📦") {
    return itemVisuals[id] || { id, name: fallbackName, emoji: fallbackEmoji, kind: "emoji" };
  }
  function itemIdFromTitle(title) {
    const normalized = title.toLowerCase();
    return Object.keys(itemVisuals).find((id) => normalized.includes(id.replaceAll("-", " ")))
      || (normalized.includes("minuman") ? "minuman-kotak" : null)
      || (normalized.includes("botol") || normalized.includes("baldi") || normalized.includes("dispenser") ? "air" : null)
      || (normalized.includes("kotak kecil") ? "kertas-pembungkus" : null)
      || "scale";
  }
  const products = [
    { id: "tepung", name: "tepung", icon: "🥣" }, { id: "beras", name: "beras", icon: "🍚" },
    { id: "kentang", name: "kentang", icon: "🥔" }, { id: "epal", name: "epal", icon: "🍎" },
    { id: "gula", name: "gula", icon: "🧂" }, { id: "bawang", name: "bawang", icon: "🧅" }
  ];
  const drinks = [
    { id: "jus", name: "jus", icon: "🧃" }, { id: "susu", name: "susu", icon: "🥛" },
    { id: "air", name: "air", icon: "💧" }, { id: "minuman-kotak", name: "minuman kotak", icon: "🥤" }
  ];
  const wrappingMaterials = [
    { id: "reben", name: "reben", icon: "🎀" }, { id: "tali", name: "tali", icon: "🧵" },
    { id: "pita", name: "pita", icon: "📏" }, { id: "kertas-pembungkus", name: "kertas pembungkus", icon: "🎁" },
    { id: "label-rak", name: "label rak", icon: "🏷️" }
  ];

  const unitSituations = [
    ["🍚", "Sebungkus beras", 2], ["⚖️", "Guni tepung", 2],
    ["🥔", "Bakul kentang", 2], ["🍉", "Sebiji tembikai", 2],
    ["🧅", "Guni bawang", 2], ["🧂", "Beg gula besar", 2],
    ["🍎", "Sebiji epal", 1], ["🍬", "Sebiji gula-gula", 1],
    ["🍪", "Sekeping biskut", 1], ["🧀", "Sekeping keju", 1],
    ["✏️", "Sebatang pensel", 1], ["🥚", "Sebiji telur", 1],
    ["🧃", "Kotak jus kecil", 3], ["🥛", "Kotak susu", 3],
    ["🍼", "Botol minuman bayi", 3], ["🥤", "Cawan minuman", 3],
    ["🧴", "Botol syampu", 3], ["💧", "Botol air kecil", 3],
    ["🥛", "Jag susu besar", 4], ["🧃", "Tong jus", 4],
    ["💧", "Baldi air", 4], ["🥤", "Dispenser minuman", 4],
    ["🫙", "Bekas sirap besar", 4], ["🧴", "Tong sabun cecair", 4],
    ["🎀", "Reben pendek", 5], ["🏷️", "Label harga", 5],
    ["📒", "Lebar buku nota", 5], ["🎁", "Kertas pembungkus kecil", 5],
    ["📦", "Kotak kecil", 5], ["✏️", "Panjang pensel", 5],
    ["🧵", "Gulung tali panjang", 6], ["🧶", "Kain pembungkus panjang", 6],
    ["🏪", "Panjang rak kedai", 6], ["🪢", "Tali penghantaran", 6],
    ["🚪", "Lebar pintu kedai", 6], ["🧹", "Panjang batang penyapu", 6]
  ].map(([icon, title, answer]) => {
    const action = answer <= 2 ? "menimbang" : (answer <= 4 ? "menyukat" : "mengukur");
    return { icon, title, answer, dialog: `Pilih unit sesuai untuk ${action} ${title.toLowerCase()}.` };
  });

  function format(value, dimension) {
    if (dimension === "unit") {
      return ({ 1: "g", 2: "kg", 3: "mL", 4: "L", 5: "cm", 6: "m" })[value] || "g";
    }
    const config = dimensions[dimension];
    if (!config) return String(value);
    if (value >= config.largeValue) {
      const large = Math.floor(value / config.largeValue);
      const remainder = value % config.largeValue;
      return remainder
        ? `${large} ${config.largeUnit} ${remainder} ${config.baseUnit}`
        : `${large} ${config.largeUnit}`;
    }
    return `${value} ${config.baseUnit}`;
  }

  function formatBase(value, dimension) {
    return `${value} ${dimensions[dimension].baseUnit}`;
  }

  function createChoices(answer, step, shuffle) {
    const values = new Set([answer]);
    [-2, -1, 1, 2, 3, -3].forEach((offset) => {
      const candidate = answer + offset * step;
      if (candidate > 0 && values.size < 4) values.add(candidate);
    });
    let fallback = step;
    while (values.size < 4) {
      if (fallback !== answer) values.add(fallback);
      fallback += step;
    }
    return shuffle([...values]);
  }

  function context(customer, randomIndex, customerDialog, systemDialog, customerQuestion, systemQuestion) {
    return randomIndex(2) === 0
      ? { usesCustomer: true, dialog: customerDialog, question: customerQuestion(customer.name) }
      : { usesCustomer: false, dialog: systemDialog, question: systemQuestion };
  }

  function weightQuestion(customer, randomIndex, shuffle, spec) {
    const product = products[randomIndex(products.length)];
    const amount = spec?.amount || weightAmounts[randomIndex(weightAmounts.length)];
    const quantity = spec?.quantity || randomIndex(4) + 2;
    const answer = amount * quantity;
    return {
      answer, choices: createChoices(answer, Math.max(50, Math.min(amount, 250)), shuffle),
      isMeasurement: true, measurementDimension: "mass", measurementSubSkill: "weight",
      skillCategory: "measurement",
      visual: { icon: product.icon, items: [visualItem(product.id)], title: product.name, equation: `${quantity} × ${formatBase(amount, "mass")}` },
      context: context(customer, randomIndex,
        `Saya mahu ${quantity} bungkus ${product.name}, setiap satu ${formatBase(amount, "mass")}.`,
        `${quantity} bungkus ${product.name} sedang ditimbang, setiap satu ${formatBase(amount, "mass")}.`,
        (name) => `Berapakah jumlah berat barang ${name}?`, "Berapakah jumlah berat semuanya?")
    };
  }

  function massConversionQuestion(customer, randomIndex, shuffle, spec) {
    const answer = spec?.value || 1000;
    return {
      answer, choices: createChoices(answer, 250, shuffle),
      isMeasurement: true, measurementDimension: "mass", measurementSubSkill: "massConversion",
      skillCategory: "measurement",
      visual: { icon: "🍚", items: [visualItem("beras")], title: "Gram kepada kilogram", equation: `${formatBase(answer, "mass")} = ?` },
      context: context(customer, randomIndex,
        `Tolong tukarkan ${formatBase(answer, "mass")} kepada kilogram dan gram.`,
        `Stok beras seberat ${formatBase(answer, "mass")} perlu dilabel dalam kilogram dan gram.`,
        (name) => `Berapakah berat yang sama untuk ${name}?`, "Berapakah berat stok dalam kilogram dan gram?")
    };
  }

  function volumeQuestion(customer, randomIndex, shuffle, spec) {
    const drink = drinks[randomIndex(drinks.length)];
    const amount = spec?.amount || volumeAmounts[randomIndex(volumeAmounts.length)];
    const quantity = spec?.quantity || randomIndex(4) + 2;
    const answer = amount * quantity;
    return {
      answer, choices: createChoices(answer, amount === 330 ? 100 : Math.max(50, Math.min(amount, 250)), shuffle),
      isMeasurement: true, measurementDimension: "volume", measurementSubSkill: "volume",
      skillCategory: "measurement",
      visual: { icon: drink.icon, items: [visualItem(drink.id)], title: drink.name, equation: `${quantity} × ${formatBase(amount, "volume")}` },
      context: context(customer, randomIndex,
        `Saya membeli ${quantity} bekas ${drink.name}, setiap satu ${formatBase(amount, "volume")}.`,
        `${quantity} bekas ${drink.name} diisi, setiap satu ${formatBase(amount, "volume")}.`,
        (name) => `Berapakah jumlah minuman ${name}?`, "Berapakah jumlah isipadu semuanya?")
    };
  }

  function lengthQuestion(customer, randomIndex, shuffle, spec) {
    const material = wrappingMaterials[randomIndex(wrappingMaterials.length)];
    const amount = spec?.amount || lengthAmounts[randomIndex(lengthAmounts.length)];
    const quantity = spec?.quantity || randomIndex(4) + 2;
    const answer = amount * quantity;
    return {
      answer, choices: createChoices(answer, Math.max(5, Math.min(amount, 25)), shuffle),
      isMeasurement: true, measurementDimension: "length", measurementSubSkill: "length",
      skillCategory: "measurement",
      visual: { icon: material.icon, items: [visualItem(material.id)], title: material.name, equation: `${quantity} × ${formatBase(amount, "length")}` },
      context: context(customer, randomIndex,
        `Hadiah saya menggunakan ${quantity} bahagian ${material.name}, setiap satu ${formatBase(amount, "length")}.`,
        `${quantity} bahagian ${material.name} dipotong, setiap satu ${formatBase(amount, "length")}.`,
        (name) => `Berapakah jumlah panjang untuk ${name}?`, "Berapakah jumlah panjang semuanya?")
    };
  }

  function additionQuestion(customer, randomIndex, shuffle, dimension, subSkill, visual, spec) {
    const values = additionValues[dimension];
    const first = spec?.first ?? values[randomIndex(values.length)];
    const second = spec?.second ?? values[randomIndex(values.length)];
    const answer = first + second;
    const unitName = dimension === "mass" ? "berat" : (dimension === "volume" ? "isipadu" : "panjang");
    return {
      answer, choices: createChoices(answer, dimension === "length" ? 25 : 250, shuffle),
      isMeasurement: true, measurementDimension: dimension, measurementSubSkill: subSkill,
      skillCategory: "measurement",
      visual: { icon: visual.icon, items: visual.itemIds.map((id) => visualItem(id)), title: visual.title, equation: `${formatBase(first, dimension)} + ${formatBase(second, dimension)}` },
      context: context(customer, randomIndex, visual.customerDialog(first, second), visual.systemDialog(first, second),
        (name) => `Berapakah jumlah ${unitName} untuk ${name}?`, `Berapakah jumlah ${unitName} semuanya?`)
    };
  }

  function addWeightQuestion(customer, randomIndex, shuffle, spec) {
    return additionQuestion(customer, randomIndex, shuffle, "mass", "weight", {
      icon: "🍚", itemIds: ["beras", "tepung"], title: "Campur berat",
      customerDialog: (a, b) => `Timbang ${formatBase(a, "mass")} beras dan ${formatBase(b, "mass")} tepung untuk saya.`,
      systemDialog: (a, b) => `Stok ${formatBase(a, "mass")} dan ${formatBase(b, "mass")} sedang digabungkan.`
    }, spec);
  }

  function addVolumeQuestion(customer, randomIndex, shuffle, spec) {
    return additionQuestion(customer, randomIndex, shuffle, "volume", "volume", {
      icon: "🧃", itemIds: ["jus", "susu"], title: "Campur isipadu",
      customerDialog: (a, b) => `Satukan ${formatBase(a, "volume")} jus dan ${formatBase(b, "volume")} susu untuk saya.`,
      systemDialog: (a, b) => `Dua bekas ${formatBase(a, "volume")} dan ${formatBase(b, "volume")} sedang disukat.`
    }, spec);
  }

  function addLengthQuestion(customer, randomIndex, shuffle, spec) {
    return additionQuestion(customer, randomIndex, shuffle, "length", "length", {
      icon: "🎀", itemIds: ["reben", "tali"], title: "Campur panjang",
      customerDialog: (a, b) => `Sambungkan reben ${formatBase(a, "length")} dan ${formatBase(b, "length")} untuk hadiah saya.`,
      systemDialog: (a, b) => `Reben ${formatBase(a, "length")} dan ${formatBase(b, "length")} digunakan untuk membungkus hadiah.`
    }, spec);
  }

  function unitChoiceQuestion(customer, randomIndex, shuffle, spec) {
    const situation = spec?.situation || unitSituations[randomIndex(unitSituations.length)];
    const itemId = itemIdFromTitle(situation.title);
    const situationVisual = itemId === "scale"
      ? { id: `situation-${situation.answer}`, name: situation.title, emoji: situation.icon, kind: "emoji" }
      : visualItem(itemId, situation.title, situation.icon);
    const relatedChoices = situation.answer <= 2 ? [1, 2, 5, 3]
      : situation.answer <= 4 ? [3, 4, 1, 5] : [5, 6, 1, 3];
    return {
      answer: situation.answer, choices: shuffle(relatedChoices),
      isMeasurement: true, measurementDimension: "unit", measurementSubSkill: "unitChoice",
      skillCategory: "measurement",
      visual: { icon: situation.icon, items: [situationVisual], title: situation.title, equation: "Unit yang sesuai?" },
      context: { usesCustomer: randomIndex(2) === 0, dialog: situation.dialog,
        question: "Apakah unit ukuran yang paling sesuai?" }
    };
  }

  function multiplicationPool(amounts) {
    return amounts.flatMap((amount) => [2, 3, 4, 5].map((quantity) => ({ amount, quantity })));
  }

  function additionPool(dimension) {
    const values = additionValues[dimension];
    return values.flatMap((first, index) => values.slice(index).map((second) => ({ first, second })));
  }

  function getPool(levelId) {
    if (levelId === 1) return multiplicationPool(weightAmounts);
    if (levelId === 2) return Array.from({ length: 33 }, (_, index) => ({ value: 1000 + index * 250 }));
    if (levelId === 3) return multiplicationPool(volumeAmounts);
    if (levelId === 4) return multiplicationPool(lengthAmounts);
    if (levelId === 6) return additionPool("mass");
    if (levelId === 7) return additionPool("volume");
    if (levelId === 8) return additionPool("length");
    return unitSituations.map((situation) => ({ situation }));
  }

  function createMixedPlan(levelIds, shuffle) {
    const repeated = [];
    while (repeated.length < 10 - levelIds.length) repeated.push(...shuffle(levelIds));
    repeated.length = Math.max(0, 10 - levelIds.length);
    const typePlan = shuffle([...levelIds, ...repeated]);
    const pools = Object.fromEntries(levelIds.map((id) => [id, shuffle(getPool(id))]));
    return typePlan.map((id) => ({ levelId: id, spec: pools[id].shift() }));
  }

  function createPlan(levelId, shuffle) {
    if (levelId === 5) return createMixedPlan([1, 2, 3, 4], shuffle);
    if (levelId === 10) return createMixedPlan([1, 2, 3, 4, 6, 7, 8, 9], shuffle);
    return shuffle(getPool(levelId)).slice(0, 10).map((spec) => ({ levelId, spec }));
  }

  function generate(levelId, questionIndex, customer, randomIndex, shuffle, plan) {
    const planned = plan[questionIndex] || { levelId, spec: null };
    const selectedLevel = planned.levelId || levelId;
    const spec = planned.spec;
    if (selectedLevel === 1) return weightQuestion(customer, randomIndex, shuffle, spec);
    if (selectedLevel === 2) return massConversionQuestion(customer, randomIndex, shuffle, spec);
    if (selectedLevel === 3) return volumeQuestion(customer, randomIndex, shuffle, spec);
    if (selectedLevel === 4) return lengthQuestion(customer, randomIndex, shuffle, spec);
    if (selectedLevel === 6) return addWeightQuestion(customer, randomIndex, shuffle, spec);
    if (selectedLevel === 7) return addVolumeQuestion(customer, randomIndex, shuffle, spec);
    if (selectedLevel === 8) return addLengthQuestion(customer, randomIndex, shuffle, spec);
    return unitChoiceQuestion(customer, randomIndex, shuffle, spec);
  }

  return { missions, format, createPlan, generate, itemVisuals };
})();
