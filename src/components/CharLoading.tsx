import { useEffect, useState } from 'react';

interface CharLoadingProps {
    text: string;
    type: '/' | '...';
    isLoading: boolean;
}

export const CharLoading = ({ text, type, isLoading=true }: CharLoadingProps) => {
    const [currentType, setCurrentType] = useState<string>(type);
    
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isLoading) {
            if (type === '...') {
                let count = 0;
                interval = setInterval(() => {
                    count = (count + 1) % 4; // 0 to 3 for 3 dots
                    setCurrentType('.'.repeat(count)); // Update with dots
                }, 500);
            } else {
                const loadingChars = ['|', '/', '—', '\\'];
                let index = 0;
                interval = setInterval(() => {
                    setCurrentType(loadingChars[index]);
                    index = (index + 1) % loadingChars.length; // Cycle through loading chars
                }, 300);
            }
        } else {
            setCurrentType(''); // Reset when not loading
        }

        return () => clearInterval(interval); // Clean up on unmount
    }, [isLoading, type]);

    if (type === '...') {
        return <span>{text.concat(currentType)}</span>;
    }

    return <span>{currentType}{' '}{text}</span>;
};
