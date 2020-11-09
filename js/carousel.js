var Carousel = (function () {
  var $items, $content;
  var position, maxPosition;

  function scrollLeft(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.stopImmediatePropagation();

    if (position > 0) {
      position = Math.max(0, position - 250);
    }

    $items.css({ left: -position + "px" });
  }

  function scrollRight(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.stopImmediatePropagation();

    if (position < maxPosition) {
      position = Math.min(maxPosition, position + 250);
    }

    $items.css({ left: -position + "px" });
  }

  function loadProfile(event) {
    var $item = $(event.target);
    var id = $item.attr("rel").replace(/^.*(\d+)$/, "$1");

    Details.loadProfile(id);
  }

  function initScroll() {
    var $left = $("[rel=js-carousel] > [rel=js-controls] > [rel=js-left]");
    var $right = $("[rel=js-carousel] > [rel=js-controls] > [rel=js-right]");

    var contentWidth = $content.width();
    var itemsWidth = $items.width();

    position = 0;
    maxPosition = itemsWidth - contentWidth;

    $left.on("click", scrollLeft);
    $right.on("click", scrollRight);
  }

  function initLoadProfile() {
    $content.on("click", '[rel^="js-"]', loadProfile);
  }

  function init() {
    $content = $("[rel=js-carousel] > [rel=js-content]");
    $items = $content.children("[rel=js-items]");

    initScroll();
    initLoadProfile();
  }

  return {
    init: init,
  };
})();
