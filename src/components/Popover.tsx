import clsx from "clsx"
import { twMerge } from "tailwind-merge"
import { useState, useRef, useEffect, RefObject } from "react"

interface PopoverProps {
    children: React.ReactNode;
    content: React.ReactNode;
    direction?: "top" | "bottom" | "left" | "right";
    classNames?: string;
    styles?: React.CSSProperties;
    width?: string;
    show?: boolean;
    isModal?: boolean;
    notCentered?: boolean;
}

const getSize = async (element:any) => {
    if (element.current) {
        const { clientWidth, clientHeight } = element.current;
        return { width: clientWidth, height: clientHeight };
    }

    return { width: 0, height: 0 };
}

export const Popover = ({ children, content, direction, classNames, styles, width, show, isModal=true, notCentered }:PopoverProps) => {

    const [visibility, setVisibility] = useState(show ? true : false)
    const [popoverProps, setPopoverProps] = useState({
        width: 0,
        height: 0,
        translate: ""
    } as any);

    const [screenProps, setScreenProps] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768 ? true : false
    });

    const popoverContainer: RefObject<HTMLDivElement> = useRef(null);
    const popoverContent: RefObject<HTMLDivElement> = useRef(null);

    useEffect(() => {
        if (show) setVisibility(true)
        else setVisibility(false)
    }, [show]);

    const handleClickOutside = (event) => {
        if (popoverContainer.current && !popoverContainer.current?.contains(event.target)) {
            setVisibility(false);
        }
    };

    useEffect(() => {
        getSize(popoverContent)
            .then((el) => {
                getSize(popoverContainer).then((container) => {
                    const side = direction === "top" || direction === "bottom" ? "y" : "x",
                    translate = side === "x" ? 
                        `translate(${(direction === "left" ? '-' : '').concat(
                            direction === "right" ? (container.width+10) : el.width+10
                        )}px, ${notCentered ? "0" : "-50%"})`
                        : `translate("-50%", ${(direction === "top" ? '-' : '').concat(
                            direction === "bottom" ? (container.height+10) : el.height+10
                        )}px)`

                    setPopoverProps({
                        width: el.width,
                        height: el.height,
                        translate
                    });
                })
            });
    }, [visibility]);

    useEffect(() => {

        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, []);

    function handleWindowSizeChange() {
        setScreenProps({...screenProps, width: window.innerWidth});
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, [screenProps]);

    return (
        <div 
            ref={popoverContainer}
            className="static md:relative"
            style={{
                width: width ? width : "fit-content"
            }}
            onClick={() => setVisibility(true)}
            onBlur={() => !isModal && setVisibility(false)}
        >
            {children}
            {visibility && (
                <div
                    ref={popoverContent} 
                    style={{
                        transform: !screenProps.isMobile && popoverProps.translate,
                        ...styles
                    }}
                    className={twMerge(clsx("absolute md:h-fit backdrop-blur-sm p-1 bg-glass-light rounded-md shadow-full dark:bg-glass-dark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", {
                    "md:top-0": direction === "top" || direction === "bottom",
                    "md:left-0": direction === "left" || direction === "right",
                    }), classNames)}
                >{content}</div>
            )}
        </div>
    )
}