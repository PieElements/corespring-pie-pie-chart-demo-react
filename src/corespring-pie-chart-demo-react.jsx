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
      correctResponseData: this._mapCorrectResponseData()
    };

    if (!_.isEmpty(this.props.session) && !_.isEmpty(this.props.session.value)) {
      this.state.chartData = _.map(this.props.session.value, function(s, idx) {
        return {
          id: idx,
          value: s
        };
      });
    }
  }

  _mapCorrectResponseData() {
    return _.map(this.props.model.correctResponse, function(s, idx) {
      return {
        id: idx,
        value: s
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    this.state.componentState = this.props.model.disabled ? 'disabled' : 'enabled';
    this.state.correctResponseData = this._mapCorrectResponseData();
  }

  sliderHandler(i, ev, value) {
    var newData = this.state.chartData;
    newData[i].value = value;
    this.props.session.value = this.props.session.value || [];
    this.props.session.value[i] = value;
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
    let showCorrectAnswerToggle = "";
    let correctnessLegend = {__html: ""};
    let self = this;
    let componentState = this.state.showingCorrectResponse ? '' : this.state.componentState;

    if (!_.isEmpty(this.props.model.correctResponse)) {
      var label = this.state.showingCorrectResponse ? 'Show My Answer' : 'Show Correct Answer';
      showCorrectAnswerToggle =
        <div className="showCorrectToggle" onClick={this.showCorrectAnswer.bind(this)}>
          {label}
        </div>;
    }

    if (!_.isEmpty(this.props.model.outcomes) && !this.state.showingCorrectResponse) {
      correctnessLegend = {
        __html: _.map(this.props.model.outcomes, function(o, idx) {
          var section = self.props.model.sections[idx];
          var correctness = o ? 'correct' : 'incorrect';
          return "<span class='legend-box " + correctness + "'></span><span class='legend-entry'>" + section.label + "</span>";
        }).join('')
      };

    }

    if (this.state.componentState !== 'disabled') {
      var sliders = [];
      for (var i = 0; i < this.props.model.sections.length; i++) {
        sliders.push(
          <tr key={i}>
            <td>
              {this.state.chartSeries[i].name}
            </td>
            <td width={300}>
              <Slider value={this.state.chartData[i].value}
                      max={this.props.model.maxValue}
                      onChange={this.sliderHandler.bind(this, i)}
              />
            </td>
            <td>
              {this.state.chartData[i].value}
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
        <div className="correctness-legend" dangerouslySetInnerHTML={correctnessLegend}></div>
        <div className={componentState}>
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

CorespringPieChartDemoReact.defaultProps = {
  session: {
    value: []
  }
};

export default CorespringPieChartDemoReact;