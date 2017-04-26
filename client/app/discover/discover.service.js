export class discoverService {
  constructor ($http) {
    'ngInject';
    this.$http = $http;
  }

  getAlbums () {
    let param = {
      url: '/discover',
      method: 'GET',
      header: {
        authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`
      }
    };
    
    this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + window.sessionStorage.getItem('accessToken');
    return this.$http(param)
            .then(response => response.data);
  }
};
