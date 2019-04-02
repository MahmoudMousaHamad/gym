import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";

import { Gyms } from "../api/gyms";
import { Tools } from "../api/tools";

import './admin.html';


Template.admin.onCreated(function(){
    Meteor.subscribe('userData');
    Meteor.subscribe('gyms.allGyms');
    Meteor.subscribe('tools.allTools');
    Meteor.subscribe('notifications.allNotifications');
});

Template.admin.onRendered(function(){
    $('.collapsible').collapsible();
});

Template.admin.helpers({
    users(){
        return Meteor.users.find({}, {
            sort:{
                createdAt: -1,
            },
        });
    }
});

Template.user.onRendered(function(){
    $('#modalInsertTool').modal();
    $('.collapsibleTools').collapsible();
});

Template.user.helpers({
    returnGymName(userID){
        return Gyms.findOne({ownerID: userID}).name;
    },

    returnEmail(userID){
        return Meteor.users.findOne({_id: userID}).emails[0].address;
    },

    tools(userID){
        return Tools.find({gymID: Gyms.findOne({ownerID: userID})._id});
    },
});

Template.user.events({
    'submit .modal-content'(event){
        event.preventDefault();

        const target = event.target;

        const _id = Random.id();
        const type = target.type.value;
        const toolNumber = target.toolNumber.value;
        const location = target.location.value;
        const gymID = target.gymID.value;
        const code = target.code.value;
        var notifications = [];

        notifications.push

        Tools.insert({
            _id,
            type,
            toolNumber,
            location,
            code,
            gymID,
            notifications,
        });

        target.type.value = "";
        target.toolNumber.value = "";
        target.location.value = "";
        target.code.value = "";
    },
});