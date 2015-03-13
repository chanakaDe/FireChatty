/**
 * Created by ChanakaDeSilva on 3/7/2015.
 */
function LogoutController($scope, $firebaseAuth, $window) {
    var fbRef = new Firebase(url);
    $scope.simpleLogin = $firebaseAuth(fbRef);
    fbRef.unauth();
    $window.location.href = "#/";
}