import { createContext, useContext, useState } from 'react';

import { IUserContext, IUserAccount } from '../interfaces/user';

const userContext = createContext<IUserContext>({} as IUserContext);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState<IUserAccount>({
        id: "a1b2c3d4e5f6g7h8i9j0",
        name: "Usuário",
        email: "user@adress",
        icon: "/src/assets/default-user.jpg",
        createdAt: "00/00/0000",
        updatedAt: "00/00/0000",
        accountType: "free",
        status: "active",
        planType: "perMonth",
        paymentType: "creditCard",
    });

    const handleSetUser = (newValues) => {

        const newUser = { ...user } as IUserAccount;

        for (let key in newValues) {
            if (newUser[key] !== newValues[key]) {
                newUser[key] = newValues[key];
            }
        }

        setUser(newUser);
    }

    return (
        <userContext.Provider value={{ user, setUser:handleSetUser }}>
            {children}
        </userContext.Provider>
    )
}

const useUser = () => {
    const context = useContext(userContext);
    return context;
}

export { UserProvider, useUser }



