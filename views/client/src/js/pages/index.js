define(
  [
    'app',
    'generics/generic-page-view',
    'jquery'
  ],
  function(app, gpV, $){
    var view,
        viewClass;

    //TODO: We need to analyze auth status here and show the right view accordingly. 
    //after rethinking my logic the other day (always have the entry page show the riv),
    //I'm now thinking we need to perform some logic here to redirect to the correct route:
    // - if user is logged in: /dashboard
    // - if user is logged out: /login - which encompasses signup, because we can't know what they want ahead of time

    viewClass = gpV.extend({
      render: function(){
        gpV.prototype.render.call(this);

        
        
      },

      templates: {
        main: "#template-index"
      }
    });

    view = new viewClass();

  
    return {
      view: view,
      name: 'index'
    };
  }
);