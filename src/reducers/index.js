import { combineReducers } from "redux";
import events from "./events";
import readings from "./readings";

export default combineReducers({ events, readings });
