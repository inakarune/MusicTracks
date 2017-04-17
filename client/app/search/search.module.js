import angular from 'angular';
import './search.scss';
import { searchComponent } from './search.component';
import { searchService } from './search.Service';
import { searchResultModule } from './searchResult.module';
import uiRouter from 'angular-ui-router';

export const searchModule = angular
  .module('search', [ searchResultModule, uiRouter ])
  .component('search', searchComponent)
  .value('EventEmitter', keyword => ({ $event : keyword }))
  .service('searchService', searchService)
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject'
    $stateProvider
      .state('searchSong', {
        url: '/search/:keyword/:condition',
        component: 'search'
      })
    $urlRouterProvider.otherwise('/');
  })
  .name



// export const searchModule = angular
//   .module('search', [ uiRouter ])
//   .component('search', searchComponent)
//   .value('EventEmitter', keyword => ({ $event : keyword }))
//   .service('searchService', searchService)
//   .config(($stateProvider, $urlRouterProvider) => {
//   	'ngInject';
//   	$stateProvider
//   		.state('searchSong', {
//   			url: '/search/:keyword/:condition',
//   			component: 'search'
//   		})
//       .state('searchResults', {
//         url: '/search-results/:keyword/:selected',
//         template: `
//         <h1>Search Results {{ keyword }}</h1>
       
//         <md-toolbar class="md-theme-light">
//           <h2 class="md-toolbar-tools">
//             <span>{{ searchs.length }} tracks matching "{{ keyword }}"</span>
//           </h2>
//         </md-toolbar>

//         <md-content>
//           <md-list>
//             <md-list-item class="md-3-line" ng-repeat="song in searchs">
//               <img ng-src="data:image/jpg;base64,{{arrayBufferToBase64(song.picture.data.data)}}" ng-style="imgObj"/>
//               <div class="md-list-item-text">
//                 <h3>{{song.title}}</h3>
//                 <h4>{{song.artist}}</h4>
//                 <p>album : {{song.album}} / price : {{ song.price }} / year : {{ song.year }}</p>
//               </div>
              
//               <audio id="player" ng-src="http://localhost:8080/download/{{song.songList[0]}}"></audio>
              
//               <a href="#" class="btn btn-info btn-lg" onclick="document.getElementById('player').play()">
//                 <span class="glyphicon glyphicon-play-circle"></span> Play
//               </a>

//               <a href="#" class="btn btn-info btn-lg" ng-click="sendCart(song.title, song.artist, song.album, song.price)">
//                 <span class="glyphicon glyphicon-shopping-cart"></span> Shopping Cart
//               </a>

              
//             </md-list-item>
//           </md-list>
//         </md-content>
//         <md-divider ng-if="!$last"></md-divider>

//         `,
//         controller: resultCtrl
//       })

//   	$urlRouterProvider.otherwise('/');
//   })
//   .name


// function resultCtrl($scope, $state, $stateParams, searchService, $http){
//   $scope.keyword = $stateParams.keyword;
//   $scope.condition = $stateParams.selected;
//   console.log('$stateParams', $stateParams)
  
//   searchService.searchSong($scope.keyword, $scope.condition)
//             .then(response => {$scope.searchs = response
//               console.log('resultCtrl', $scope.searchs)
//             })


//   $scope.arrayBufferToBase64 = function(buffer) {
//     var binary = '';
//     var bytes = new Uint8Array(buffer);
//     var len = bytes.byteLength;
//     for (var i = 0; i < len; i++) {
//         binary += String.fromCharCode(bytes[i]);
//     }
//     var result = window.btoa(binary);

//     return result;
//   }

//   $scope.imgObj = {
//     "width" : "150px",
//     "margin-top" : '20px',
//     "margin-right" : '20px'
//   }

//   $scope.sendCart = function(title, artist, album, price){
//     return $http({
//       method: 'GET',
//       url: '/cart/:item',
//       params: {'title' : title, 'artist': artist, 'album': album, 'price': price }
//       // responseType: 'blob'
//     })
//   }
// }


  // export const searchModule = angular
  // .module('search', [ uiRouter, searchListModule ])
  // .component('search', searchComponent)
  // .value('EventEmitter', keyword => ({ $event : keyword }))
  // .service('searchService', searchService)
  // .config(($stateProvider, $urlRouterProvider) => {
  //   'ngInject';
  //   $stateProvider
  //     .state('searchSong', {
  //       url: '/search/:keyword',
  //       component: 'search',
  //       resolve: {
  //         formData: searchService => searchService.searchSong()
  //       }
  //     });

  //   $urlRouterProvider.otherwise('/');
  // })
  // .name