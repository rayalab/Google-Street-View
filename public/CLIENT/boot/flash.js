angular.module("flashMessage", [])
.factory("$flash", function() {
  return {
    setMessage: function(message) {
      Materialize.toast(message, 4000);
    }
  };
});