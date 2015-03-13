/**
 * Created by ChanakaDeSilva on 2/24/2015.
 */

module.factory('messageService', function ($q, $firebaseObject) {

    var messagesRef = new Firebase(url).child('messages');

    var fireMessage = $firebaseObject(messagesRef);


    var messageService = {

        saveMessage: function childAdded(snapshot) {
            messagesRef.push(snapshot);
        },
        childAdded: function childAdded(cb) {
            messagesRef.limitToLast(5).on('child_added', function (snapshot) {
                var val = snapshot.val();
                cb.call(this, {
                    text: val.text,
                    name: snapshot.name(),
                    email: val.email
                });
            });
        },
        feedOff: function feedOff() {
            messagesRef.off();
        },
        pageNext: function pageNext(name, numberOfItems) {
            var deferred = $q.defer();
            var messages = [];

            messagesRef.startAt(null, name).limit(numberOfItems).once('value', function (snapshot) {
                snapshot.forEach(function (snapItem) {
                    var itemVal = snapItem.val();
                    itemVal.name = snapItem.name();
                    messages.push(itemVal);
                });
                deferred.resolve(messages);
            });

            return deferred.promise;
        },
        pageBack: function pageBack(name, numberOfItems) {
            var deferred = $q.defer();
            var messages = [];

            messagesRef.endAt(null, name).limit(numberOfItems).once('value', function (snapshot) {
                snapshot.forEach(function (snapItem) {
                    var itemVal = snapItem.val();
                    itemVal.name = snapItem.name();
                    messages.push(itemVal);
                });
                deferred.resolve(messages);
            });

            return deferred.promise;
        }
    };
    return messageService;
})
;