import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var style = require('!style!css!less!./index.less');

import CorespringPieChartDemoReact from './corespring-pie-chart-demo-react.jsx'

class Main extends React.Component {
  render() {
    console.log("props", this.props);
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

export default Main;