import { makeStepper } from '../utils/stepper.js';

export function initQhdNenTangWidgets() {

// ============================================================
// DAY 6: Fibonacci filler + Kadane stepper
// ============================================================
(function() {
  const N = 10;
  const dp = new Array(N+1).fill(null);
  const events = [];
  dp[0] = 0; events.push({i:0, val:0, dp: dp.slice()});
  dp[1] = 1; events.push({i:1, val:1, dp: dp.slice()});
  for (let i = 2; i <= N; i++) {
    dp[i] = dp[i-1] + dp[i-2];
    events.push({i, val: dp[i], dp: dp.slice(), from: [i-1, i-2]});
  }

  const view = document.getElementById('d6FibView');
  const caption = document.getElementById('d6FibCaption');

  makeStepper('d6Fib', events, (ev) => {
    const dpNow = ev ? ev.dp : new Array(N+1).fill(null);
    let html = '';
    for (let i = 0; i <= N; i++) {
      const has = dpNow[i] !== null && dpNow[i] !== undefined;
      const isCurrent = ev && ev.i === i;
      let bg = 'var(--card-bg)', border = 'var(--border)';
      if (has) { bg = isCurrent ? 'var(--warning-bg)' : 'var(--success-bg)'; border = isCurrent ? 'var(--warning)' : 'var(--success)'; }
      html += `<div style="width:56px;height:56px;display:flex;flex-direction:column;align-items:center;justify-content:center;border:2px solid ${border};background:${bg};border-radius:8px;">
        <div style="font-size:0.65rem;color:#888;font-family:monospace;">dp[${i}]</div>
        <div style="font-family:monospace;font-size:1.05rem;">${has ? dpNow[i] : ''}</div>
      </div>`;
    }
    view.innerHTML = html;
    let text = 'Bấm "Bước tiếp theo" để bắt đầu.';
    if (ev) {
      if (ev.from) text = `dp[${ev.i}] = dp[${ev.from[0]}] + dp[${ev.from[1]}] = ${ev.dp[ev.from[0]]} + ${ev.dp[ev.from[1]]} = ${ev.val}`;
      else text = `Base case: dp[${ev.i}] = ${ev.val}`;
    }
    caption.textContent = text;
  });
})();


}
