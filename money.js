"use strict";

const MoneyVisualModule = (() => {
  const denominations = [
    { type: "note", valueSen: 10000, label: "RM100", spoken: "seratus ringgit" },
    { type: "note", valueSen: 5000, label: "RM50", spoken: "lima puluh ringgit" },
    { type: "note", valueSen: 2000, label: "RM20", spoken: "dua puluh ringgit" },
    { type: "note", valueSen: 1000, label: "RM10", spoken: "sepuluh ringgit" },
    { type: "note", valueSen: 500, label: "RM5", spoken: "lima ringgit" },
    { type: "note", valueSen: 100, label: "RM1", spoken: "satu ringgit" },
    { type: "coin", valueSen: 50, label: "50 SEN", spoken: "lima puluh sen" },
    { type: "coin", valueSen: 20, label: "20 SEN", spoken: "dua puluh sen" },
    { type: "coin", valueSen: 10, label: "10 SEN", spoken: "sepuluh sen" },
    { type: "coin", valueSen: 5, label: "5 SEN", spoken: "lima sen" }
  ];
  const byValue = new Map(denominations.map((piece) => [piece.valueSen, piece]));

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  function formatAmount(valueSen) {
    const ringgit = Math.floor(valueSen / 100);
    const sen = String(valueSen % 100).padStart(2, "0");
    return `RM${ringgit}.${sen}`;
  }

  function getDecompositions(valueSen, maxPieces = 8, limit = 24) {
    if (!Number.isInteger(valueSen) || valueSen < 0 || valueSen % 5 !== 0) return [];
    if (valueSen === 0) return [[]];
    const results = [];

    function search(index, remaining, pieces) {
      if (results.length >= limit || pieces.length > maxPieces) return;
      if (remaining === 0) {
        results.push([...pieces]);
        return;
      }
      if (index >= denominations.length || pieces.length === maxPieces) return;
      const denomination = denominations[index].valueSen;
      const maximum = Math.min(Math.floor(remaining / denomination), maxPieces - pieces.length);
      for (let count = maximum; count >= 0; count -= 1) {
        const nextRemaining = remaining - count * denomination;
        if (nextRemaining < 0 || (index === denominations.length - 1 && nextRemaining !== 0)) continue;
        search(index + 1, nextRemaining, [...pieces, ...Array(count).fill(denomination)]);
      }
    }

    search(0, valueSen, []);
    return results
      .filter((pieces, index, all) => all.findIndex((candidate) => candidate.join(",") === pieces.join(",")) === index)
      .sort((left, right) => left.length - right.length || right[0] - left[0]);
  }

  function renderMoneyPiece(pieceOrValue) {
    const valueSen = typeof pieceOrValue === "number" ? pieceOrValue : pieceOrValue?.valueSen;
    const piece = byValue.get(valueSen);
    if (!piece) return "";
    const kind = piece.type === "note" ? "Wang kertas" : "Syiling";
    return `<span class="money-piece money-${piece.type} money-value-${piece.valueSen}" role="img" aria-label="${kind} ${piece.spoken}">
      <span class="money-piece-pattern" aria-hidden="true"></span>
      <strong>${piece.label}</strong>
      ${piece.type === "note" ? '<small>RINGGIT MALAYSIA</small>' : ""}
    </span>`;
  }

  function renderMoneyAmount(valueSen, options = {}) {
    const decompositions = getDecompositions(valueSen, options.maxPieces || 8);
    if (decompositions.length === 0) return "";
    const variant = Math.abs(Number(options.variant) || 0) % decompositions.length;
    const pieces = decompositions[variant];
    const label = options.label || "Wang ditunjukkan";
    return `<section class="money-visual" aria-label="${escapeHtml(label)}">
      <div class="money-visual-heading"><strong>${escapeHtml(label)}</strong>${options.showAmount ? `<span>${formatAmount(valueSen)}</span>` : ""}</div>
      <div class="money-pieces">${pieces.map(renderMoneyPiece).join('<span class="money-plus" aria-hidden="true">+</span>')}</div>
    </section>`;
  }

  function audit() {
    return {
      denominations: denominations.map(({ type, valueSen, label }) => ({ type, valueSen, label })),
      invalidDenominations: denominations.filter((piece) => ![5, 10, 20, 50, 100, 500, 1000, 2000, 5000, 10000].includes(piece.valueSen)),
      exampleDecompositions: Object.fromEntries([550, 650, 1000, 1250, 1850, 2000]
        .map((amount) => [amount, getDecompositions(amount).length]))
    };
  }

  return { denominations, formatAmount, getDecompositions, renderMoneyPiece, renderMoneyAmount, audit };
})();
