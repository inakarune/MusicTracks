import angular from 'angular';
import { navbarComponent } from './navbar.component';

export const navbarModule = angular
  .module('navbarModule', [ ])
  .component('navbar', navbarComponent)
  .config(($urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');
  })
  .name;
