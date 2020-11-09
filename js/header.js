var Header = (function () {
  var $modal;

  function handleLinkClick(event) {
    event.preventDefault();

    var href = $(event.target).attr("href");

    $.ajax(href, { dataType: "text" }).then(function (content) {
      $modal.html(content).show();
    });
  }

  function init() {
    $modal = $('[rel="js-modal"]');

    $('[rel="js-header"] > [rel="js-controls"]').on(
      "click",
      '[rel*="js-"]',
      handleLinkClick
    );
  }

  EVT.on("init", init);
})();
