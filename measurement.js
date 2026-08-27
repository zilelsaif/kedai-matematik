"use strict";

window.MeasurementModule = (() => {
  const missions = [
    { id: 1, name: "Berat Barang", implemented: true },
    { id: 2, name: "Gram & Kilogram", implemented: true },
    { id: 3, name: "Isipadu Minuman", implemented: true },
    { id: 4, name: "Panjang & Pembungkusan", implemented: true },
    { id: 5, name: "Cabaran Ukuran Kedai", implemented: true }
  ];

  const dimensions = {
    mass: { baseUnit: "g", largeUnit: "kg", largeValue: 1000 },
    volume: { baseUnit: "mL", largeUnit: "L", largeValue: 1000 },
    length: { baseUnit: "cm", largeUnit: "m", largeValue: 100 }
  };

  function format(value, dimension) {
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

  function createPlan(levelId, shuffle) {
    if (levelId !== 5) return Array(10).fill(levelId);
    return [
      ...shuffle([1, 2, 3, 4]),
      ...shuffle([1, 2, 3, 4]),
      ...shuffle([1, 2]).map((type) => type)
    ];
  }

  function generate(levelId, questionIndex, customer, randomIndex, shuffle, plan) {
    const selectedLevel = levelId === 5 ? (plan[questionIndex] || 1) : levelId;
    if (selectedLevel === 1) return weightQuestion(customer, randomIndex, shuffle);
    if (selectedLevel === 2) return massConversionQuestion(customer, randomIndex, shuffle);
    if (selectedLevel === 3) return volumeQuestion(customer, randomIndex, shuffle);
    return lengthQuestion(customer, randomIndex, shuffle);
  }

  return { missions, format, createPlan, generate };
})();
