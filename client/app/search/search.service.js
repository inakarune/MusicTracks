export class searchService {
	constructor($http) {
		'ngInject';
		this.$http = $http;
	}

	searchSong(keyword, selected){
    this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + window.sessionStorage.getItem('accessToken');
		console.log('   getSearches(keyword) =>>>>>>>.', keyword, selected);
        return this.$http({
          method: 'GET',
          url: '/search/:keyword/:condition',
          params: {'keyword': keyword, 'condition': 'title'}
        })
        .then(function (resp) {
            console.log('return data from server ==>>>>>>>>>> ', resp);
            return resp.data;
        });
	}
};
