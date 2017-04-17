import templateUrl from './auth.html'
export const authComponent = {
  templateUrl,
  controller: class authComponent {
    constructor(){
      'ngInject'
    }

    openModal(id){
      ModalService.Open(id);
    }

    closeModal(id){
      ModalService.Close(id);
    }
  }
}
