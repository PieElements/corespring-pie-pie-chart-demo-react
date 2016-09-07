import Main from './main.jsx';
import React from 'react';
import {render} from 'react-dom';

var model = {
  prompt: "Pie Chart ",
  maxValue: 50,
  sections: [
    {
      label: "Section A",
      color: "#f00",
      initialValue: 25
    },
    {
      label: "Section B",
      color: "#0f0",
      initialValue: 10
    },
  ]

};

var session = {
  value: [
    15,
    44
  ]
};

var modelWithSession = _.extend(_.cloneDeep(model), {
  prompt: 'Pie Chart with Session'
});

var modelWithOutcomes = _.extend(_.cloneDeep(model), {
  prompt: 'Pie Chart with Outcomes',
  outcomes: [true, false],
  disabled: true
});
var modelWithOutcomesAndCorrectResponse = _.extend(_.cloneDeep(modelWithOutcomes), {
  prompt: 'Pie Chart with Outcomes and Correct Response',
  correctResponse: [50, 50]
});
render(
  <div>
    <Main model={model} />
    <Main model={modelWithSession} session={session}/>
    <Main model={modelWithOutcomes} />
    <Main model={modelWithOutcomesAndCorrectResponse} />
  </div>
  , document.getElementById('app'));