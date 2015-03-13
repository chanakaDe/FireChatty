/**
 * Created by ChanakaDeSilva on 3/6/2015.
 */
function ChatController($scope, $timeout, messageService, $rootScope) {
    $scope.message = {};
    $scope.messages = [];

    var email = $rootScope.user;
    console.log(email.password.email);
    $scope.user_email = email.password.email;

    messageService.childAdded(function (addedChild) {
        $timeout(function () {
            $scope.messages.push(addedChild);
        });
    });

//    Send messages to the server
    $scope.sendMessage = function () {
        var newMessage = {
            text: $scope.message.text,
            email: email.password.email,
            uid: email.uid
        };
        messageService.saveMessage(newMessage);

        $scope.message = {
            text: ''
        }
    };

    $scope.turnFeedOff = function () {
        messageService.feedOff();
    };

    $scope.pageNext = function () {
        var lastItem = $scope.messages[$scope.messages.length - 1];
        messageService.pageNext(lastItem.name, 10).then(function (messages) {
            $scope.messages = messages;
        });
    };

    $scope.pageBack = function () {
        var firstItem = $scope.messages[0];
        messageService.pageBack(firstItem.name, 10).then(function (messages) {
            $scope.messages = messages;
        });
    };

}