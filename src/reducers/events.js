import { ADD_EVENT, DELETE_EVENT, EDIT_EVENT } from "../actions";

const events = (state = [], action) => {
  switch (action.type) {
    // イベントを追加する
    case ADD_EVENT:
      const event = { name: action.name, comment: action.comment };
      const length = state.length;
      const id  = length === 0 ? 0 : state[length -1].id + 1;
      return [...state, { id, ...event }];

    // イベントを削除する
    case DELETE_EVENT:
      return state.filter(event => event.id !== action.id)
    
    // イベントを編集する
    case EDIT_EVENT:
      state.map((event) => {
        if (event.id === action.id) {
          event.name = action.name;
          event.comment = action.comment;
        }
        return event;
      });
      return state;

    default:
      return state;
  }
}

export default events;