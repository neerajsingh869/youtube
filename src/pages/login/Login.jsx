import { useDispatch, useSelector } from "react-redux";
import youtubeLogo from "../../assets/youtube.png";
import styles from "./Login.module.css";
import { login } from "../../redux/actions/authAction";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector(state => state.auth.accessToken);
  
  const handleLogin = () => {
    dispatch(login());
  }

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);
  
  return (
    <div className={styles.container}>
      <Helmet>
        <title>{`Login - YouTube`}</title>
      </Helmet>
      <div>
        <img src={youtubeLogo} alt="" />
        <button onClick={handleLogin}>Login with Google</button>
        <p>YouTube clone made by Neeraj</p>
      </div>
    </div>
  )
};

export default Login;