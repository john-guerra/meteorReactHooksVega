import React, { useState, useRef } from "react";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";

import NavBar from "./NavBar";

import { Players } from "../api/players.js";

import ScoreBoard from "./ScoreBoard";

const App = props => {
  const [name, setName] = useState("");
  const [isPlaying, setPlaying] = useState(false);
  const [err, setErr] = useState("");
  const inRef = useRef();

  const onChangeName = () => {
    setName(inRef.current.value);
  };

  const onKeyPress = evt => {
    if (evt.key === "Enter") {
      Meteor.call("players.insert", name, (err, res) => {
        if (err) {
          setErr(err);
          return;
        }
        inRef.current.value = "";
        console.log("Added", name);
        setPlaying(true);
      });
      console.log("Enter name!", name);
    }
  };

  const onVote = () => {
    Meteor.call("players.vote", name);
  };

  return (
    <div>
      <NavBar></NavBar>
      <h1>Voting app</h1>
      <div>{err}</div>
      {Meteor.user() ? (
        <div>Hola {Meteor.user().username}</div>
      ) : (
        <div>Please log in</div>
      )}

      <div className="row">
        <div className="col-4">
          {isPlaying ? (
            <button onClick={onVote}>Vote</button>
          ) : (
            <label>
              Please enter your name:
              <input
                value={name}
                ref={inRef}
                onChange={onChangeName}
                onKeyPress={onKeyPress}
                type="text"
                placeholder="name"
              />
            </label>
          )}
        </div>
        <div className="col-8">
          <ScoreBoard players={props.players}></ScoreBoard>
        </div>
      </div>
    </div>
  );
};

App.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  user: PropTypes.object.isRequired
};

const wT1 = () => {
  Meteor.subscribe("players");

  return {
    user: Meteor.user(),
    players: Players.find({}).fetch()
  };
};

const AppWrapper = withTracker(wT1)(App);

export default AppWrapper;
