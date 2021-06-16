import { ADD_EVENT, DELETE_EVENT, EDIT_EVENT } from "../actions";

const events = (state = [], action) => {
  switch (action.type) {
    // イベントを追加する
    case (ADD_EVENT):
      const event = { name: action.name, comment: action.comment };
      const length = state.length;
      const id  = length === 0 ? 1 : state[length -1].id + 1;
      return [...state, { id, ...event }];

    // イベントを削除する
    case (DELETE_EVENT):
      return state.filter(event => event.id !== action.id)
    
    // イベントを編集する
    case (EDIT_EVENT):
      /*
      編集ボタンが押されたら、編集するためのinputエリアを表示する。
      inputの中には、最初は、元のイベント名やコメントが入っている。
      書き換えて、保存ボタンを押すことで変更ができる。

      編集ボタン＝inputエリアを表示するためのボタン
      保存ボタン＝イベントを編集し、配列の中身を書き換える
      */
      const copiedEvents = state.slice();
      const replaceEvent = { id: action.id, name: action.name, comment: action.comment }
      copiedEvents.splice((action.id -1), 1, { ...replaceEvent }); // 配列のインデックス番号を使う。eventのidではないよ！
      return copiedEvents;

    default:
      return state;
  }
}

export default events;