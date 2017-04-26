import angular from 'angular';
import { chartComponent } from './chart.component';
import { chartService } from './chart.service';
import './chart.scss';
import uiRouter from 'angular-ui-router';

export const chartModule = angular
  .module('chart', [ uiRouter ])
  .component('chart', chartComponent)
  .service('chartService', chartService)
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('chart', {
        url: '/chart',
        component: 'chart',
        resolve: {
          chartData: chartService => chartService.getCharts()
        } 
      });
   
    $urlRouterProvider.otherwise('/');
  })
  .name
