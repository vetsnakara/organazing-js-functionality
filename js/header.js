$(function () {
  var $modal = $('[rel="js-modal"]');

  $('[rel="js-header"] > [rel="js-controls"]').on(
    "click",
    '[rel*="js-"]',
    function (event) {
      event.preventDefault();

      var $link = $(event.target);

      var href = $link.attr("href");

      $.ajax(href, { dataType: "text" }).then(function (content) {
        $modal.html(content).show();
      });
    }
  );
});
