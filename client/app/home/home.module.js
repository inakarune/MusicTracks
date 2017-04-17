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
        resolve: {
          isAuth: function($http, $state){
            return $http({
              method: 'GET',
              url: '/'
            })
            // .success(function(data){
            //   console.log('home',data)
            //   return data
            // })
            .error(function(data, status){
              
              $state.go('login');
            })
          }
        }
      })
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  })
  .name