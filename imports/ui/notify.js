import { Meteor } from "meteor/meteor";
import { Template } from 'meteor/templating';
import { Random } from "meteor/random";

import { Notifications } from "../api/notifications";
import { Tools } from "../api/tools";
import { Gyms } from "../api/gyms";

import './notify.html';

paramsValid = function(gymID, toolID){
    const gymExists = Gyms.findOne({_id: gymID}) ? true : false;
    const toolExists = Tools.findOne({_id: toolID}) ? true : false;

    return gymExists & toolExists;
};

Template.notify.helpers({
    gymName(){
        const controller = Iron.controller();
        return Gyms.findOne({_id: controller.params.gymID}).name;
    }
});

Template.notify.events({
    'submit .notify'(event) {
        event.preventDefault();

        const controller = Iron.controller();

        const target = event.target;
        const _id = Random.id();
        const notifierFN = target.notifierFN.value;
        const notifierLN = target.notifierLN.value;
        const comment = target.comment.value;
        const read = false;
        const done = false;
        const locationByUser = target.locationByUser.value;
        const toolID = controller.params.toolID;
        const gymID = controller.params.gymID;

        if (!paramsValid(gymID, toolID)) {
            Router.go('/error');
            throw new Meteor.Error("Can't find gym and/or tool instance", "Can't find the gym or the tool");
        }
        
        Notifications.insert({
            _id,
            notifierFN,
            notifierLN,
            comment,
            read,
            done,
            locationByUser,
            toolID,
            gymID,
        });

        Tools.update({ _id: toolID }, {
            $push: {
                'notifications': _id,
            },
        });

        target.notifierFN.value = "";
        target.notifierLN.value = "";
        target.comment.value = "";
        target.locationByUser.value = "";

        Router.go(`/staffNotified/${_id}`);
    },
});

