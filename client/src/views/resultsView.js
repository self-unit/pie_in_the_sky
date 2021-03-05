import { chart as _chart } from 'highcharts';
import createAndAppend from '../helpers/createAndAppend.js';
import { subscribe } from '../helpers/pubSub.js';

class ResultsView {
  constructor() {}

  bindEvent() {
    subscribe('Game:end-game', (event) => {
      const container = document.querySelector('#end-screen');
      const messageContainer = document.querySelector('#end-message');
      container.style.display = 'flex';
      const winner = event.detail.currentPlayer.name;
      createAndAppend('h2', null, null, `${winner} won!`, messageContainer);
    });
    subscribe('HighScore:allscores', (evt) => {
      const allScores = evt.detail;
      const highScoresContainer = document.querySelector('#highscores');
      this.render(highScoresContainer, allScores);
    });
  }

  render(section, scores) {
    _chart(section, {
      chart: {
        type: 'bar',
      },
      title: {
        text: 'High Score',
      },
      subtitle: {
        text: 'Source: Pie In the Sky',
      },
      xAxis: {
        categories: scores.map((score) => score.name),
        crosshair: true,
      },
      yAxis: {
        min: 0,
        max: 10,
        title: {
          text: 'Score Out Of 10',
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: 'Pie In The Sky Highscores',
          data: scores.map((score) => parseInt(score.wins, 10)),
        },
      ],
    });
  }
}

export default ResultsView;
