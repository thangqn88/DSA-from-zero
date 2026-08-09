import { makeStepper } from '../utils/stepper.js';

export function initThamLamWidgets() {

// ============================================================
// DAY 4: Activity Selection timeline + Coin change stepper
// ============================================================
(function() {
  const activities = [
    {name:'A', start:1, finish:2}, {name:'B', start:3, finish:4}, {name:'C', start:0, finish:6},
    {name:'D', start:5, finish:7}, {name:'E', start:8, finish:9}, {name:'F', start:5, finish:9}
  ];
  const sorted = activities.slice().sort((a,b) => a.finish - b.finish);
  const events = [];
  let lastFinish = -Infinity;
  sorted.forEach((act) => {
    if (act.start >= lastFinish) {
      events.push({type:'pick', act, lastFinishBefore: lastFinish});
      lastFinish = act.finish;
    } else {
      events.push({type:'reject', act, lastFinish});
    }
  });

  const timelineEl = document.getElementById('d4Timeline');
  const caption = document.getElementById('d4Caption');
  const pickedEl = document.getElementById('d4Picked');
  const maxTime = 11, scale = 56;

  makeStepper('d4', events, (ev, idx) => {
    const decided = events.slice(0, idx + 1);
    let html = '';
    sorted.forEach(act => {
      const decision = decided.find(e => e.act === act);
      let bg = 'var(--card-bg)', border = 'var(--border)';
      if (decision) {
        if (decision.type === 'pick') { bg = 'var(--success-bg)'; border = 'var(--success)'; }
        else { bg = 'var(--danger-bg)'; border = 'var(--danger)'; }
      }
      if (ev && ev.act === act) { border = 'var(--warning)'; }
      html += `<div style="display:flex; align-items:center; margin-bottom:4px; height:28px;">
        <div style="width:24px; font-family:monospace; font-size:0.8rem; color:#888;">${act.name}</div>
        <div style="position:relative; flex:1; height:22px; background:#fafafa;">
          <div style="position:absolute; left:${act.start*scale}px; width:${(act.finish-act.start)*scale}px; height:22px; background:${bg}; border:2px solid ${border}; border-radius:4px; font-size:0.7rem; display:flex; align-items:center; justify-content:center; color:#444;">${act.start}-${act.finish}</div>
        </div>
      </div>`;
    });
    timelineEl.innerHTML = `<div style="max-width:${maxTime*scale+40}px; margin:0 auto;">${html}</div>`;

    const picked = decided.filter(e => e.type === 'pick').map(e => e.act.name);
    let text = 'Bấm "Bước tiếp theo" để bắt đầu (đã sắp theo giờ kết thúc: A,B,C,D,E,F).';
    if (ev) {
      if (ev.type === 'pick') text = `Chọn ${ev.act.name} (${ev.act.start}-${ev.act.finish}) — không chồng giờ. lastFinish = ${ev.act.finish}`;
      else text = `${ev.act.name} bắt đầu lúc ${ev.act.start} < ${ev.lastFinish} (giờ kết thúc hoạt động vừa chọn) → chồng giờ, bỏ qua.`;
    }
    caption.textContent = text;
    pickedEl.textContent = picked.join(', ');
  });
})();



(function() {
  const coins = [25, 10, 5, 1];
  let amount = 41;
  const events = [];
  coins.forEach(c => {
    const count = Math.floor(amount / c);
    if (count > 0) {
      events.push({coin: c, count, before: amount, after: amount % c});
      amount = amount % c;
    }
  });

  const view = document.getElementById('d4CoinView');
  const caption = document.getElementById('d4CoinCaption');

  makeStepper('d4Coin', events, (ev, idx) => {
    const done = events.slice(0, idx + 1);
    let total = 0;
    let rows = done.map(e => { total += e.count; return `Lấy ${e.count} đồng ${e.coin}đ &nbsp;→&nbsp; còn lại ${e.after}đ`; });
    view.innerHTML = rows.map(r => `<div style="margin-bottom:4px;">${r}</div>`).join('') +
      `<div style="margin-top:0.8rem; font-weight:600; color:var(--amber);">Tổng số đồng đã dùng: ${total}</div>`;
    let text = 'Bấm "Bước tiếp theo" để bắt đầu (đổi 41đ với hệ {25,10,5,1}).';
    if (ev) text = `Thử đồng ${ev.coin}đ: ${ev.before} / ${ev.coin} = ${ev.count} → lấy ${ev.count} đồng, còn dư ${ev.after}đ.`;
    caption.textContent = text;
  });
})();



(function() {
  let heap = [4, 3, 2, 6].slice().sort((a,b) => a-b);
  const events = [];
  let total = 0;
  events.push({heap: heap.slice(), total, merged: null});
  while (heap.length > 1) {
    const a = heap.shift(), b = heap.shift();
    const cost = a + b;
    total += cost;
    heap.push(cost);
    heap.sort((x,y) => x-y);
    events.push({heap: heap.slice(), total, merged: {a, b, cost}});
  }

  const view = document.getElementById('d3RopeView');
  const caption = document.getElementById('d3RopeCaption');
  const totalEl = document.getElementById('d3RopeTotal');

  makeStepper('d3Rope', events, (ev) => {
    const heapNow = ev ? ev.heap : [4,3,2,6].sort((a,b)=>a-b);
    view.innerHTML = `<div style="display:flex; gap:8px; justify-content:center;">${heapNow.map(v => `<div style="width:50px;height:50px;display:flex;align-items:center;justify-content:center;border:2px solid var(--border);border-radius:8px;font-family:monospace;background:var(--card-bg);">${v}</div>`).join('')}</div>`;
    let text = 'Bấm "Bước tiếp theo" để bắt đầu (min-heap của {4,3,2,6}).';
    if (ev && ev.merged) text = `Lấy 2 đoạn nhỏ nhất ${ev.merged.a} và ${ev.merged.b} → nối, chi phí +${ev.merged.cost} → đưa đoạn mới ${ev.merged.cost} trở lại heap.`;
    caption.textContent = text;
    totalEl.textContent = ev ? ev.total : 0;
  });
})();


}
