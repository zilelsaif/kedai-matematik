"use strict";

window.GeometryModule = (() => {
  const missions = [
    { id: 1, code: "B01", name: "Bentuk di Sekeliling Kita", implemented: true, character: "Aynaa" },
    { id: 2, code: "B02", name: "Barang Ikut Bentuk", implemented: true, character: "Affan" },
    { id: 3, code: "B03", name: "Kotak Misteri", implemented: true, character: "Ammar" },
    { id: 4, code: "B04", name: "Akan Datang", implemented: false },
    { id: 5, code: "B05", name: "Akan Datang", implemented: false },
    { id: 6, code: "B06", name: "Akan Datang", implemented: false },
    { id: 7, code: "B07", name: "Akan Datang", implemented: false },
    { id: 8, code: "B08", name: "Akan Datang", implemented: false },
    { id: 9, code: "B09", name: "Akan Datang", implemented: false },
    { id: 10, code: "B10", name: "Akan Datang", implemented: false }
  ];

  const shapes = {
    1: { id: 1, name: "Bulatan", sides: 0, corners: 0 },
    2: { id: 2, name: "Segi tiga", sides: 3, corners: 3 },
    3: { id: 3, name: "Segi empat sama", sides: 4, corners: 4 },
    4: { id: 4, name: "Segi empat tepat", sides: 4, corners: 4 }
  };

  const shopObjects = {
    101: { id: 101, name: "Pelekat bulat", shape: 1, kind: "pelekat" },
    102: { id: 102, name: "Cermin bulat", shape: 1, kind: "cermin" },
    201: { id: 201, name: "Papan tanda segi tiga", shape: 2, kind: "papan tanda" },
    202: { id: 202, name: "Hiasan segi tiga", shape: 2, kind: "hiasan" },
    301: { id: 301, name: "Bingkai segi empat sama", shape: 3, kind: "bingkai" },
    302: { id: 302, name: "Pelekat segi empat sama", shape: 3, kind: "pelekat" },
    401: { id: 401, name: "Label harga", shape: 4, kind: "label harga" },
    402: { id: 402, name: "Papan promosi", shape: 4, kind: "papan promosi" }
  };

  const solids = {
    21: { id: 21, name: "Kubus", feature: "6 permukaan sama besar", object: "Kotak kiub" },
    22: { id: 22, name: "Kuboid", feature: "permukaan segi empat tepat", object: "Kotak bungkusan" },
    23: { id: 23, name: "Silinder", feature: "2 permukaan bulat dan satu permukaan melengkung", object: "Tin minuman" },
    24: { id: 24, name: "Sfera", feature: "satu permukaan melengkung dan boleh bergolek", object: "Bola hiasan" },
    25: { id: 25, name: "Kon", feature: "tapak bulat dan satu puncak", object: "Kon pembungkus" }
  };

  const solidObjectCodes = Object.fromEntries(Object.values(solids).map((solid) => [solid.id + 100, solid]));
  const shapeIds = Object.keys(shapes).map(Number);
  const solidIds = Object.keys(solids).map(Number);

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  function svgFrame(label, content, extraClass = "") {
    return `<svg class="geometry-svg ${extraClass}" viewBox="0 0 120 120" role="img" aria-label="${escapeHtml(label)}" xmlns="http://www.w3.org/2000/svg">
      <defs><filter id="geoShadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#49319d" flood-opacity=".22"/></filter></defs>
      ${content}
    </svg>`;
  }

  function renderShape(shapeId, options = {}) {
    const shape = shapes[shapeId] || shapes[1];
    const rotation = Number(options.rotation) || 0;
    const scale = options.scale === "small" ? .68 : options.scale === "large" ? 1.08 : .88;
    const common = `fill="#ffd84d" stroke="#49319d" stroke-width="7" stroke-linejoin="round" vector-effect="non-scaling-stroke"`;
    const primitives = {
      1: `<circle cx="60" cy="60" r="39" ${common}/>` ,
      2: `<polygon points="60,14 108,101 12,101" ${common}/>` ,
      3: `<rect x="20" y="20" width="80" height="80" rx="5" ${common}/>` ,
      4: `<rect x="9" y="29" width="102" height="62" rx="5" ${common}/>`
    };
    return svgFrame(shape.name, `<g transform="translate(60 60) rotate(${rotation}) scale(${scale}) translate(-60 -60)" filter="url(#geoShadow)">${primitives[shape.id]}</g>`, "geometry-shape-svg");
  }

  function renderObject(objectId) {
    const object = shopObjects[objectId] || shopObjects[101];
    const shape = shapes[object.shape];
    const base = renderShape(object.shape, { rotation: object.shape === 2 ? 0 : object.id % 7, scale: "small" })
      .replace('class="geometry-svg geometry-shape-svg"', 'class="geometry-svg geometry-object-shape"');
    return `<span class="geometry-object-illustration" role="img" aria-label="${escapeHtml(object.name)}">${base}<span aria-hidden="true">${object.kind === "label harga" ? "RM" : object.kind === "cermin" ? "✦" : object.kind === "hiasan" ? "★" : ""}</span></span>`;
  }

  function renderSolid(solidId) {
    const solid = solids[solidId] || solids[21];
    const stroke = `stroke="#49319d" stroke-width="5" stroke-linejoin="round" vector-effect="non-scaling-stroke"`;
    const art = {
      21: `<g filter="url(#geoShadow)"><path d="M25 34 58 17 94 34 60 52Z" fill="#fff08a" ${stroke}/><path d="M25 34v48l35 21V52Z" fill="#ffbf45" ${stroke}/><path d="M60 52v51l34-22V34Z" fill="#f49a3f" ${stroke}/></g>`,
      22: `<g filter="url(#geoShadow)"><path d="M15 42 46 22 108 36 76 57Z" fill="#fff08a" ${stroke}/><path d="M15 42v43l61 19V57Z" fill="#ffbf45" ${stroke}/><path d="M76 57v47l32-23V36Z" fill="#f49a3f" ${stroke}/></g>`,
      23: `<g filter="url(#geoShadow)"><ellipse cx="60" cy="28" rx="34" ry="13" fill="#9fe5ff" ${stroke}/><path d="M26 28v60c0 8 15 14 34 14s34-6 34-14V28" fill="#45b8ee" ${stroke}/><ellipse cx="60" cy="88" rx="34" ry="14" fill="#79d6f5" ${stroke}/></g>`,
      24: `<circle cx="60" cy="60" r="42" fill="#ff7083" ${stroke} filter="url(#geoShadow)"/><path d="M36 37c8-10 19-15 31-15" fill="none" stroke="#ffd6dc" stroke-width="8" stroke-linecap="round"/>`,
      25: `<g filter="url(#geoShadow)"><path d="M60 13 23 91c8 17 66 17 74 0Z" fill="#68d66d" ${stroke}/><ellipse cx="60" cy="91" rx="37" ry="14" fill="#42b957" ${stroke}/></g>`
    };
    return svgFrame(solid.name, art[solid.id], "geometry-solid-svg");
  }

  function renderSolidObject(code) {
    const solid = solidObjectCodes[code] || solids[21];
    return `<span class="geometry-solid-object">${renderSolid(solid.id)}<strong>${escapeHtml(solid.object)}</strong></span>`;
  }

  function format(value, answerKind) {
    const numeric = Number(value);
    if (answerKind === "geometry-shape-name") return escapeHtml(shapes[numeric]?.name || "Bentuk");
    if (answerKind === "geometry-shape-visual") return `<span class="geometry-answer-visual">${renderShape(numeric, { rotation: numeric * 13 })}</span>`;
    if (answerKind === "geometry-count") return String(numeric);
    if (answerKind === "geometry-object-choice") return `<span class="geometry-answer-visual">${renderObject(numeric)}<strong>${escapeHtml(shopObjects[numeric]?.name || "Barang")}</strong></span>`;
    if (answerKind === "geometry-solid-name") return escapeHtml(solids[numeric]?.name || "Bentuk 3D");
    if (answerKind === "geometry-solid-visual") return `<span class="geometry-answer-visual">${renderSolid(numeric)}</span>`;
    if (answerKind === "geometry-solid-object") return renderSolidObject(numeric);
    return escapeHtml(value);
  }

  function shuffled(values, shuffle) {
    return shuffle([...values]);
  }

  function countChoices(answer, shuffle) {
    const values = [0, 1, 2, 3, 4].filter((value) => value !== answer);
    return shuffled([answer, ...shuffle(values).slice(0, 3)], shuffle);
  }

  function buildLevelOnePool() {
    const pool = [];
    Object.values(shapes).forEach((shape) => {
      pool.push(
        { mechanic: "identify", shape: shape.id, rotation: 0 },
        { mechanic: "select", shape: shape.id, rotation: 0 },
        { mechanic: "rotated", shape: shape.id, rotation: shape.id % 2 ? 35 : -28 },
        { mechanic: "sides", shape: shape.id, rotation: 0 },
        { mechanic: "corners", shape: shape.id, rotation: 0 },
        { mechanic: "small", shape: shape.id, scale: "small" },
        { mechanic: "large", shape: shape.id, scale: "large" },
        { mechanic: "shop-label", shape: shape.id, rotation: shape.id * 11 }
      );
    });
    return pool;
  }

  function buildLevelTwoPool() {
    const prompts = ["rak promosi", "kaunter hadiah", "papan jualan", "sudut hiasan", "bakul label"];
    return Object.values(shopObjects).flatMap((object) => prompts.map((prompt, index) => ({
      mechanic: "object-shape", object: object.id, targetShape: object.shape, prompt, variant: index
    })));
  }

  function buildLevelThreePool() {
    const mechanics = ["identify-solid", "select-solid", "match-object", "feature", "delivery", "compare-box"];
    return Object.values(solids).flatMap((solid) => mechanics.map((mechanic, variant) => ({
      mechanic, solid: solid.id, variant
    })));
  }

  const pools = { 1: buildLevelOnePool(), 2: buildLevelTwoPool(), 3: buildLevelThreePool() };

  function makePlan(levelId, shuffle) {
    const source = shuffle(pools[levelId] || []);
    const result = [];
    let previous = "";
    let run = 0;
    while (result.length < 10 && source.length) {
      let index = source.findIndex((spec) => spec.mechanic !== previous || run < 2);
      if (index < 0) index = 0;
      const [spec] = source.splice(index, 1);
      run = spec.mechanic === previous ? run + 1 : 1;
      previous = spec.mechanic;
      result.push(spec);
    }
    return result;
  }

  function shapeContext(dialog, question) {
    return { usesCustomer: true, dialog, question };
  }

  function generateLevelOne(spec, shuffle) {
    const shape = shapes[spec.shape];
    const base = {
      isGeometry: true,
      geometryLevel: 1,
      geometrySubSkill: spec.mechanic,
      skillCategory: "geometry",
      context: shapeContext("Mari cari bentuk untuk susun atur kedai!", "Bentuk manakah yang betul?"),
      visual: { type: "shape", shape: shape.id, rotation: spec.rotation || 0, scale: spec.scale || "normal", title: "Bentuk kedai" }
    };
    if (["select", "small", "large"].includes(spec.mechanic)) {
      return { ...base, answerKind: "geometry-shape-visual", answer: shape.id, choices: shuffled(shapeIds, shuffle), context: shapeContext("Saya perlukan bentuk yang tepat untuk hiasan kedai.", `Pilih ${shape.name}.`), visual: { type: "shape-shelf", title: `Cari ${shape.name}` } };
    }
    if (spec.mechanic === "sides" || spec.mechanic === "corners") {
      const isSides = spec.mechanic === "sides";
      const answer = isSides ? shape.sides : shape.corners;
      return { ...base, answerKind: "geometry-count", answer, choices: countChoices(answer, shuffle), context: shapeContext("Saya sedang memeriksa bentuk pada papan kedai.", `${shape.name} mempunyai berapa ${isSides ? "sisi lurus" : "bucu"}?`) };
    }
    return { ...base, answerKind: "geometry-shape-name", answer: shape.id, choices: shuffled(shapeIds, shuffle), context: shapeContext(spec.mechanic === "rotated" ? "Bentuk ini dipusing, tetapi namanya masih sama." : "Saya jumpa bentuk ini di dalam kedai!", "Apakah nama bentuk ini?") };
  }

  function generateLevelTwo(spec, shuffle) {
    const target = shopObjects[spec.object];
    const alternatives = Object.values(shopObjects).filter((object) => object.shape !== target.shape);
    const distractors = [];
    [1, 2, 3, 4].filter((shapeId) => shapeId !== target.shape).forEach((shapeId) => {
      const matching = alternatives.filter((object) => object.shape === shapeId);
      distractors.push(matching[spec.variant % matching.length].id);
    });
    return {
      isGeometry: true,
      geometryLevel: 2,
      geometrySubSkill: "objectShape",
      skillCategory: "geometry",
      answerKind: "geometry-object-choice",
      answer: target.id,
      choices: shuffled([target.id, ...distractors], shuffle),
      context: shapeContext(`Boleh bantu saya pilih barang untuk ${spec.prompt}?`, `Pilih barang yang permukaannya berbentuk ${shapes[target.shape].name}.`),
      visual: { type: "object-shelf", title: "Rak barang Affan", targetShape: target.shape }
    };
  }

  function generateLevelThree(spec, shuffle) {
    const solid = solids[spec.solid];
    const base = {
      isGeometry: true,
      geometryLevel: 3,
      geometrySubSkill: spec.mechanic,
      skillCategory: "geometry",
      context: shapeContext("Penghantaran baru sudah sampai. Jom periksa kotaknya!", "Apakah bentuk 3D ini?"),
      visual: { type: "solid", solid: solid.id, title: "Kotak misteri" }
    };
    if (spec.mechanic === "select-solid") {
      return { ...base, answerKind: "geometry-solid-visual", answer: solid.id, choices: shuffled([solid.id, ...shuffled(solidIds.filter((id) => id !== solid.id), shuffle).slice(0, 3)], shuffle), context: shapeContext("Saya perlukan bekas dengan bentuk tertentu.", `Pilih ${solid.name}.`), visual: { type: "delivery", title: `Cari ${solid.name}` } };
    }
    if (spec.mechanic === "match-object" || spec.mechanic === "delivery") {
      const answer = solid.id + 100;
      const choices = shuffled([answer, ...solidIds.filter((id) => id !== solid.id).slice(0, 3).map((id) => id + 100)], shuffle);
      return { ...base, answerKind: "geometry-solid-object", answer, choices, context: shapeContext("Saya mahu padankan bentuk dengan barang dalam penghantaran.", `Barang manakah berbentuk ${solid.name}?`), visual: { type: "delivery", title: "Pilih barang penghantaran" } };
    }
    if (spec.mechanic === "feature") {
      return { ...base, answerKind: "geometry-solid-name", answer: solid.id, choices: shuffled([solid.id, ...solidIds.filter((id) => id !== solid.id).slice(0, 3)], shuffle), context: shapeContext("Saya membaca ciri pada senarai penghantaran.", `Bentuk manakah mempunyai ${solid.feature}?`), visual: { type: "feature", title: solid.feature } };
    }
    if (spec.mechanic === "compare-box") {
      const otherBoxes = [21, 22].filter((id) => id !== solid.id);
      const targetId = [21, 22].includes(solid.id) ? solid.id : (spec.variant % 2 ? 21 : 22);
      return { ...base, answerKind: "geometry-solid-name", answer: targetId, choices: shuffled([targetId, ...solidIds.filter((id) => id !== targetId).slice(0, 3)], shuffle), context: shapeContext("Dua jenis kotak kelihatan hampir sama.", targetId === 21 ? "Kotak manakah mempunyai semua permukaan sama besar?" : "Kotak manakah memanjang seperti kotak bungkusan?"), visual: { type: "box-compare", title: "Kubus atau kuboid?", solids: [21, 22] } };
    }
    return { ...base, answerKind: "geometry-solid-name", answer: solid.id, choices: shuffled([solid.id, ...solidIds.filter((id) => id !== solid.id).slice(0, 3)], shuffle) };
  }

  function generate(levelId, questionIndex, customer, randomIndex, shuffle, plan) {
    const spec = plan[questionIndex] || pools[levelId][randomIndex(pools[levelId].length)];
    if (levelId === 1) return generateLevelOne(spec, shuffle);
    if (levelId === 2) return generateLevelTwo(spec, shuffle);
    return generateLevelThree(spec, shuffle);
  }

  function render(question, visualHelp = false) {
    const visual = question.visual || {};
    let art = "";
    if (visual.type === "shape") art = renderShape(visual.shape, { rotation: visual.rotation, scale: visual.scale });
    else if (visual.type === "solid") art = renderSolid(visual.solid);
    else if (visual.type === "box-compare") art = `<div class="geometry-compare">${visual.solids.map(renderSolid).join('<span aria-hidden="true">↔</span>')}</div>`;
    else if (visual.type === "feature") art = `<div class="geometry-feature-card"><span aria-hidden="true">🔎</span><strong>${escapeHtml(visual.title)}</strong></div>`;
    else art = `<div class="geometry-shelf" aria-hidden="true"><span>◇</span><span>△</span><span>□</span><span>○</span></div>`;
    const help = visualHelp ? `<small class="geometry-visual-note">Lihat garisan, sisi, bucu dan permukaan—bukan warna sahaja.</small>` : "";
    return `<article class="geometry-display" aria-label="Rajah Bentuk dan Ruang"><strong>${escapeHtml(visual.title || "Bentuk dan Ruang")}</strong>${art}${help}</article>`;
  }

  function explain(question, answerText) {
    const kind = question.answerKind;
    if (kind === "geometry-count") {
      const shape = shapes[question.visual?.shape];
      return `${shape?.name || "Bentuk ini"} mempunyai ${question.answer} ${question.geometrySubSkill === "corners" ? "bucu" : "sisi lurus"}. Jawapan betul: ${answerText}.`;
    }
    if (kind === "geometry-object-choice") {
      const object = shopObjects[question.answer];
      return `Lihat bentuk permukaan barang. ${object.name} mempunyai permukaan ${shapes[object.shape].name}. Jawapan betul: ${answerText}.`;
    }
    if (kind === "geometry-solid-object") {
      const solid = solidObjectCodes[question.answer];
      return `${solid.object} sepadan dengan bentuk ${solid.name}. Jawapan betul: ${answerText}.`;
    }
    if (question.geometryLevel === 3) {
      const solid = solids[question.answer];
      return `${solid?.name || "Bentuk ini"}: ${solid?.feature || "perhatikan permukaan dan bentuknya"}. Jawapan betul: ${answerText}.`;
    }
    const shape = shapes[question.answer];
    return `Perhatikan garisan dan bentuk luar. Bentuk itu ialah ${shape?.name || answerText}. Jawapan betul: ${answerText}.`;
  }

  function getAudit() {
    return Object.fromEntries([1, 2, 3].map((levelId) => [levelId, {
      baseConfigurations: pools[levelId].length,
      mechanics: [...new Set(pools[levelId].map((spec) => spec.mechanic))]
    }]));
  }

  return { missions, format, render, explain, createPlan: makePlan, generate, getAudit };
})();
