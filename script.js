const root = document.documentElement;
const targetList = document.getElementById("targetList");
const targetRows = [...document.querySelectorAll(".target-row")];
const selectedCount = document.getElementById("selectedCount");
const callButton = document.getElementById("callButton");
const callScreen = document.getElementById("callScreen");
const closeCall = document.getElementById("closeCall");
const callVideo = document.getElementById("callVideo");
const videoFallback = document.getElementById("videoFallback");
const selectedTargets = new Set();
let dragging = false;
let dragMode = "select";

function updateOrientationState() {
  root.classList.toggle("is-landscape", window.innerWidth > window.innerHeight);
}

function updateTarget(row, shouldSelect) {
  const id = row.dataset.target;
  if (shouldSelect) selectedTargets.add(id);
  else selectedTargets.delete(id);

  const selected = selectedTargets.has(id);
  row.classList.toggle("is-selected", selected);
  row.querySelector(".target-state").textContent = selected ? "ready" : "locked";
  selectedCount.textContent = selectedTargets.size === targetRows.length ? "READY" : "";
  callButton.disabled = selectedTargets.size !== targetRows.length;
}

function rowFromPoint(event) {
  const pointer = event.touches?.[0] ?? event;
  const element = document.elementFromPoint(pointer.clientX, pointer.clientY);
  return element?.closest?.(".target-row");
}

targetRows.forEach((row) => {
  row.addEventListener("click", () => {
    updateTarget(row, !selectedTargets.has(row.dataset.target));
  });
});

targetList.addEventListener("pointerdown", (event) => {
  const row = rowFromPoint(event);
  if (!row) return;
  dragging = true;
  dragMode = selectedTargets.has(row.dataset.target) ? "deselect" : "select";
  targetList.setPointerCapture?.(event.pointerId);
  updateTarget(row, dragMode === "select");
});

targetList.addEventListener("pointermove", (event) => {
  if (!dragging) return;
  const row = rowFromPoint(event);
  if (row) updateTarget(row, dragMode === "select");
});

targetList.addEventListener("pointerup", () => { dragging = false; });
targetList.addEventListener("pointercancel", () => { dragging = false; });

async function lockOrientation(mode) {
  try {
    if (screen.orientation?.lock) await screen.orientation.lock(mode);
  } catch {}
}

callButton.addEventListener("click", async () => {
  if (callButton.disabled) return;
  callScreen.hidden = false;
  await lockOrientation("portrait");
  try {
    await callVideo.play();
    videoFallback.style.display = "none";
  } catch {
    videoFallback.style.display = "grid";
  }
});

closeCall.addEventListener("click", () => {
  callVideo.pause();
  callVideo.currentTime = 0;
  callScreen.hidden = true;
  try { screen.orientation?.unlock?.(); } catch {}
  updateOrientationState();
});

callVideo.addEventListener("error", () => {
  videoFallback.style.display = "grid";
});

window.addEventListener("resize", updateOrientationState);
window.addEventListener("orientationchange", updateOrientationState);
updateOrientationState();

