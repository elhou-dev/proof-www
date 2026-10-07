/* Language of the legal pages (CGU, legal notice, privacy policy).
   Each page carries its French and English copy side by side, marked with `lang`; legal.css hides the
   one that does not match <html lang>. The choice is the landing page's (same `proof-lang` key), so it
   carries over from page to page. Loaded in <head>, so the page is drawn in the right language from
   the first paint. */
(function () {
  var KEY = 'proof-lang';
  var root = document.documentElement;

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; /* storage unavailable */ }
  }

  function apply(lang) {
    root.lang = lang;
    var title = root.getAttribute('data-title-' + lang);
    if (title) document.title = title;
    var buttons = document.querySelectorAll('[data-lang]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-lang') === lang));
    }
  }

  var saved = read();
  apply(saved || (navigator.language && navigator.language.toLowerCase().indexOf('fr') !== 0 ? 'en' : 'fr'));

  document.addEventListener('DOMContentLoaded', function () {
    apply(root.lang);
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
    var buttons = document.querySelectorAll('[data-lang]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        var lang = this.getAttribute('data-lang');
        apply(lang);
        try { localStorage.setItem(KEY, lang); } catch (e) { /* storage unavailable: the choice lasts for this page */ }
      });
    }
  });
})();
