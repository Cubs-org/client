import { useState } from "react";
import { Check } from "../components/Check";
import { Button } from "../components/Button";
import { DatePicker } from "../components/DatePicker";

export const Test = () => {

    const [form, setForm] = useState({} as any);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    }

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    return (
        <form className="w-full flex flex-col gap-3 justify-center">
            Teste de checkbox

            <div className="w-4/5 m-auto">
                <input type="color" name="color" onChange={handleChange} />
                <Check onChange={handleChange} classNames="w-6 h-6"/>
                <DatePicker handleChange={handleChange}/>
                <Button onClick={handleSubmit}>Pronto</Button>
            </div>
        </form>
    );
};