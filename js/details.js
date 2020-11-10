(function () {
  var $details;

  /**
   * init
   */
  function init() {
    $details = $("[data-content='details']");

    $details.on("click", "[data-content='control']", handleProfileChange);

    EVT.on("slide:selected", loadDetails);
  }

  /**
   * handleProfileChange
   */
  function handleProfileChange(event) {
    var action = $(event.target).data("action");
    EVT.emit("slide:select-" + action);
  }

  function loadDetails(index) {
    var url = "/details/" + index + ".html";

    $.ajax(url, { dataType: "text" }).then(function (content) {
      $details.html(content);
    });
  }

  EVT.on("init", init);
})();
