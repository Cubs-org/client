import axios from "axios";

import { useGoogleLogin } from "@react-oauth/google";
import { Button, ButtonProps } from "./Button"

import { BASE_URL } from "../lib/api";
import { useCookies } from "react-cookie";

interface SignInButtonProps extends ButtonProps {
  provider: string;
};

interface IUser {
  id: string;
  email: string;
  verified_email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
};

export const SignInButton = ({ children, classNames }:SignInButtonProps) => {
  const [cookie, setCookie] = useCookies(['token']);

  async function fetchData(data) {
    if (data) {
      try {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${data?.access_token}`, {
          headers: {
            Authorization: `Bearer ${data?.access_token}`,
            Accept: 'application/json'
          }
        });

        return response.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  async function fetchUser(data: IUser) {

    const user = {
      id: data?.id,
      email: data?.email,
      name: data?.name,
      icon: data?.picture,
    };

    try {
      await axios.post(`${BASE_URL}/registerUser`, user).then((response) => {
        console.log(response.data);
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const login = useGoogleLogin({
    onSuccess: (response) => {
      fetchData(response)
        .then((user) => {
          fetchUser(user);
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