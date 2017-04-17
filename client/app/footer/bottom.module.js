import angular from 'angular';
import { bottomComponent } from './bottom.component';

export const bottomModule = angular
  .module('bottomModule', [ ])
  .component('bottom', bottomComponent)
  .name