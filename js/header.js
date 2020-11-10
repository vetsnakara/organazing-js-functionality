var Header = (function () {
  var $modal;

  function closeModal() {
    $modal.hide();
  }

  function handleLinkClick(event) {
    event.preventDefault();

    closeModal();

    var href = $(event.target).attr("href");

    $.ajax(href, { dataType: "text" }).then(function (content) {
      var $closeBtn = $("<button type='button'>close</button>");
      $closeBtn.on("click", closeModal);

      $modal.empty().append($closeBtn).append(content).show();
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
