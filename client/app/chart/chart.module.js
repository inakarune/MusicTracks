import angular from 'angular';
import { chartComponent } from './chart.component';
import uiRouter from 'angular-ui-router';


export const chartModule = angular
  .module('chart', [ uiRouter ])
  .component('chart', chartComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('chart', {
        url: '/chart',
        component: 'chart'
      })
   
    $urlRouterProvider.otherwise('/');
  })
  .name