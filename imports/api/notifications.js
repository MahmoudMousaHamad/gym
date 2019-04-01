import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

SimpleSchema.extendOptions(['autoforms']);

export const Notifications = new Mongo.Collection('notifications');

Notifications.allow({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

var NotificationSchema = new SimpleSchema({

    notifierFN:{
        type: String,
        defaultValue: "not given",
    },

    notifierLN:{
        type: String,
        defaultValue: "not given",
    },

    comment:{
        type: String,
    },

    read: {
        type: Boolean,
        autoform:{
            type: 'hidden',
            label: false,
        },
        defaultValue: false,
    },

    done: {
        type: Boolean,
        autoform:{
            type: 'hidden',
            label: false,
        },
        defaultValue: false,
    },

    locationByUser: {
        type: String,
        autoValue: "not given",
    },

    toolID: {
        type: String,
        autoform:{
            label: 'Tool',
            type: 'select',
            options: function () {
                return Tools.find().map(function(p) {
                    return {label: `${p.toolNumber} ${p.type}`, value: p._id};
                });
            },
        }
    },

    gymID: {
        type: String
    },

    createdAt:{
        type: Date,
        autoform:{
            type: 'hidden',
            label: false,
        },
        defaultValue: new Date(),
    },

});

Notifications.attachSchema(NotificationSchema);
