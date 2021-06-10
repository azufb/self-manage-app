import React, {useState, useEffect} from 'react';
import './App.css';
import firebase from 'firebase';
import {firebaseStore} from './index'
import * as admin from 'firebase-admin';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState("");

  useEffect(() => {
    const searchUsers = async() => {
      // Firestoreのコレクションを指定してデータ取得。今回は全量を検索
      const res = await firebaseStore.collection('users').get();
      if (res.empty) return [];
      const userList　= [];
      // DocumentData型にはmapメソッドが定義されていないため、forEachのループでデータを加工
      res.forEach(doc => {
          userList.push(doc.data());
      })
      setUsers(userList);
    }

    searchUsers();
    setLoading(false);
}, []);
  return (
    <div className="App">
      <p>{users.name}</p>
    </div>
  );
}