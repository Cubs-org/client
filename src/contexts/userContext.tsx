import { createContext, useContext, useState } from 'react';

import { IUserContext, IUserAccount } from '../types/user';

const userContext = createContext<IUserContext>({} as IUserContext);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState<IUserAccount>({
        data: {
            id: "a1b2c3d4e5f6g7h8i9j0",
            name: "Usuário",
            email: "user@adress",
            icon: "/src/assets/default-user.jpg",
            createdAt: "00/00/0000",
            updatedAt: "00/00/0000",
            accountType: "free",
            status: "active",
            planType: "perMonth",
            paymentType: "creditCard"
        },
        hubId: "a1b2c3d4e5f6g7h8i9j0",
    });

    /* TODO: not set usar data if doesn't changed values */
    const handleSetUser = (newValues) => setUser(newValues);

    return (
        <userContext.Provider value={{ user, setUser: handleSetUser }}>
            {children}
        </userContext.Provider>
    )
}

const useUser = () => {
    const context = useContext(userContext);
    return context;
}

export { UserProvider, useUser }



