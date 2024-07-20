import React, { useEffect, useState } from "react";

import { IconPicker } from "../components/IconPicker";
import { TextArea } from "../components/TextArea";
import { NewTool } from "../components/custom/Page/NewTool/NewTool";
import { DataTools } from "../interfaces/page";
import { Tools } from "../components/custom/Page/Tools";
import { Header } from "../components/custom/Page/Header";
import { usePage } from "../contexts/pageContext";

import { branch } from "../lib/skeleton.json";

const twiconsPath = "/twicons/";

const tools: DataTools[] = [
    {
        type: 'text',
        tool_id: '123',
        data: {
            y: 2,
        },
        content: 'O que houve em 30 de abril de 1945?',
    },
    {
        type: 'image',
        tool_id: '456',
        data: {
            align: 'left',
            x: 1,
            y: 5
        },
        url: 'https://bloghojenahistoria.wordpress.com/wp-content/uploads/2016/04/30-de-abril-de-1945.jpg?w=624',
    },
    {
        type: 'text',
        tool_id: '789',
        data: {
            align: 'left',
            y: 3,
        },
        content: 'Logo em 1 de janeiro de 1945, o exército soviético lançou uma ofensiva contra Berlim, a capital do Terceiro Reich. Em retaliação ao Massacre de Malmedy, as tropas americanas matam 60 prisioneiros de guerra alemães em Chenogne.',
    },
    {
        type: 'text',
        tool_id: '789',
        data: {
            align: 'left',
            x: 1,
            y: 4,
        },
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius porro quidem commodi eligendi facilis nemo consequuntur, optio unde numquam molestias nam voluptate eveniet? Non fugit iure reprehenderit velit. Architecto, adipisci!',
    },
    {
        type: 'text',
        tool_id: '789',
        data: {
            align: 'left',
            x: 2,
            y: 4,
        },
        content: '123Lorem ipsum dolor sit amet, ablat consectetur adipisicing elit. Eius porro quidem commodi eligendi facilis nemo consequuntur, optio unde numquam molestias nam voluptate eveniet? Non fugit iure reprehenderit velit. Architecto, adipisci!',
    },
    {
        type: 'text',
        tool_id: '789',
        data: {

            align: 'left',
            x: 3,
            y: 4,
        },
        content: '456Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius porro quidem commodi eligendi facilis nemo consequuntur, optio unde numquam molestias nam voluptate eveniet? Non fugit iure reprehenderit velit. Architecto, adipisci!',
    },
    {
        type: 'text',
        tool_id: '101112',
        data: {
            align: 'left',
            y: 1,
        },
        content: 'Acontecimentos',
    },
    {
        type: 'text',
        tool_id: '101112',
        data: {
            align: 'left',
            x: 2,
            y: 5,
            width: 75
        },
        content: 'A Segunda Guerra Mundial foi um conflito militar global que durou de 1939 a 1945, envolvendo a maioria das nações do mundo — incluindo todas as grandes potências — organizadas em duas alianças militares opostas: os Aliados e o Eixo. Foi a guerra mais abrangente da história, com mais de 100 milhões de militares mobilizados. Em estado de "guerra total", os principais envolvidos dedicaram toda sua capacidade econômica, industrial e científica a serviço dos esforços de guerra, deixando de lado a distinção entre recursos civis e militares. Marcado por um número significante de ataques contra civis, incluindo o Holocausto e a única vez em que armas nucleares foram utilizadas em combate, foi o conflito mais letal da história da humanidade, resultando entre 50 a mais de 70 milhões de mortes.[1] Geralmente considera-se o ponto inicial da guerra como sendo a invasão da Polônia pela Alemanha Nazista em 1 de setembro de 1939 e subsequentes declarações de guerra contra a Alemanha pela França e pela maioria dos países do Império Britânico e da Commonwealth. Alguns países já estavam em guerra nesta época, como Etiópia e Reino de Itália na Segunda Guerra Ítalo-Etíope e China e Japão na Segunda Guerra Sino-Japonesa.[2] Muitos dos que não se envolveram inicialmente acabaram aderindo ao conflito em resposta a eventos como a invasão da União Soviética pelos alemães e os ataques japoneses contra as forças dos Estados Unidos no Pacífico em Pearl Harbor e em colônias ultra marítimas britânicas, que resultou em declarações de guerra contra o Japão pelos Estados Unidos, Países Baixos e o Commonwealth Britânico.[3][4] A guerra terminou com a vitória dos Aliados em 1945, alterando significativamente o equilíbrio de poder no mundo. As Nações Unidas foram criadas para promover a cooperação internacional e prevenir futuros conflitos. A União Soviética e os Estados Unidos emergiram como superpotências rivais, estabelecendo as bases para a Guerra Fria, que durou por mais de quatro décadas. Enquanto isso, a descolonização de Ásia e África, e a crise econômica europeia, criaram um novo cenário global, que levou ao surgimento de movimentos de independência e à formação de novas nações em todo o mundo.',
    }
];

function Page() {

    const {
        currentPage,
        // members,
        setPageData,
        setBranch,
        setMembers
    } = usePage();

    const { title, data: { icon } } = currentPage;

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        document.title = title || "Sem título";
        if (icon !== '') {
            let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
            // link.href = pageData.data.icon;
            link.href = `${twiconsPath}/${icon}.svg`;
        }
    }, [currentPage]);

    useEffect(() => {
        if (loading) {
            setBranch(branch);
            setPageData(branch[0])
            setMembers([
                { name: "Helder Martins", icon: "cervo", email: "helder@gmail.com" },
                { name: "Gabriel Nogueira", icon: "gorila", email: "nogs@gmail.com" },
                { name: "Augusto Kawashima", icon: "panda", email: "gutin@hotmail.com" }
            ])
            setLoading(false)
        }
    }, [loading])

    return (
        <React.Fragment>
            <Header />
            <div className="px-4 flex items-center gap-x-3 my-3">
                {icon && <IconPicker
                    icon={icon}
                    setIcon={(icon) => {
                        setPageData({
                            data: {
                                icon: icon as string
                            }
                        })
                    }}
                    size={42}
                    classNames={"p-1 rounded-md text-2xl hover:bg-light-300 dark:hover:bg-dark-700 flex items-center justify-center cursor-pointer"}
                    hide={!icon}
                />}

                <TextArea
                    value={currentPage.title}
                    placeholder={"Sem título"}
                    handle={(title) => setPageData({ title })}
                    classNames="!w-[calc(100%-48px)] text-4xl font-bold break-words !px-0"
                    outlineDisabled
                />
            </div>

            <main>
                <Tools tools={tools} />
            </main>

            <NewTool />
        </React.Fragment>
    )
}

export default Page;