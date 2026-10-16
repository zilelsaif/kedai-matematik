"use strict";

window.GeometryModule = (() => {
  const missions = [
    { id: 1, code: "B01", name: "Bentuk di Sekeliling Kita", implemented: true, character: "Aynaa" },
    { id: 2, code: "B02", name: "Barang Ikut Bentuk", implemented: true, character: "Affan" },
    { id: 3, code: "B03", name: "Kotak Misteri", implemented: true, character: "Ammar" },
    { id: 4, code: "B04", name: "Rahsia Kotak", implemented: true, character: "Azzam" },
    { id: 5, code: "B05", name: "Rak Bentuk", implemented: true, character: "Mei Ling" },
    { id: 6, code: "B06", name: "Corak Lantai Kedai", implemented: true, character: "Ivy" },
    { id: 7, code: "B07", name: "Papan Tanda Simetri", implemented: true, character: "Sofia" },
    { id: 8, code: "B08", name: "Pagar Kedai", implemented: true, character: "Kumar" },
    { id: 9, code: "B09", name: "Ruang Pameran", implemented: true, character: "Maria" },
    { id: 10, code: "B10", name: "Kedai Impian", implemented: true, character: "Ayyash" }
  ];

  const shapes = {
    1: { id: 1, name: "Bulatan", sides: 0, corners: 0 },
    2: { id: 2, name: "Segi tiga", sides: 3, corners: 3 },
    3: { id: 3, name: "Segi empat sama", sides: 4, corners: 4 },
    4: { id: 4, name: "Segi empat tepat", sides: 4, corners: 4 }
  };

  const shopObjects = {
    101: { id: 101, name: "Pelekat bulat", shape: 1, kind: "pelekat", image: "assets/geometry/objects/b02-pelekat-bulat.webp" },
    102: { id: 102, name: "Cermin bulat", shape: 1, kind: "cermin", image: "assets/geometry/objects/b02-cermin-bulat.webp" },
    201: { id: 201, name: "Papan tanda segi tiga", shape: 2, kind: "papan tanda", image: "assets/geometry/objects/b02-papan-segi-tiga.webp" },
    202: { id: 202, name: "Hiasan segi tiga", shape: 2, kind: "hiasan", image: "assets/geometry/objects/b02-hiasan-segi-tiga.webp" },
    301: { id: 301, name: "Bingkai segi empat sama", shape: 3, kind: "bingkai", image: "assets/geometry/objects/b02-bingkai-segi-empat-sama.webp" },
    302: { id: 302, name: "Pelekat segi empat sama", shape: 3, kind: "pelekat", image: "assets/geometry/objects/b02-pelekat-segi-empat-sama.webp" },
    401: { id: 401, name: "Label harga", shape: 4, kind: "label harga", image: "assets/geometry/objects/b02-label-harga-segi-empat-tepat.webp" },
    402: { id: 402, name: "Papan promosi", shape: 4, kind: "papan promosi", image: "assets/geometry/objects/b02-papan-promosi-segi-empat-tepat.webp" }
  };

  const solids = {
    21: { id: 21, name: "Kubus", feature: "6 permukaan sama besar", object: "Kotak hadiah", objectImage: "assets/geometry/objects/b03-kotak-hadiah-kubus.webp", vertices: 8, edges: 12, flatFaces: 6, curved: 0 },
    22: { id: 22, name: "Kuboid", feature: "permukaan segi empat tepat", object: "Kotak kasut", objectImage: "assets/geometry/objects/b03-kotak-kasut-kuboid.webp", vertices: 8, edges: 12, flatFaces: 6, curved: 0 },
    23: { id: 23, name: "Silinder", feature: "2 permukaan bulat dan satu permukaan melengkung", object: "Tin minuman", objectImage: "assets/geometry/objects/b03-tin-minuman-silinder.webp", vertices: 0, edges: 2, flatFaces: 2, curved: 1 },
    24: { id: 24, name: "Sfera", feature: "satu permukaan melengkung dan boleh bergolek", object: "Bola hiasan", objectImage: "assets/geometry/objects/b03-bola-hiasan-sfera.webp", vertices: 0, edges: 0, flatFaces: 0, curved: 1 },
    25: { id: 25, name: "Kon", feature: "tapak bulat dan satu puncak", object: "Kon trafik kecil", objectImage: "assets/geometry/objects/b03-kon-trafik.webp", vertices: 1, edges: 1, flatFaces: 1, curved: 1 }
  };

  const solidObjectCodes = Object.fromEntries(Object.values(solids).map((solid) => [solid.id + 100, solid]));
  const shapeIds = Object.keys(shapes).map(Number);
  const solidIds = Object.keys(solids).map(Number);

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  function lowerName(value) {
    return String(value || "").toLocaleLowerCase("ms-MY");
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
      3: `<rect x="20" y="20" width="80" height="80" ${common}/>` ,
      4: `<rect x="9" y="29" width="102" height="62" ${common}/>`
    };
    return svgFrame(shape.name, `<g transform="translate(60 60) rotate(${rotation}) scale(${scale}) translate(-60 -60)" filter="url(#geoShadow)">${primitives[shape.id]}</g>`, "geometry-shape-svg");
  }

  function renderObjectFallback(objectId) {
    const object = shopObjects[objectId] || shopObjects[101];
    const stroke = `stroke="#49319d" stroke-width="5" stroke-linejoin="round" vector-effect="non-scaling-stroke"`;
    const art = {
      101: `<g filter="url(#geoShadow)"><circle cx="58" cy="57" r="38" fill="#ff7083" ${stroke}/><path d="M82 83q13-2 14-15-8 8-20 8Z" fill="#fff4c5" ${stroke}/><path d="M37 39q10-11 23-10" fill="none" stroke="#ffd7dc" stroke-width="7" stroke-linecap="round"/></g>`,
      102: `<g filter="url(#geoShadow)"><circle cx="60" cy="49" r="34" fill="#bcecff" ${stroke}/><circle cx="60" cy="49" r="24" fill="#eefcff" stroke="#55bfe8" stroke-width="4"/><path d="M60 83v18M43 103h34" fill="none" ${stroke} stroke-linecap="round"/><path d="M43 34 72 22" stroke="#fff" stroke-width="6" stroke-linecap="round"/></g>`,
      201: `<g filter="url(#geoShadow)"><path d="M60 13 105 88H15Z" fill="#ffd84f" ${stroke}/><path d="M60 88v20" ${stroke} stroke-linecap="round"/><circle cx="60" cy="60" r="7" fill="#ef4e62"/></g>`,
      202: `<g filter="url(#geoShadow)"><path d="M60 8v13" ${stroke}/><path d="M60 18 103 94H17Z" fill="#70d875" ${stroke}/><path d="m60 39 7 14 16 2-12 11 3 16-14-8-14 8 3-16-12-11 16-2Z" fill="#fff4a4" stroke="#49319d" stroke-width="3"/></g>`,
      301: `<g filter="url(#geoShadow)"><rect x="17" y="17" width="86" height="86" fill="#ffbf45" ${stroke}/><rect x="32" y="32" width="56" height="56" fill="#d8f3ff" ${stroke}/><path d="m35 80 17-20 12 12 10-12 12 20" fill="#70d875" stroke="#49319d" stroke-width="3"/></g>`,
      302: `<g filter="url(#geoShadow)"><rect x="20" y="20" width="80" height="80" fill="#ffd84f" ${stroke}/><path d="M76 100q22-2 24-24-12 12-31 12Z" fill="#fff7d6" ${stroke}/><circle cx="49" cy="52" r="13" fill="#ff7083"/></g>`,
      401: `<g filter="url(#geoShadow)"><rect x="13" y="34" width="94" height="52" fill="#ffd84f" ${stroke}/><rect x="20" y="41" width="80" height="9" fill="#fff3a6" opacity=".8"/><text x="31" y="72" fill="#49319d" font-size="25" font-weight="900">RM</text></g>`,
      402: `<g filter="url(#geoShadow)"><rect x="13" y="24" width="94" height="66" fill="#ff7083" ${stroke}/><path d="M31 90v18M89 90v18" ${stroke}/><text x="25" y="64" fill="#fff" font-size="20" font-weight="900">PROMO</text></g>`
    };
    return svgFrame(object.name, art[object.id], "geometry-object-shape");
  }

  function renderProductImage(image, name, fallbackMarkup) {
    return `<span class="geometry-object-illustration"><img class="geometry-product-image" src="${escapeHtml(image)}" alt="" aria-hidden="true" decoding="async"><span class="geometry-product-fallback hidden" aria-hidden="true">${fallbackMarkup}</span></span>`;
  }

  function renderObject(objectId) {
    const object = shopObjects[objectId] || shopObjects[101];
    return renderProductImage(object.image, object.name, renderObjectFallback(object.id));
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
    return `<span class="geometry-solid-object">${renderProductImage(solid.objectImage, solid.object, renderSolid(solid.id))}<strong>${escapeHtml(solid.object)}</strong></span>`;
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
    if (answerKind === "geometry-property") return ({ 1: "Bucu", 2: "Rusuk", 3: "Muka rata", 4: "Permukaan melengkung" })[numeric] || escapeHtml(value);
    if (answerKind === "geometry-pattern") return `<span class="geometry-pattern-answer" aria-hidden="true">${patternSymbol(numeric)}</span>`;
    if (answerKind === "geometry-length-m") return `${numeric} m`;
    if (answerKind === "geometry-length-cm") return `${numeric} cm`;
    if (answerKind === "geometry-area-unit") return `${numeric} unit²`;
    if (answerKind === "geometry-area-m2") return `${numeric} m²`;
    return escapeHtml(value);
  }

  function shuffled(values, shuffle) {
    return shuffle([...values]);
  }

  function countChoices(answer, shuffle) {
    const values = [0, 1, 2, 3, 4].filter((value) => value !== answer);
    return shuffled([answer, ...shuffle(values).slice(0, 3)], shuffle);
  }

  function nearbyChoices(answer, candidates, shuffle) {
    const unique = [...new Set([answer, ...candidates])].filter((value) => Number.isInteger(value) && value > 0);
    for (let offset = 1; unique.length < 4; offset += 1) {
      if (answer - offset > 0 && !unique.includes(answer - offset)) unique.push(answer - offset);
      if (unique.length < 4 && !unique.includes(answer + offset)) unique.push(answer + offset);
    }
    return shuffled([answer, ...unique.filter((value) => value !== answer).slice(0, 3)], shuffle);
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

  function buildLevelFourPool() {
    const mechanics = ["vertices", "edges", "flatFaces", "curved", "touch-property"];
    return Object.values(solids).flatMap((solid) => mechanics.map((mechanic, variant) => ({ mechanic, solid: solid.id, variant })));
  }

  const shelfProducts = ["🍞", "🥛", "🍎", "🍪", "🧃", "🧀", "📒", "🧼", "🍫"];
  function buildLevelFivePool() {
    const pool = [];
    [6, 9].forEach((size) => {
      const rows = size === 6 ? 2 : 3;
      const cols = 3;
      for (let target = 0; target < size; target += 1) {
        pool.push({ mechanic: "absolute", size, rows, cols, target });
        const row = Math.floor(target / cols);
        const col = target % cols;
        if (col > 0) pool.push({ mechanic: "right-of", size, rows, cols, target, reference: target - 1 });
        if (col < cols - 1) pool.push({ mechanic: "left-of", size, rows, cols, target, reference: target + 1 });
        if (row > 0) pool.push({ mechanic: "below", size, rows, cols, target, reference: target - cols });
        if (row < rows - 1) pool.push({ mechanic: "above", size, rows, cols, target, reference: target + cols });
      }
    });
    return pool;
  }

  const patternRules = {
    AB: [1, 2], AAB: [1, 1, 2], ABB: [1, 2, 2], ABC: [1, 2, 3], ORIENT: [5, 6, 7, 8]
  };
  function buildLevelSixPool() {
    return Object.entries(patternRules).flatMap(([rule, sequence]) =>
      [6, 7, 8].flatMap((length) => Array.from({ length }, (_, missing) => ({ mechanic: rule, rule, sequence, length, missing, doubleGap: length === 8 && missing % 3 === 0 })))
    );
  }

  function buildLevelSevenPool() {
    const pool = [];
    [4, 6].forEach((size) => ["vertical", "horizontal"].forEach((axis) => {
      for (let variant = 0; variant < 18; variant += 1) pool.push({ mechanic: axis, axis, size, variant });
    }));
    return pool;
  }

  function buildLevelEightPool() {
    const pool = [];
    for (let length = 2; length <= 10; length += 1) {
      for (let width = 1; width <= Math.min(8, length); width += 1) {
        const shape = length === width ? "square" : "rectangle";
        pool.push(
          { mechanic: "boundary", phase: "intro", length, width, unit: "m", shape },
          { mechanic: "sum-sides", phase: "core", length, width, unit: "m", shape },
          { mechanic: shape === "square" ? "square-perimeter" : "rectangle-perimeter", phase: "core", length, width, unit: "m", shape },
          { mechanic: (length + width) % 2 ? "fence-story" : "ribbon-story", phase: "application", length, width, unit: "m", shape }
        );
      }
    }
    return pool;
  }

  function buildLevelNinePool() {
    const pool = [];
    for (let rows = 1; rows <= 6; rows += 1) {
      for (let cols = 1; cols <= 7; cols += 1) {
        const shape = rows === cols ? "square" : "rectangle";
        pool.push(
          { mechanic: "count-grid", phase: "intro", rows, cols, unit: "unit", shape },
          { mechanic: "rows-columns", phase: "core", rows, cols, unit: "unit", shape },
          { mechanic: "multiply-area", phase: "core", rows, cols, unit: "unit", shape },
          { mechanic: (rows + cols) % 2 ? "tile-story" : "display-area", phase: "application", rows, cols, unit: "m", shape }
        );
      }
    }
    return pool;
  }

  const pools = {
    1: buildLevelOnePool(), 2: buildLevelTwoPool(), 3: buildLevelThreePool(), 4: buildLevelFourPool(),
    5: buildLevelFivePool(), 6: buildLevelSixPool(), 7: buildLevelSevenPool(),
    8: buildLevelEightPool(), 9: buildLevelNinePool()
  };

  function takePhase(source, phase, count, shuffle) {
    return shuffle(source.filter((spec) => spec.phase === phase)).slice(0, count);
  }

  function makeProgressivePlan(levelId, shuffle) {
    const source = pools[levelId];
    return [
      ...takePhase(source, "intro", 3, shuffle),
      ...takePhase(source, "core", 4, shuffle),
      ...takePhase(source, "application", 3, shuffle)
    ];
  }

  function makeMixedPlan(shuffle) {
    const plan = [];
    for (let sourceLevel = 1; sourceLevel <= 9; sourceLevel += 1) {
      const sourcePool = pools[sourceLevel];
      plan.push({ sourceLevel, sourceSpec: shuffle(sourcePool)[0], mechanic: `mixed-${sourceLevel}` });
    }
    const applicationLevel = shuffle([8, 9])[0];
    const applications = pools[applicationLevel].filter((spec) => spec.phase === "application");
    plan.push({ sourceLevel: applicationLevel, sourceSpec: shuffle(applications)[0], mechanic: "mixed-application" });
    return plan;
  }

  function makePlan(levelId, shuffle) {
    if (levelId === 10) return makeMixedPlan(shuffle);
    if (levelId === 8 || levelId === 9) return makeProgressivePlan(levelId, shuffle);
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
      return { ...base, answerKind: "geometry-shape-visual", answer: shape.id, choices: shuffled(shapeIds, shuffle), context: shapeContext("Saya perlukan bentuk yang tepat untuk hiasan kedai.", `Pilih ${lowerName(shape.name)}.`), visual: { type: "shape-shelf", title: `Cari ${lowerName(shape.name)}` } };
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
      interaction: "visual-single",
      context: shapeContext(`Boleh bantu saya pilih barang untuk ${spec.prompt}?`, `Pilih barang yang permukaannya berbentuk ${lowerName(shapes[target.shape].name)}.`),
      visual: { type: "object-shelf", title: "Rak barang", targetShape: target.shape, options: shuffled([target.id, ...distractors], shuffle) }
    };
  }

  function generateLevelThree(spec, shuffle) {
    const solid = solids[spec.solid];
    const solidPromptName = solid.id === 22 ? "kuboid memanjang seperti kotak kasut" : lowerName(solid.name);
    const base = {
      isGeometry: true,
      geometryLevel: 3,
      geometrySubSkill: spec.mechanic,
      skillCategory: "geometry",
      context: shapeContext("Penghantaran baru sudah sampai. Jom periksa kotaknya!", "Apakah bentuk 3D ini?"),
      visual: { type: "solid", solid: solid.id, title: "Kotak misteri" }
    };
    if (spec.mechanic === "select-solid") {
      return { ...base, answerKind: "geometry-solid-visual", answer: solid.id, choices: shuffled([solid.id, ...shuffled(solidIds.filter((id) => id !== solid.id), shuffle).slice(0, 3)], shuffle), context: shapeContext("Saya perlukan bekas dengan bentuk tertentu.", `Pilih ${solidPromptName}.`), visual: { type: "solid", solid: solid.id, title: `Contoh ${lowerName(solid.name)}` } };
    }
    if (spec.mechanic === "match-object" || spec.mechanic === "delivery") {
      const answer = solid.id + 100;
      const choices = shuffled([answer, ...solidIds.filter((id) => id !== solid.id).slice(0, 3).map((id) => id + 100)], shuffle);
      return { ...base, answerKind: "geometry-solid-object", answer, choices, context: shapeContext("Saya mahu padankan bentuk dengan barang dalam penghantaran.", `Barang manakah berbentuk ${solidPromptName}?`), visual: { type: "solid", solid: solid.id, title: `${solid.name} dalam stor` } };
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

  const propertyMeta = {
    vertices: { label: "bucu", key: "vertices", code: 1 },
    edges: { label: "rusuk", key: "edges", code: 2 },
    flatFaces: { label: "muka rata", key: "flatFaces", code: 3 },
    curved: { label: "permukaan melengkung", key: "curved", code: 4 }
  };

  function generateLevelFour(spec, shuffle) {
    const solid = solids[spec.solid];
    const meta = propertyMeta[spec.mechanic] || propertyMeta[["vertices", "edges", "flatFaces", "curved"][(spec.solid + spec.variant) % 4]];
    if (spec.mechanic === "touch-property") {
      return {
        isGeometry: true, geometryLevel: 4, geometrySubSkill: "solidProperties", skillCategory: "geometry",
        answerKind: "geometry-property", answer: meta.code, choices: shuffled([1, 2, 3, 4], shuffle), interaction: "visual-single",
        context: shapeContext("Mari kita periksa bahagian pada kotak ini.", `Sentuh label ${meta.label} pada rajah ${lowerName(solid.name)}.`),
        visual: { type: "solid-properties", solid: solid.id, title: `Ciri ${solid.name}`, options: shuffled([1, 2, 3, 4], shuffle) }
      };
    }
    const answer = solid[meta.key];
    const candidates = [...new Set([answer, Math.max(0, answer - 1), answer + 1, answer === 12 ? 6 : answer + 2, 0, 1, 2, 6, 8, 12])]
      .filter((value) => value >= 0).slice(0, 4);
    while (candidates.length < 4) candidates.push(candidates[candidates.length - 1] + 1);
    return {
      isGeometry: true, geometryLevel: 4, geometrySubSkill: "solidProperties", skillCategory: "geometry",
      answerKind: "geometry-count", answer, choices: shuffled(candidates, shuffle),
      context: shapeContext("Saya mahu menyemak kotak penghantaran.", `${solid.name} mempunyai berapa ${meta.label}?`),
      visual: { type: "solid-property-count", solid: solid.id, title: solid.name, property: meta.label }
    };
  }

  function positionLabel(index, rows, cols) {
    const row = Math.floor(index / cols);
    const col = index % cols;
    if (rows === 3 && row === 1 && col === 1) return "petak tengah";
    const vertical = row === 0 ? "atas" : row === rows - 1 ? "bawah" : "tengah";
    const horizontal = col === 0 ? "kiri" : col === cols - 1 ? "kanan" : "tengah";
    return `petak ${vertical} ${horizontal}`;
  }

  function generateLevelFive(spec, shuffle) {
    const items = shuffle(shelfProducts).slice(0, spec.size);
    const targetItem = items[spec.target];
    let question = `Sentuh ${positionLabel(spec.target, spec.rows, spec.cols)}.`;
    if (spec.reference !== undefined) {
      const relation = { "right-of": "di kanan", "left-of": "di kiri", below: "di bawah", above: "di atas" }[spec.mechanic];
      question = `Sentuh petak ${relation} ${items[spec.reference]}.`;
    } else if (spec.mechanic === "absolute") {
      question = spec.target === Math.floor(spec.size / 2) && spec.rows === 3
        ? "Sentuh petak di tengah rak."
        : `Sentuh ${positionLabel(spec.target, spec.rows, spec.cols)}.`;
    }
    return {
      isGeometry: true, geometryLevel: 5, geometrySubSkill: "position", skillCategory: "geometry",
      answerKind: "geometry-shelf-cell", answer: spec.target, choices: [], interaction: "visual-single",
      context: shapeContext("Saya mahu menyusun barang dengan kemas.", question),
      visual: { type: "interactive-shelf", title: `${spec.rows} × ${spec.cols} rak`, rows: spec.rows, cols: spec.cols, items, targetItem }
    };
  }

  function patternSymbol(code) {
    return ({ 1: "●", 2: "■", 3: "▲", 4: "◆", 5: "↑", 6: "→", 7: "↓", 8: "←" })[code] || "?";
  }

  function generateLevelSix(spec, shuffle) {
    const sequence = Array.from({ length: spec.length }, (_, index) => spec.sequence[index % spec.sequence.length]);
    const answer = sequence[spec.missing];
    const secondGap = spec.doubleGap ? sequence.findIndex((value, index) => index !== spec.missing && value === answer) : -1;
    const missing = secondGap >= 0 ? [spec.missing, secondGap] : [spec.missing];
    const pool = spec.rule === "ORIENT" ? [5, 6, 7, 8] : [1, 2, 3, 4];
    return {
      isGeometry: true, geometryLevel: 6, geometrySubSkill: "pattern", skillCategory: "geometry",
      answerKind: "geometry-pattern", answer, choices: shuffled(pool, shuffle),
      context: shapeContext("Saya sedang menyusun jubin lantai kedai.", missing.length > 1 ? "Jubin manakah melengkapkan kedua-dua ruang ini?" : "Jubin manakah melengkapkan corak ini?"),
      visual: { type: "pattern", title: `Corak ${spec.rule === "ORIENT" ? "arah" : spec.rule}`, sequence, missing }
    };
  }

  function mirrorCell(index, size, axis) {
    const row = Math.floor(index / size);
    const col = index % size;
    return axis === "vertical" ? row * size + (size - 1 - col) : (size - 1 - row) * size + col;
  }

  function generateLevelSeven(spec) {
    const half = spec.size / 2;
    const candidates = [];
    for (let row = 0; row < spec.size; row += 1) {
      for (let col = 0; col < spec.size; col += 1) {
        if ((spec.axis === "vertical" && col < half) || (spec.axis === "horizontal" && row < half)) candidates.push(row * spec.size + col);
      }
    }
    const count = spec.size === 4 ? 2 + (spec.variant % 2) : 3 + (spec.variant % 3);
    const source = [];
    for (let offset = 0; source.length < count; offset += 1) {
      const cell = candidates[(spec.variant * 5 + offset * 3) % candidates.length];
      if (!source.includes(cell)) source.push(cell);
    }
    const correctCells = source.map((cell) => mirrorCell(cell, spec.size, spec.axis)).sort((a, b) => a - b);
    return {
      isGeometry: true, geometryLevel: 7, geometrySubSkill: "symmetry", skillCategory: "geometry",
      answerKind: "geometry-grid-set", answer: correctCells.join(","), choices: [], interaction: "multi-select",
      correctCells,
      context: shapeContext("Saya mahu melengkapkan papan tanda yang seimbang.", "Sentuh petak yang melengkapkan pantulan, kemudian tekan Semak."),
      visual: { type: "symmetry", title: `Paksi ${spec.axis === "vertical" ? "menegak" : "mendatar"}`, size: spec.size, axis: spec.axis, source }
    };
  }

  function generateLevelEight(spec, shuffle) {
    const { length, width, unit } = spec;
    const answer = 2 * (length + width);
    const shapeLabel = length === width ? "segi empat sama" : "segi empat tepat";
    const story = spec.mechanic === "ribbon-story" ? "pita hiasan" : "pagar";
    const dialogs = {
      intro: "Mari ukur garisan di sekeliling taman mini kedai.",
      core: "Saya mahu memastikan setiap sisi taman diukur dengan betul.",
      application: `Saya sedang memasang ${story} di sekeliling taman mini.`
    };
    const questions = {
      boundary: "Berapakah jumlah panjang sempadan yang diserlahkan?",
      "sum-sides": `Tambah panjang keempat-empat sisi ${shapeLabel} ini. Berapakah kelilingnya?`,
      "square-perimeter": "Berapakah keliling taman berbentuk segi empat sama ini?",
      "rectangle-perimeter": "Berapakah keliling taman berbentuk segi empat tepat ini?",
      "fence-story": "Berapa meter pagar diperlukan untuk mengelilingi taman?",
      "ribbon-story": "Berapa meter pita diperlukan untuk menghias seluruh tepi taman?"
    };
    return {
      isGeometry: true, geometryLevel: 8, geometrySubSkill: "perimeter", skillCategory: "geometry",
      answerKind: unit === "cm" ? "geometry-length-cm" : "geometry-length-m", answer,
      choices: nearbyChoices(answer, [length + width, length * width, answer - width, answer + length], shuffle),
      context: shapeContext(dialogs[spec.phase], questions[spec.mechanic]),
      visual: { type: "perimeter", title: "Keliling taman", length, width, unit, segmented: spec.mechanic === "boundary" },
      calculation: { operation: "perimeter", length, width, unit }
    };
  }

  function generateLevelNine(spec, shuffle) {
    const { rows, cols, unit } = spec;
    const answer = rows * cols;
    const isMeasured = unit === "m";
    const dialog = spec.phase === "application"
      ? "Saya mahu memasang jubin pada ruang pameran baharu."
      : "Mari kira kawasan yang diliputi oleh petak jubin ini.";
    const questions = {
      "count-grid": "Berapakah jumlah petak unit yang menutupi ruang ini?",
      "rows-columns": `Ada ${rows} baris dengan ${cols} petak setiap baris. Berapakah luasnya?`,
      "multiply-area": "Darabkan bilangan baris dengan bilangan lajur. Berapakah luas ruang ini?",
      "tile-story": "Berapa jubin persegi diperlukan untuk menutupi ruang pameran ini?",
      "display-area": "Berapakah luas ruang pameran ini dalam meter persegi?"
    };
    return {
      isGeometry: true, geometryLevel: 9, geometrySubSkill: "area", skillCategory: "geometry",
      answerKind: isMeasured ? "geometry-area-m2" : "geometry-area-unit", answer,
      choices: nearbyChoices(answer, [rows + cols, 2 * (rows + cols), answer - rows, answer + cols], shuffle),
      context: shapeContext(dialog, questions[spec.mechanic]),
      visual: { type: "area-grid", title: "Ruang pameran", rows, cols, unit },
      calculation: { operation: "area", rows, cols, unit }
    };
  }

  function generateForLevel(levelId, spec, shuffle) {
    if (levelId === 1) return generateLevelOne(spec, shuffle);
    if (levelId === 2) return generateLevelTwo(spec, shuffle);
    if (levelId === 3) return generateLevelThree(spec, shuffle);
    if (levelId === 4) return generateLevelFour(spec, shuffle);
    if (levelId === 5) return generateLevelFive(spec, shuffle);
    if (levelId === 6) return generateLevelSix(spec, shuffle);
    if (levelId === 7) return generateLevelSeven(spec, shuffle);
    if (levelId === 8) return generateLevelEight(spec, shuffle);
    return generateLevelNine(spec, shuffle);
  }

  function generate(levelId, questionIndex, customer, randomIndex, shuffle, plan) {
    const spec = plan[questionIndex] || pools[levelId][randomIndex(pools[levelId].length)];
    if (levelId === 10) {
      const mixed = generateForLevel(spec.sourceLevel, spec.sourceSpec, shuffle);
      return {
        ...mixed,
        geometryLevel: 10,
        geometrySourceLevel: spec.sourceLevel,
        geometryMixedTask: spec.mechanic,
        visual: { ...mixed.visual, finaleTask: questionIndex + 1 }
      };
    }
    return generateForLevel(levelId, spec, shuffle);
  }

  function renderPerimeter(visual) {
    const max = Math.max(visual.length, visual.width);
    const drawingWidth = 128 + Math.round(92 * visual.length / max);
    const drawingHeight = 72 + Math.round(72 * visual.width / max);
    const x = (360 - drawingWidth) / 2;
    const y = (210 - drawingHeight) / 2;
    const horizontalTicks = visual.segmented ? Array.from({ length: Math.max(0, visual.length - 1) }, (_, index) => {
      const tx = x + drawingWidth * (index + 1) / visual.length;
      return `<path d="M${tx} ${y - 7}v14M${tx} ${y + drawingHeight - 7}v14"/>`;
    }).join("") : "";
    const verticalTicks = visual.segmented ? Array.from({ length: Math.max(0, visual.width - 1) }, (_, index) => {
      const ty = y + drawingHeight * (index + 1) / visual.width;
      return `<path d="M${x - 7} ${ty}h14M${x + drawingWidth - 7} ${ty}h14"/>`;
    }).join("") : "";
    return `<svg class="geometry-math-svg perimeter-svg" viewBox="0 0 360 230" role="img" aria-label="Taman ${visual.length} ${visual.unit} panjang dan ${visual.width} ${visual.unit} lebar">
      <defs><pattern id="gardenGrid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#b8df9b" stroke-width="1"/></pattern></defs>
      <rect x="${x}" y="${y}" width="${drawingWidth}" height="${drawingHeight}" fill="#e8f7c9" stroke="#49319d" stroke-width="9"/>
      <g class="geometry-boundary-ticks">${horizontalTicks}${verticalTicks}</g>
      <rect x="${x + 8}" y="${y + 8}" width="${drawingWidth - 16}" height="${drawingHeight - 16}" fill="url(#gardenGrid)"/>
      <g class="geometry-dimension"><line x1="${x}" y1="${y + drawingHeight + 22}" x2="${x + drawingWidth}" y2="${y + drawingHeight + 22}"/><text x="180" y="${y + drawingHeight + 45}">${visual.length} ${visual.unit}</text><line x1="${x - 22}" y1="${y}" x2="${x - 22}" y2="${y + drawingHeight}"/><text x="${x - 31}" y="${y + drawingHeight / 2}" transform="rotate(-90 ${x - 31} ${y + drawingHeight / 2})">${visual.width} ${visual.unit}</text></g>
    </svg>`;
  }

  function renderAreaGrid(visual) {
    const cell = Math.min(42, Math.floor(250 / Math.max(visual.rows, visual.cols)));
    const gridWidth = visual.cols * cell;
    const gridHeight = visual.rows * cell;
    const viewWidth = gridWidth + 50;
    const viewHeight = gridHeight + 62;
    const squares = Array.from({ length: visual.rows * visual.cols }, (_, index) => {
      const row = Math.floor(index / visual.cols);
      const col = index % visual.cols;
      return `<rect x="${25 + col * cell}" y="${18 + row * cell}" width="${cell}" height="${cell}" fill="${(row + col) % 2 ? "#fff2a8" : "#a9e7ff"}" stroke="#49319d" stroke-width="2"/>`;
    }).join("");
    const unitText = visual.unit === "m" ? `${visual.rows} m × ${visual.cols} m` : `${visual.rows} baris × ${visual.cols} lajur`;
    return `<svg class="geometry-math-svg area-svg" viewBox="0 0 ${viewWidth} ${viewHeight}" role="img" aria-label="Grid ${visual.rows} baris dan ${visual.cols} lajur">${squares}<text x="${viewWidth / 2}" y="${viewHeight - 12}" text-anchor="middle">${unitText}</text></svg>`;
  }

  function render(question, visualHelp = false) {
    const visual = question.visual || {};
    let art = "";
    if (visual.type === "shape") art = renderShape(visual.shape, { rotation: visual.rotation, scale: visual.scale });
    else if (visual.type === "solid") art = renderSolid(visual.solid);
    else if (visual.type === "solid-property-count") art = `<div class="geometry-solid-focus">${renderSolid(visual.solid)}<b>${escapeHtml(visual.property)}</b></div>`;
    else if (visual.type === "solid-properties") art = `<div class="geometry-solid-focus">${renderSolid(visual.solid)}</div><div class="geometry-visual-options">${visual.options.map((value) => `<button type="button" class="geometry-choice" data-geometry-value="${value}" disabled>${format(value, "geometry-property")}</button>`).join("")}</div>`;
    else if (visual.type === "object-shelf") art = `<div class="geometry-product-grid">${visual.options.map((value) => `<button type="button" class="geometry-product-choice geometry-choice" data-geometry-value="${value}" disabled>${renderObject(value)}<strong>${escapeHtml(shopObjects[value].name)}</strong></button>`).join("")}</div>`;
    else if (visual.type === "interactive-shelf") art = `<div class="geometry-rack" style="--rack-cols:${visual.cols}" role="group" aria-label="Rak ${visual.rows} baris dan ${visual.cols} lajur">${visual.items.map((item, index) => `<button type="button" class="geometry-rack-cell geometry-choice" data-geometry-value="${index}" aria-label="Petak ${index + 1}, barang ${item}" disabled><span aria-hidden="true">${item}</span></button>`).join("")}</div>`;
    else if (visual.type === "pattern") art = `<div class="geometry-pattern" role="img" aria-label="Jujukan corak dengan ruang kosong">${visual.sequence.map((value, index) => `<span class="${visual.missing.includes(index) ? "is-missing" : ""}">${visual.missing.includes(index) ? "?" : patternSymbol(value)}</span>`).join("")}</div>`;
    else if (visual.type === "symmetry") {
      const source = new Set(visual.source);
      art = `<div class="geometry-symmetry-wrap"><div class="geometry-symmetry-grid axis-${visual.axis}" style="--grid-size:${visual.size}" role="group" aria-label="Grid simetri ${visual.size} kali ${visual.size}">${Array.from({ length: visual.size * visual.size }, (_, index) => `<button type="button" class="geometry-symmetry-cell${source.has(index) ? " is-source" : ""}" data-geometry-cell="${index}" aria-label="Petak baris ${Math.floor(index / visual.size) + 1}, lajur ${index % visual.size + 1}${source.has(index) ? ", corak asal" : ""}" ${source.has(index) ? "disabled" : "disabled"}></button>`).join("")}</div><div class="geometry-grid-actions"><button type="button" class="geometry-clear-button" data-geometry-action="clear" disabled>Padam Pilihan</button><button type="button" class="geometry-check-button" data-geometry-action="check" disabled>Semak</button></div></div>`;
    }
    else if (visual.type === "box-compare") art = `<div class="geometry-compare">${visual.solids.map(renderSolid).join('<span aria-hidden="true">↔</span>')}</div>`;
    else if (visual.type === "feature") art = `<div class="geometry-feature-card"><span aria-hidden="true">🔎</span><strong>${escapeHtml(visual.title)}</strong></div>`;
    else if (visual.type === "perimeter") art = renderPerimeter(visual);
    else if (visual.type === "area-grid") art = renderAreaGrid(visual);
    else art = `<div class="geometry-shelf" aria-hidden="true"><span>◇</span><span>△</span><span>□</span><span>○</span></div>`;
    const effectiveLevel = question.geometrySourceLevel || question.geometryLevel;
    const help = visualHelp ? `<small class="geometry-visual-note">${effectiveLevel === 5 ? "Gunakan kedudukan baris dan lajur pada rak." : effectiveLevel === 6 ? "Cari unit corak yang berulang." : effectiveLevel === 7 ? "Bayangkan corak dilipat pada garisan paksi." : effectiveLevel === 8 ? "Keliling ialah jumlah panjang semua sisi di luar bentuk." : effectiveLevel === 9 ? "Luas ialah jumlah petak unit yang menutupi kawasan." : "Lihat garisan, sisi, bucu dan permukaan—bukan warna sahaja."}</small>` : "";
    return `<article class="geometry-display" aria-label="Rajah Bentuk dan Ruang"><strong>${escapeHtml(visual.title || "Bentuk dan Ruang")}</strong>${art}${help}</article>`;
  }

  function explain(question, answerText) {
    const kind = question.answerKind;
    const effectiveLevel = question.geometrySourceLevel || question.geometryLevel;
    if (effectiveLevel === 8) {
      const { length, width, unit } = question.calculation;
      return `Keliling ialah jumlah panjang semua sisi. Tambah ${length} + ${width} + ${length} + ${width} untuk mendapat ${2 * (length + width)} ${unit}. Jawapan betul: ${answerText}.`;
    }
    if (effectiveLevel === 9) {
      const { rows, cols, unit } = question.calculation;
      const resultUnit = unit === "m" ? "m²" : "unit persegi";
      return `Ada ${rows} baris dengan ${cols} petak setiap baris. Jadi ${rows} × ${cols} = ${rows * cols} ${resultUnit}. Jawapan betul: ${answerText}.`;
    }
    if (effectiveLevel === 4) {
      const solid = solids[question.visual?.solid];
      if (question.answerKind === "geometry-count") return `${solid.name} mempunyai ${question.answer} ${question.visual.property}. Jawapan betul: ${answerText}.`;
      return `Pada ${lowerName(solid.name)}, label yang diminta ialah ${answerText}.`;
    }
    if (effectiveLevel === 5) return `Baca kedudukan rak mengikut baris dan lajur. Petak yang diserlahkan ialah jawapan yang betul.`;
    if (effectiveLevel === 6) return `Corak ${question.visual.title.replace("Corak ", "")} berulang mengikut urutan yang sama. Jubin betul ialah ${answerText}.`;
    if (effectiveLevel === 7) return `Setiap petak perlu dicerminkan pada jarak yang sama di seberang paksi. Petak yang diserlahkan melengkapkan pantulan.`;
    if (kind === "geometry-count") {
      const shape = shapes[question.visual?.shape];
      return `${shape?.name || "Bentuk ini"} mempunyai ${question.answer} ${question.geometrySubSkill === "corners" ? "bucu" : "sisi lurus"}. Jawapan betul: ${answerText}.`;
    }
    if (kind === "geometry-object-choice") {
      const object = shopObjects[question.answer];
      return `Lihat bentuk permukaan barang. ${object.name} mempunyai permukaan ${lowerName(shapes[object.shape].name)}. Jawapan betul: ${answerText}.`;
    }
    if (kind === "geometry-solid-object") {
      const solid = solidObjectCodes[question.answer];
      return `${solid.object} sepadan dengan bentuk ${lowerName(solid.name)}. Jawapan betul: ${answerText}.`;
    }
    if (effectiveLevel === 3) {
      const solid = solids[question.answer];
      return `${solid?.name || "Bentuk ini"}: ${solid?.feature || "perhatikan permukaan dan bentuknya"}. Jawapan betul: ${answerText}.`;
    }
    const shape = shapes[question.answer];
    return `Perhatikan garisan dan bentuk luar. Bentuk itu ialah ${lowerName(shape?.name || answerText)}. Jawapan betul: ${answerText}.`;
  }

  function getAudit() {
    const audit = Object.fromEntries([1, 2, 3, 4, 5, 6, 7, 8, 9].map((levelId) => [levelId, {
      baseConfigurations: pools[levelId].length,
      mechanics: [...new Set(pools[levelId].map((spec) => spec.mechanic))]
    }]));
    audit[10] = { baseConfigurations: 10, mechanics: ["B01–B09", "mixed-application"] };
    return audit;
  }

  const assetPaths = [
    ...Object.values(shopObjects).map((object) => object.image),
    ...Object.values(solids).map((solid) => solid.objectImage)
  ];

  return { missions, format, render, explain, createPlan: makePlan, generate, getAudit, assetPaths };
})();
