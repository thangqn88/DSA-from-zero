import { makeStepper } from '../utils/stepper.js';

export function initQuayLuiXauNhiPhanWidgets() {


// ============================================================
// DAY 1: Binary string backtracking (array + call-stack folder + tree)
// ============================================================
(function() {
  const n = 3;
  const events = [];
  function build(path) {
    events.push({type: 'enter', path});
    if (path.length === n) events.push({type: 'leaf', path});
    else { build(path + '0'); build(path + '1'); }
    events.push({type: 'exit', path});
  }
  build('');

  const arrayView = document.getElementById('d1ArrayView');
  const callStackView = document.getElementById('d1CallStackView');
  const svgContainer = document.getElementById('d1TreeSvg');
  const caption = document.getElementById('d1Caption');
  const resultsEl = document.getElementById('d1Results');

  const W = 700, H = 320, topMargin = 30, vSpacing = 85;
  function nodePos(path) {
    const d = path.length;
    const index = path === '' ? 0 : parseInt(path, 2);
    const denom = Math.pow(2, d);
    return { x: (index + 0.5) / denom * W, y: topMargin + d * vSpacing };
  }
  const allPaths = [];
  (function collect(path) {
    allPaths.push(path);
    if (path.length < n) { collect(path + '0'); collect(path + '1'); }
  })('');

  function renderArray(ev) {
    const path = ev ? ev.path : '';
    const justSetIdx = ev && (ev.type === 'enter' || ev.type === 'leaf') ? path.length - 1 : -1;
    arrayView.innerHTML = '';
    for (let i = 0; i < n; i++) {
      const has = i < path.length;
      const isJustSet = i === justSetIdx;
      let bg = 'var(--card-bg)', border = 'var(--border)';
      if (has) { bg = isJustSet ? 'var(--warning-bg)' : 'var(--success-bg)'; border = isJustSet ? 'var(--warning)' : 'var(--success)'; }
      const box = document.createElement('div');
      box.style.cssText = `width:54px;height:60px;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:8px;border:2px solid ${border};background:${bg};`;
      box.innerHTML = `<div style="font-size:0.68rem;color:#888;font-family:monospace;">a[${i}]</div><div style="font-size:1.25rem;font-family:monospace;">${has ? path[i] : '·'}</div>`;
      arrayView.appendChild(box);
    }
  }

  function renderCallStack(ev) {
    const path = ev ? ev.path : '';
    const depth = path.length;
    const isClosing = ev && ev.type === 'exit';
    let html = '';
    for (let level = 0; level <= depth; level++) {
      const indent = level * 22;
      const isCurrent = level === depth;
      const label = level === n ? `backtrack(${level}) — đủ ${n} bit` : `backtrack(${level})`;
      const assignment = level > 0 ? ` &nbsp;<span style="color:#888;">— vừa gán a[${level - 1}] = ${path[level - 1]}</span>` : '';
      let borderColor = 'var(--border)', bg = 'transparent';
      if (isCurrent) { borderColor = isClosing ? '#bbb' : 'var(--warning)'; bg = isClosing ? 'var(--card-bg)' : 'var(--warning-bg)'; }
      const icon = (isCurrent && isClosing) ? '📂' : '📁';
      html += `<div style="margin-left:${indent}px; padding:5px 10px; border-left:3px solid ${borderColor}; background:${bg}; border-radius:0 6px 6px 0; margin-bottom:2px;">${icon} ${label}${assignment}${isCurrent && isClosing ? ' <span style="color:#999;">— sắp quay lui</span>' : ''}</div>`;
    }
    callStackView.innerHTML = html;
  }

  function renderTree(idx) {
    const entered = new Set(), exited = new Set(), leafDone = new Set();
    let currentPath = null;
    const results = [];
    for (let i = 0; i <= idx; i++) {
      const e = events[i];
      if (e.type === 'enter') { entered.add(e.path); currentPath = e.path; }
      if (e.type === 'exit') { exited.add(e.path); if (i === idx) currentPath = e.path; }
      if (e.type === 'leaf') { leafDone.add(e.path); results.push(e.path); if (i === idx) currentPath = e.path; }
    }
    let svg = `<svg width="100%" height="${H}" viewBox="0 0 ${W} ${H}">`;
    allPaths.forEach(path => {
      if (path.length === 0 || !entered.has(path)) return;
      const parent = path.slice(0, -1);
      const p1 = nodePos(parent), p2 = nodePos(path);
      const bit = path[path.length - 1];
      svg += `<line x1="${p1.x}" y1="${p1.y+14}" x2="${p2.x}" y2="${p2.y-14}" stroke="#999" stroke-width="1.5" />`;
      const mx = (p1.x + p2.x) / 2, my = (p1.y + p2.y) / 2;
      svg += `<text x="${mx}" y="${my}" font-size="11" fill="#888" text-anchor="middle" dy="-4">${bit}</text>`;
    });
    allPaths.forEach(path => {
      if (!entered.has(path)) return;
      const pos = nodePos(path);
      let fill = '#eee', stroke = '#bbb', textColor = '#555';
      if (leafDone.has(path)) { fill = 'var(--success-bg)'; stroke = 'var(--success)'; textColor = '#0d5c43'; }
      if (path === currentPath && !exited.has(path)) { fill = 'var(--warning-bg)'; stroke = 'var(--warning)'; textColor = '#7a5510'; }
      const label = path === '' ? '∅' : path;
      svg += `<circle cx="${pos.x}" cy="${pos.y}" r="16" fill="${fill}" stroke="${stroke}" stroke-width="2" />`;
      svg += `<text x="${pos.x}" y="${pos.y}" font-size="11" font-family="monospace" fill="${textColor}" text-anchor="middle" dy="4">${label}</text>`;
    });
    svg += `</svg>`;
    svgContainer.innerHTML = svg;
    return results;
  }

  makeStepper('d1', events, (ev, idx) => {
    renderArray(ev);
    renderCallStack(ev);
    const results = renderTree(idx);
    let text = 'Bấm "Bước tiếp theo" để bắt đầu.';
    if (ev) {
      if (ev.type === 'enter') text = ev.path === '' ? 'Bắt đầu: backtrack(0), mảng a[] chưa có giá trị nào.' : `a[${ev.path.length - 1}] = ${ev.path[ev.path.length - 1]} — vừa gán xong (ô vàng), giờ gọi backtrack(${ev.path.length}).`;
      else if (ev.type === 'leaf') text = `Đủ 3 bit → mảng a[] = [${ev.path.split('').join(', ')}] → in kết quả: "${ev.path}"`;
      else if (ev.type === 'exit') text = ev.path === '' ? 'Đã xét hết cây — hoàn thành!' : `Đã thử hết nhánh con của "${ev.path}" → quay lui về node cha.`;
    }
    caption.textContent = text;
    resultsEl.textContent = results.join(', ');
  });
})();



// ============================================================
// DAY 1: N-Queens backtracking, n=4
// ============================================================
(function() {
  const n = 4;
  const events = [];
  const path = [];

  function backtrack(row) {
    if (row === n) { events.push({type:'solution', path: path.slice()}); return; }
    for (let c = 0; c < n; c++) {
      events.push({type:'try', row, c, path: path.slice()});
      let valid = true, conflictRow = -1;
      for (let r = 0; r < row; r++) {
        if (path[r] === c || Math.abs(path[r]-c) === Math.abs(r-row)) { valid = false; conflictRow = r; break; }
      }
      if (!valid) { events.push({type:'invalid', row, c, conflictRow, path: path.slice()}); continue; }
      path.push(c);
      events.push({type:'place', row, c, path: path.slice()});
      backtrack(row + 1);
      path.pop();
    }
    events.push({type:'backtrack', row, path: path.slice()});
  }
  backtrack(0);

  const boardEl = document.getElementById('d1NqBoard');
  const caption = document.getElementById('d1NqCaption');
  const foundEl = document.getElementById('d1NqFound');

  function renderBoard(cols, highlight) {
    let html = '<div style="display:grid; grid-template-columns: repeat(' + n + ', 46px); gap:2px;">';
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        let bg = '#fff', border = 'var(--border)', content = '';
        if (cols[r] === c) { content = '♛'; bg = 'var(--success-bg)'; border = 'var(--success)'; }
        if (highlight && highlight.row === r && highlight.c === c) {
          border = highlight.ok ? 'var(--success)' : 'var(--danger, #d33)';
          bg = highlight.ok ? 'var(--success-bg)' : '#fdecea';
          if (!highlight.ok) content = '✕';
        }
        html += `<div style="width:46px;height:46px;display:flex;align-items:center;justify-content:center;border:2px solid ${border};background:${bg};font-size:1.3rem;">${content}</div>`;
      }
    }
    html += '</div>';
    boardEl.innerHTML = html;
  }

  let solutionsFound = 0;
  makeStepper('d1Nq', events, (ev, idx) => {
    if (idx < 0) { renderBoard([]); caption.textContent = 'Bấm "Bước tiếp theo" để bắt đầu.'; foundEl.textContent = '0'; return; }
    solutionsFound = events.slice(0, idx + 1).filter(e => e.type === 'solution').length;
    foundEl.textContent = solutionsFound;

    if (ev.type === 'try') {
      renderBoard(ev.path, {row: ev.row, c: ev.c, ok: true, pending: true});
      caption.textContent = `Hàng ${ev.row}: thử đặt quân hậu vào cột ${ev.c}...`;
    } else if (ev.type === 'invalid') {
      renderBoard(ev.path, {row: ev.row, c: ev.c, ok: false});
      caption.textContent = `Xung đột! Cột ${ev.c} ở hàng ${ev.row} bị quân hậu ở hàng ${ev.conflictRow} ăn (cùng cột hoặc cùng đường chéo) → thử cột khác.`;
    } else if (ev.type === 'place') {
      renderBoard(ev.path);
      caption.textContent = `Hợp lệ! Đặt quân hậu vào (hàng ${ev.row}, cột ${ev.c}), đi tiếp xuống hàng ${ev.row + 1}.`;
    } else if (ev.type === 'solution') {
      renderBoard(ev.path);
      caption.textContent = `🎉 Đủ ${n} hàng, không xung đột — tìm được 1 lời giải: (${ev.path.join(', ')}).`;
    } else if (ev.type === 'backtrack') {
      renderBoard(ev.path);
      caption.textContent = ev.row === 0
        ? `Đã thử hết cột ở hàng 0 — kết thúc thuật toán.`
        : `Đã thử hết mọi cột ở hàng ${ev.row} — lùi về hàng ${ev.row - 1} để thử cột khác.`;
    }
  });
})();


}
