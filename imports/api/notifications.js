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
        defaultValue: false,
    },

    done: {
        type: Boolean,
        defaultValue: false,
    },

    locationByUser: {
        type: String,
        autoValue: "not given",
    },

    toolID: {
        type: String,
    },

    gymID: {
        type: String
    },

    createdAt:{
        type: Date,
        defaultValue: new Date(),
    },

});

Notifications.attachSchema(NotificationSchema);
