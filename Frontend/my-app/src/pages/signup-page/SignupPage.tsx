import illustration from '../../assets/images/illustration-signup-page.png';
import styles from '../../utils/form-styles.module.css';
import LoginSignupLayout from '../../components/login-signup-layout/LoginSignupLayout';
import SignUpForm from '../../components/SignUpForm';

const SignupPage: React.FC = () => {
  return (
    <LoginSignupLayout image={illustration}>
      <div className={styles.welcomeText}>
        <h1 className="poppins-semibold">Sign Up</h1>
        <h2 className="poppins-regular">Welcome to our community</h2>
      </div>
      <SignUpForm useFor="signup page" />
    </LoginSignupLayout>
  );
};

export default SignupPage;
