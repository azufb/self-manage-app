import React from "react";
import styles from "../styles/Home.css";

const Home = () => {
  return (
    <div className={styles.contents}>
      <h1>Events Recorder</h1>
      <p>
        参加したイベントを記録することができます！<br />
        「参加した」という事実だけでなく、コメント・感想などを残すこともできます。参加したイベントで、学んだことなどを記録してみてください！<br></br>
        <span className={styles.annotation}>※そのほかの管理機能も開発中となっております。お待ちください！</span>
      </p>
    </div>
  )
}

export default Home;