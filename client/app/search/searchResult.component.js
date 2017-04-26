import templateUrl from './searchResult.html';

export const searchResultComponent = {
  templateUrl,
  controller: class SearchResultComponent {
    constructor(searchService, $stateParams, $http){
      this.$http = $http;
      this.searchService = searchService;
      this.$stateParams = $stateParams;
      this.keyword = this.$stateParams.keyword;
      this.searchService.searchSong(this.keyword, 'title')
        .then(response => this.searchs = response);
      this.imgObj = {
        "width": "150px",
        "margin-top": "20px",
        "margin-right": "20px",
        "margin-left": "20px"
      };
    }

    playNg(index){
      let idx = index.toString();
      let audio = document.getElementById(idx);
      audio.load();
      audio.play();
    }

    sendCart(title, artist, album, price){
      return this.$http({
        method: 'GET',
        url: '/cart/:item',
        params: {
          'title': title,
          'artist': artist,
          'album': album,
          'price': price
        }
      });
    }
  }
};

// function resultCtrl($scope, $stateParams, searchService, $http){ 
//   $scope.keyword = $stateParams.keyword;
  
//   searchService.searchSong($scope.keyword, 'title')
//     .then(response => {$scope.searchs = response
//     });

//   $scope.imgObj = {
//     "width" : "150px",
//     "margin-top" : '20px',
//     "margin-right" : '20px',
//     "margin-left": '20px'
//   };

//   $scope.playNg = function(index){
//     var idx = index.toString();
//     var audio = document.getElementById(idx);
//     audio.load();
//     audio.play();
//   };

//   $scope.sendCart = function(title, artist, album, price){
//     return $http({
//       method: 'GET',
//       url: '/cart/:item',
//       params: {'title' : title, 'artist': artist, 'album': album, 'price': price }
//     });
//   };
// }
