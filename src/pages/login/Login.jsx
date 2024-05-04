import youtubeLogo from "../../assets/youtube.png";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.container}>
      <div>
        <img src={youtubeLogo} alt="" />
        <button>Login with Google</button>
        <p>YouTube clone maade by Neeraj</p>
      </div>
    </div>
  )
};

export default Login;