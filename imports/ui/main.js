import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Random } from "meteor/random";
import { ReactiveVar } from 'meteor/reactive-var'

import { Gyms } from "../api/gyms";
import { Tools } from "../api/tools";
import { Users } from "../api/users";

import '../ui/main.html';
import './userTools.html';

Template.main.helpers({
    hasGym() {
        return Meteor.user().gymID != null;
    },

    isActive(){
        console.log(Meteor.user());
        return Meteor.user().active;
    }
})

Template.main.events({
    'submit .insert-gym'(event) {
        event.preventDefault();

        const target = event.target;

        const _id = Random.id();
        const name = target.name.value;
        const street = target.street.value;
        const city = target.city.value;
        const province = target.province.value;
        const zip = target.zip.value;
        const country = target.country.value;
        const brandColor = target.brandColor.value;

        console.log(_id);

        Gyms.insert({
            _id,
            name,
            street,
            city,
            province,
            zip,
            country,
            brandColor,
        });

        Meteor.call('users.update.gymID', _id);

        Meteor.call('users.update.setActive', false);

        console.log("successfully submitted gym");

        console.log(Meteor.user());

        target.name.value = '';
        target.street.value = '';
        target.city.value = '';
        target.province.value = '';
        target.zip.value = '';
        target.country.value = '';
        target.brandColor.value = '';
    },
});

Template.userTools.onRendered(function() {
    $('#modal1').modal();
});

Template.userTools.helpers({
    userTools(){
        return Tools.find({gymID: Meteor.user().gymID}, {
            sort: { toolNumber: 1 },
        });
    },
});

Template.userTools.events({
    'submit .insert-tool'(event){
        event.preventDefault();

        const target = event.target;

        const _id = Random.id();
        const type = target.type.value;
        const toolNumber = target.toolNumber.value;
        const location = target.location.value;
        const gymID = Meteor.user().gymID;
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

Template.userTool.onCreated(function(){
    this.editMode = new ReactiveVar(false);
});

Template.userTool.helpers({
    editMode(){
        return Template.instance().editMode.get();
    },
});

Template.userTool.events({
    'click .edit-toggle'(event, template){
        template.editMode.set(!template.editMode.get());
    },

    'submit .update-tool'(event, template){
        event.preventDefault();

        const target = event.target;

        const type = target.type.value;
        const toolNumber = target.toolNumber.value;
        const location = target.location.value;

        Tools.update(this._id, {
            $set: {
                type,
                toolNumber,
                location
            },
        });

        template.editMode.set(!template.editMode.get());
    },
})