/* TRAINER VIEW */

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
        'click #clients-list tr':     'listItemClick'
      },

      render: function(){
        gpV.prototype.render.call(this);

        $('.profile-info .tabs').tabs();
        
      },

      templates: {
        main: "#template-trainer-view"
      },

      listItemClick: function(e){
        var href = $(e.target).attr('data-href');

        if (typeof(href) == 'undefined'){
          href = $(e.target).parent('tr').attr('data-href');
        }

        app.router.navigate('/app/client/' + href, { trigger: true });
      }
    });

    view = new viewClass();

  
    return {
      view: view,
      name: 'trainer-view'
    };
  }
);