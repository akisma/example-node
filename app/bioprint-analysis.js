/* bioprint biomarker calcs and analysis */

// for health and fitness, run hf only
// for performance, run hf with 'pre' data, then run performance with 'end' and 'post' data (2nd POST)
// aerobic threshold has no analysis yet

var bioprint = {
	//health and fitness product functions
	hf: {
		fitnessScore: function(IgA){
			function calc(biomarker){
				return .75 * biomarker;
			}

      if (calc(IgA) < 0){
        return 10;
      } else {
        return calc(IgA);
      }
		},
		stressScore: function(cortisol){
      function calc(biomarker){
        return (100 * (17 - biomarker)) / 15;
      }

      if (calc(cortisol) < 0){
        return 10;
      } else {
        return calc(cortisol);
      }
		},
		fitnessCapacityScore: function(fitnessScore, stressScore){
      return ((stressScore + 2) * fitnessScore) / 3;
		}
	},

	//performance product functions
	performance: {
    fitnessCapacity: function(IgA){
      if (IgA > 100) { return 'Good fitness capacity'; }
      else { return 'Low fitness capacity'; }
    },

    stressLevels: function(cortisol){
      if (cortisol < 10) { return 'Low stress levels'; }
      else { return 'High stress levels'; }
    },

    exerciseResponse: function(cortisolPre, cortisolEnd){
      if (cortisolEnd > cortisolPre) { return 'Good response to exercise'; }
      else { return 'Low response to exercise'; }
    },

    intensity: function(cortisolEnd, cortisolPost){
      if (cortisolPost > cortisolEnd) { return 'High intensity workout'; }
      else { return 'Moderate intensity workout'; }
    },

    exerciseResponseAmylase: function(amylasePre, amylaseEnd){
      if (amylaseEnd > amylasePre){ return 'Good response to exercise'; }
      else { return ''; }
    },

    recovery: function(amylaseEnd, amylasePost){
      if (amylasePost < amylaseEnd) { return 'Good recovery'; }
      else { return 'Slow recovery'; }
    }
	}
};

module.exports = bioprint;