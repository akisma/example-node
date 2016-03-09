/* SETTINGS PAGE */

define(
  [
    'app',
    'generics/generic-page-view',
    'jquery',
    'backbone',
    'messenger',
    'errors',
    'vendor/jquery-ui/tabs',
  ],
  function(app, gpV, $, bb, Messenger, errors, tabs){
    var view,
        viewClass,
        modelClass,
        events = app.eventHub,
        Messenger = Messenger;

    viewClass = gpV.extend({
      fetchFrom: '/user/settings',

      events: {
        'click .js-settings .js-submit':  'submit',
        'submit .js-settings':            'submit'
      },

      templates: {
        main: "#template-settings"
      },

      render: function(){
        gpV.prototype.render.call(this);

        $('.profile-info .tabs').tabs();
      },

      submit: function(e){
        e.preventDefault();

        //this is just to Make It Work for josh testing
        var data = this.getData($('.js-settings')),
            view = this;

        $.ajax({
          type: 'POST',
          url: '/user/settings', //url
          data: data,
          dataType: 'json' //self-explanatory
        }).success(function(resp){
          events.trigger('settingsPost: successful'); //switch events trigger
          Messenger().post({ message: "settings saved!" });
        })
        .fail(function(data){
          events.trigger('error: settingsPost did not work'); //switch to error trigger
          errors.issueError({ type: 'general', message: "settings save error!" });
          //this needs to be globalized or otherwise fixed, corrects a response of html page of index.ejs for a logout condition
          if (data.status == 200){
            window.location.href = window.location.origin;
          }
          view.error(data.responseJSON);
        });
      },

      //TODO REPLACE WITH GLOBAL ERROR HANDLER ASAP
      error: function(data){
        var $errors = $('<ul></ul>'),
            errorsObj = data.message ? { errors: [data] } : data;

        $.each(errorsObj.errors, function(idx, itm){
          $errors.append('<li>' + itm.message + '</li>');
        });

        this.$el.find('.js-errors').html($errors);
      }
    });

    modelClass = bb.Model.extend({
      defaults: {
        login_email:    '',
        address_line1:  '',
        address_line2:  '',
        city:           '',
        state:          '',
        zip:            '',
        address_type:   '',
        phone_primary:  '',
        phone_type:     '',
        email_address:  '',
        is_client:      true,
        is_trainer:     false,
        user_type:      'client'
      }
    });

    model = new modelClass();
    view = new viewClass({ model: model });
    view.model = model;

    return {
      view: view,
      model: model,
      name: 'settings'
    };
  }
);