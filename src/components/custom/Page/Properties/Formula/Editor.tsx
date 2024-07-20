import { useState } from "react";

import * as E from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another

const preview = (value) => {
    const regex = /\|[^|]+\|/g;

    const newValue = value.replace(regex, "undefined");
    return newValue;
}

export const Editor = ({
    content
}) => {
    
    const [code, setCode] = useState(
        content || "// Vazio..."
    );

    const clickable = [
        "Option 1",
        "Option 2",
        "Option 3"
    ];

    return (
        <div className="p-2 grid grid-col-2 gap-2">

            <ul>
                {clickable.map((item, index) => (
                    <li 
                        key={index} 
                        className="px-2 py-1 rounded-md cursor-pointer text-sm font-bold flex items-center justify-between hover:bg-light-400 hover:dark:bg-dark-600">
                        {item}
                    </li>
                ))}
            </ul>

            <E.default
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => highlight(code, languages.js)}
                padding={10}
                className="w-[300px] p-1 outline-none rounded-md bg-glass-light-100 dark:bg-dark-300 overflow-auto"
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                }}
            />

            <div
                className="col-span-2 flex gap-1 items-center justify-between p-2 rounded-md bg-glass-light dark:bg-glass-dark"
            >
                <b>Resultado:</b>
                {(() => {
                    try {
                        return (
                            <span className="text-normal text-purple-500 font-semibold">
                                {eval(preview(code))}
                            </span>
                        )
                    } catch (error) {
                        // Tratar o erro aqui
                        console.error("Erro durante a avaliação do código:", error);
                        return (
                            <span className="text-xs text-red-500 font-semibold">
                                Erro na avaliação do código
                            </span>
                        )
                    }
                })()}
            </div>
        </div>
    )
}