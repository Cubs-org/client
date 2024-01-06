import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../../components/Button";

// import { Alert } from "../../components/Alert";
import { SignInButton } from "../../components/SignInButton";
import { FaGoogle } from "react-icons/fa";
import fetchUser from "../../utils/user/fetchUser";
import { useAuth } from "../../contexts/authProvider";
import { Alert } from "../../components/Alert";
import { AlertProps } from "../../interfaces/alert";

export default function Register() {

    const { signIn } = useAuth();

    const [alertData, setAlertData] = useState<AlertProps>();

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

    const handleRegister = async (e) => {
        e.preventDefault();
      
        try {
          if (formData.password !== formData.confirmPassword) {
            throw new Error('As senhas não coincidem.');
          }
      
          const result = await fetchUser(formData) as any;
      
          if (result.status === 200) {
            await signIn(result.data.token);
          } else {
            throw new Error(result.message);
          }
        } catch (error: any) {
          setAlertData({
            message: error.message || 'Ocorreu um erro durante o registro.',
            type: 'error'
          });
        }
      };
      

    return (
        <div className="w-full h-[80vh] grid place-items-center bg-purple-500 text-light-100">
            <div className="w-[400px] flex flex-col gap-3 items-center">
                <h1 className="text-5xl font-bold mb-3">Cadastrar</h1>
                
                {alertData && <Alert type={alertData.type} message={alertData.message} />}

                {/* Form */}
                <form className="w-full flex flex-col gap-2">
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Usuário"
                        className="w-full px-3 py-2 rounded-md bg-purple-600 text-light-200 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-purple-400"
                        autoComplete="name"
                        autoFocus
                    />
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="E-mail"
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
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirmar senha"
                        className="w-full px-3 py-2 rounded-md bg-purple-600 text-light-200 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-purple-400"
                    />
                    
                    <Button 
                        type="submit" 
                        classNames="bg-light-200 text-purple-500 hover:bg-light-300"
                        onClick={handleRegister}
                    >Entrar</Button>
                </form>
                
                <Link to={`/login`} className="font-semibold text-light-100 text-xs underline text-center">Já possui uma conta?</Link>

                <small className="font-semibold text-light-100">Ou</small>

                {/* Sign in with Google */}
                <SignInButton 
                    provider="google"
                    classNames="w-full bg-light-200 px-3 ring-2 ring-purple-500 hover:ring-light-200 hover:bg-transparent hover:text-light-200 text-purple-500"
                >
                    <FaGoogle size={24}/> Cadastre-se com o Google
                </SignInButton>
            </div>
        </div>
    )
}