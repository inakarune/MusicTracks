import templateUrl from './discover.html'
export const discoverComponent = {
  bindings: {
    serverData: '<'
  },
  templateUrl,
  controller: class discoverComponent {
    constructor(){
      'ngInject'
      // this.imgObj = {
      //   // "width" : "250px",
      //   "margin-top" : '20px',
      //   "margin-right" : '20px'
      // };
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