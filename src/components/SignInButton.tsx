import { Button, ButtonProps } from "./Button"

interface SignInButtonProps extends ButtonProps {
  provider: string;
}

export const SignInButton = ({ children, classNames }:SignInButtonProps) => {
    return (
      <Button 
        classNames={classNames}
      >{children}</Button>
    )
}