import { makeStepper } from '../utils/stepper.js';

export function initToHopWidgets() {


// ============================================================
// DAY 2: Combination stepper + Permutation stepper
// ============================================================
(function() {
  const n = 4, k = 2;
  const events = [];
  const chosen = [];
  function backtrack(start, count) {
    events.push({type: 'enter', start, count, chosen: chosen.slice(0, count)});
    if (count === k) {
      events.push({type: 'result', chosen: chosen.slice()});
    } else {
      for (let v = start; v <= n; v++) {
        chosen[count] = v;
        events.push({type: 'try', start, count, v, chosen: chosen.slice(0, count + 1)});
        backtrack(v + 1, count + 1);
      }
    }
    events.push({type: 'exit', start, count, chosen: chosen.slice(0, count)});
  }
  backtrack(1, 0);

  const arrayView = document.getElementById('d2CombArrayView');
  const callStackView = document.getElementById('d2CombCallStackView');
  const caption = document.getElementById('d2CombCaption');
  const resultsEl = document.getElementById('d2CombResults');

  function renderCallStack(idx) {
    // Rebuild the current live call-stack of (start,count) frames up to idx
    const stack = [];
    let closingTop = false;
    for (let i = 0; i <= idx; i++) {
      const e = events[i];
      if (e.type === 'enter') { stack.push({start: e.start, count: e.count}); closingTop = false; }
      else if (e.type === 'exit') { if (i === idx) closingTop = true; else stack.pop(); }
    }
    let html = '';
    stack.forEach((frame, level) => {
      const indent = level * 22;
      const isTop = level === stack.length - 1;
      let borderColor = 'var(--border)', bg = 'transparent';
      if (isTop) { borderColor = closingTop ? '#bbb' : 'var(--warning)'; bg = closingTop ? 'var(--card-bg)' : 'var(--warning-bg)'; }
      const icon = (isTop && closingTop) ? '📂' : '📁';
      const doneNote = (isTop && closingTop) ? ' <span style="color:#999;">— đã thử hết v, sắp quay lui</span>' : '';
      html += `<div style="margin-left:${indent}px; padding:5px 10px; border-left:3px solid ${borderColor}; background:${bg}; border-radius:0 6px 6px 0; margin-bottom:2px;">${icon} backtrack(start=${frame.start}, count=${frame.count})${doneNote}</div>`;
    });
    callStackView.innerHTML = html;
  }

  makeStepper('d2Comb', events, (ev, idx) => {
    const chosenNow = (ev && ev.chosen) ? ev.chosen : [];
    arrayView.innerHTML = '';
    for (let i = 0; i < k; i++) {
      const has = i < chosenNow.length;
      const isJustSet = ev && ev.type === 'try' && i === ev.count;
      const box = document.createElement('div');
      let border = has ? 'var(--success)' : 'var(--border)', bg = has ? 'var(--success-bg)' : 'var(--card-bg)';
      if (isJustSet) { border = 'var(--warning)'; bg = 'var(--warning-bg)'; }
      box.style.cssText = `width:56px;height:56px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;font-family:monospace;border-radius:8px;border:2px solid ${border};background:${bg};`;
      box.textContent = has ? chosenNow[i] : '';
      arrayView.appendChild(box);
    }
    renderCallStack(idx);
    const results = events.filter((e,i) => i <= idx && e.type === 'result').map(e => e.chosen.join(','));
    let text = 'Bấm "Bước tiếp theo" để bắt đầu.';
    if (ev) {
      if (ev.type === 'enter') text = `Gọi backtrack(start=${ev.start}, count=${ev.count}) — vào lời gọi mới.`;
      else if (ev.type === 'try') text = `Trong backtrack(start=${ev.start}, count=${ev.count}): thử v=${ev.v} → chosen[${ev.count}] = ${ev.v}, rồi gọi backtrack(${ev.v + 1}, ${ev.count + 1}).`;
      else if (ev.type === 'result') text = `Đủ ${k} phần tử → in kết quả: (${ev.chosen.join(', ')})`;
      else if (ev.type === 'exit') text = `backtrack(start=${ev.start}, count=${ev.count}) đã thử hết v → quay lui về lời gọi cha.`;
    }
    caption.textContent = text;
    resultsEl.textContent = results.join('  ');
  });
})();


}
