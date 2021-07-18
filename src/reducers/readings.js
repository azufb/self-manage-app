import { ADD_READINGS } from "../actions";

const readings = (state = [], action) => {
  switch (action.type) {
    case ADD_READINGS:
      const reading = {title: action.title, selectedDate: action.selectedDate.toLocaleDateString()}//ja-JP
      const length = state.length;
      const id  = length === 0 ? 1 : state[length -1].id + 1;
      return [...state, { id, ...reading }];
    
    default:
      return state;
  }
}

export default readings;