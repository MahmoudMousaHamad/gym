import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Random } from "meteor/random";

import { Gyms } from "../api/gyms";
import { Tools } from "../api/tools";
import { Notifications } from "../api/notifications";


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
    },
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

    'click .update-active'(){
        Meteor.users.update(Meteor.userId(), {
            $set: {
                active: !Meteor.user().active,
            },
        });
    },
});

Template.tool.onRendered(function(){
    $('.collapsible').collapsible();

});

Template.tool.helpers({
    returnNotifyLink(){ 
        return `https://notifystaff-6586.nodechef.com/${this.gymID}/${this._id}/notify`;
    },
    notifications(toolID){
        return Notifications.find({toolID: toolID});
    },
});

Template.tool.events({
    'submit .update-tool'(event){
        event.preventDefault();

        const target = event.target;

        const type = target.type.value;
        const toolNumber = target.toolNumber.value;
        const location = target.location.value;
        const code = target.code.value;

        Tools.update(this._id, {
            $set: {
                type,
                toolNumber,
                location,
                code
            },
        });
    },

    'click .remove-tool'(){
        Tools.remove(this._id);
    }
})

Template.toolNotification.helpers({
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