var Details = (function () {
  var $content;

  function loadProfile(id) {
    $.ajax("details/" + id + ".html", { dataType: "text" }).then(function (
      content
    ) {
      $content.html(content);
    });
  }

  function init() {
    $content = $("[rel=js-details]");
  }

  return {
    init: init,
    loadProfile: loadProfile,
  };
})();
