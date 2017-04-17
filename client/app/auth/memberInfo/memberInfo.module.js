import angular from 'angular';
import { memberInfoComponent } from './memberInfo.component';
import uiRouter from 'angular-ui-router';



export const memberInfoModule = angular
  .module('memberInfoModule', [ uiRouter])
  .component('memberInfo', memberInfoComponent)
  .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $stateProvider
      .state('memeberInfo', {
        url: '/memberInfo',
        component: 'memberInfo'
      })
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  })
  .name