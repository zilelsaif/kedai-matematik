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

  function format(value, dimension) {
    if (dimension === "unit") {
      return ({ 1: "g", 2: "kg", 3: "mL", 4: "L", 5: "cm", 6: "m" })[value] || "g";
    }
    const config = dimensions[dimension];
    if (!config) return String(value);
    if (value >= config.largeValue && value % config.largeValue === 0) {
      return `${value / config.largeValue} ${config.largeUnit}`;
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
    const usesCustomer = randomIndex(2) === 0;
    return usesCustomer
      ? { usesCustomer: true, dialog: customerDialog, question: customerQuestion(customer.name) }
      : { usesCustomer: false, dialog: systemDialog, question: systemQuestion };
  }

  function weightQuestion(customer, randomIndex, shuffle) {
    const products = [
      { name: "tepung", icon: "⚖️", amounts: [250, 500] },
      { name: "beras", icon: "🍚", amounts: [500, 1000] },
      { name: "epal", icon: "🍎", amounts: [250, 500] }
    ];
    const product = products[randomIndex(products.length)];
    const amount = product.amounts[randomIndex(product.amounts.length)];
    const quantity = randomIndex(2) + 2;
    const answer = amount * quantity;
    return {
      answer,
      choices: createChoices(answer, amount, shuffle),
      isMeasurement: true,
      measurementDimension: "mass",
      measurementSubSkill: "weight",
      skillCategory: "measurement",
      visual: { icon: product.icon, title: product.name, equation: `${quantity} × ${formatBase(amount, "mass")}` },
      context: context(
        customer,
        randomIndex,
        `Saya mahu ${quantity} bungkus ${product.name}, setiap satu ${formatBase(amount, "mass")}.`,
        `${quantity} bungkus ${product.name} sedang ditimbang, setiap satu ${formatBase(amount, "mass")}.`,
        (name) => `Berapakah jumlah berat barang ${name}?`,
        "Berapakah jumlah berat semuanya?"
      )
    };
  }

  function massConversionQuestion(customer, randomIndex, shuffle) {
    const answer = [1000, 2000, 3000, 4000][randomIndex(4)];
    return {
      answer,
      choices: shuffle([1000, 2000, 3000, 4000]),
      isMeasurement: true,
      measurementDimension: "mass",
      measurementSubSkill: "massConversion",
      skillCategory: "measurement",
      visual: { icon: "⚖️", title: "Gram kepada kilogram", equation: `${formatBase(answer, "mass")} = ?` },
      context: context(
        customer,
        randomIndex,
        `Tolong tukarkan ${formatBase(answer, "mass")} kepada kilogram.`,
        `Stok beras seberat ${formatBase(answer, "mass")} perlu dilabel dalam kilogram.`,
        (name) => `Berapakah berat yang sama untuk ${name}?`,
        "Berapakah berat stok dalam kilogram?"
      )
    };
  }

  function volumeQuestion(customer, randomIndex, shuffle) {
    const amount = [250, 500][randomIndex(2)];
    const quantity = [2, 3, 4][randomIndex(3)];
    const answer = amount * quantity;
    return {
      answer,
      choices: createChoices(answer, 250, shuffle),
      isMeasurement: true,
      measurementDimension: "volume",
      measurementSubSkill: "volume",
      skillCategory: "measurement",
      visual: { icon: "🧃", title: "Minuman", equation: `${quantity} × ${formatBase(amount, "volume")}` },
      context: context(
        customer,
        randomIndex,
        `Saya membeli ${quantity} botol, setiap satu ${formatBase(amount, "volume")}.`,
        `${quantity} botol jus diisi, setiap satu ${formatBase(amount, "volume")}.`,
        (name) => `Berapakah jumlah minuman ${name}?`,
        "Berapakah jumlah isipadu semuanya?"
      )
    };
  }

  function lengthQuestion(customer, randomIndex, shuffle) {
    const amount = [25, 50, 100][randomIndex(3)];
    const quantity = [2, 3, 4][randomIndex(3)];
    const answer = amount * quantity;
    return {
      answer,
      choices: createChoices(answer, 25, shuffle),
      isMeasurement: true,
      measurementDimension: "length",
      measurementSubSkill: "length",
      skillCategory: "measurement",
      visual: { icon: "📏", title: "Reben pembungkus", equation: `${quantity} × ${formatBase(amount, "length")}` },
      context: context(
        customer,
        randomIndex,
        `Hadiah saya menggunakan ${quantity} helai reben, setiap satu ${formatBase(amount, "length")}.`,
        `${quantity} helai reben dipotong, setiap satu ${formatBase(amount, "length")}.`,
        (name) => `Berapakah jumlah panjang reben ${name}?`,
        "Berapakah jumlah panjang reben semuanya?"
      )
    };
  }

  function additionQuestion(customer, randomIndex, shuffle, dimension, subSkill, visual) {
    const values = dimension === "length" ? [25, 50, 75, 100] : [250, 500, 750, 1000];
    const first = values[randomIndex(values.length)];
    const second = values[randomIndex(values.length)];
    const answer = first + second;
    const unitName = dimension === "mass" ? "berat" : (dimension === "volume" ? "isipadu" : "panjang");
    return {
      answer,
      choices: createChoices(answer, dimension === "length" ? 25 : 250, shuffle),
      isMeasurement: true,
      measurementDimension: dimension,
      measurementSubSkill: subSkill,
      skillCategory: "measurement",
      visual: { icon: visual.icon, title: visual.title, equation: `${formatBase(first, dimension)} + ${formatBase(second, dimension)}` },
      context: context(
        customer,
        randomIndex,
        visual.customerDialog(first, second),
        visual.systemDialog(first, second),
        (name) => `Berapakah jumlah ${unitName} untuk ${name}?`,
        `Berapakah jumlah ${unitName} semuanya?`
      )
    };
  }

  function addWeightQuestion(customer, randomIndex, shuffle) {
    return additionQuestion(customer, randomIndex, shuffle, "mass", "weight", {
      icon: "⚖️",
      title: "Campur berat",
      customerDialog: (a, b) => `Timbang ${formatBase(a, "mass")} beras dan ${formatBase(b, "mass")} tepung untuk saya.`,
      systemDialog: (a, b) => `Stok ${formatBase(a, "mass")} dan ${formatBase(b, "mass")} sedang digabungkan.`
    });
  }

  function addVolumeQuestion(customer, randomIndex, shuffle) {
    return additionQuestion(customer, randomIndex, shuffle, "volume", "volume", {
      icon: "🧃",
      title: "Campur isipadu",
      customerDialog: (a, b) => `Satukan ${formatBase(a, "volume")} jus dan ${formatBase(b, "volume")} susu untuk saya.`,
      systemDialog: (a, b) => `Dua bekas ${formatBase(a, "volume")} dan ${formatBase(b, "volume")} sedang disukat.`
    });
  }

  function addLengthQuestion(customer, randomIndex, shuffle) {
    return additionQuestion(customer, randomIndex, shuffle, "length", "length", {
      icon: "📏",
      title: "Campur panjang",
      customerDialog: (a, b) => `Sambungkan reben ${formatBase(a, "length")} dan ${formatBase(b, "length")} untuk hadiah saya.`,
      systemDialog: (a, b) => `Reben ${formatBase(a, "length")} dan ${formatBase(b, "length")} digunakan untuk membungkus hadiah.`
    });
  }

  function unitChoiceQuestion(customer, randomIndex, shuffle) {
    const situations = [
      { icon: "🍚", title: "Sebungkus beras", answer: 2, dialog: "Pilih unit sesuai untuk menimbang sebungkus beras." },
      { icon: "🍎", title: "Sebiji epal", answer: 1, dialog: "Pilih unit sesuai untuk menimbang sebiji epal." },
      { icon: "🧃", title: "Kotak jus", answer: 3, dialog: "Pilih unit sesuai untuk menyukat sebuah kotak jus." },
      { icon: "🥛", title: "Jag susu", answer: 4, dialog: "Pilih unit sesuai untuk menyukat jag susu besar." },
      { icon: "🎀", title: "Reben pendek", answer: 5, dialog: "Pilih unit sesuai untuk mengukur reben pendek." },
      { icon: "🧵", title: "Gulung tali", answer: 6, dialog: "Pilih unit sesuai untuk mengukur gulung tali panjang." }
    ];
    const situation = situations[randomIndex(situations.length)];
    const relatedChoices = situation.answer <= 2 ? [1, 2, 5, 3]
      : situation.answer <= 4 ? [3, 4, 1, 5]
      : [5, 6, 1, 3];
    return {
      answer: situation.answer,
      choices: shuffle(relatedChoices),
      isMeasurement: true,
      measurementDimension: "unit",
      measurementSubSkill: "unitChoice",
      skillCategory: "measurement",
      visual: { icon: situation.icon, title: situation.title, equation: "Unit yang sesuai?" },
      context: {
        usesCustomer: randomIndex(2) === 0,
        dialog: situation.dialog,
        question: "Apakah unit ukuran yang paling sesuai?"
      }
    };
  }

  function createPlan(levelId, shuffle) {
    if (levelId === 5) {
      return [...shuffle([1, 2, 3, 4]), ...shuffle([1, 2, 3, 4]), ...shuffle([1, 2])];
    }
    if (levelId === 10) {
      return [...shuffle([1, 2, 3, 4, 6, 7, 8, 9]), ...shuffle([6, 7])];
    }
    return Array(10).fill(levelId);
  }

  function generate(levelId, questionIndex, customer, randomIndex, shuffle, plan) {
    const selectedLevel = levelId === 5 || levelId === 10 ? (plan[questionIndex] || 1) : levelId;
    if (selectedLevel === 1) return weightQuestion(customer, randomIndex, shuffle);
    if (selectedLevel === 2) return massConversionQuestion(customer, randomIndex, shuffle);
    if (selectedLevel === 3) return volumeQuestion(customer, randomIndex, shuffle);
    if (selectedLevel === 4) return lengthQuestion(customer, randomIndex, shuffle);
    if (selectedLevel === 6) return addWeightQuestion(customer, randomIndex, shuffle);
    if (selectedLevel === 7) return addVolumeQuestion(customer, randomIndex, shuffle);
    if (selectedLevel === 8) return addLengthQuestion(customer, randomIndex, shuffle);
    return unitChoiceQuestion(customer, randomIndex, shuffle);
  }

  return { missions, format, createPlan, generate };
})();
