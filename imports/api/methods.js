import { Users } from "./users";

Meteor.methods({
    'users.update.gymID'(gymID) {
        Users.update({ _id: this.userId }, {
            $set: {
                gymID: gymID,
            },
        });
    },
    
    'users.update.setActive'(bool) {
        Users.update({ _id: this.userId }, {
            $set: {
                active: bool,
            },
        });
    }
});