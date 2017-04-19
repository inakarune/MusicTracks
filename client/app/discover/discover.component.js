import templateUrl from './discover.html'
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
        var array = [];
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

    // arrayBufferToBase64(buffer) {
    //   var binary = '';
    //   var bytes = new Uint8Array(buffer);
    //   var length = bytes.byteLength;

    //   for (var i = 0; i < length; i++) {
    //     binary += String.fromCharCode(bytes[i]);
    //   }
    //   var result = window.btoa(binary);

    //   return result;
    // }

    playNg(index){
      var idx = index.toString();
      var audio = document.getElementById(idx);
      audio.load();
      audio.play();
    }

    
  }
}