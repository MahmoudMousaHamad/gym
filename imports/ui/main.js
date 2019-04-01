import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Random } from "meteor/random";

import { Gyms } from "../api/gyms";
import { Tools } from "../api/tools";
import { Users } from "../api/users";

import '../ui/main.html';
import './userTools.html';

Template.main.helpers({
    hasGym() {
        return Meteor.user().gymID != null;
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
        return Tools.find({gymID: Meteor.user().gymID});
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
        var notifications = [];

        notifications.push

        Tools.insert({
            _id,
            type,
            toolNumber,
            location,
            gymID,
            notifications
        });

        console.log(Tools.findOne({_id: _id}));

        target.type.value = "";
        target.toolNumber.value = "";
        target.location.value = "";
    }
})