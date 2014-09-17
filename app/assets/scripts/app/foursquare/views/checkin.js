module.exports = (function() {

  var CheckinView = Backbone.View.extend({

    tagName: 'li',

    className: 'list-group-item',

    template: _.template([
      "<div class='row'>",
        "<div class='col-md-offset-3 col-md-6'>",
          "<%= venue.name %> in <%= venue.location.city %>, <%= venue.location.country %>",
        "</div>",
      "</div>"
    ].join('')),

    initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
    },

    render: function() {
      this.el.dataset.id = this.model.get("id");
      $(this.el).html(this.template(this.model.toJSON()));
      return this.el;
    }

  });

  return CheckinView;

})();