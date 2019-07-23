(function () {
    var perfHub = $.connection.perfHub;
    $.connection.hub.loggin = true;
    $.connection.hub.start();


    perfHub.client.newMessage = function (message) {
        model.addMessage(message);
    }

    var Model = function () {
        var self = this;
        self.message = ko.observable("");
        self.messages = ko.observableArray();
    }
    //behaviour
    Model.prototype = {
        sendMessage: function () {
            var self = this;
            perfHub.server.send(self.message());
            self.message("");
        },
        addMessage: function (message) {
            var self = this;
            self.message.push(message);

        }

    }
    var model = new Model();

    (function () {
        ko.applyBindings(model);
    }())

}())