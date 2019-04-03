import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";

import './body.html';
import './main';
import './navigation.html';
import './userNotifications.html';
import './admin.html';
import './outsideUserLayout.html';
import "./error.html";
import './notify.html';
import '../router';

import './notifications';
import './admin';
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

