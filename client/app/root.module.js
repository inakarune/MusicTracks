import angular from 'angular';
import './root.scss'
import { rootComponent } from './root.component';
import { searchModule } from './search/search.module';
import { chartModule } from './chart/chart.module';
import { homeModule } from './home/home.module';
import { uploadModule } from './upload.module';
import { cartModule } from './cart/cart.module';
import { discoverModule } from './discover/discover.module';
import { navbarModule } from './nav/navbar.module';
import uiRouter from 'angular-ui-router';

export const root = angular
  .module('root', [ 
                     searchModule, 
                     chartModule, 
                     uiRouter, 
                     homeModule, 
                     uploadModule,
                     cartModule,
                     discoverModule,
                     navbarModule,
  ])
  .component('root', rootComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');  
  })
  .name
  