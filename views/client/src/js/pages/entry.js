/* ENTRY */

define(
  [
    'app',
    'generics/generic-page-view',
    'jquery',
    'errors'
  ],
  function(app, gpV, $, errors){
    var view,
        viewClass,
        events = app.eventHub;

    viewClass = gpV.extend({

      templates: {
        main: "#template-entry"
      },

      events: {
        'click .js-to-signup':          'showSignup',
        'click .js-to-login':           'showLogin',
        'click .js-signup-submit':      'submitSignup',
        'submit .js-signup':            'submitSignup',
        'click .js-login-submit':       'submitLogin',
        'submit .js-login':             'submitLogin'
      },

      render: function(){
        gpV.prototype.render.call(this);

        this.showLogin();
        $('body').addClass('entry-state'); // DEFINITELY BETTER PLACES TO DO THIS
      },

      showSignup: function(e){
        if (!!e) { e.preventDefault(); }

        $('.js-login').hide();
        $('.js-signup').show();
      },

      showLogin: function(e){
        if (!!e) { e.preventDefault(); }

        $('.js-signup').hide();
        $('.js-login').show();
      },

      submitSignup: function(e){
        e.preventDefault();

        $.ajax({
          type: 'POST',
          url: API_URL + '/signup',
          data: this.getData($('.js-signup')),
          dataType: 'json'
        }).success(function(resp){
          events.trigger('signup: successful');
          app.user.set({ authenticated: true });
          createCookie('_bp', resp.token, 1);
          app.user.checkLoginStatus(app);
        })
        .fail(function(){
          events.trigger('error: signup did not work');
          errors.issueError({ type: 'general', message: "error: signup did not work!"});
          app.user.set({ authenticated: false });
        });
      },

      submitLogin: function(e){
        e.preventDefault();

        var view = this;

        $.ajax({
          type: 'POST',
          url: API_URL + '/login',
          data: this.getData($('.js-login')),
          dataType: 'json',
        }).success(function(resp){
          events.trigger('login: successful');
          app.user.set({ authenticated: true });
          createCookie('_bp', resp.token, 1);
          app.user.checkLoginStatus(app);
        })
        .fail(function(){
          events.trigger('error: login did not work');
          errors.issueError({ type: 'general', message: "error: login did not work!"});
          app.user.set({ authenticated: false });
        });
      }
    });

    view = new viewClass();


    return {
      view: view,
      name: 'entry'
    };
  }
);