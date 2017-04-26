import angular from 'angular';
import './search.scss';
import { searchComponent } from './search.component';
import { searchService } from './search.service';
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
      });
    $urlRouterProvider.otherwise('/');
  })
  .name
