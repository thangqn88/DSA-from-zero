// ============================================================
// GENERIC STEPPER ENGINE — reused by every widget below.
// Naming convention: prefix+'Prev', prefix+'Next', prefix+'Reset',
// prefix+'StepNum', prefix+'StepTotal' must exist in the HTML.
// ============================================================
export function makeStepper(prefix, events, renderFn) {
  let idx = -1;
  const stepNumEl = document.getElementById(prefix + 'StepNum');
  const stepTotalEl = document.getElementById(prefix + 'StepTotal');
  if (stepTotalEl) stepTotalEl.textContent = events.length;
  function update() {
    renderFn(idx >= 0 ? events[idx] : null, idx, events);
    if (stepNumEl) stepNumEl.textContent = Math.max(idx + 1, 0);
  }
  const nextBtn = document.getElementById(prefix + 'Next');
  const prevBtn = document.getElementById(prefix + 'Prev');
  const resetBtn = document.getElementById(prefix + 'Reset');
  if (nextBtn) nextBtn.onclick = () => { if (idx < events.length - 1) { idx++; update(); } };
  if (prevBtn) prevBtn.onclick = () => { if (idx > -1) { idx--; update(); } };
  if (resetBtn) resetBtn.onclick = () => { idx = -1; update(); };
  update();
  return {
    getIdx: () => idx,
    jumpTo: (i) => { idx = i; update(); },
    rebuild: (newEvents, newRenderFn) => {
      events = newEvents; renderFn = newRenderFn || renderFn; idx = -1;
      if (stepTotalEl) stepTotalEl.textContent = events.length;
      update();
    }
  };
}
