export class searchService {
	constructor($http) {
		'ngInject';
		this.$http = $http;
	}

	searchSong(keyword, selected){
    this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + window.sessionStorage.getItem('accessToken');
      return this.$http({
        method: 'GET',
        url: '/search/:keyword/:condition',
        params: { 'keyword': keyword, 'condition': 'title' }
      })
      .then(function (response) {
        return response.data;
      });
	}
};
