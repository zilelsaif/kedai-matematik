"use strict";

const FractionModule = (() => {
  const missions = [
    { id: 1, name: "Kenal 1/2", implemented: true },
    { id: 2, name: "Kenal 1/4", implemented: true },
    { id: 3, name: "Kenal 3/4", implemented: true },
    { id: 4, name: "Bahagian daripada Objek", implemented: true },
    { id: 5, name: "Bahagian daripada Kumpulan", implemented: true },
    { id: 6, name: "Pecahan Setara", implemented: true },
    { id: 7, name: "Banding Pecahan", implemented: true },
    { id: 8, name: "Lengkapkan Keseluruhan", implemented: true },
    { id: 9, name: "Campuran Pecahan", implemented: true },
    { id: 10, name: "Kedai Sibuk: Pecahan", implemented: true }
  ];

  const objects = ["kek", "pizza", "coklat", "roti", "dulang", "kotak stok"];
  const groupObjects = [
    { name: "epal", icon: "🍎" }, { name: "botol", icon: "🧃" },
    { name: "roti", icon: "🍞" }, { name: "kotak minuman", icon: "🥤" },
    { name: "coklat", icon: "🍫" }, { name: "telur", icon: "🥚" }
  ];
  const subSkills = {
    1: "half", 2: "quarter", 3: "quarter", 4: "visualFraction",
    5: "groupFraction", 6: "equivalentFraction", 7: "compareFraction",
    8: "completeWhole"
  };
  const dialogTemplates = [
    { customer: true, text: (item) => `Saya mahu bahagian ${item} ini.` },
    { customer: true, text: (item) => `Tolong bungkus bahagian ${item} yang ditanda.` },
    { customer: true, text: (item) => `Saya membeli sebahagian daripada ${item}.` },
    { customer: true, text: (item) => `Boleh kira bahagian ${item} untuk saya?` },
    { customer: true, text: (item) => `Saya mahu berkongsi ${item} ini.` },
    { customer: true, text: (item) => `Bahagian ${item} saya sudah disediakan.` },
    { customer: false, text: (item) => `${item} sedang dibahagi sama besar di kaunter.` },
    { customer: false, text: (item) => `Sebahagian ${item} sudah dijual hari ini.` },
    { customer: false, text: (item) => `Pesanan ${item} sedang disusun untuk pelanggan.` },
    { customer: false, text: (item) => `Stok ${item} yang ditanda perlu dikira.` },
    { customer: false, text: (item) => `${item} ini akan dikongsi kepada beberapa bahagian.` },
    { customer: false, text: (item) => `Bahagian berwarna pada ${item} sudah siap dibungkus.` }
  ];

  function encode(numerator, denominator) { return numerator * 100 + denominator; }
  function decode(value) {
    return { numerator: Math.floor(Number(value) / 100), denominator: Number(value) % 100 };
  }
  function format(value, answerKind = "fraction") {
    if (answerKind === "fraction-count") return String(value);
    if (answerKind === "fraction-relation") return ({
      1: "Kiri lebih besar", 2: "Kanan lebih besar", 3: "Sama", 4: "Tidak dapat ditentukan"
    })[value] || "?";
    const fraction = decode(value);
    if (answerKind === "fraction-situation") return `${fraction.numerator} daripada ${fraction.denominator} barang`;
    if (answerKind === "fraction-visual") {
      const cells = Array.from({ length: fraction.denominator }, (_, index) =>
        `<span class="fraction-mini-part ${index < fraction.numerator ? "filled" : ""}"></span>`).join("");
      return `<span class="fraction-mini-choice" aria-label="${fraction.numerator} daripada ${fraction.denominator} bahagian"><span class="fraction-mini-bar" style="--parts:${fraction.denominator}">${cells}</span></span>`;
    }
    return `${fraction.numerator}/${fraction.denominator}`;
  }
  function equalFractions(a, b) { return a.numerator * b.denominator === b.numerator * a.denominator; }
  function unique(values) { return [...new Set(values)]; }
  function choiceSet(answer, candidates, shuffle) {
    const selected = unique([answer, ...candidates]).filter((value) => decode(value).numerator >= 0).slice(0, 4);
    for (let denominator = 2; selected.length < 4 && denominator <= 12; denominator += 1) {
      for (let numerator = 1; selected.length < 4 && numerator <= denominator; numerator += 1) {
        const value = encode(numerator, denominator);
        if (!selected.includes(value)) selected.push(value);
      }
    }
    return shuffle(selected);
  }

  function semanticFractionChoiceSet(answer, candidates, shuffle) {
    const answerFraction = decode(answer);
    const selected = [answer];
    [...candidates, ...Array.from({ length: 11 }, (_, index) => encode((index % 5) + 1, (index % 5) + 2))]
      .forEach((value) => {
        if (selected.length >= 4 || selected.includes(value)) return;
        const fraction = decode(value);
        if (fraction.numerator < 0 || fraction.numerator > fraction.denominator) return;
        if (equalFractions(fraction, answerFraction)) return;
        if (selected.slice(1).some((existing) => equalFractions(decode(existing), fraction))) return;
        selected.push(value);
      });
    return shuffle(selected.slice(0, 4));
  }

  function countChoiceSet(answer, candidates, shuffle) {
    const selected = unique([answer, ...candidates]).filter((value) => Number.isInteger(value) && value >= 0);
    for (let distance = 1; selected.length < 4; distance += 1) {
      [answer - distance, answer + distance].forEach((value) => {
        if (value >= 0 && selected.length < 4 && !selected.includes(value)) selected.push(value);
      });
    }
    return shuffle(selected.slice(0, 4));
  }

  function shopContext(customer, randomIndex, item, question) {
    const template = dialogTemplates[randomIndex(dialogTemplates.length)];
    return {
      usesCustomer: template.customer,
      dialog: template.text(item),
      question: question(customer.name)
    };
  }

  function recognitionPool(numerator, denominator) {
    return Array.from({ length: 24 }, (_, index) => ({
      numerator, denominator,
      object: objects[index % objects.length],
      shape: ["circle", "bar", "grid"][index % 3],
      rotation: (index % 4) * 90
    }));
  }

  const introConfigs = {
    1: { numerator: 1, denominator: 2, totals: [2, 4, 6, 8, 10, 12] },
    2: { numerator: 1, denominator: 4, totals: [4, 8, 12, 16, 20, 24] },
    3: { numerator: 3, denominator: 4, totals: [4, 8, 12, 16, 20, 24] }
  };

  function introPools(levelId) {
    const config = introConfigs[levelId];
    const target = { numerator: config.numerator, denominator: config.denominator };
    const recognition = config.totals.map((total, index) => ({
      mechanic: "recognition", target, numerator: total * config.numerator / config.denominator, denominator: total,
      object: objects[index % objects.length], shape: ["circle", "bar", "grid"][index % 3], signature: `recognition-${total}`
    }));
    const chooseVisual = config.totals.map((total, index) => ({
      mechanic: "chooseVisual", target, numerator: total * config.numerator / config.denominator, denominator: total,
      object: objects[(index + 1) % objects.length], signature: `choose-visual-${total}`
    }));
    const groupAmount = config.totals.map((total, index) => ({
      mechanic: "groupAmount", target, total, group: groupObjects[index % groupObjects.length], signature: `group-${total}`
    }));
    const coloredCount = config.totals.map((total, index) => ({
      mechanic: "coloredCount", target, numerator: total * config.numerator / config.denominator, denominator: total,
      object: objects[(index + 2) % objects.length], signature: `colored-count-${total}`
    }));
    const targetCount = config.totals.map((total, index) => ({
      mechanic: "targetCount", target, numerator: 0, targetNumerator: total * config.numerator / config.denominator,
      denominator: total, object: objects[(index + 3) % objects.length], signature: `target-count-${total}`
    }));
    const situationChoice = config.totals.map((total, index) => ({
      mechanic: "situationChoice", target, numerator: total * config.numerator / config.denominator,
      denominator: total, group: groupObjects[(index + 4) % groupObjects.length], signature: `situation-${total}`
    }));
    return { recognition, chooseVisual, groupAmount, coloredCount, targetCount, situationChoice };
  }

  const introPoolMap = Object.fromEntries([1, 2, 3].map((levelId) => [levelId, introPools(levelId)]));

  function objectPool() {
    const specs = [];
    [2, 4, 8].forEach((denominator) => {
      for (let numerator = 1; numerator < denominator; numerator += 1) {
        ["circle", "bar", "grid"].forEach((shape) => specs.push({ numerator, denominator, shape,
          object: objects[(numerator + denominator + specs.length) % objects.length] }));
      }
    });
    return specs;
  }

  function groupPool() {
    const specs = [];
    [4, 6, 8, 10, 12].forEach((denominator) => {
      for (let numerator = 1; numerator < denominator; numerator += 1) {
        specs.push({ numerator, denominator, group: groupObjects[specs.length % groupObjects.length] });
      }
    });
    return specs;
  }

  function equivalentPool() {
    const pairs = [
      [{ numerator: 1, denominator: 2 }, { numerator: 2, denominator: 4 }],
      [{ numerator: 1, denominator: 2 }, { numerator: 3, denominator: 6 }],
      [{ numerator: 1, denominator: 2 }, { numerator: 4, denominator: 8 }],
      [{ numerator: 1, denominator: 2 }, { numerator: 5, denominator: 10 }],
      [{ numerator: 1, denominator: 2 }, { numerator: 6, denominator: 12 }],
      [{ numerator: 1, denominator: 3 }, { numerator: 2, denominator: 6 }],
      [{ numerator: 1, denominator: 3 }, { numerator: 3, denominator: 9 }],
      [{ numerator: 1, denominator: 3 }, { numerator: 4, denominator: 12 }],
      [{ numerator: 2, denominator: 3 }, { numerator: 4, denominator: 6 }],
      [{ numerator: 2, denominator: 3 }, { numerator: 6, denominator: 9 }],
      [{ numerator: 2, denominator: 3 }, { numerator: 8, denominator: 12 }],
      [{ numerator: 1, denominator: 4 }, { numerator: 2, denominator: 8 }],
      [{ numerator: 1, denominator: 4 }, { numerator: 3, denominator: 12 }],
      [{ numerator: 3, denominator: 4 }, { numerator: 6, denominator: 8 }],
      [{ numerator: 3, denominator: 4 }, { numerator: 9, denominator: 12 }],
      [{ numerator: 1, denominator: 5 }, { numerator: 2, denominator: 10 }],
      [{ numerator: 2, denominator: 5 }, { numerator: 4, denominator: 10 }],
      [{ numerator: 3, denominator: 5 }, { numerator: 6, denominator: 10 }],
      [{ numerator: 4, denominator: 5 }, { numerator: 8, denominator: 10 }],
      [{ numerator: 1, denominator: 6 }, { numerator: 2, denominator: 12 }],
      [{ numerator: 5, denominator: 6 }, { numerator: 10, denominator: 12 }],
      [{ numerator: 2, denominator: 4 }, { numerator: 3, denominator: 6 }],
      [{ numerator: 2, denominator: 6 }, { numerator: 3, denominator: 9 }],
      [{ numerator: 4, denominator: 6 }, { numerator: 6, denominator: 9 }],
      [{ numerator: 2, denominator: 8 }, { numerator: 3, denominator: 12 }]
    ];
    return pairs.map((pair, index) => ({
      source: pair[0], target: pair[1],
      object: objects[index % objects.length], shape: ["bar", "grid", "circle"][index % 3]
    }));
  }

  function comparePool() {
    const fractions = [];
    [2, 3, 4, 6, 8].forEach((denominator) => {
      for (let numerator = 1; numerator < denominator; numerator += 1) fractions.push({ numerator, denominator });
    });
    const left = [], right = [], equal = [];
    fractions.forEach((first, index) => fractions.slice(index + 1).forEach((second) => {
      const difference = first.numerator * second.denominator - second.numerator * first.denominator;
      if (difference === 0) equal.push({ left: first, right: second, relation: "equal" });
      else {
        const biggerFirst = difference > 0;
        left.push({ left: biggerFirst ? first : second, right: biggerFirst ? second : first, relation: "left" });
        right.push({ left: biggerFirst ? second : first, right: biggerFirst ? first : second, relation: "right" });
      }
    }));
    return [...left.slice(0, 24), ...right.slice(0, 24), ...equal.slice(0, 12)];
  }

  function completionPool() {
    const specs = [];
    for (let denominator = 2; denominator <= 12; denominator += 1) {
      for (let numerator = 1; numerator < denominator; numerator += 1) specs.push({ numerator, denominator });
    }
    return specs;
  }

  const basePools = {
    1: Object.values(introPoolMap[1]).flat(),
    2: Object.values(introPoolMap[2]).flat(),
    3: Object.values(introPoolMap[3]).flat(),
    4: objectPool(), 5: groupPool(), 6: equivalentPool(), 7: comparePool(), 8: completionPool()
  };

  function recognitionQuestion(spec, customer, randomIndex, shuffle, levelId) {
    const answer = encode(spec.numerator, spec.denominator);
    const candidates = Array.from({ length: spec.denominator }, (_, i) => encode(i + 1, spec.denominator))
      .filter((value) => value !== answer);
    return {
      answer, choices: choiceSet(answer, candidates, shuffle), isFraction: true,
      fractionSubSkill: subSkills[levelId], skillCategory: "fraction",
      visual: { type: spec.shape, ...spec },
      context: shopContext(customer, randomIndex, spec.object,
        () => "Bahagian berwarna menunjukkan pecahan apa?")
    };
  }

  function introRecognitionQuestion(spec, customer, randomIndex, shuffle, levelId) {
    const answer = encode(spec.target.numerator, spec.target.denominator);
    const alternatives = [encode(1, 4), encode(1, 3), encode(1, 2), encode(2, 3), encode(3, 4)]
      .filter((value) => !equalFractions(decode(value), spec.target)).slice(0, 3);
    return {
      answer, choices: shuffle([answer, ...alternatives]), isFraction: true,
      fractionSubSkill: subSkills[levelId], skillCategory: "fraction",
      visual: { type: spec.shape, numerator: spec.numerator, denominator: spec.denominator, object: spec.object },
      context: shopContext(customer, randomIndex, spec.object,
        () => `${spec.numerator} daripada ${spec.denominator} bahagian ditanda. Ini menunjukkan pecahan apa?`)
    };
  }

  function chooseVisualQuestion(spec, customer, randomIndex, shuffle, levelId) {
    const answer = encode(spec.target.numerator, spec.target.denominator);
    const alternatives = spec.target.denominator === 2
      ? [encode(0, 2), encode(2, 2), encode(1, 4)]
      : [0, 1, 2, 3, 4]
        .filter((numerator) => numerator !== spec.target.numerator)
        .slice(0, 3)
        .map((numerator) => encode(numerator, 4));
    return {
      answer, choices: shuffle([answer, ...alternatives]), isFraction: true, answerKind: "fraction-visual",
      fractionSubSkill: subSkills[levelId], skillCategory: "fraction",
      visual: { type: "choice-prompt", numerator: spec.target.numerator, denominator: spec.target.denominator, object: spec.object },
      context: shopContext(customer, randomIndex, spec.object,
        () => `Gambar manakah menunjukkan ${spec.target.numerator}/${spec.target.denominator}?`)
    };
  }

  function introGroupAmountQuestion(spec, customer, randomIndex, shuffle, levelId) {
    const answer = spec.total * spec.target.numerator / spec.target.denominator;
    const unit = spec.group.name;
    return {
      answer,
      choices: countChoiceSet(answer, [answer - 1, answer + 1, spec.total - answer, spec.total], shuffle),
      isFraction: true, answerKind: "fraction-count", fractionSubSkill: subSkills[levelId], skillCategory: "fraction",
      visual: { type: "collection", total: spec.total, group: spec.group },
      context: shopContext(customer, randomIndex, unit,
        () => `${spec.target.numerator}/${spec.target.denominator} daripada ${spec.total} ${unit} ditempah. Berapa ${unit}?`)
    };
  }

  function introColoredCountQuestion(spec, customer, randomIndex, shuffle, levelId) {
    const answer = spec.numerator;
    return {
      answer,
      choices: countChoiceSet(answer, [answer - 1, answer + 1, spec.denominator - answer, spec.denominator], shuffle),
      isFraction: true, answerKind: "fraction-count", fractionSubSkill: subSkills[levelId], skillCategory: "fraction",
      visual: { type: "colored-count", numerator: spec.numerator, denominator: spec.denominator, object: spec.object },
      context: shopContext(customer, randomIndex, spec.object,
        () => `Berapa bahagian yang sudah diwarnakan?`)
    };
  }

  function introTargetCountQuestion(spec, customer, randomIndex, shuffle, levelId) {
    const answer = spec.targetNumerator;
    return {
      answer,
      choices: countChoiceSet(answer, [answer - 1, answer + 1, spec.denominator - answer, spec.denominator], shuffle),
      isFraction: true, answerKind: "fraction-count", fractionSubSkill: subSkills[levelId], skillCategory: "fraction",
      visual: { type: "target-count", numerator: 0, denominator: spec.denominator,
        targetNumerator: spec.targetNumerator, target: spec.target, object: spec.object },
      context: shopContext(customer, randomIndex, spec.object,
        () => `Daripada ${spec.denominator} bahagian, berapa perlu diwarnakan untuk menunjukkan ${spec.target.numerator}/${spec.target.denominator}?`)
    };
  }

  function introSituationChoiceQuestion(spec, customer, randomIndex, shuffle, levelId) {
    const answer = encode(spec.numerator, spec.denominator);
    const candidates = [spec.numerator - 1, spec.numerator + 1, spec.denominator - spec.numerator, spec.denominator]
      .filter((value) => value >= 0 && value <= spec.denominator && value !== spec.numerator)
      .map((value) => encode(value, spec.denominator));
    return {
      answer, choices: choiceSet(answer, candidates, shuffle), isFraction: true, answerKind: "fraction-situation",
      fractionSubSkill: subSkills[levelId], skillCategory: "fraction",
      visual: { type: "situation-prompt", numerator: spec.target.numerator, denominator: spec.target.denominator,
        group: spec.group },
      context: shopContext(customer, randomIndex, spec.group.name,
        () => `Situasi manakah menunjukkan ${spec.target.numerator}/${spec.target.denominator} stok ${spec.group.name} sudah dijual?`)
    };
  }

  function groupQuestion(spec, customer, randomIndex, shuffle) {
    const answer = encode(spec.numerator, spec.denominator);
    const candidates = [spec.numerator - 1, spec.numerator + 1, spec.denominator - spec.numerator, spec.denominator]
      .filter((n) => n >= 0 && n <= spec.denominator).map((n) => encode(n, spec.denominator));
    return {
      answer, choices: choiceSet(answer, candidates, shuffle), isFraction: true,
      fractionSubSkill: "groupFraction", skillCategory: "fraction",
      visual: { type: "group", ...spec },
      context: shopContext(customer, randomIndex, spec.group.name,
        () => `Berapa pecahan ${spec.group.name} yang sudah dijual?`)
    };
  }

  function equivalentQuestion(spec, customer, randomIndex, shuffle) {
    const answer = encode(spec.target.numerator, spec.target.denominator);
    const candidates = [
      encode(Math.max(1, spec.target.numerator - 1), spec.target.denominator),
      encode(Math.min(spec.target.denominator, spec.target.numerator + 1), spec.target.denominator),
      encode(spec.source.numerator, spec.target.denominator)
    ];
    return {
      answer, choices: semanticFractionChoiceSet(answer, candidates, shuffle), isFraction: true,
      fractionSubSkill: "equivalentFraction", skillCategory: "fraction",
      visual: { type: "equivalent", ...spec },
      context: shopContext(customer, randomIndex, spec.object,
        () => `${format(encode(spec.source.numerator, spec.source.denominator))} sama dengan pecahan mana?`)
    };
  }

  function compareQuestion(spec, customer, randomIndex, shuffle) {
    const difference = spec.left.numerator * spec.right.denominator - spec.right.numerator * spec.left.denominator;
    const answer = difference > 0 ? 1 : difference < 0 ? 2 : 3;
    return {
      answer, choices: shuffle([1, 2, 3, 4]), isFraction: true, answerKind: "fraction-relation",
      fractionSubSkill: "compareFraction", skillCategory: "fraction",
      visual: { type: "compare", ...spec },
      context: shopContext(customer, randomIndex, "makanan di kaunter",
        () => "Bandingkan pecahan di kiri dan kanan. Apakah hubungannya?")
    };
  }

  function completionQuestion(spec, customer, randomIndex, shuffle) {
    const missing = spec.denominator - spec.numerator;
    const answer = encode(missing, spec.denominator);
    const candidates = [spec.numerator, missing - 1, missing + 1, spec.denominator]
      .filter((n) => n >= 0 && n <= spec.denominator).map((n) => encode(n, spec.denominator));
    return {
      answer, choices: choiceSet(answer, candidates, shuffle), isFraction: true,
      fractionSubSkill: "completeWhole", skillCategory: "fraction",
      visual: { type: "complete", ...spec },
      context: shopContext(customer, randomIndex, "dulang makanan",
        () => "Berapa lagi diperlukan untuk melengkapkan satu keseluruhan?")
    };
  }

  function getPool(levelId) { return basePools[levelId] || []; }

  function createIntroPlan(levelId, shuffle) {
    const pools = Object.fromEntries(Object.entries(introPoolMap[levelId])
      .map(([mechanic, specs]) => [mechanic, shuffle(specs)]));
    const coreMechanics = shuffle(["recognition", "chooseVisual", "groupAmount", "coloredCount", "targetCount", "situationChoice"]);
    const repeatMechanics = shuffle(["groupAmount", "coloredCount", "targetCount", "situationChoice"]);
    const mechanics = [...coreMechanics, ...repeatMechanics];
    const plan = [];
    mechanics.forEach((mechanic) => {
      const spec = pools[mechanic].shift();
      if (spec) plan.push({ levelId, spec });
    });
    return plan;
  }

  function createMixedPlan(levelIds, shuffle) {
    const required = shuffle(levelIds).slice(0, Math.min(8, levelIds.length));
    const types = [...required];
    while (types.length < 10) {
      const choices = levelIds.filter((id) => !(types.at(-1) === id && types.at(-2) === id));
      types.push(shuffle(choices)[0]);
    }
    const pools = Object.fromEntries(levelIds.map((id) => [id, shuffle(getPool(id))]));
    return types.map((id) => ({ levelId: id, spec: pools[id].shift() || shuffle(getPool(id))[0] }));
  }

  function createComparePlan(shuffle) {
    const pools = Object.fromEntries(["left", "right", "equal"].map((relation) => [
      relation, shuffle(getPool(7).filter((spec) => spec.relation === relation))
    ]));
    const baseOutcomes = ["equal", "equal", "left", "left", "left", "left", "right", "right", "right", "right"];
    let outcomes = baseOutcomes;
    for (let attempt = 0; attempt < 20; attempt += 1) {
      const candidate = shuffle(baseOutcomes);
      const hasLongRun = candidate.some((outcome, index) => index >= 3 &&
        outcome === candidate[index - 1] && outcome === candidate[index - 2] && outcome === candidate[index - 3]);
      if (!hasLongRun) { outcomes = candidate; break; }
    }
    return outcomes.map((relation) => ({ levelId: 7, spec: pools[relation].shift() }));
  }

  function createPlan(levelId, shuffle) {
    if ([1, 2, 3].includes(levelId)) return createIntroPlan(levelId, shuffle);
    if (levelId === 7) return createComparePlan(shuffle);
    if (levelId === 9) return createMixedPlan([1, 2, 3, 4, 5, 6, 7, 8], shuffle);
    if (levelId === 10) return createMixedPlan([1, 2, 3, 4, 5, 6, 7, 8], shuffle);
    return shuffle(getPool(levelId)).slice(0, 10).map((spec) => ({ levelId, spec }));
  }

  function generate(levelId, questionIndex, customer, randomIndex, shuffle, plan) {
    const selected = plan[questionIndex] || { levelId, spec: shuffle(getPool(levelId))[0] };
    if ([1, 2, 3].includes(selected.levelId)) {
      if (selected.spec.mechanic === "chooseVisual") return chooseVisualQuestion(selected.spec, customer, randomIndex, shuffle, selected.levelId);
      if (selected.spec.mechanic === "groupAmount") return introGroupAmountQuestion(selected.spec, customer, randomIndex, shuffle, selected.levelId);
      if (selected.spec.mechanic === "coloredCount") return introColoredCountQuestion(selected.spec, customer, randomIndex, shuffle, selected.levelId);
      if (selected.spec.mechanic === "targetCount") return introTargetCountQuestion(selected.spec, customer, randomIndex, shuffle, selected.levelId);
      if (selected.spec.mechanic === "situationChoice") return introSituationChoiceQuestion(selected.spec, customer, randomIndex, shuffle, selected.levelId);
      return introRecognitionQuestion(selected.spec, customer, randomIndex, shuffle, selected.levelId);
    }
    if (selected.levelId === 4) return recognitionQuestion(selected.spec, customer, randomIndex, shuffle, selected.levelId);
    if (selected.levelId === 5) return groupQuestion(selected.spec, customer, randomIndex, shuffle);
    if (selected.levelId === 6) return equivalentQuestion(selected.spec, customer, randomIndex, shuffle);
    if (selected.levelId === 7) return compareQuestion(selected.spec, customer, randomIndex, shuffle);
    return completionQuestion(selected.spec, customer, randomIndex, shuffle);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  }

  function segmentedBar(numerator, denominator, label = "") {
    const cells = Array.from({ length: denominator }, (_, index) =>
      `<span class="fraction-part ${index < numerator ? "filled" : ""}"></span>`).join("");
    return `<div class="fraction-object-label">${escapeHtml(label)}</div><div class="fraction-bar" style="--parts:${denominator}">${cells}</div>`;
  }

  function circle(numerator, denominator, label = "") {
    const percent = numerator / denominator * 100;
    return `<div class="fraction-object-label">${escapeHtml(label)}</div><div class="fraction-circle" style="--fill:${percent}%;--step:${360 / denominator}deg" role="img" aria-label="${numerator} daripada ${denominator} bahagian"></div>`;
  }

  function fractionGrid(numerator, denominator, label = "") {
    const preferredColumns = { 2: 2, 3: 3, 4: 2, 6: 3, 8: 4, 10: 5, 12: 4, 16: 4, 20: 5, 24: 6 };
    const columns = preferredColumns[denominator] || Math.ceil(Math.sqrt(denominator));
    const cells = Array.from({ length: denominator }, (_, index) =>
      `<span class="fraction-grid-part ${index < numerator ? "filled" : ""}"></span>`).join("");
    return `<div class="fraction-object-label">${escapeHtml(label)}</div><div class="fraction-grid" style="--grid-columns:${columns}" role="img" aria-label="${numerator} daripada ${denominator} bahagian berwarna">${cells}</div>`;
  }

  function group(spec) {
    return `<div class="fraction-object-label">${escapeHtml(spec.group.name)}</div><div class="fraction-group" style="--count:${Math.min(spec.denominator, 6)}">${Array.from({ length: spec.denominator }, (_, index) =>
      `<span class="${index < spec.numerator ? "filled" : ""}" aria-hidden="true">${spec.group.icon}</span>`).join("")}</div>`;
  }

  function collection(spec) {
    return `<div class="fraction-object-label">${escapeHtml(spec.group.name)} di kedai</div><div class="fraction-group fraction-collection" style="--count:${Math.min(spec.total, 6)}">${Array.from({ length: spec.total }, () =>
      `<span aria-hidden="true">${spec.group.icon}</span>`).join("")}</div>`;
  }

  function simpleVisual(spec, label = spec.object || "Bahagian barang") {
    if (spec.type === "circle") return circle(spec.numerator, spec.denominator, label);
    if (spec.type === "grid") return fractionGrid(spec.numerator, spec.denominator, label);
    return segmentedBar(spec.numerator, spec.denominator, label);
  }

  function render(question, visualHelp = false) {
    const spec = question.visual;
    let body = "";
    if (spec.type === "group") body = group(spec);
    else if (spec.type === "collection") body = collection(spec);
    else if (spec.type === "choice-prompt") body = `<div class="fraction-choice-prompt"><strong>${spec.numerator}/${spec.denominator}</strong><span>Pilih gambar yang betul di bawah</span></div>`;
    else if (spec.type === "colored-count") body = segmentedBar(spec.numerator, spec.denominator, spec.object);
    else if (spec.type === "target-count") body = `${fractionGrid(0, spec.denominator, `${spec.object}: ${spec.denominator} bahagian`)}<div class="fraction-equation">Sasaran: ${spec.target.numerator}/${spec.target.denominator}</div>`;
    else if (spec.type === "situation-prompt") body = `<div class="fraction-choice-prompt"><strong>${spec.numerator}/${spec.denominator}</strong><span>Pilih situasi stok ${escapeHtml(spec.group.name)} yang betul</span></div>`;
    else if (spec.type === "equivalent") body = `<div class="fraction-pair">${simpleVisual({ ...spec.source, type: spec.shape }, spec.object)}<b>=</b><div class="fraction-mystery">?</div></div>`;
    else if (spec.type === "compare") body = `<div class="fraction-pair">${segmentedBar(spec.left.numerator, spec.left.denominator, `${spec.left.numerator}/${spec.left.denominator}`)}<b>atau</b>${segmentedBar(spec.right.numerator, spec.right.denominator, `${spec.right.numerator}/${spec.right.denominator}`)}</div>`;
    else if (spec.type === "complete") body = `${segmentedBar(spec.numerator, spec.denominator, "Sudah lengkap")}<div class="fraction-equation">${spec.numerator}/${spec.denominator} + ? = 1</div>`;
    else body = simpleVisual(spec);
    const help = visualHelp ? `<small class="fraction-help">${spec.total
      ? `Jumlah barang: ${spec.total}`
      : `Jumlah bahagian sama besar: ${spec.denominator || spec.target?.denominator || "lihat visual"}`}</small>` : "";
    return `<article class="fraction-display" aria-label="Visual pecahan">${body}${help}</article>`;
  }

  function getCombinationCounts() {
    const counts = Object.fromEntries(Object.entries(basePools).map(([id, pool]) => [id, pool.length]));
    const mixedPoolSize = Object.values(counts).reduce((sum, count) => sum + count, 0);
    counts[9] = mixedPoolSize;
    counts[10] = mixedPoolSize;
    return counts;
  }

  function mathSignature(levelId, spec) {
    if ([1, 2, 3].includes(levelId)) return `${spec.mechanic}:${spec.signature}`;
    if ([4, 5, 8].includes(levelId)) return `${spec.numerator}/${spec.denominator}`;
    if (levelId === 6) return `${spec.source.numerator}/${spec.source.denominator}=${spec.target.numerator}/${spec.target.denominator}`;
    if (levelId === 7) return `${spec.left.numerator}/${spec.left.denominator}|${spec.right.numerator}/${spec.right.denominator}|${spec.relation}`;
    return JSON.stringify(spec);
  }

  function getCombinationAudit() {
    const audit = {};
    for (let levelId = 1; levelId <= 8; levelId += 1) {
      const pool = getPool(levelId);
      audit[levelId] = {
        baseConfigurations: pool.length,
        uniqueMathSpecifications: new Set(pool.map((spec) => mathSignature(levelId, spec))).size
      };
    }
    const combinedBase = Object.values(audit).reduce((sum, entry) => sum + entry.baseConfigurations, 0);
    const combinedUnique = Object.values(audit).reduce((sum, entry) => sum + entry.uniqueMathSpecifications, 0);
    [9, 10].forEach((levelId) => {
      audit[levelId] = {
        baseConfigurations: combinedBase,
        uniqueMathSpecifications: combinedUnique,
        source: "Gabungan pool Misi 1–8"
      };
    });
    return audit;
  }

  return { missions, format, render, createPlan, generate, getCombinationCounts, getCombinationAudit };
})();
