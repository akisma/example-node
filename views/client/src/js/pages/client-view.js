/* CLIENT VIEW */

define(
  [
    'app',
    'generics/generic-page-view',
    'jquery',
    'vendor/jquery-ui/tabs',
    'messenger',
    'backbone',
    'errors',
    'bootstrapDatepicker'
  ],
  function(app, gpV, $, tabs, messenger, bb, errors){
    var view,
        viewClass,
        modelClass,
        events = app.eventHub;

    viewClass = gpV.extend({
      //data is auto fetched by app.loadModule when given the below url to fetch from
      //this would ideally happen on a Backbone.Model object but since we will switch/refactor to React anyway, I'm not going to
      //errors are handled at the module loader level
      fetchFrom: '/client/info',

      events: {
        'click .js-link-list tr':                   'workoutClick',
        'click .js-client-intake-info .js-submit':  'clientInfoSubmit',
        'submit .js-client-intake-info':            'clientInfoSubmit'
      },

      render: function(data){
        gpV.prototype.render.call(this);

        $('.js-datepicker').datepicker({
          format: 'mm/dd/yyyy',
          autoclose: true
        });

        //tabs are auto-inited by the theme, we should reclaim this functionality eventually
      },

      templates: {
        main: "#template-client-view"
      },

      //handles click of workout list row
      workoutClick: function(e){
        var href = $(e.target).attr('data-href');

        if (typeof(href) == 'undefined'){
          href = $(e.target).parent('tr').attr('data-href');
        }

        app.router.navigate('/workout/' + href, { trigger: true });
      },

      //posts client info form
      clientInfoSubmit: function(e){
        e.preventDefault();

        var data = this.getData($('.js-client-intake-info')),
            view = this;

        $.ajax({
          type: 'POST',
          url: '/client/info', //url
          data: data,
          dataType: 'json' //self-explanatory
        }).success(function(resp){
          events.trigger('clientInfoPost: successful', resp);
          Messenger().post({ message: "client info saved"});
          view.render();
        })
        .fail(function(data){
          events.trigger('error: clientInfoPost did not work');
          errors.issueError({ type: 'general', message: "client info error!"});
          //this needs to be globalized or otherwise fixed, corrects a response of html page of index.ejs for a logout condition
          if (data.status == 200){
            window.location.href = window.location.origin;
          }
          view.error(data.responseJSON);
        });
      },

      //complements global error handler
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
      initialize: function(){
        var model = this;

        events.on('clientInfoPost: successful', function(data){
          model.set(data);
        });
      },

      defaults: {
        first_name: '',
        middle_name: '',
        last_name: '',
        consent_data_internal_analysis: true,
        birthdate: '',
        gender: '',
        height: '',
        login_id: 0
      }
    });

    model = new modelClass();
    view = new viewClass({ model: model });
    view.model = model;

    return {
      view: view,
      model: model,
      name: 'client-view'
    };
  }
);