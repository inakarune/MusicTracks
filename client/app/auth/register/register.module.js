import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { registerComponent } from './register.component';


export const registerModule = angular
  .module('registerModule', [ uiRouter ])
  .component('register', registerComponent)
  .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $stateProvider
      .state('register', {
        url: '/register',
        component: 'register'
      })
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  })
  .name