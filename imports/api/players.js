import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Players = new Mongo.Collection("players");

if (Meteor.isServer) {
  Meteor.publish("players", () => {
    return Players.find({});
  });
}

Meteor.methods({
  "players.insert"(name) {
    // Validate

    Players.upsert(
      {
        name
      },
      {
        name,
        votes: 1
      }
    );
  },
  "players.vote"(name) {
    Players.update(
      {
        name
      },
      {
        $inc: { votes: 1 }
      }
    );
  }
});
