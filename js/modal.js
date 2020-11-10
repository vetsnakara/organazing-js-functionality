(function (global) {
  var $modal;
  var $body;
  var $title;

  /**
   * init
   */
  function init() {
    $modal = $("[data-content='modal']");
    $body = $("[data-content='body']");
    $title = $("[data-content='title']");

    $modal.on("click", function (event) {
      var $target = $(event.target);
      var action = $target.closest("[data-action]").data("action");

      if (!action) return;

      if (action === "close") {
        hide();
      }
    });

    global.Modal = {
      show: show,
    };
  }

  /**
   * show
   */
  function show(options) {
    $title.html(options.title);
    $body.html(options.body);
    $modal.show();
  }

  /**
   * hide
   */
  function hide() {
    $modal.hide();
  }

  EVT.on("init", init);
})(window);
