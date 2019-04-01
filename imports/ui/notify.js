import './notify.html';
import { Template } from 'meteor/templating';
import { Random } from "meteor/random";

import { Notifications } from "../api/notifications";
import { Tools } from "../api/tools";

Template.notify.onCreated(function(){

});

Template.notify.helpers({
    gymID(){
        return Iron.controller().params.gymID;
    },

    toolID(){
        return Iron.controller().params.toolID;
    },
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
    },
})