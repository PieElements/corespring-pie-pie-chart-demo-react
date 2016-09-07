const _ = require('lodash'); 

exports.model = function(question, session, env) {

  console.debug('[state] question:', JSON.stringify(question, null, '  '));
  console.debug('[state] session:', JSON.stringify(session, null, '  '));
  console.debug('[state] env:', JSON.stringify(env, null, '  '));

  var lookup = _.identity;

  var base = _.assign({}, question.model);
  base.prompt = lookup(base.prompt);
  base.outcomes = [];

  if (env.mode !== 'gather') {
    base.disabled = true;
  }

  if (env.mode === 'evaluate') {

    var numCorrect = 0;
    base.outcomes = [];
    _.each(question.model.sections, function(s, idx) {
      var value = (session.value && session.value[idx]) || s.initialValue;
      if (value === question.correctResponse[idx]) {
        numCorrect++;
        base.outcomes.push(true);
      } else {
        base.outcomes.push(false);
      }

    });
    var allCorrect = numCorrect === question.model.sections.length;
    if (!allCorrect) {
      base.correctResponse = question.correctResponse;
    }

  }


  base.env = env;

  var map = {
    black_on_rose: 'black-on-rose',
    white_on_black: 'white-on-black',
    black_on_white: 'default'
  };

  if (env.accessibility && env.accessibility.colorContrast && map[env.accessibility.colorContrast]){
    base.className = map[env.accessibility.colorContrast];
  }

  console.debug('[state] return: ' + JSON.stringify(base, null, '  '));
  return base;
};