import React from "react";
import styles from "../styles/Home.css";

const Home = () => {
  return (
    <div className={styles.contents}>
      <h1>RecMe！</h1>
      <p>
        RecMe！では、参加したイベントや、読んだ本を記録することができます！<br />
        イベント名や日付、本のタイトルや著者名だけでなく、コメントや感想などを一緒に記録することが可能です。<br />
        振り返りも兼ねて、記録を始めてみませんか？？
      </p>
    </div>
  )
}

export default Home;