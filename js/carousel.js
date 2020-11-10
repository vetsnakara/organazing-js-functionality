var Carousel = (function () {
  var $items, $content;
  var $left, $right;
  var position, maxPosition;

  function scrollLeft(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.stopImmediatePropagation();

    if (position > 0) {
      position = Math.max(0, position - 135);
    }

    $items.css({ left: -position + "px" });
  }

  function scrollRight(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.stopImmediatePropagation();

    if (position < maxPosition) {
      position = Math.min(maxPosition, position + 135);
    }

    $items.css({ left: -position + "px" });
  }

  function handleItemSelect(event) {
    var $item = $(event.target);
    var id = $item.attr("rel").replace(/^.*(\d+)$/, "$1");

    EVT.emit("profile-selected", id);
  }

  function initScroll() {
    $left = $("[rel=js-carousel] > [rel=js-controls] > [rel=js-left]");
    $right = $("[rel=js-carousel] > [rel=js-controls] > [rel=js-right]");

    var contentWidth = $content.width();
    var itemsWidth = $items.width();

    position = 0;
    maxPosition = itemsWidth - contentWidth;

    $left.on("click", scrollLeft);
    $right.on("click", scrollRight);
  }

  function initItemSelect() {
    $content.on("click", '[rel^="js-"]', handleItemSelect);
  }

  function highlightItem(id) {
    $items.children().removeClass("active");
    $("[rel='js-item-" + id + "']", $content).addClass("active");
  }

  function init() {
    $content = $("[rel=js-carousel] > [rel=js-content]");
    $items = $content.children("[rel=js-items]");

    initScroll();
    initItemSelect();
  }

  EVT.on("init", init);

  EVT.on("profile-selected", highlightItem);

  EVT.on("select-prev", function () {
    $left.trigger("click");
  });

  EVT.on("select-next", function () {
    $right.trigger("click");
  });
})();
