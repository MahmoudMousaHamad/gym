import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Random } from "meteor/random";

import { Notifications } from "../api/notifications";
import { Tools } from "../api/tools";

import './notifications.html';
import './newNotifications.html';

Template.newNotifications.onRendered(function(){
    $('.collapsible').collapsible();
    $('#modalInsertNotification').modal();
    $('select').css({'display': 'block', 'margin-top': '50px'});
});

Template.newNotifications.helpers({
    newNotifications(){
        return Notifications.find({read: false});
    },
});

Template.newNotifications.events({
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
    }
});

Template.newNotification.helpers({
    returnToolNumber(toolID){
        return Tools.findOne({_id: toolID}).toolNumber;
    },

    returnToolType(toolID){
        return Tools.findOne({_id: toolID}).type;
    },
});