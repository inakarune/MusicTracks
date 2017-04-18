import templateUrl from './searchResult.html';
// export const searchResultComponent = {
//   templateUrl,
//   controller: class searchResultComponent {
//     constructor($http, searchService, $stateParams, $state){
//       this.$http = $http;
//       this.searchService = searchService;
//       this.$stateParams = $stateParams;
//       this.keyword = this.$stateParams.keyword;
//       this.imgObj = {
//         "width": "150px",
//         "margin-top": "20px",
//         "margin-right": "20px"
//       };
//       this.searchService.searchSong(this.keyword, 'title')
//         .then(response => this.searchs = response)
//     }

//     playNg(index){
//       var idx = index.toString();
//       var audio = document.getElementById(idx);
//       audio.load();
//       audio.play();
//     }

//     sendCart(title, artist, album, price){
//       return this.$http({
//         method: 'GET',
//         url: '/cart/:item',
//         params: { 'title': title, 'artist': artist, 'album': album, 'price': price }
//       });
//     }


//   }
// }
export const searchResultComponent = {
  templateUrl,
  controller: resultCtrl
};

function resultCtrl($scope, $stateParams, searchService, $http){ 
  $scope.keyword = $stateParams.keyword;
  console.log('stateParams', $stateParams)
  
  searchService.searchSong($scope.keyword, 'title')
    .then(response => {$scope.searchs = response
      console.log('resultCtrl', $scope.searchs)
    });

  $scope.arrayBufferToBase64 = function(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var length = bytes.byteLength;
    for (var i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    var result = window.btoa(binary);

    return result;
  }

  $scope.imgObj = {
    "width" : "150px",
    "margin-top" : '20px',
    "margin-right" : '20px',
    "margin-left": '20px'
  }

  $scope.playNg = function(index){
      var idx = index.toString();
      var audio = document.getElementById(idx);
      audio.load();
      audio.play();
    }

  $scope.sendCart = function(title, artist, album, price){
    return $http({
      method: 'GET',
      url: '/cart/:item',
      params: {'title' : title, 'artist': artist, 'album': album, 'price': price }
    });
  }
}
