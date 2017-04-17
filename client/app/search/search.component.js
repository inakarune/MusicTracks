import templateUrl from './search.html'
export const searchComponent = {
	bindings: {
		keyword: '<',
		searchFile: '&'
	},

  templateUrl,

  controller: class searchComponent {
    constructor(EventEmitter, searchService, $state){
      'ngInject'
      this.EventEmitter = EventEmitter;
      this.searchService = searchService;
      this.$state = $state;
    }

    $oninit(){
    	this.keyword = '';
    	this.singleSelect = 'title';	
    }

    $onChanges(changes){
    	if(changes.keyword){
    		this.keyword = angular.copy(this.keyword);
    	} 
      // else if(changes.singleSelect){
      //       this.singleSelect = angular.copy(this.singleSelect);
            
      //   }
    }

    onSubmit(){
    	if(!this.keyword){
    		return ;
    	}
      
    	console.log('searchComponent.singleSelect', this.singleSelect)
    	this.searchFile(
    		this.EventEmitter({
    			keyword: this.keyword,
    			selected: 'title'//this.singleSelect
    		})
    	)
        this.search();
    	// this.getFile()

    }

    search(){
        this.$state.transitionTo('searchResults', {
            keyword: this.keyword,
            condition: 'title'//this.singleSelect
        }, {
            reload: true,
            notify: true
        })
    }


	// getFile(){
 //        this.searchService.searchSong(this.keyword, this.singleSelect)
 //            .then(response => this.searchs = response)
 //    }



}



  
}
