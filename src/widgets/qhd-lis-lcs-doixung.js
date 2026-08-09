import { makeStepper } from '../utils/stepper.js';

export function initQhdLisLcsDoixungWidgets() {

// ============================================================
// DAY 7: 0/1 Knapsack grid + Subset Sum grid
// ============================================================
(function() {
  const weight = [2, 3, 4], value = [3, 4, 5], n = 3, W = 5;
  const dp = [];
  for (let i = 0; i <= n; i++) dp.push(new Array(W+1).fill(null));
  for (let j = 0; j <= W; j++) dp[0][j] = 0;
  const events = [{i:0, j:-1, dp: dp.map(r=>r.slice()), note:'Base case: hàng i=0 (chưa xét vật nào) toàn bộ = 0'}];
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= W; j++) {
      const notTake = dp[i-1][j];
      let val = notTake, took = false;
      if (weight[i-1] <= j) {
        const takeVal = value[i-1] + dp[i-1][j-weight[i-1]];
        if (takeVal > notTake) { val = takeVal; took = true; }
      }
      dp[i][j] = val;
      events.push({i, j, val, took, notTake, weight: weight[i-1], value: value[i-1], depJ: j-weight[i-1], canTake: weight[i-1] <= j, dp: dp.map(r=>r.slice())});
    }
  }

  const tableEl = document.getElementById('d7KnapTable');
  const caption = document.getElementById('d7KnapCaption');

  function render(ev) {
    const dpNow = ev ? ev.dp : dp.map(r => r.map(()=>null));
    let html = '<table class="formula-table" style="text-align:center; margin:0 auto;"><tr><th></th>';
    for (let j = 0; j <= W; j++) html += `<th>j=${j}</th>`;
    html += '</tr>';
    for (let i = 0; i <= n; i++) {
      html += `<tr><th>i=${i}${i>0 ? ` (w=${weight[i-1]},v=${value[i-1]})` : ''}</th>`;
      for (let j = 0; j <= W; j++) {
        const val = dpNow[i][j];
        let bg = 'white';
        if (ev && ev.i === i && ev.j === j) bg = 'var(--warning-bg)';
        else if (ev && ev.i > 0 && i === ev.i - 1 && (j === ev.j || j === ev.depJ)) bg = 'var(--blue-bg)';
        html += `<td style="background:${bg};">${val === null ? '' : val}</td>`;
      }
      html += '</tr>';
    }
    html += '</table>';
    tableEl.innerHTML = html;
    let text = 'Bấm "Bước tiếp theo" để bắt đầu.';
    if (ev) {
      if (ev.j === -1) text = ev.note;
      else if (!ev.canTake) text = `dp[${ev.i}][${ev.j}]: vật nặng ${ev.weight} > ${ev.j} → không lấy được → dp[${ev.i}][${ev.j}] = dp[${ev.i-1}][${ev.j}] = ${ev.val}`;
      else text = `dp[${ev.i}][${ev.j}]: không lấy = ${ev.notTake}; lấy = ${ev.value}+dp[${ev.i-1}][${ev.depJ}] = ${ev.value+dp[ev.i-1][ev.depJ]}. Chọn max = ${ev.val}${ev.took ? ' (lấy vật)' : ' (không lấy)'}`;
    }
    caption.textContent = text;
  }
  makeStepper('d7Knap', events, render);
})();


}
