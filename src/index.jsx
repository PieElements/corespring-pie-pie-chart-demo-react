import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var style = require('!style!css!less!./index.less');

import CorespringPieChartDemoReact from './corespring-pie-chart-demo-react.jsx'

class App extends React.Component {
  render() {
    return <div>
      <MuiThemeProvider>
        <CorespringPieChartDemoReact
          model={this.props.model}
          session={this.props.session}
        >
        </CorespringPieChartDemoReact>
      </MuiThemeProvider>
    </div>
  }
}


var model = {
  prompt: "Hello Pie Chart ",
  maxValue: 50,
  disabled: false,
  sections: [
    {
      label: "Section A",
      color: "#f00",
      initialValue: 3
    },
    {
      label: "Section B",
      color: "#0f0",
      initialValue: 2
    },
  ],
  correctResponse: [
    50,
    50
  ]
};

var session = {
  value: [
    15,
    44
  ]
};


if (typeof pie == "object") {
  pie.framework('react').register('corespring-pie-chart-demo-react', App);
} else {
  render(<App model={model} session={session}/>, document.getElementById('app'));
}