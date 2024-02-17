import clsx from "clsx";

interface ProgressProps {
    value: number;
    size?: number;
}

export const Progress = ({ value, size }:ProgressProps) => (
    <div className="bg-light-300 dark:bg-dark-500 w-full flex flex-grow rounded-full" style={{height:size}}>
        <span className={clsx("transition-all ease-in-out", {
            "bg-red-500": value < 20,
            "bg-orange-500": value < 50 && value >= 20, 
            "bg-yellow-500": value < 80 && value >= 50,
            "bg-green-500": value >= 80
        })} style={{
            width: `${value}%`,
            borderRadius: "inherit"
        }}/>
    </div>
);