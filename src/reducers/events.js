import { ADD_EVENT, DELETE_EVENT, EDIT_EVENT } from "../actions";

const events = (state = [], action) => {
  switch (action.type) {
    // イベントを追加する
    case ADD_EVENT:
      const event = { name: action.name, tag1: action.tag1, tag2: action.tag2, comment: action.comment, url: action.url, date: action.date.toLocaleDateString() };
      const length = state.length;
      const id  = length === 0 ? 1 : state[length -1].id + 1;
      return [...state, { id, ...event }];

    // イベントを削除する
    case DELETE_EVENT:
      const afterDelete = state.filter(event => event.id !== action.id);
      return afterDelete;
    
    // イベントを編集する
    case EDIT_EVENT:
      state.map((event) => {
        if (event.id === action.id) {
          event.name = action.name;
          event.tag1 = action.tag1;
          event.tag2 = action.tag2;
          event.comment = action.comment;
          event.url = action.url;
          if (event.date !== action.date) {
            event.date = action.date.toLocaleDateString();
          } else {
            event.date = action.date;
          }
        }
        return event;
      });
      return state;

    default:
      return state;
  }
}

export default events;