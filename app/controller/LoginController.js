/**
 * Created by ChanakaDeSilva on 3/6/2015.
 */
function LoginController($scope, $firebaseAuth, $window, $rootScope , $firebaseObject) {
    var fbRef = new Firebase(url);
    $scope.simpleLogin = $firebaseAuth(fbRef);
    $scope.errors = [];

    $scope.user = {
        email: '',
        password: ''
    };

    $scope.login = function () {
        console.log("Login Controller");
        $scope.errors = [];

        if ($scope.user.email === '') {
            $scope.errors.push('Enter Email');
            console.log('Enter Email');
            toast('Enter Email', 3000, 'rounded');
        }

        if ($scope.user.password === '') {
            $scope.errors.push('Enter Password');
            console.log('Enter Password');
            toast('Enter Password', 3000, 'rounded');
        }

        if ($scope.errors.length > 0) {
            return;
        }

        fbRef.authWithPassword({
            email: $scope.user.email,
            password: $scope.user.password
        }, function (error, authData) {
            if (error) {

                if (error.code === "INVALID_EMAIL") {
                    $scope.errors.push('INVALID EMAIL');
                    console.log("INVALID_EMAIL");
                    toast('INVALID_EMAIL', 3000, 'rounded');
                }
                if (error.code === "INVALID_PASSWORD") {
                    $scope.errors.push('INVALID PASSWORD');
                    console.log('INVALID PASSWORD');
                    toast('INVALID PASSWORD', 3000, 'rounded');
                }

            } else {
                console.log("Authenticated successfully with payload:", authData);
                $rootScope.user = authData;
                $window.location.href = "#/chat";
            }
        });
    };
}