import templateUrl from './chart.html';
export const chartComponent = {
  bindings: {
    chartData: '<'
  },
  templateUrl,
  controller: class chartComponent {
    constructor(){
      'ngInject'
    }

    $onChanges(changes) {
      if (changes.chartData) {
        console.log('chartComponent:::::', this.chartData)
        this.songsData = Object.assign({}, this.chartData);
        var array = [];
        for(let key in this.songsData){
          array.push(this.songsData[key]);
        }
        this.songsData = array;
      }
    }
  }
}
