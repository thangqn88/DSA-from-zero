import { makeStepper } from '../utils/stepper.js';

export function initNganXepHangDoiWidgets() {

// ============================================================
// DAY 9: Balanced parens + Postfix eval + Next Greater Element + Queue
// ============================================================
(function() {
  const input = "([)]";
  const events = [];
  const stack = [];
  let failed = false;
  for (let i = 0; i < input.length && !failed; i++) {
    const c = input[i];
    if ('([{'.includes(c)) {
      stack.push(c);
      events.push({i, c, action:'push', stack: stack.slice()});
    } else {
      if (stack.length === 0) { events.push({i,c,action:'fail-empty', stack: stack.slice()}); failed=true; break; }
      const top = stack.pop();
      const pairs = {')':'(', ']':'[', '}':'{'};
      const match = pairs[c] === top;
      events.push({i, c, action: match ? 'pop-match' : 'pop-mismatch', top, stack: stack.slice()});
      if (!match) failed = true;
    }
  }
  events.push({type:'final', result: !failed && stack.length === 0});

  const inputEl = document.getElementById('d9BalInput');
  const stackEl = document.getElementById('d9BalStack');
  const caption = document.getElementById('d9BalCaption');

  makeStepper('d9Bal', events, (ev, idx) => {
    const upto = ev && ev.i !== undefined ? ev.i : (ev && ev.type==='final' ? input.length-1 : -1);
    inputEl.innerHTML = input.split('').map((c,i) => `<span style="padding:2px 4px; ${i===upto ? 'background:var(--warning-bg); border-radius:4px;' : ''}">${c}</span>`).join('');
    const stackNow = ev && ev.stack ? ev.stack : (ev && ev.type==='final' ? stack : []);
    stackEl.innerHTML = (ev && ev.stack ? ev.stack : []).map(c => `<div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:var(--card-bg);border:1px solid var(--border);border-radius:4px;font-family:monospace;">${c}</div>`).join('');
    let text = 'Bấm "Bước tiếp theo" để bắt đầu.';
    if (ev) {
      if (ev.action === 'push') text = `Gặp dấu mở '${ev.c}' → push vào ngăn xếp.`;
      else if (ev.action === 'pop-match') text = `Gặp dấu đóng '${ev.c}' → pop ra '${ev.top}' → khớp cặp ✓`;
      else if (ev.action === 'pop-mismatch') text = `Gặp dấu đóng '${ev.c}' → pop ra '${ev.top}' → KHÔNG khớp cặp ✗ → dừng ngay, kết quả: KHÔNG cân xứng.`;
      else if (ev.action === 'fail-empty') text = `Gặp dấu đóng '${ev.c}' nhưng ngăn xếp rỗng → KHÔNG cân xứng.`;
      else if (ev.type === 'final') text = `Kết quả: ${ev.result ? 'CÂN XỨNG ✓' : 'KHÔNG CÂN XỨNG ✗'}`;
    }
    caption.textContent = text;
  });
})();



(function() {
  const tokens = ['3','4','2','*','+'];
  const events = [];
  const stack = [];
  tokens.forEach(t => {
    if ('+-*/'.includes(t)) {
      const b = stack.pop(), a = stack.pop();
      let r;
      if (t === '+') r = a + b; else if (t === '-') r = a - b; else if (t === '*') r = a * b; else r = a / b;
      stack.push(r);
      events.push({t, action:'op', a, b, r, stack: stack.slice()});
    } else {
      stack.push(parseInt(t));
      events.push({t, action:'push', stack: stack.slice()});
    }
  });

  const inputEl = document.getElementById('d9PostInput');
  const stackEl = document.getElementById('d9PostStack');
  const caption = document.getElementById('d9PostCaption');

  makeStepper('d9Post', events, (ev) => {
    const curIdx = ev ? events.indexOf(ev) : -1;
    inputEl.innerHTML = tokens.map((t,i) => `<span style="padding:2px 6px; ${i===curIdx ? 'background:var(--warning-bg); border-radius:4px;' : ''}">${t}</span>`).join(' ');
    stackEl.innerHTML = (ev ? ev.stack : []).map(v => `<div style="min-width:32px;height:32px;padding:0 6px;display:flex;align-items:center;justify-content:center;background:var(--card-bg);border:1px solid var(--border);border-radius:4px;font-family:monospace;">${v}</div>`).join('');
    let text = 'Bấm "Bước tiếp theo" để bắt đầu.';
    if (ev) {
      if (ev.action === 'push') text = `Gặp số ${ev.t} → push vào ngăn xếp.`;
      else text = `Gặp toán tử '${ev.t}' → pop ${ev.b}, pop ${ev.a} → tính ${ev.a}${ev.t}${ev.b} = ${ev.r} → push kết quả.`;
    }
    caption.textContent = text;
  });
})();



(function() {
  const a = [4, 5, 2, 10, 8];
  const n = a.length;
  const result = new Array(n).fill(-1);
  const stack = [];
  const events = [];
  for (let i = n - 1; i >= 0; i--) {
    const popped = [];
    while (stack.length && stack[stack.length-1] <= a[i]) popped.push(stack.pop());
    if (stack.length) result[i] = stack[stack.length-1];
    stack.push(a[i]);
    events.push({i, val: a[i], popped, result: result[i], stack: stack.slice()});
  }

  const arrView = document.getElementById('d9NgeArr');
  const stackView = document.getElementById('d9NgeStack');
  const caption = document.getElementById('d9NgeCaption');

  makeStepper('d9Nge', events, (ev) => {
    const doneIdx = ev ? ev.i : n;
    arrView.innerHTML = a.map((v,i) => {
      const has = i >= doneIdx;
      const isCurrent = ev && ev.i === i;
      let bg='var(--card-bg)', border='var(--border)';
      if (isCurrent) { bg='var(--warning-bg)'; border='var(--warning)'; }
      else if (has) { bg='var(--success-bg)'; border='var(--success)'; }
      const r = has ? events.find(e=>e.i===i).result : null;
      return `<div style="display:flex;flex-direction:column;align-items:center;">
        <div style="width:46px;height:46px;display:flex;align-items:center;justify-content:center;border:2px solid ${border};background:${bg};border-radius:6px;font-family:monospace;">${v}</div>
        <div style="font-size:0.65rem;color:#888;">${has ? 'NGE='+r : ''}</div>
      </div>`;
    }).join('');
    stackView.textContent = ev ? ev.stack.join(', ') : '';
    let text = 'Bấm "Bước tiếp theo" để bắt đầu (duyệt phải sang trái).';
    if (ev) {
      let t = `Xét a[${ev.i}]=${ev.val}: `;
      if (ev.popped.length) t += `loại bỏ ${ev.popped.join(', ')} khỏi ngăn xếp (≤ ${ev.val}); `;
      t += ev.result !== -1 ? `đáp án = ${ev.result} (đỉnh ngăn xếp).` : `ngăn xếp rỗng → đáp án = -1.`;
      text = t;
    }
    caption.textContent = text;
  });
})();



(function() {
  const events = [];
  let q = [];
  [10, 20, 30].forEach(v => { q = q.concat([v]); events.push({action:'enqueue', v, q: q.slice()}); });
  { const removed = q.shift(); events.push({action:'dequeue', removed, q: q.slice()}); }
  { q = q.concat([40]); events.push({action:'enqueue', v:40, q: q.slice()}); }

  const view = document.getElementById('d9QueueView');
  const caption = document.getElementById('d9QueueCaption');

  makeStepper('d9Queue', events, (ev) => {
    const qNow = ev ? ev.q : [];
    view.innerHTML = qNow.map((v,i) => `<div style="width:48px;height:48px;display:flex;flex-direction:column;align-items:center;justify-content:center;border:2px solid var(--success);background:var(--success-bg);border-radius:6px;font-family:monospace;">
      <div>${v}</div>${i===0 ? '<div style="font-size:0.6rem;color:#888;">front</div>' : (i===qNow.length-1 ? '<div style="font-size:0.6rem;color:#888;">rear</div>' : '')}
    </div>`).join('');
    let text = 'Bấm "Bước tiếp theo" để bắt đầu.';
    if (ev) text = ev.action === 'enqueue' ? `enqueue(${ev.v}) — thêm vào cuối (rear).` : `dequeue() — lấy ${ev.removed} ra khỏi đầu (front).`;
    caption.textContent = text;
  });
})();


}
