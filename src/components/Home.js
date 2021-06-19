import React from "react";
import styles from "../styles/Home.css";

const Home = () => {
  return (
    <div className={styles.contents}>
      <h1>Self Manage Application</h1>
      <p>
        参加したイベントなど、履歴を残しておきたいものをリスト表示することができます。<br />
        なんでも、履歴として残して管理してしまいましょう！
      </p>
    </div>
  )
}

export default Home;