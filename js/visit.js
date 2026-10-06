(function () {
  if (location.hostname !== "babuyababuya.github.io") return;
  var ns = "pipenk7m2q9x4b";
  function dayKey(d) {
    var shifted = new Date(d.getTime() + 8 * 60 * 60 * 1000);
    var month = String(shifted.getUTCMonth() + 1).padStart(2, "0");
    var day = String(shifted.getUTCDate()).padStart(2, "0");
    return shifted.getUTCFullYear() + "-" + month + "-" + day;
  }
  var day = dayKey(new Date());
  var mark = "pip-visit-" + day;
  try {
    if (localStorage.getItem(mark)) return;
  } catch (e) { /* keep counting if storage is blocked */ }
  var lang = (navigator.language || "en").toLowerCase();
  var bucket = lang.indexOf("zh") === 0 ? "zh" : "other";
  fetch("https://abacus.jasoncameron.dev/hit/" + ns + "/" + bucket + "-" + day, { cache: "no-store" })
    .then(function (res) {
      if (!res.ok) return;
      try { localStorage.setItem(mark, "1"); } catch (e) {}
    })
    .catch(function () {});
})();
