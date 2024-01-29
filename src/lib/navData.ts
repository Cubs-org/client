import { LinksProps } from "../interfaces/nav";

export const links = [
    {
        name: "Página inicial",
        path: "/"
    },
    {
        name: "Serviços",
        path: "/services"
    },
    {
        name: "Mais opções",
        child: [
            {
                section: "Apps & Plataformas",
                links: [
                    {
                        name: "Web",
                        path: "/"
                    },
                    {
                        name: "App Desktop",
                        path: "/microsoftstore"
                    },
                    {
                        name: "App Mobile",
                        path: "/googleplay"
                    }
                ],
            },
            {
                section: "Mais Informações",
                links: [
                    {
                        name: "Sobre nós",
                        path: "/about"
                    },
                    {
                        name: "Contato",
                        path: "/contact"
                    }
                ]
            }
        ]
    },
    {
        name: "Entre",
        path: "/login"
    },
    {
        name: "Cadastre-se",
        path: "/register"
    }
] as LinksProps[];