import { makeStepper } from '../utils/stepper.js';

export function initCayNhiPhanBstWidgets() {

// ============================================================
// DAY 13: Tree traversal stepper with mode toggle (NLR/LNR/LRN)
// ============================================================
(function() {
  const tree = {
    val: 5, x: 300, y: 30,
    left: { val: 3, x: 180, y: 110,
      left: { val: 1, x: 120, y: 190 },
      right: { val: 4, x: 240, y: 190 } },
    right: { val: 8, x: 420, y: 110,
      right: { val: 9, x: 480, y: 190 } }
  };

  function genNLR(node, events) { if (!node) return; events.push({val: node.val, x: node.x, y: node.y}); genNLR(node.left, events); genNLR(node.right, events); }
  function genLNR(node, events) { if (!node) return; genLNR(node.left, events); events.push({val: node.val, x: node.x, y: node.y}); genLNR(node.right, events); }
  function genLRN(node, events) { if (!node) return; genLRN(node.left, events); genLRN(node.right, events); events.push({val: node.val, x: node.x, y: node.y}); }

  const edges = [
    [tree, tree.left], [tree, tree.right],
    [tree.left, tree.left.left], [tree.left, tree.left.right],
    [tree.right, tree.right.right]
  ];
  const allNodes = [tree, tree.left, tree.right, tree.left.left, tree.left.right, tree.right.right];

  const svgEl = document.getElementById('d13TreeSvg');
  const caption = document.getElementById('d13Caption');
  const orderEl = document.getElementById('d13Order');
  let mode = 'nlr';
  let stepper;

  function render(ev, idx, events) {
    const visited = events.slice(0, idx + 1).map(e => e.val);
    let svg = `<svg width="100%" height="220" viewBox="0 0 600 220">`;
    edges.forEach(([a, b]) => {
      svg += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="#ccc" stroke-width="2"/>`;
    });
    allNodes.forEach(node => {
      const isVisited = visited.includes(node.val);
      const isCurrent = ev && ev.val === node.val;
      let fill = '#eee', stroke = '#bbb';
      if (isVisited) { fill = 'var(--success-bg)'; stroke = 'var(--success)'; }
      if (isCurrent) { fill = 'var(--warning-bg)'; stroke = 'var(--warning)'; }
      svg += `<circle cx="${node.x}" cy="${node.y}" r="20" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/>`;
      svg += `<text x="${node.x}" y="${node.y}" font-size="15" text-anchor="middle" dy="5" font-family="monospace">${node.val}</text>`;
    });
    svg += `</svg>`;
    svgEl.innerHTML = svg;
    const modeNames = {nlr:'NLR (Gốc-Trái-Phải)', lnr:'LNR (Trái-Gốc-Phải)', lrn:'LRN (Trái-Phải-Gốc)'};
    let text = `Bấm "Bước tiếp theo" để bắt đầu (${modeNames[mode]}).`;
    if (ev) text = `Thăm node ${ev.val}.`;
    caption.textContent = text;
    orderEl.textContent = visited.join(', ');
  }

  function genEvents() {
    const events = [];
    if (mode === 'nlr') genNLR(tree, events);
    else if (mode === 'lnr') genLNR(tree, events);
    else genLRN(tree, events);
    return events;
  }

  stepper = makeStepper('d13', genEvents(), render);

  function setActive(activeId) {
    ['d13ModeNlr','d13ModeLnr','d13ModeLrn'].forEach(id => {
      const btn = document.getElementById(id);
      if (id === activeId) { btn.style.background = 'var(--navy)'; btn.style.color = 'white'; }
      else { btn.style.background = ''; btn.style.color = ''; }
    });
  }
  document.getElementById('d13ModeNlr').onclick = function() { mode='nlr'; setActive('d13ModeNlr'); stepper.rebuild(genEvents(), render); };
  document.getElementById('d13ModeLnr').onclick = function() { mode='lnr'; setActive('d13ModeLnr'); stepper.rebuild(genEvents(), render); };
  document.getElementById('d13ModeLrn').onclick = function() { mode='lrn'; setActive('d13ModeLrn'); stepper.rebuild(genEvents(), render); };
})();


}
