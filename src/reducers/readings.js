import { ADD_READINGS, DELETE_READING, EDIT_READING } from "../actions";

const readings = (state = [], action) => {
  switch (action.type) {
    case ADD_READINGS:
      const reading = {title: action.title, author: action.author, selectedDate: action.selectedDate.toLocaleDateString(), comment: action.comment}//ja-JP
      const length = state.length;
      const id  = length === 0 ? 1 : state[length -1].id + 1;
      return [...state, { id, ...reading }];
    
    case DELETE_READING:
      // 削除ボタンをクリックしたidと異なるidを持つ要素のみで新たな配列を作成し、返す。
      return state.filter(reading => reading.id !== action.id);

    case EDIT_READING:
      state.map((reading) => {
        if (reading.id === action.id) {
          reading.title = action.title;
          reading.author = action.author;
          reading.selectedDate = action.selectedDate.toLocaleDateString();
          reading.comment = action.comment;
        }
        return reading;
      });

      return state;

    default:
      return state;
  }
}

export default readings;