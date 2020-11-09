var Details = (function () {
  var $content;

  function loadProfile(event) {
    var $item = $(event.target);
    var id = $item.attr("rel").replace(/^.*(\d+)$/, "$1");

    $.ajax("details/" + id + ".html", { dataType: "text" }).then(function (
      content
    ) {
      $content.html(content);
    });
  }

  function init() {
    var $carousel = $("[rel=js-carousel] > [rel=js-content]");
    $content = $("[rel=js-details]");

    $carousel.on("click", '[rel^="js-"]', loadProfile);
  }

  return {
    init: init,
  };
})();

$(Details.init);
