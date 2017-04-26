import templateUrl from './search.html';

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
    }

    onSubmit(){
    	if(!this.keyword){
    		return ;
    	}
      
    	this.searchFile(
    		this.EventEmitter({
    			keyword: this.keyword,
    			selected: 'title'
    		})
    	)
        this.search();
    }

    search(){
        this.$state.transitionTo('searchResults', {
            keyword: this.keyword,
            condition: 'title'
        }, {
            reload: true,
            notify: true
        });
    }
  }
};
