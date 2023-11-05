import { SignInButton } from "../components/SignInButton";
import { FaGoogle } from "react-icons/fa";

import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
    return (
        <div className="w-screen h-screen grid place-items-center bg-purple-500 text-light-100">
            <div className="flex flex-col gap-3 items-center">
                <h1 className="text-5xl font-bold mb-3">Olá!</h1>
                <SignInButton 
                    provider="google"
                    classNames="bg-light-200 px-3 ring-2 ring-purple-500 hover:ring-light-200 hover:bg-transparent hover:text-light-200 text-purple-500"
                >
                    <FaGoogle size={24}/> Entrar com o Google
                </SignInButton>
                <small className="font-semibold text-light-100">Faça mais. Faça melhor. Faça com o Cub's.</small>
            </div>
        </div>
    )
}