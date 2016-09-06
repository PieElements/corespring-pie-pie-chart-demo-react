import React from 'react';
import Slider from 'material-ui/Slider';
import _ from 'lodash';


var PieChart = require('react-d3-basic').PieChart;

var width = 700,
  height = 400,
  value = function(d) {
    return +d.value;
  },
  name = function(d) {
    return d.id;
  };

class CorespringPieChartDemoReact extends React.Component {

  constructor(props) {
    super(props);
    console.log("state init");
    console.log(this.props.model);
    console.log(this.props.correctResponse);
    console.log('sess',this.props.session);
    this.state = {
      componentState: this.props.model.disabled ? 'disabled' : 'enabled',
      showingCorrectResponse: false,
      chartSeries: this.props.model.sections.map(function(s, idx) {
        return {
          field: idx,
          name: s.label,
          color: s.color
        }
      }),
      chartData: this.props.model.sections.map(function(s, idx) {
        return {
          id: idx,
          value: s.initialValue
        };
      }),
      correctResponseData: _.map(this.props.model.correctResponse, function(s, idx) {
        return {
          id: idx,
          value: s
        };
      })
    };

    if (!_.isEmpty(this.props.session) && !_.isEmpty(this.props.session.value)) {
      this.state.chartData = _.map(this.props.session.value, function(s, idx) {
        return {
          id: idx,
          value: s
        };
      });
    }

    if (!_.isEmpty(this.props.model.outcomes)) {
    }

    console.log("session", this.props.session);
  }

  sliderHandler(i, ev, value) {
    var newData = this.state.chartData;
    newData[i].value = value;
    this.setState({chartData: newData, chartSeries: this.state.chartSeries});
  }

  getChartData() {
    return this.state.showingCorrectResponse ? this.state.correctResponseData : this.state.chartData;
  }

  showCorrectAnswer() {
    this.state.showingCorrectResponse = !this.state.showingCorrectResponse;
    this.setState({showingCorrectResponse: this.state.showingCorrectResponse});
  }

  render() {

    let slidersTable = "";
    let showCorrectAnswerToggle = [];

    if (!_.isEmpty(this.props.model.correctResponse)) {
      var label = this.state.showingCorrectResponse ? 'Show My Answer' : 'Show Correct Answer';
      showCorrectAnswerToggle.push(
        <div key="0" className="showCorrectToggle" onClick={this.showCorrectAnswer.bind(this)}>
          {label}
        </div>
      );
    }

    if (this.state.componentState !== 'disabled') {
      var sliders = [];
      for (var i = 0; i < this.props.model.sections.length; i++) {
        sliders.push(
          <tr>
            <td>
              {this.state.chartSeries[i].name}
            </td>
            <td width={"80%"}>
              <Slider key={i}
                      value={this.state.chartData[i].value}
                      max={this.props.model.maxValue}

                      onChange={this.sliderHandler.bind(this, i)}
              />
            </td>
          </tr>
        );
      }
      slidersTable = <table className="sliderTable">
        <tbody>{sliders}</tbody>
      </table>;
    }

    return (
      <div className="corespring-chart-demo-react">
        <div className="prompt">{this.props.model.prompt}</div>
        {showCorrectAnswerToggle}
        {slidersTable}
        <div className={this.state.componentState}>
          <PieChart
            data={this.getChartData()}
            width={width}
            height={height}
            chartSeries={this.state.chartSeries}
            value={value}
            name={name}
          />
        </div>
      </div>
    );
  }
}

CorespringPieChartDemoReact.propTypes = {
  model: React.PropTypes.object,
  session: React.PropTypes.object
};

export default CorespringPieChartDemoReact;