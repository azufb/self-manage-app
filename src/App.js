import React, {useState, useEffect} from 'react';
import './App.css';
import {firebaseStore} from './index'

export default function App() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState("");
  const admin = require('firebase-admin');

  admin.initializeApp();

  const db = admin.firestore();

  useEffect(() => {
    const searchUsers = async() => {
      // Firestoreのコレクションを指定してデータ取得。今回は全量を検索
      const res = await db.collection('users').get();
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
    <div>
      {users.map((user, index) =>
        <p key={index}>{user.name}</p>
      )}
    </div>
  );
}