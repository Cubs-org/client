import { useState } from "react";

import { Button } from "../components/Button";
import axios from "axios";
import { BASE_URL } from "../lib/api";
import { Link } from "react-router-dom";

export default function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
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
        <div className="w-screen h-screen grid place-items-center bg-purple-500 text-light-100">
            <div className="w-[400px] flex flex-col gap-3 items-center">
                <h1 className="text-5xl font-bold mb-3">Cadastrar</h1>

                {/* Form */}
                <form className="w-full flex flex-col gap-2">
                    <input 
                        type="text" 
                        name="name"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Usuário"
                        className="w-full px-3 py-2 rounded-md bg-purple-600 text-light-200 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-purple-400"
                    />
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Usuário"
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
                    <input 
                        type="password" 
                        name="confirmPassword"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Confirmar senha"
                        className="w-full px-3 py-2 rounded-md bg-purple-600 text-light-200 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-purple-400"
                    />
                    
                    <Button 
                        type="submit" 
                        classNames="bg-light-200 text-purple-500 hover:bg-light-300"
                        onClick={handleLogin}
                    >Entrar</Button>
                </form>
                
                <Link to={`/login`} className="font-semibold text-light-100 text-xs underline text-center">Já possui uma conta?</Link>
            </div>
        </div>
    )
}