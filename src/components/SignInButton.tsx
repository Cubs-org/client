import { useGoogleOneTapLogin, useGoogleLogin } from "@react-oauth/google";
import { Button, ButtonProps } from "./Button"
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../lib/api";

interface SignInButtonProps extends ButtonProps {
  provider: string;
};

interface googleResponseProps {
  access_token: string;
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

  const [data, setData] = useState<googleResponseProps>();
  const [user, setUser] = useState<IUser>();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (clicked && data) {
        try {
          const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${data?.access_token}`, {
            headers: {
              Authorization: `Bearer ${data?.access_token}`,
              Accept: 'application/json'
            }
          });

          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchData();
  }, [data, clicked]);

  useEffect(() => {
    if (user) setClicked(false);

    const fetchData = async () => {
      if (user) {
        try {
          const response = await axios.post(`${BASE_URL}/registerUser`, {
            ...user, 
            icon: user?.picture
          });

          console.log(response);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchData();
  }, [data, user]);

  const login = useGoogleLogin({
    onSuccess: (response) => setData(response),
    onError: () => {
      console.log('Login Failed');
    },
  });

  const handleLogin = () => {
    setClicked(true);
    login();
  }

  return (
    <Button 
      classNames={classNames}
      onClick={() => handleLogin()}
    >{children}</Button>
  )
}