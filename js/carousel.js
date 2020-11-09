var Carousel = (function () {
  var $items;
  var position;
  var maxPosition;

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

  function init() {
    var $content = $("[rel=js-carousel] > [rel=js-content]");
    var $left = $("[rel=js-carousel] > [rel=js-controls] > [rel=js-left]");
    var $right = $("[rel=js-carousel] > [rel=js-controls] > [rel=js-right]");

    $items = $content.children("[rel=js-items]");

    var contentWidth = $content.width();
    var itemsWidth = $items.width();

    position = 0;
    maxPosition = itemsWidth - contentWidth;

    $left.on("click", scrollLeft);
    $right.on("click", scrollRight);
  }

  return {
    init: init,
  };
})();

$(Carousel.init);
