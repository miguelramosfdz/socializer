module.exports = (function() {

  var CheckinView = Backbone.View.extend({

    template: _.template([
      "<li class='list-group-item'>",
        "<div class='row'>",
          "<div class='col-md-offset-3 col-md-6'>",
            "<%= venue.name %> in <%= venue.location.city %>, <%= venue.location.country %>",
          "</div>",
        "</div>",
      "</li>"
    ].join('')),

    render: function() {
      return this.template(this.model.toJSON());
    }

  });

  return CheckinView;

})();