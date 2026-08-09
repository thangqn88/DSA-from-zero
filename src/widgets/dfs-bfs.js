import { makeStepper } from '../utils/stepper.js';

export function initDfsBfsWidgets() {

// ============================================================
// DAY 10: BFS/DFS graph stepper with mode toggle
// ============================================================
(function() {
  // Đồ thị mẫu G (giống hệt phần "Thuật ngữ cơ bản"): 6 đỉnh, 9 cạnh, đánh số 1..6
  const nodes = [{id:1,x:300,y:30},{id:2,x:450,y:70},{id:3,x:150,y:70},{id:4,x:450,y:170},{id:5,x:150,y:170},{id:6,x:300,y:210}];
  const adj = {1:[2,3], 2:[4,5,1,3], 3:[1,4,2], 4:[2,3,6,5], 5:[2,6,4], 6:[4,5]};
  const edgeList = [[1,2],[1,3],[2,3],[2,4],[2,5],[3,4],[4,5],[4,6],[5,6]];
  const START = 1;

  function genDFS() {
    const visited = {};
    const events = [];
    function dfs(u) {
      visited[u] = true;
      events.push({type:'visit', node:u});
      for (const v of adj[u]) if (!visited[v]) dfs(v);
    }
    dfs(START);
    return events;
  }
  function genBFS() {
    const visited = {};
    const queue = [START]; visited[START] = true;
    const events = [{type:'enqueue', node:START, queue: queue.slice()}];
    while (queue.length) {
      const u = queue.shift();
      events.push({type:'visit', node:u, queue: queue.slice()});
      for (const v of adj[u]) {
        if (!visited[v]) { visited[v] = true; queue.push(v); events.push({type:'enqueue', node:v, queue: queue.slice()}); }
      }
    }
    return events;
  }

  const svgEl = document.getElementById('d10GraphSvg');
  const structEl = document.getElementById('d10Structure');
  const caption = document.getElementById('d10Caption');
  const orderEl = document.getElementById('d10Order');
  const nodeById = {};
  nodes.forEach(n => { nodeById[n.id] = n; });
  let mode = 'dfs';
  let stepper;

  function render(ev, idx, events) {
    const visitedNodes = events.slice(0, idx+1).filter(e => e.type==='visit').map(e => e.node);
    let svg = `<svg width="100%" height="240" viewBox="0 0 600 240">`;
    edgeList.forEach(([a,b]) => {
      const n1 = nodeById[a], n2 = nodeById[b];
      svg += `<line x1="${n1.x}" y1="${n1.y}" x2="${n2.x}" y2="${n2.y}" stroke="#ccc" stroke-width="2" />`;
    });
    nodes.forEach(n => {
      const isVisited = visitedNodes.includes(n.id);
      const isCurrent = ev && ev.node === n.id;
      let fill = '#eee', stroke = '#bbb';
      if (isVisited) { fill = 'var(--success-bg)'; stroke = 'var(--success)'; }
      if (isCurrent) { fill = 'var(--warning-bg)'; stroke = 'var(--warning)'; }
      svg += `<circle cx="${n.x}" cy="${n.y}" r="22" fill="${fill}" stroke="${stroke}" stroke-width="2.5" />`;
      svg += `<text x="${n.x}" y="${n.y}" font-size="16" text-anchor="middle" dy="6" font-family="monospace">${n.id}</text>`;
    });
    svg += `</svg>`;
    svgEl.innerHTML = svg;

    structEl.textContent = mode === 'bfs' ? (ev && ev.queue ? '[' + ev.queue.join(', ') + ']' : '[]') : (visitedNodes.length ? visitedNodes.join(' → ') : '');

    let text = 'Bấm "Bước tiếp theo" để bắt đầu.';
    if (ev) {
      if (mode === 'dfs') text = `Thăm đỉnh ${ev.node} — quét List[${ev.node}] theo đúng thứ tự, gặp đỉnh chưa thăm đầu tiên thì đệ quy (Push) ngay vào đó.`;
      else text = ev.type === 'enqueue' ? `Đỉnh ${ev.node} chưa thăm → đưa vào cuối hàng đợi, chờ tới lượt.` : `Lấy đỉnh ${ev.node} ra khỏi đầu hàng đợi, thăm nó, rồi quét List[${ev.node}] để tìm đỉnh mới cho vào hàng đợi.`;
    }
    caption.textContent = text;
    orderEl.textContent = visitedNodes.join(' → ');
  }

  stepper = makeStepper('d10', genDFS(), render);

  document.getElementById('d10ModeDfs').onclick = function() {
    mode = 'dfs';
    this.style.background = 'var(--navy)'; this.style.color = 'white';
    document.getElementById('d10ModeBfs').style.background = ''; document.getElementById('d10ModeBfs').style.color = '';
    stepper.rebuild(genDFS(), render);
  };
  document.getElementById('d10ModeBfs').onclick = function() {
    mode = 'bfs';
    this.style.background = 'var(--navy)'; this.style.color = 'white';
    document.getElementById('d10ModeDfs').style.background = ''; document.getElementById('d10ModeDfs').style.color = '';
    stepper.rebuild(genBFS(), render);
  };
})();


}
