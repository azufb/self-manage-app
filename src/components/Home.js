import React from "react";
import styles from "../styles/Home.css";

const Home = () => {
  return (
    <div className={styles.contents}>
      <h1>Self Manage</h1>
      <p>
        参加したイベントなど、履歴を残しておきたいものをリスト表示することができます。<br />
        なんでも、履歴として残して管理してしまいましょう！<br />
        <span className={styles.annotation}>※現在は、イベント管理機能のみのご提供となっております。今後、そのほかの管理機能は開発中となっております。ご了承ください。</span>
      </p>
    </div>
  )
}

export default Home;