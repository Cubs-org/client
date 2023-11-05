import { useGoogleOneTapLogin } from "@react-oauth/google";
import { Button, ButtonProps } from "./Button"
import { jwtDecode } from "jwt-decode";

interface SignInButtonProps extends ButtonProps {
  provider: string;
}

export const SignInButton = ({ children, classNames }:SignInButtonProps) => {
  const login = useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      console.log(jwtDecode(credentialResponse.credential as string));
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

  return (
    <Button 
      classNames={classNames}
      onClick={() => login}
    >{children}</Button>
  )
}