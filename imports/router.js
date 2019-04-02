import { Meteor } from "meteor/meteor";
import { Notifications } from "./api/notifications";


Router.route('/', function(){
    this.layout('layout');
    this.render('main');
});

Router.route('/error', function(){
    this.layout('outsideUserlayout');
    this.render('error');
});

Router.route('/notifications', function(){
    this.layout('layout');
    this.render('userNotifications');
});

Router.route('/:gymID/:toolID/notify/', function(){
    var gymID = this.params.gymID;
    var toolID = this.params.gymID;

    this.layout('outsideUserlayout');
    this.render('notify');
});

Router.route('/staffNotified/:notificationID', function() {
    this.layout('outsideUserlayout');
    this.render('staffNotified', {
        data: function(){
            return Notifications.findOne({_id: this.params.notificationID});
        }
    });
});

Router.route('/admin', function(){
    this.layout('layout');
    this.render('admin');
});

