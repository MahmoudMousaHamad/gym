import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";

import './body.html';
import './navigation.html';

import '../router';
import './main';
import '../ui/main.html';
import './gyms';

Template.registerHelper('formatDate', function(date){
    return moment(date).format('MMM Do YYYY');
});

Template.body.onCreated(function bodyOnCreated(){
    Meteor.subscribe("userData");
    Meteor.subscribe("tools.allTools");
});

