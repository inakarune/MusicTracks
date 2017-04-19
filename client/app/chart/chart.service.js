export class chartService {
  constructor($http) {
    'ngInject';
    this.$http = $http;
  }

  getCharts() {
    let params = {
      url: '/chart',
      method: 'GET'
    };
    return this.$http(params)
            .then(response => {
              console.log('chart::::', response.data)
              return response.data

            });
  }
};
