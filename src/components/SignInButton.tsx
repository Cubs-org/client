import { useGoogleLogin } from "@react-oauth/google";
import { Button, ButtonProps } from "./Button";
import { useAuth } from "../contexts/authProvider";
import axios from "axios";
import { BASE_URL } from "../lib/api";

interface SignInButtonProps extends ButtonProps {
  provider: string;
  responseHandler?: (response) => void;
}

interface IResponse {
  data: {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
    id_token: string;
  };
}

export const SignInButton = ({ children, classNames, responseHandler }: SignInButtonProps) => {
  
  const { signIn } = useAuth();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = response as IResponse | any;
        const authenticateUser = async (accessToken: string) => {
          try {
            const res = await axios.post(`${BASE_URL}/authenticateUser/oauth`, {
              access_token: accessToken,
            });

            if (res.status === 200)
              signIn(res.data.user.accessToken);
            else
              responseHandler ? responseHandler(res || "any") : console.log("No response handler");
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
      console.log('Login Failed');
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