import angular from 'angular';
import { uploadComponent } from './upload.component';
import uiRouter from 'angular-ui-router';
import { uploadService } from './upload.service';
import './upload.scss';


export const uploadModule = angular
  .module('upload', [ uiRouter ])
  .component('upload', uploadComponent)
  .service('uploadService', uploadService)
  .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $stateProvider
      .state('upload', {
        url: '/upload',
        component: 'upload',
        resolve: {
          uploadData: uploadService => uploadService.getUploadedSongList()
        }
      });
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  })
  .name;
