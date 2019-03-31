import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
SimpleSchema.extendOptions(['autoform', 'denyInsert', 'denyUpdate'])

export const Gyms = new Mongo.Collection('gyms');

Gyms.allow({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

var GymSchema = new SimpleSchema({

    name:{type: String,},

    street:{type: String,},

    city:{type: String,},

    province:{type: String,},

    zip:{type: String,},

    country:{type: String,},

    brandColor: {
        type: String,
        autoform: {
            type: 'color',
        },
    },

    ownerID: { 
        type: String,
        optional: true,
        autoform: {
            type: 'hidden',
            label: false,
        },
        autoValue: function() {return this.userId},
     },

    tools: { 
        type: Array,
        optional: true,
        autoform: {
            type: 'hidden',
            label: false,
        },
     },

    'tools.$': { type: String },

    createdAt:{
        type: Date,
        autoform:{
            type: 'hidden',
            label: false,
        },
        defaultValue: new Date(),
    },

});

Gyms.attachSchema(GymSchema);