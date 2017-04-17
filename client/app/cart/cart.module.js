import angular from 'angular';
import { cartComponent } from './cart.component';
import uiRouter from 'angular-ui-router';
import './cart.scss'


export const cartModule = angular
  .module('cart', [ uiRouter ])
  .component('cart', cartComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state('cart', {
        url: '/cart',
        component: 'cart',
        resolve: {
          cartObj : function($http){
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + window.sessionStorage.getItem('accessToken');
            return $http({
              method: 'GET', 
              url: '/cart', 
              header: {
                authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`
              }
            })
            .then(function(response){
              console.log('cartmodule', response)
              return response;
            });
          }
        }
      });
   
    $urlRouterProvider.otherwise('/');
  })
  .name;
