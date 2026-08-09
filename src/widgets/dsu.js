import { makeStepper } from '../utils/stepper.js';

export function initDsuWidgets() {

// ============================================================
// DAY 11: DSU visual stepper
// ============================================================
(function() {
  const parent = [0, 1, 2, 3, 4];
  function find(x) { if (parent[x] === x) return x; return parent[x] = find(parent[x]); }
  function union(x, y) { const rx = find(x), ry = find(y); if (rx === ry) return false; parent[rx] = ry; return true; }

  const ops = [['makeSet'], ['union', 0, 1], ['union', 2, 3], ['union', 1, 3]];
  const events = [];
  ops.forEach(op => {
    if (op[0] === 'makeSet') {
      events.push({op: 'makeSet', parent: parent.slice()});
    } else {
      union(op[1], op[2]);
      events.push({op: 'union', x: op[1], y: op[2], parent: parent.slice()});
    }
  });

  const view = document.getElementById('d11DsuView');
  const caption = document.getElementById('d11DsuCaption');
  const colors = ['#E74C3C','#3498DB','#2ECC71','#9B59B6','#F39C12'];

  makeStepper('d11Dsu', events, (ev) => {
    const p = ev ? ev.parent : [0,1,2,3,4];
    // find root (without mutating) for coloring
    function rootOf(x) { let cur = x; while (p[cur] !== cur) cur = p[cur]; return cur; }
    view.innerHTML = p.map((par, i) => {
      const root = rootOf(i);
      return `<div style="display:flex; flex-direction:column; align-items:center;">
        <div style="width:50px;height:50px;display:flex;align-items:center;justify-content:center;border-radius:50%;border:3px solid ${colors[root]};background:white;font-family:monospace;font-weight:600;">${i}</div>
        <div style="font-size:0.7rem;color:#888;margin-top:2px;">parent=${par}</div>
      </div>`;
    }).join('');
    let text = 'Bấm "Bước tiếp theo" để bắt đầu.';
    if (ev) {
      if (ev.op === 'makeSet') text = 'Make-Set(5): mỗi đỉnh tự là 1 nhóm riêng (parent[i]=i).';
      else text = `Union(${ev.x}, ${ev.y}): gộp 2 nhóm — parent[find(${ev.x})] = find(${ev.y}).`;
    }
    caption.textContent = text;
  });
})();


}
