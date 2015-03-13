/**
 * Created by ChanakaDeSilva on 3/6/2015.
 */
function SignupController($scope, $firebaseAuth, $window) {
    var fbRef = new Firebase(url);
    $scope.simpleLogin = $firebaseAuth(fbRef);
    $scope.errors = [];
    $scope.registerUser = {
        email: '',
        password: '',
        confirmPassword: ''
    };

    $scope.register = function () {

        var errors = [];
        if ($scope.registerUser.email === '') {
            errors.push('Please Enter an email');
            console.log("Please Enter an email");
            toast('Please Enter an email', 3000, 'rounded');
        }

        if ($scope.registerUser.password === '') {
            errors.push('Password must not be blank');
            console.log("Password must not be blank");
            toast('Password must not be blank', 3000, 'rounded');
        }

        else if ($scope.registerUser.password != $scope.registerUser.confirmPassword) {
            errors.push('Passwords must match');
            console.log("Passwords must match");
            toast('Passwords must match', 3000, 'rounded');
        }

        if (errors.length > 0) {
            $scope.error = errors;
            return;
        }


        fbRef.createUser({
            email: $scope.registerUser.email,
            password: $scope.registerUser.password
        }, function (error, userData) {
            if (error) {
                switch (error.code) {
                    case "EMAIL_TAKEN":
                        console.log("The new user account cannot be created because the email is already in use.");
                        toast("EMAIL_TAKEN", 3000, 'rounded');
                        break;
                    case "INVALID_EMAIL":
                        console.log("The specified email is not a valid email.");
                        toast("INVALID_EMAIL", 3000, 'rounded');
                        break;
                    default:
                        console.log("Error creating user:", error);
                        toast("Error creating user", 3000, 'rounded');
                }
            } else {
                console.log("Successfully created user account with uid:", userData.uid);
                toast("Successfully created user account", 3000, 'rounded');
                $window.location.href = "#/";
            }
        });
    };


}