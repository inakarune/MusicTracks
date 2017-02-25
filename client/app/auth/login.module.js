import angular from 'angular';
import { loginComponent } from './login.component';
import uiRouter from 'angular-ui-router';



export const loginModule = angular
  .module('login', [ uiRouter])
  .component('login', loginComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('login', {
        url: '/login',
        component: 'login'
      })
    $urlRouterProvider.otherwise('/');
  })
  .name