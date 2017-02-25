import angular from 'angular';
import { searchComponent } from './search.component';

export const searchModule = angular
  .module('search', [ ])
  .component('search', searchComponent)
  .name