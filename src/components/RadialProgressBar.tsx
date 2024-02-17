import clsx from "clsx";

interface RadialProgressBarProps {
    value: number;
    size: number;
    strokeWidth?: number;
}

export const RadialProgressBar = ({ value, size, strokeWidth }:RadialProgressBarProps) => {
    const radius = size;
    const stroke = strokeWidth || 3;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (value / 100) * circumference;
    return (
        <svg
            height={radius * 2}
            width={radius * 2}
            className="relative transition-all ease-in-out duration-300 transform -rotate-90"
        >
            <circle
                className={clsx("transition-all ease-in-out", {
                    "stroke-red-500": value < 50, 
                    "stroke-yellow-500": value < 80 && value >= 50,
                    "stroke-green-500": value >= 80
                })}
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
        </svg>
    );
}