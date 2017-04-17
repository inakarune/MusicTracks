import angular from 'angular';
import { authComponent } from './auth.component';
import uiRouter from 'angular-ui-router';
import { registerModule } from './register/register.module';
import { loginModule } from './login/login.module';


export const authModule = angular
  .module('authModule', [ uiRouter, registerModule, loginModule ])
  .component('auth', authComponent)
  .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $stateProvider
      .state('auth', {
        url: '/login',
        component: 'auth'
      })
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  })
  .name