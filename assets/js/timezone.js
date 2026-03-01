// =============================
// Configuration
// =============================

const DEFAULT_TZ = document.documentElement.dataset.siteTimezone || "UTC";
const STORAGE_KEY = "preferred_timezone";

// =============================
// Timezone state
// =============================

function getTimezone() {
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_TZ;
}

function setTimezone(tz) {
  localStorage.setItem(STORAGE_KEY, tz);
  renderAllTimes();
}

// =============================
// Formatting
// =============================

function formatTime(iso, tz) {
  const date = new Date(iso);

  if (isNaN(date)) {
    console.warn("Invalid datetime:", iso);
    return iso;
  }

  const formatted = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(date);

  return `${formatted} (${tz})`;
}

// =============================
// Rendering engine
// =============================

function renderAllTimes() {
  const tz = getTimezone();

  document.querySelectorAll(".tz-date").forEach(el => {
    el.textContent = formatTime(el.dateTime, tz);
  });
}

// =============================
// Populate timezone list
// =============================

function populateTimezoneSelector(select) {
  if (!("supportedValuesOf" in Intl)) {
    console.warn("Timezone list not supported in this browser.");
    return;
  }

  const zones = Intl.supportedValuesOf("timeZone");

  // Sort alphabetically
  zones.sort();

  zones.forEach(tz => {
    const option = document.createElement("option");
    option.value = tz;
    option.textContent = tz;
    select.appendChild(option);
  });
}

// =============================
// Dropdown wiring
// =============================

function setupTimezoneSelector() {
  const select = document.getElementById("tz-select");
  if (!select) return;

  populateTimezoneSelector(select);

  const tz = getTimezone();
  select.value = tz;

  select.addEventListener("change", () => {
    setTimezone(select.value);
  });
}

// =============================
// Init
// =============================

document.addEventListener("DOMContentLoaded", () => {
  setupTimezoneSelector();
  renderAllTimes();
});