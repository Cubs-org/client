import { useGoogleLogin } from "@react-oauth/google";
import { Button, ButtonProps } from "./Button"

import fetchUser from "../utils/user/fetchUser";
import fetchData from "../utils/user/fetchData";
import { useAuth } from "../contexts/authProvider";
import axios from "axios";
import { BASE_URL } from "../lib/api";

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

interface IResponse {
  data: {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
    id_token: string;
  }
};

export const SignInButton = ({ children, classNames }:SignInButtonProps) => {

  const { signIn }:any = useAuth();
  
  const login = useGoogleLogin({
    onSuccess: (response) => {
      const res = response as IResponse | any;
      axios.post(`${BASE_URL}/authenticateUser/oauth`, {
        access_token: res.access_token,
      }).then((res) => {
        if (res.status === 200) {
          signIn(res.data.user.accessToken);
        } else if (res.status === 201) {
          // const userFetched = await fetchUser(user) as any;
          // signIn(userFetched.data.token);
          fetchData(response)
            .then(async (user) => {
              const userFetched = await fetchUser(user) as any;
              signIn(userFetched.data.token);
            })
        }
      }).catch((err) => {
        console.log(err);
      });
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