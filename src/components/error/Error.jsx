import monkeyLogo from "../../assets/monkey.png";
import styles from "./Error.module.css";

const Error = () => {
  return (
    <div className={styles.errorPage}>
      <div className={styles.errorPageContent}>
        <img src={monkeyLogo} alt="Monkey" />
        <p>This page isn&apos;t available. Sorry about that.</p>
        <p>Try searching with something else.</p>
      </div>
    </div>
  )
};

export default Error;