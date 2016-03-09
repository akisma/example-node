/* FACILITY VIEW */

define(
  [
    'app',
    'generics/generic-page-view',
    'jquery',
    'vendor/jquery-ui/tabs'
  ],
  function(app, gpV, $){
    var view,
        viewClass;

    viewClass = gpV.extend({
      events: {
        'click #trainers-list tr':    'listItemClick',
        'click #clients-list tr':     'listItemClick'
      },

      render: function(){
        gpV.prototype.render.call(this);

        
        $('.profile-info .tabs').tabs();
        $('.facility-tabs').tabs();
      },

      templates: {
        main: "#template-facility-view"
      },

      listItemClick: function(e){
        var href = $(e.target).attr('data-href'),
            type = ($(e.target).parents('.js-clients-list').length > 0) ? 'client' : 'trainer';

        if (typeof(href) == 'undefined'){
          href = $(e.target).parent('tr').attr('data-href');
        }

        app.router.navigate('/app/' + type + '/' + href, { trigger: true });
      }
    });

    view = new viewClass();

  
    return {
      view: view,
      name: 'facility-view'
    };
  }
);