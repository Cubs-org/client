import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export const Container = ({ children }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Função para rolar para a esquerda
    const scrollLeft = () => {
        const container = containerRef.current;
        if (container) container.scrollLeft -= 200;
    };

    // Função para rolar para a direita
    const scrollRight = () => {
        const container = containerRef.current;
        if (container) container.scrollLeft += 200;
    };

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        // Função para verificar a rolagem inicial
        const checkInitialScroll = () => {
            const scrollLeft = container.scrollLeft;
            const maxScroll = container.scrollWidth - container.clientWidth;

            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < maxScroll);
        };

        // Chamar a função de verificação inicial após o componente ser montado
        checkInitialScroll();

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const maxScroll = container.scrollWidth - container.clientWidth;

            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < maxScroll);
        };

        container.addEventListener('scroll', handleScroll);

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section className="relative overflow-hidden group/cards">
            <div ref={containerRef} className="max-w-full flex items-center gap-2 px-1 overflow-x-auto scrollbar-none scroll-smooth">
                {children}
            </div>
            <Button
                className={`absolute top-0 left-0 w-6 h-full rounded-l-md !bg-transparent group-hover/cards:!bg-light-300 dark:group-hover/cards:!bg-dark-700 ${canScrollLeft ? 'block' : 'hidden'}`}
                onClick={scrollLeft}
            >
                <FaAngleLeft />
            </Button>
            <Button
                className={`absolute top-0 right-0 w-6 h-full rounded-r-md !bg-transparent group-hover/cards:!bg-light-300 dark:group-hover/cards:!bg-dark-700 ${canScrollRight ? 'block' : 'hidden'}`}
                onClick={scrollRight}
            >
                <FaAngleRight />
            </Button>
        </section>
    );
};
