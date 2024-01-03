import { useGoogleLogin } from "@react-oauth/google";
import { Button, ButtonProps } from "./Button"

import fetchUser from "../utils/user/fetchUser";
import fetchData from "../utils/user/fetchData";
import { useAuth } from "../contexts/authProvider";

interface SignInButtonProps extends ButtonProps {
  provider: string;
};

// interface IUser {
//   id: string;
//   email: string;
//   verified_email: string;
//   name: string;
//   given_name: string;
//   family_name: string;
//   picture: string;
//   locale: string;
// };

export const SignInButton = ({ children, classNames }:SignInButtonProps) => {

  const { signIn }:any = useAuth();
  
  const login = useGoogleLogin({
    onSuccess: (response) => {
      fetchData(response)
        .then(async (user) => {
          const userFetched = await fetchUser(user) as any;
          signIn(userFetched.data.token);
        })
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  return (
    <Button 
      classNames={classNames}
      onClick={handleLogin}
    >{children}</Button>
  )
}