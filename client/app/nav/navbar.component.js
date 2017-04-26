import templateUrl from './navbar.html';
export const navbarComponent = {
  templateUrl,
  controller: function ($scope, $http) {
    $scope.onLogin = false;
    $scope.userName = '';
    $scope.userImg = '';
    $scope.profileStyle = {
      "width": "40px",
      "border-radius": "50%",
      "margin-right": "10px"
    };
    $scope.nameStyle = {
      "font-size": "16px",
      "font-weight": "bold",
      "margin-right": "20px"
    };

    function onSignIn (googleUser) {
      var profile = googleUser.getBasicProfile();
      $scope.onLogin = true;
      $scope.userName = profile.getName();
      $scope.userImg = profile.getImageUrl();
      var params = {
        url: '/login',
        method: 'POST',
        data: {
          name: profile.getName(),
          email: profile.getEmail()
        }
      };

      $http(params)
        .success(function (data) {
          window.sessionStorage.setItem('accessToken', data.accessToken);
        })
        .error(function () {
          throw new Error('Token Error');
        });
   }

   function signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
        $scope.onLogin = false;
        $scope.userName = '';
        $scope.userImg = '';
      });
    }

    window.onSignIn = onSignIn;
    window.signOut = signOut;
  }
};
