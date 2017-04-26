import templateUrl from './discover.html';
export const discoverComponent = {
  bindings: {
    serverData: '<'
  },
  templateUrl,
  controller: class discoverComponent {
    constructor($http){
      'ngInject'
      this.$http = $http;
    }

    $onChanges(changes) {
      if (changes.serverData) {
        this.albumData = Object.assign({}, this.serverData);
        let array = [];
        for(let key in this.albumData){
          array.push(this.albumData[key]);
        }
        this.albumData = array;
      }
    }

    countGood(title){
      return this.$http({
        url: '/count/:title',
        method: 'PUT',
        params: {
          'title': title
        }
      });
    }

    playNg(index){
      let idx = index.toString();
      let audio = document.getElementById(idx);
      audio.load();
      audio.play();
    }
  }
}