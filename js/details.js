var Details = (function () {
  var $content;
  var currentId = null;

  function loadProfile(id) {
    if (id < 0 || id > 5) return;

    currentId = Number(id);

    $.ajax("details/" + id + ".html", { dataType: "text" }).then(function (
      content
    ) {
      $content.html(content);
    });
  }

  function init() {
    $content = $("[rel=js-details]");

    $content.on("click", "[data-content='nav'] > a", function (event) {
      event.preventDefault();

      var action = $(event.target).data("action");

      switch (action) {
        case "prev":
          EVT.emit("select-prev");
          EVT.emit("profile-selected", currentId - 1);
          break;
        case "next":
          EVT.emit("select-next");
          EVT.emit("profile-selected", currentId + 1);
          break;
      }
    });
  }

  EVT.on("init", init);
  EVT.on("profile-selected", loadProfile);

  return {
    loadProfile: loadProfile,
  };
})();
