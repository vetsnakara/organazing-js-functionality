(function () {
  var $header;

  /**
   *
   */
  function init() {
    $header = $("[data-content='header']");

    $header.on("click", "[data-content='nav-link']", function (event) {
      event.preventDefault();
      var href = $(event.target).attr("href");

      $.ajax(href, { dataContent: "text" }).then(function (content) {
        Modal.show({
          title: "",
          body: content,
        });
      });
    });
  }

  EVT.on("init", init);
})();
