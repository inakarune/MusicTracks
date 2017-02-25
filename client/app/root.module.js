import angular from 'angular';
import { rootComponent } from './root.component';
import './root.scss'
import { searchModule } from './search.module';
import { loginModule } from './auth/login.module';
import { chartModule } from './chart/chart.module';
import { homeModule } from './home.module';
import uiRouter from 'angular-ui-router';


export const root = angular
  .module('root', [ searchModule, loginModule, chartModule, uiRouter, homeModule ])
  .component('root', rootComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');
  })
  .name
  