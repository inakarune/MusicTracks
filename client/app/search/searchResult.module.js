import angular from 'angular';
import { searchResultComponent } from './searchResult.component';
import { searchService } from './search.service';
import uiRouter from 'angular-ui-router';

export const searchResultModule = angular
  .module('searchResult', [ uiRouter ])
  .component('searchResult', searchResultComponent)
  .config(($stateProvider, $urlRouterProvider) => {
  	'ngInject';
  	$stateProvider

      .state('searchResults', {
        url: '/search-results/:keyword/:condition',
        component: 'searchResult'
      })

  	$urlRouterProvider.otherwise('/');
  })
  .name
