import angular from 'angular';
import { rootComponent } from './root.component';
import './root.scss'
import { searchModule } from './search/search.module';
import { authModule } from './auth/auth.module';
import { chartModule } from './chart/chart.module';
import { homeModule } from './home/home.module';
import { uploadModule } from './upload.module';
import { cartModule } from './cart/cart.module';
import { discoverModule } from './discover/discover.module';
import { bottomModule } from './footer/bottom.module';
import { navbarModule } from './nav/navbar.module';
import uiRouter from 'angular-ui-router';

export const root = angular
  .module('root', [ 
                     searchModule, 
                     authModule, 
                     chartModule, 
                     uiRouter, 
                     homeModule, 
                     uploadModule,
                     cartModule,
                     discoverModule,
                     bottomModule,
                     navbarModule
  ])
  .component('root', rootComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');  
  })
  .name
  