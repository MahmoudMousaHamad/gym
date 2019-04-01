import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";

import './body.html';
import './navigation.html';

import '../router';
import './main';
import '../ui/main.html';
import './gyms';
import './notifications';
import './notify';

Template.registerHelper('formatDate', function(date){
    return moment(date).format('MMM Do YYYY');
});

Template.body.onCreated(function bodyOnCreated(){
    Meteor.subscribe("userData");
    Meteor.subscribe("tools.allTools");
    Meteor.subscribe("notifications.allNotifications");
    Meteor.subscribe("gyms.allGyms");
});

