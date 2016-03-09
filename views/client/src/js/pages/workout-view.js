/* WORKOUT VIEW */

define(
  [
    'app',
    'generics/generic-page-view',
    'chartist',
    'jquery',
    'backbone',
    'errors',
    'messenger',
    'vendor/jquery-ui/tabs'
  ],
  function(app, gpV, Chartist, $, bb, errors, Messenger){
    var view,
        viewClass,
        modelClass,
        charts,
        events = app.eventHub;

    var chartDefaults = {
      donut: true,
      donutWidth: 60,
      startAngle: 270,
      total: 200,
      showLabel: false
    };

    //mapping for selector to biomarker type
    var charts = {
      '.js-cortisol-graph': 'cortisol',
      '.js-IgA-graph':      'IgA',
      '.js-amylase-graph':  'amylase'
    };

    // products
    // Health and Fitness - 1 swab at time
    // Performance - (contains Health and Fitness) 3 samples
    // Aerobic Threshold - 3-8 samples

    viewClass = gpV.extend({

      templates: {
        main:                   '#template-workout-view',
        performancePostCharts:  '#template-performance-post-graphs',
        aerobicTimepoint:       '#template-aerobic-timepoint',
        aerobicCharts:          '#template-aerobic-graphs'
      },

      events: {
        // 'submit .profile-info form':                'workoutMetaDataSubmit',
        'submit .js-hf-data':                           'hfSubmit',
        'click .js-hf-data .js-submit':                 'hfSubmit',
        'submit .js-performance-pre-data':              'performanceSubmitPre',
        'click .js-performance-pre-data .js-submit':    'performanceSubmitPre',
        'submit .js-performance-post-data':             'performanceSubmitPost',
        'click .js-performance-post-data .js-submit':   'performanceSubmitPost',
        'submit .js-aerobic-data':                      'aerobicSubmit',
        'click .js-aerobic-data .js-submit':            'aerobicSubmit',
        'click .js-add-timepoint':                      'addTimePointRow'
      },

      //stores graph instance handles
      graphs: {
        hf : {},
        performance: {
          pre: {},
          end: {},
          post: {}
        },
        aerobic: {}
      },

      render: function(){
        gpV.prototype.render.call(this);

        //tabs are auto-inited by the theme, we should take back this functionality eventually

        this.addTimePointRow();
      },

      //HEALTH AND FITNESS

      hfSubmit: function(e){
        e.preventDefault();

        var data = this.getData($('.js-hf-data'));

        this.model.hfSubmit(data);
        this.renderHfGraphs(data, '.js-hf-graphs');
      },

      renderHfGraphs: function(graphData, graphParent){
        //DUMMY DATA FOR NOW TIL API WORKS
        var graphData = {
          biomarkers: [
            { type: 'fitness-capacity-score', value: 95 },
            { type: 'stress-score', value: 23 },
            { type: 'fitness-score', value: 78 }
          ]
        };

        var transformed = {},
            biomarker,
            value;

        for (var i=0; i<graphData.biomarkers.length; i++){
          biomarker = graphData.biomarkers[i].type;
          value = graphData.biomarkers[i].value;

          // transformed[biomarker] = value;
          this.graphs.hf[biomarker] = new Chartist.Pie(graphParent + ' .js-' + biomarker + ' .js-chart', { series: [value] }, chartDefaults);
        }
      },

      //PERFORMANCE

      performanceSubmitPre: function(e){
        e.preventDefault();

        var data = this.getData($('.js-performance-pre-data'));

        this.model.performancePreSubmit(data);
        //below is just for TEST til server works
        this.renderPerformancePreGraphs(data);
      },

      performanceSubmitPost: function(e){
        e.preventDefault();

        var preData = this.getData($('.js-performance-pre-data')),
            postData = this.getData($('.js-performance-post-data')),
            pre, end, post;

        //transform
        pre = {
          cortisol: preData['cortisol-pre'],
          IgA: preData['IgA-pre'],
          amylase: preData['amylase-pre']
        };

        end = {
          cortisol: postData['cortisol-end'],
          IgA: postData['IgA-end'],
          amylase: postData['amylase-end']
        };

        post = {
          cortisol: postData['cortisol-post'],
          IgA: postData['IgA-post'],
          amylase: postData['amylase-post']
        };

        this.model.performancePostSubmit(end, post);
        //below is just for TEST til server works

        var analysis = {
          fitnessCapacity:          'not tested',
          stressLevels:             'not tested',
          exerciseResponse:         'not tested',
          intensity:                'not tested',
          exerciseResponseAmylase:  'not tested',
          recovery:                 'not tested'
        };

        this.renderPerformancePostGraphs(pre, end, post, analysis);
      },

      renderPerformancePreGraphs: function(data){
        this.renderHfGraphs(data, '.js-performance-pre-graphs');
      },

      renderPerformancePostGraphs: function(pre, end, post, analysis){
        var view = this;

        $('.js-performance-post-graphs').replaceWith(this.templates.performancePostCharts(analysis));

        for (var key in charts){
          view.graphs.performance.post[charts[key]] = new Chartist.Line('.js-performance-post-graphs ' + key + ' .ct-chart', {
            labels: ['Pre', 'End', 'Post'],
            series: [
              [
                pre[charts[key]],
                end[charts[key]],
                post[charts[key]]
              ]
            ]
          }, {
            fullWidth: true,
            chartPadding: {
              right: 40
            }
          });
        }
      },

      //AEROBIC

      addTimePointRow: function(e){
        if (!!e) { e.preventDefault(); }

        var nextIndex = $('.js-aerobic-data').find('.js-row').length;

        this.$el.find('.js-aerobic-data .js-sample-rows').append(this.templates.aerobicTimepoint({ n: nextIndex }));
      },

      getAerobicData: function(){
        var timepoints = [];

        $('.js-aerobic-data').find('.js-row').each(function(idx, itm){
          timepoints.push({
            cortisol: $(itm).find('.js-cortisol').val(),
            IgA: $(itm).find('.js-IgA').val(),
            amylase: $(itm).find('.js-amylase').val(),
            timestamp: $(itm).find('.js-timestamp').val()
          });
        });

        return timepoints;
      },

      aerobicSubmit: function(e){
        e.preventDefault();

        var data = this.getAerobicData();

        this.model.aerobicFullSubmit(data);

        //below is just for TEST til server works
        this.renderAerobicGraphs(data);
      },

      //takes an array of timepoints, presumably fetched from the model
      renderAerobicGraphs: function(timepoints){
        var view = this;

        function unpackSeries(timepoints, biomarkerName){
          var series = [];

          for(var i=0; i<timepoints.length; i++){
            series.push(parseFloat(timepoints[i][biomarkerName]));
          }

          return series;
        }

        function getTimestamps(timepoints){
          var timestamps = [];

          for(var i=0; i<timepoints.length; i++){
            timestamps.push(timepoints[i].timestamp);
          }

          return timestamps;
        }

        $('.js-aerobic-graphs').replaceWith(this.templates.aerobicCharts());

        for (var key in charts){
          view.graphs.aerobic[charts[key]] = new Chartist.Line('.js-aerobic-graphs ' + key + ' .ct-chart', {
            labels: getTimestamps(timepoints),
            series: [unpackSeries(timepoints, charts[key])]
          }, {
            fullWidth: true,
            chartPadding: {
              right: 40
            }
          });
        }
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
      defaults: {
        session_id: 0,
        //raw data
        hf: {
          IgA: 0,
          cortisol: 0
        },

        performance: {
          pre: {
            IgA: 0,
            cortisol: 0,
            amylase: 0
          },

          end: {
            IgA: 0,
            cortisol: 0,
            amylase: 0
          },

          post: {
            IgA: 0,
            cortisol: 0,
            amylase: 0
          },

          analysis: {

          }
        },

        aerobic: [],

        //from server
        hfAnalysis: {
          fitnessScore: 0,
          stressScore: 0,
          fitnessCapacityScore: 0
        },

        performanceAnalysis: {
          fitnessCapacity:          'not tested',
          stressLevels:             'not tested',
          exerciseResponse:         'not tested',
          intensity:                'not tested',
          exerciseResponseAmylase:  'not tested',
          recovery:                 'not tested'
        }
      },

      addAerobicTimePoint: function(data){
        var newAerobicSeries = [],
          timepoint = {
            cortisol: data.cortisol,
            amylase: data.amylase,
            IgA: data.IgA,
            time: new Date()
          };

        this.set({ aerobic: this.get('aerobic').push(timepoint) });
      },

      hfSubmit: function(data){
        var model = this;

        $.ajax({
          type: 'POST',
          url: '/workout/hf',
          data: data,
          dataType: 'json'
        }).success(function(resp){
          events.trigger('Health and Fitness post: successful');
          Messenger().post({ message: "Health and Fitness info saved"});
          model.set({
            workout_id: resp.workout_id,
            hfAnalysis: resp.analysis
          });
        })
        .fail(function(data){
          events.trigger('error - health and fitness did not work');
          errors.issueError({ type: 'general', message: "health and fitness info error!"});

          //this needs to be globalized or otherwise fixed, corrects a response of html page of index.ejs for a logout condition
          if (data.status == 200){
            window.location.href = window.location.origin;
          }
          model.trigger('error', data.responseJSON);
        });
      },

      performancePreSubmit: function(data){
        var model = this;

        $.ajax({
          type: 'POST',
          url: '/workout/performance',
          data: data,
          dataType: 'json'
        }).success(function(resp){
          events.trigger('Performance post: successful');
          Messenger().post({ message: "Performance info saved"});
          model.set({
            session_id: resp.session_id,
            performanceAnalysis: resp.analysis,
            performance: {
              pre: data
            }
          });

          view.renderPerformancePreGraphs(data);
        })
        .fail(function(data){
          events.trigger('error - Performance post did not work');
          errors.issueError({ type: 'general', message: "performance info error!"});

          //this needs to be globalized or otherwise fixed, corrects a response of html page of index.ejs for a logout condition
          if (data.status == 200){
            window.location.href = window.location.origin;
          }
          model.trigger('error', data.responseJSON);
        });
      },

      performancePostSubmit: function(end, post){
        var model = this,
            data = {
              end: end,
              post: post
            },
            pre = this.get('performance').pre;

        $.ajax({
          type: 'POST',
          url: '/workout/performance/' + this.get('session_id') + '/post',
          data: data,
          dataType: 'json'
        }).success(function(resp){
          events.trigger('Performance end post: successful');
          Messenger().post({ message: "Performance end info saved"});
          view.model.set({
            session_id: resp.session_id,
            performanceAnalysis: resp.analysis,
            performance: {
              pre: pre,
              end: end,
              post: post
            }
          });

          //this is here because these should separate models, i can't subscribe to subobjects like change:performance.end
          view.renderPerformancePostGraphs(end, post);
        })
        .fail(function(data){
          events.trigger('error - Performance end post did not work');
          errors.issueError({ type: 'general', message: "performance end info error!"});

          //this needs to be globalized or otherwise fixed, corrects a response of html page of index.ejs for a logout condition
          if (data.status == 200){
            window.location.href = window.location.origin;
          }
          model.trigger('error', data.responseJSON);
        });
      },

      aerobicFullSubmit: function(data){
        var model = this;

        $.ajax({
          type: 'POST',
          url: '/workout/aerobic/full',
          data: { timepoints: data },
          dataType: 'json'
        }).success(function(resp){
          events.trigger('Aerobic post: successful');
          Messenger().post({ message: "Aerobic info saved"});
          model.set({
            session_id: resp.session_id,
            aerobic: data
          });
        })
        .fail(function(resp){
          events.trigger('error - Aerobic post did not work');
          errors.issueError({ type: 'general', message: "Aerobic info error!"});

          //this needs to be globalized or otherwise fixed, corrects a response of html page of index.ejs for a logout condition
          if (resp.status == 200){
            window.location.href = window.location.origin;
          }
          model.trigger('error', resp.responseJSON);
        });
      }
    });

    model = new modelClass();
    view = new viewClass({ model: model });
    view.model = model;

    //view/model event bindings
    view.model.on('change:hfAnalysis', function(model, options){
      view.renderHfGraphs(model.get('hfAnalysis'));
    });

    //'change:performance' for pre and post is in the method because these need to be separate models but i don't have time now

    view.model.on('change:performanceAnalysis', function(model, options){
      view.renderPerformanceResults(model.get(''));
    });

    view.model.on('change:aerobic', function(model, options){
      view.renderAerobicGraphs(model.get('aerobic'));
    });

    view.model.on('error', view.error);

    return {
      view: view,
      model: model,
      name: 'workout-view'
    };
  }
);