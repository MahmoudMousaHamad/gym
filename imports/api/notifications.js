import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

SimpleSchema.extendOptions(['autoforms']);

export const Notifications = new Mongo.Collection('notification');

Notifications.allow({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

var NotificationSchema = new SimpleSchema({

    notifierFN:{
        type: String,
    },

    notifierLN:{
        type: String,
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

    done: {
        type: Boolean,
        autoform:{
            type: 'hidden',
            label: false,
        },
        defaultValue: false,
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
