(function () {
  const SCROLL_RANGE = 400;
  const SCROLL_THRESHOLD = 80;
  const experience = document.getElementById('scroll-experience');

  function updateScrolled() {
    const scrollY = window.scrollY;
    const progress = Math.min(1, scrollY / SCROLL_RANGE);
    if (experience) {
      experience.style.setProperty('--scroll-progress', progress);
      experience.classList.toggle('scrolled', scrollY > SCROLL_THRESHOLD);
    }
    document.body.classList.toggle('scrolled', scrollY > SCROLL_THRESHOLD);
    document.body.classList.toggle('dark', scrollY > SCROLL_THRESHOLD);
  }
  window.addEventListener('scroll', updateScrolled, { passive: true });
  updateScrolled();

  var TARGET_DATE = new Date(2026, 8, 22, 0, 0, 0, 0);
  function formatCountdown() {
    var now = new Date();
    var diff = TARGET_DATE.getTime() - now.getTime();
    if (diff <= 0) return '00:00:00';
    var h = Math.floor(diff / (1000 * 60 * 60));
    var rest = diff % (1000 * 60 * 60);
    var m = Math.floor(rest / (1000 * 60));
    rest = rest % (1000 * 60);
    var s = Math.floor(rest / 1000);
    var pad = function (n) { return String(n).padStart(2, '0'); };
    return pad(h) + ':' + pad(m) + ':' + pad(s);
  }
  const clockEl = document.getElementById('clock');
  if (clockEl) {
    function tick() {
      clockEl.textContent = formatCountdown();
    }
    tick();
    setInterval(tick, 1000);
  }

  var svg = document.getElementById('mascot-svg');
  var pupilLeft = document.getElementById('pupil-left');
  var pupilRight = document.getElementById('pupil-right');
  var maxMove = 3.2;
  function movePupils(e) {
    if (!svg || !pupilLeft || !pupilRight) return;
    var rect = svg.getBoundingClientRect();
    var svgX = ((e.clientX - rect.left) / rect.width) * 100;
    var svgY = ((e.clientY - rect.top) / rect.height) * 105;
    var eyeL = { x: 35, y: 30 };
    var eyeR = { x: 65, y: 30 };
    function clampPupil(eyeX, eyeY) {
      var dx = svgX - eyeX, dy = svgY - eyeY;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > maxMove && dist > 0) {
        dx = (dx / dist) * maxMove;
        dy = (dy / dist) * maxMove;
      }
      return [dx, dy];
    }
    var rL = clampPupil(eyeL.x, eyeL.y);
    var rR = clampPupil(eyeR.x, eyeR.y);
    pupilLeft.setAttribute('transform', 'translate(' + rL[0] + ', ' + rL[1] + ')');
    pupilRight.setAttribute('transform', 'translate(' + rR[0] + ', ' + rR[1] + ')');
  }
  document.addEventListener('mousemove', movePupils);
})();
