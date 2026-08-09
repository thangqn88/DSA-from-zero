import { makeStepper } from '../utils/stepper.js';

export function initBstNangCaoWidgets() {

// ============================================================
// DAY 14: BST validation (range shrinking) + LCA path stepper
// ============================================================
(function() {
  const INF = Infinity;
  const tree = { val: 5, x: 150, y: 40, right: { val: 4, x: 150, y: 130 } };
  const events = [];
  function check(node, lo, hi) {
    if (!node) return true;
    const valid = node.val > lo && node.val < hi;
    events.push({val: node.val, x: node.x, y: node.y, lo, hi, valid});
    if (!valid) return false;
    return check(node.left, lo, node.val) && check(node.right, node.val, hi);
  }
  check(tree, -INF, INF);

  const svgEl = document.getElementById('d14ValidSvg');
  const caption = document.getElementById('d14ValidCaption');
  const nodesFlat = [tree, tree.right];
  const edges = [[tree, tree.right]];

  makeStepper('d14Valid', events, (ev, idx) => {
    const decided = events.slice(0, idx+1);
    let svg = `<svg width="100%" height="160" viewBox="0 0 400 160">`;
    edges.forEach(([a,b]) => { svg += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="#ccc" stroke-width="2"/>`; });
    nodesFlat.forEach(node => {
      const d = decided.find(e => e.val === node.val);
      let fill='#eee', stroke='#bbb';
      if (d) { fill = d.valid ? 'var(--success-bg)' : 'var(--danger-bg)'; stroke = d.valid ? 'var(--success)' : 'var(--danger)'; }
      if (ev && ev.val === node.val) { stroke = 'var(--warning)'; }
      svg += `<circle cx="${node.x}" cy="${node.y}" r="20" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/>`;
      svg += `<text x="${node.x}" y="${node.y}" font-size="15" text-anchor="middle" dy="5" font-family="monospace">${node.val}</text>`;
      if (d) svg += `<text x="${node.x}" y="${node.y+34}" font-size="11" text-anchor="middle" fill="#888">(${d.lo===-INF?'-∞':d.lo}, ${d.hi===INF?'∞':d.hi})</text>`;
    });
    svg += `</svg>`;
    svgEl.innerHTML = svg;
    let text = 'Bấm "Bước tiếp theo" để bắt đầu.';
    if (ev) text = ev.valid
      ? `Node ${ev.val}: khoảng cho phép (${ev.lo===-INF?'-∞':ev.lo}, ${ev.hi===INF?'∞':ev.hi}) → ${ev.val} nằm trong khoảng → hợp lệ, đi tiếp.`
      : `Node ${ev.val}: khoảng cho phép (${ev.lo===-INF?'-∞':ev.lo}, ${ev.hi===INF?'∞':ev.hi}) → ${ev.val} KHÔNG nằm trong khoảng → VI PHẠM! (chỉ so với con trực tiếp sẽ bỏ lỡ lỗi này)`;
    caption.textContent = text;
  });
})();



(function() {
  const tree = {
    val: 10, x: 300, y: 30,
    left: { val: 5, x: 180, y: 110, left: {val:3,x:120,y:190}, right: {val:7,x:240,y:190} },
    right: { val: 15, x: 420, y: 110, left: {val:12,x:360,y:190}, right: {val:18,x:480,y:190} }
  };
  const p = 3, q = 7;
  const events = [];
  function findLCA(node) {
    events.push({val: node.val, x: node.x, y: node.y});
    if (p < node.val && q < node.val) { events[events.length-1].decision = 'left'; return findLCA(node.left); }
    if (p > node.val && q > node.val) { events[events.length-1].decision = 'right'; return findLCA(node.right); }
    events[events.length-1].decision = 'found';
    return node;
  }
  findLCA(tree);

  const allNodes = [tree, tree.left, tree.right, tree.left.left, tree.left.right, tree.right.left, tree.right.right];
  const edges = [[tree,tree.left],[tree,tree.right],[tree.left,tree.left.left],[tree.left,tree.left.right],[tree.right,tree.right.left],[tree.right,tree.right.right]];

  const svgEl = document.getElementById('d14LcaSvg');
  const caption = document.getElementById('d14LcaCaption');

  makeStepper('d14Lca', events, (ev, idx) => {
    const visitedPath = events.slice(0, idx+1).map(e => e.val);
    let svg = `<svg width="100%" height="220" viewBox="0 0 600 220">`;
    edges.forEach(([a,b]) => { svg += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="#ccc" stroke-width="2"/>`; });
    allNodes.forEach(node => {
      const onPath = visitedPath.includes(node.val);
      const isCurrent = ev && ev.val === node.val;
      const isTarget = node.val === p || node.val === q;
      let fill = '#eee', stroke = '#bbb';
      if (onPath) { fill = 'var(--blue-bg)'; stroke = 'var(--blue)'; }
      if (isTarget) { stroke = 'var(--amber)'; }
      if (isCurrent) { fill = 'var(--warning-bg)'; stroke = 'var(--warning)'; }
      if (ev && ev.decision === 'found' && ev.val === node.val) { fill = 'var(--success-bg)'; stroke = 'var(--success)'; }
      svg += `<circle cx="${node.x}" cy="${node.y}" r="20" fill="${fill}" stroke="${stroke}" stroke-width="3"/>`;
      svg += `<text x="${node.x}" y="${node.y}" font-size="15" text-anchor="middle" dy="5" font-family="monospace">${node.val}</text>`;
    });
    svg += `</svg>`;
    svgEl.innerHTML = svg;
    let text = `Bấm "Bước tiếp theo" để bắt đầu (tìm LCA(${p}, ${q})).`;
    if (ev) {
      if (ev.decision === 'left') text = `Tại node ${ev.val}: cả ${p} và ${q} đều nhỏ hơn → đi trái.`;
      else if (ev.decision === 'right') text = `Tại node ${ev.val}: cả ${p} và ${q} đều lớn hơn → đi phải.`;
      else text = `Tại node ${ev.val}: ${p} nhỏ hơn, ${q} lớn hơn (hoặc bằng) → ĐÂY LÀ ĐIỂM RẼ NHÁNH → LCA = ${ev.val}`;
    }
    caption.textContent = text;
  });
})();


}
