module.exports = (function() {

  var CheckinView = Backbone.View.extend({

    tagName: 'li',

    className: 'list-group-item',

    template: _.template(
      "<h4><%= venue.name %></h4>"+
      "<%= venue.location.city %>, <%= venue.location.country %>"
    ),

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