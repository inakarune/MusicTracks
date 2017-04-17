import angular from 'angular';
import { discoverComponent } from './discover.component';
import { discoverService } from './discover.service';
import './discover.scss';

export const discoverModule = angular
  .module('discoverModule', [ ])
  .component('discover', discoverComponent)
  .service('discoverService', discoverService)
  .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $stateProvider
      .state('discover', {
        url: '/discover',
        component: 'discover',
        resolve: {
          serverData: discoverService => discoverService.getAlbums()
        }
      })
    
    $urlRouterProvider.otherwise('/');
  })
  .name