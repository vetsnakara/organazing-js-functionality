$(function () {
  var $carousel = $("[rel=js-carousel] > [rel=js-content]");
  var $content = $("[rel=js-details]");

  $carousel.on("click", '[rel^="js-"]', function (event) {
    var $item = $(event.target);
    var rel = $item.attr("rel");
    var id = rel.replace(/^.*(\d+)$/, "$1");

    $.ajax("details/" + id + ".html", { dataType: "text" }).then(function (
      content
    ) {
      $content.html(content);
    });
  });
});
