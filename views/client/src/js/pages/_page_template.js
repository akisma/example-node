/* NOT AN ACTIVE MODULE, COPY THIS FILE TO START A NEW PAGE */

define(
  [
    'app',
    'generics/generic-page-view',
    'jquery'
  ],
  function(app, gpV, $){
    var view,
        viewClass;

    viewClass = gpV.extend({
      render: function(){
        gpV.prototype.render.call(this);

        
        
      },

      templates: {
        main: "#template-name" //RENAME TO BE YOUR TEMPLATE ID
      }
    });

    view = new viewClass();

  
    return {
      view: view,
      name: 'name' //RENAME TO BE YOUR PAGE'S NAME
    };
  }
);