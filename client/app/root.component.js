import templateUrl from './root.html';
export const rootComponent = {
  templateUrl,
  controller: class rootComponent {
    constructor($rootScope){
      'ngInject'
    }
  }
}
