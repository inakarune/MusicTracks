export class uploadService {
	constructor($http) {
		'ngInject';
		this.$http = $http;
	}

	insertSong(files){
		let fileData = new FormData();
		for(let obj in files){
			fileData.append('userfile', files[obj]);
			fileData.append('name', files[obj]);
		}

        this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + window.sessionStorage.getItem('accessToken');
		return this.$http
                .post('/upload', fileData, {
            	   transformRequest: angular.identity,
            	   headers: { 'Content-Type': undefined }
        		})
        		.success(response => {
            	   return response;
                })
                .error(() => {
                    throw new Error('upload Error');
                });
	}

    getUploadedSongList(){
        this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + window.sessionStorage.getItem('accessToken');
        return this.$http
            .get('/getUploadedSongList')
            .success(response => {
                return response;
            })
            .error(() => {
                throw new Error('upload Error');
            });
    }
	
};
