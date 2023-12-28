import { useState } from "react";

import { Button } from "../../components/Button";
import { SignInButton } from "../../components/SignInButton";

import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ 
            ...formData, 
            [name]: value 
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // axios.post(`${BASE_URL}/loginUser`, formData)
        console.log(formData);
    };

    return (
        <div className="w-full h-full grid place-items-center bg-purple-500 text-light-100">
            <div className="w-[400px] flex flex-col gap-3 items-center">
                <h1 className="text-5xl font-bold mb-3">Login</h1>

                {/* Form */}
                <form className="w-full flex flex-col gap-2">
                    <input 
                        type="text" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Usuário ou email"
                        className="w-full px-3 py-2 rounded-md bg-purple-600 text-light-200 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-purple-400"
                    />
                    <input 
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Senha"
                        className="w-full px-3 py-2 rounded-md bg-purple-600 text-light-200 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-purple-400"
                    />
                    <div className="w-full flex justify-evenly items-center">
                        <Link to={`/#`} className="font-semibold text-light-100 text-xs underline text-center">Esqueceu sua senha?</Link>
                        <Link to={`/register`} className="font-semibold text-light-100 text-xs underline text-center">Não possui uma conta ainda?</Link>
                    </div>
                    
                    <Button 
                        type="submit" 
                        classNames="bg-light-200 text-purple-500 hover:bg-light-300"
                        onClick={handleLogin}
                    >Entrar</Button>
                </form>
                
                <small className="font-semibold text-light-100">Ou</small>

                {/* Sign in with Google */}
                <SignInButton 
                    provider="google"
                    classNames="w-full bg-light-200 px-3 ring-2 ring-purple-500 hover:ring-light-200 hover:bg-transparent hover:text-light-200 text-purple-500"
                >
                    <FaGoogle size={24}/> Entrar com o Google
                </SignInButton>
            </div>
        </div>
    )
}