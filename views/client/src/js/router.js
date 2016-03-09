define([
  'app',
  'backbone'
],
function(app, bb) {

  var Router = Backbone.Router.extend({
    routes: {
      '':                       'client',

      //system ops
      'entry':                  'entry',
      'logout':                 'logout',

      //user routes - all routed to current user, users can't edit another user's info or settings.
      'user/settings':          'settings',
      'user/reset':             'pwReset',

      //
      //specific views
      //

      //client routes
      'client':              'client',

      //workout routes
      'workout/:id':             'workout',

      //
      // ONLY TRAINERS HAVE ACCESS TO THE FOLLOWING ROUTES
      //

      'workout/:id/:action':     'workout',

      //facility routes
      'facility/:id':            'facility',
      'facility/add':            'facility',

      //trainer routes
      'trainer/:id':             'trainer',

      //DEV ONLY
      'test':                    'test'

      //example of capturing args in routes
      //'issues/:number':     'issueDetail'
    },

    //helper functions
    loadModule: function(module){
      if (app.user.get('authenticated')){
        app.loadModule(module);
      } else {
        require(['pages/entry'], app.loadModule);
      }
    },

    cookie: function(){
      //hit API for token
      //set cookie token
    },

    //              //
    //    ROUTES    //
    //              //

    //
    //    SYSTEM OPS
    //

    index: function() {

      //add logic, 'if logged in'

      // require(['pages/entry'], this.loadModule);
    },

    entry: function() {
      require(['pages/entry'], this.loadModule);
    },

    logout: function(){
      function eraseCookie(name) {
          createCookie(name,"",-1);
      }

      eraseCookie('_bp');

      this.navigate('entry', { trigger: true });
    },

    //
    //    USER OPS
    //

    //settings should include user info (account user, not client)
    settings: function(){
      this.cookie();
      //in settings, request settings ONLY for cookied user
      require(['pages/settings'], this.loadModule);
    },

    pwReset: function(){

    },

    //
    //    PAGES OPS
    //

    client: function(id, action) {
      require(['pages/client-view'], this.loadModule);
    },

    trainer: function(id, action){
      require(['pages/trainer-view'], this.loadModule);
    },

    workout: function(id, action){
      //if id=="new" ...
      require(['pages/workout-view'], this.loadModule); //when action==new, pass that via JSON or something
    },

    facility: function(id, action){
      require(['pages/facility-view'], this.loadModule);
    },

    //
    //  DEV ONLY - DO NOT SHIP!!!!
    //

    test: function() {
      require(['pages/test'], this.loadModule);
    }
  });

  return Router;
});
