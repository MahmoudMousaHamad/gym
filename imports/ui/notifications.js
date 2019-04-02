import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Random } from "meteor/random";

import { Notifications } from "../api/notifications";
import { Tools } from "../api/tools";

import './notifications.html';
import './userNotifications.html';
import { Gyms } from "../api/gyms";

Template.userNotifications.onRendered(function(){
    $('.collapsible').collapsible();
    $('#modalInsertNotification').modal();
    $('select').css({'display': 'block', 'margin-top': '50px'});
});

Template.userNotifications.helpers({
    userNotifications(){
        const gymID = Gyms.findOne({ownerID: Meteor.userId()})._id;
        return Notifications.find({
            gymID: gymID,
        }, {
            sort: {createdAt: -1},
        });
    },

    hasNotifications(){
        return Notifications.find({
            gymID: Meteor.userId().gymID,
        }, {
            sort: {createdAt: -1},
        }).length != 0;
    },
});

Template.userNotifications.events({
    "submit .insert-notification"(event){
        event.preventDefault();

        const target = event.target;
        const _id = Random.id();
        const notifierFN = target.notifierFN.value;
        const notifierLN = target.notifierLN.value;
        const comment = target.comment.value;
        const toolID = target.toolID.value;
        const read = false;
        
        Notifications.insert({
            _id,
            notifierFN,
            notifierLN,
            comment,
            read,
            toolID
        });

        Tools.update({ _id: toolID }, {
            $push: {
                'notifications': _id,
            },
        });
    },
});

Template.userNotification.helpers({
    returnToolNumber(toolID){
        return Tools.findOne({_id: toolID}).toolNumber;
    },

    returnToolType(toolID){
        return Tools.findOne({_id: toolID}).type;
    },

    returnToolLocation(toolID){
        return Tools.findOne({_id: toolID}).location;
    },
});

Template.userNotification.events({
    'click .mark-read'(event){
        
        Notifications.update(this._id, {
            $set: {
                read: ! this.read,
            },
        });
    },

    'click .mark-done'(event){
        
        Notifications.update(this._id, {
            $set: {
                done: ! this.done,
            },
        });
    },
})