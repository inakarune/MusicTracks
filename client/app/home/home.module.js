import angular from 'angular';
import { homeComponent } from './home.component';
import uiRouter from 'angular-ui-router';

export const homeModule = angular
  .module('homeModule', [ uiRouter ])
  .component('home', homeComponent)
  .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $stateProvider
      .state('main', {
        url: '/',
        component: 'home',
      });
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  })
  .name
  