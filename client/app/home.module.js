import angular from 'angular';
import { homeComponent } from './home.component';
import uiRouter from 'angular-ui-router';



export const homeModule = angular
  .module('loginModule', [ uiRouter])
  .component('home', homeComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('main', {
        url: '/',
        component: 'home'
      })
    $urlRouterProvider.otherwise('/');
  })
  .name