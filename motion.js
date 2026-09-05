/* Smooth document scrolling. Lenis 1.3.26 is vendored under assets/vendor (MIT). */
function wggMotion(hook, vm) {
  var scroller = null;
  var routeFrame = 0;
  var clickedHash = null;
  var pageAnimation = null;
  var lastWheelDirection = 0;
  var originalResetEvents = vm.$resetEvents;

  function cancelMomentum() {
    lastWheelDirection = 0;
    if (scroller && scroller.isScrolling === 'smooth') {
      scroller.stop();
      scroller.start();
    }
  }

  function initializeMotion() {
    if (typeof Lenis === 'undefined') return;

    scroller = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      anchors: false,
      respectReducedMotion: false,
      prevent: function(node) {
        var nativeScroll = node.matches('.sidebar, .outline-nav, input, textarea, select, [contenteditable="true"]');
        if (nativeScroll) cancelMomentum();
        return nativeScroll;
      },
      virtualScroll: function(data) {
        var event = data.event;
        if (event.ctrlKey || event.metaKey || event.shiftKey || Math.abs(data.deltaX) > Math.abs(data.deltaY)) {
          cancelMomentum();
          return false;
        }
        // Reverse immediately when the user reverses the wheel.
        if (event.type === 'wheel' && data.deltaY) {
          var direction = Math.sign(data.deltaY);
          if (lastWheelDirection && direction !== lastWheelDirection) cancelMomentum();
          lastWheelDirection = direction;
        }
      }
    });
  }

  function scrollToHeading(heading, immediate) {
    var margin = parseFloat(getComputedStyle(heading).scrollMarginTop) || 0;
    var top = Math.max(0, heading.getBoundingClientRect().top + window.scrollY - margin);
    if (scroller) {
      scroller.scrollTo(top, { duration: 0.85, lerp: 0, immediate: immediate });
    } else {
      window.scrollTo({ top: top, behavior: 'instant' });
    }
  }

  // Docsify's default anchor tween would compete with wheel smoothing. Keep its
  // navigation bookkeeping, then position the page after our layout is ready.
  vm.$resetEvents = function(source) {
    originalResetEvents.call(vm, 'history');
    cancelMomentum();
    cancelAnimationFrame(routeFrame);
    var routeHash = location.hash || '#/';
    var fromLink = clickedHash === routeHash;
    clickedHash = null;
    if (source === 'history' && !fromLink) return;
    var id = vm.route.query.id;
    var navigate = source === 'navigate' || fromLink;
    routeFrame = requestAnimationFrame(function() {
      if (routeHash !== (location.hash || '#/')) return;
      if (scroller) scroller.resize();
      var heading = id && document.getElementById(id);
      if (heading) scrollToHeading(heading, !navigate);
      else if (navigate) {
        if (scroller) scroller.scrollTo(0, { immediate: true });
        else window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });
  };

  document.addEventListener('click', function(event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var link = event.target.closest('a[href]');
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
    var url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash.startsWith('#/')) return;
    cancelMomentum();
    clickedHash = url.hash;
    if (url.hash === location.hash) {
      event.preventDefault();
      event.stopPropagation();
      vm.$resetEvents('navigate');
    }
  }, true);

  window.addEventListener('hashchange', cancelMomentum);
  window.addEventListener('popstate', cancelMomentum);
  window.addEventListener('pointerdown', cancelMomentum, { passive: true });
  window.addEventListener('touchstart', cancelMomentum, { passive: true });
  window.addEventListener('keydown', cancelMomentum, true);
  document.addEventListener('focusin', cancelMomentum);

  hook.doneEach(function() {
    var article = document.querySelector('.markdown-section');
    if (article && article.animate) {
      if (pageAnimation) pageAnimation.cancel();
      pageAnimation = article.animate([{ opacity: 0.65 }, { opacity: 1 }], {
        duration: 280,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
      });
    }
  });

  initializeMotion();
}
