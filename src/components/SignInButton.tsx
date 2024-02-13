import { useGoogleLogin } from "@react-oauth/google";
import { Button, ButtonProps } from "./Button";
import { useAuth } from "../contexts/authProvider";
import API from "../api";
import { IGoogleUserResponse } from "../interfaces/user";

interface SignInButtonProps extends ButtonProps {
  provider: string;
}

interface IResponse {
  data: IGoogleUserResponse;
}

export const SignInButton = ({ children, classNames }: SignInButtonProps) => {
  
  const { signIn } = useAuth();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = response as IResponse | any;
        const authenticateUser = async (accessToken: string) => {
          try {
            const res = await API.post(`/authenticateUser/oauth`, {
              access_token: accessToken,
            });

            if (res.data.status === 200)
              signIn(res.data.token);
          } catch (error) {
            console.error('Error authenticating user:', error);
          }
        };

        authenticateUser(res.access_token);
      } catch (error) {
        console.error('Error processing Google login response:', error);
      }
    },
    onError: () => {
      ('Login Failed');
    },
  });

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Button
      classNames={classNames}
      onClick={handleLogin}
    >
      {children}
    </Button>
  );
};