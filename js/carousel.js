(function () {
  var $carousel;
  var $content;
  var $controls;
  var $prevBtn;
  var $nextBtn;
  var $slides;

  var $slideCurrent;
  var $slidePrev;
  var $slideNext;

  /**
   * init
   */
  function init() {
    $carousel = $("[data-content='carousel']");

    $content = $("[data-content='content']", $carousel);
    $slides = $("[data-content='item']", $carousel);
    $controls = $("[data-content='controls']", $carousel);

    $prevBtn = $("[data-content='prev']", $controls);
    $nextBtn = $("[data-content='next']", $controls);

    $slideCurrent = $slides.first();
    $slidePrev = $slideCurrent.prev();
    $slideNext = $slideCurrent.next();

    setButtonsState();

    $controls.on("click", handleScroll);
    $content.on("click", handleSelect);

    EVT.on("slide:select-prev", function () {
      $prevBtn.click();
      $slideCurrent.click();
    });

    EVT.on("slide:select-next", function () {
      $nextBtn.click();
      $slideCurrent.click();
    });
  }

  /**
   * handleSelect
   */
  function handleSelect(event) {
    var index = $(event.target).closest("[data-content='item']").index();
    EVT.emit("slide:selected", index);
  }

  /**
   * handleScroll
   */
  function handleScroll(event) {
    var $target = $(event.target);
    var action = $target.data("action");

    if (!action) return;

    var pos = getTranslateValues($content);

    if (action === "prev" && !exists($slidePrev)) return;
    if (action === "next" && !exists($slideNext)) return;

    switch (action) {
      case "prev":
        $slides.removeClass("active");
        $slidePrev.addClass("active");
        pos.x += $slidePrev.width();
        break;
      case "next":
        $slides.removeClass("active");
        $slideNext.addClass("active");
        pos.x -= $slideNext.width();
        break;
      default:
        throw new Error("Unrecognized action: " + action);
    }

    setTranslateValues($content, pos);

    $slideCurrent = $(".active", $content);
    $slidePrev = $slideCurrent.prev();
    $slideNext = $slideCurrent.next();

    setButtonsState();
  }

  /**
   * setButtonState
   */
  function setButtonsState() {
    setDisabled($prevBtn, !exists($slidePrev));
    setDisabled($nextBtn, !exists($slideNext));
  }

  /**
   * exists
   */
  function exists($el) {
    return !!$el.length;
  }

  /**
   * setDisabled
   */
  function setDisabled($el, condition) {
    if (condition) {
      $el.attr("disabled", true);
    } else {
      $el.removeAttr("disabled");
    }
  }

  /**
   * setTranslateValues
   */
  function setTranslateValues($el, pos) {
    var value = "translate(" + pos.x + "px, " + pos.y + "px)";
    $el.css("transform", value);
  }

  /**
   * getTranslsateValues
   */
  function getTranslateValues($el) {
    var transformMatrix = $el.css("transform");
    var matrix = transformMatrix.replace(/[^0-9\-.,]/g, "").split(",");

    var x = Number(matrix[4]); //translate x
    var y = Number(matrix[5]); //translate y

    return {
      x: x,
      y: y,
    };
  }

  EVT.on("init", init);
})();
