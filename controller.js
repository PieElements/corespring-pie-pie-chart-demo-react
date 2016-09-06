const _ = require('lodash'); 

exports.model = function(question, session, env) {

  console.debug('[state] question:', JSON.stringify(question, null, '  '));
  console.debug('[state] session:', JSON.stringify(session, null, '  '));
  console.debug('[state] env:', JSON.stringify(env, null, '  '));

  var cfg = _.assign({}, question.model);
  var lookup = _.identity;
  
  cfg.prompt = lookup(cfg.prompt);
  cfg.choices = _.map(cfg.choices, function (c) {
    c.label = lookup(c.label)
    return c;
  });

  var base = _.assign({}, question.model); 
  base.outcomes = [];

  base.config = cfg;

  if (env.mode !== 'gather') {
    base.config.disabled = true;
  }

  if (env.mode === 'evaluate') {

    // if (!allCorrect) {
    //   base.config.correctResponse = question.correctResponse;
    // }
    // base.outcomes = createOutcomes(allCorrect);
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