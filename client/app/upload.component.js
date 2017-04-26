import templateUrl from './upload.html';

export const uploadComponent = {
	bindings: {
		song: '<',
    uploadData: '<',
	},

  templateUrl,

  controller: class uploadComponent {
    constructor(EventEmitter, uploadService){
      'ngInject'
      this.EventEmitter = EventEmitter;
      this.uploadService = uploadService;
      this.alert = false;
      this.imgObj = {
        "width": "50px"
      };
      this.progress = false;
    }

    $onChanges(changes){
    	if(changes.song){
    		this.song = angular.copy(this.song);
    	}

      if(changes.alert){
        this.alert = angular.copy(this.alert);
      }

      if (changes.uploadData) {
        this.fileData = Object.assign({}, this.uploadData);
        var array = [];
        
        for(let key in this.fileData.data){
          array.push(this.fileData.data[key]);
        }
        this.fileData = array;
      }

      if(changes.progress){
        this.progress = angular.copy(this.progress);
      }
    }

    onSubmit(e){
      let files = document.getElementById('fff').files;
      this.song = files;

    	if(!this.song){
    		return ;
    	}

      this.progress = true;
      this.uploadService.insertSong(this.song)
        .then(res => {
          if(res.data.message === 'success upload!'){
            this.alert = true;
            this.progress = false;
          }
        });
    }
  }
}
