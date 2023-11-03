import { Task } from "../../interfaces/task";

interface IRemaingTasks {
    tasks: Task[];
}

export const AmountRemaingTasks = ({ tasks }:IRemaingTasks) => (
    <div className="w-[600px] flex flex-col gap-2">
        {tasks.map((item, _i) => (
            <div
                className="w-full flex justify-between items-center rounded-md p-2 bg-light-300 hover:bg-light-400 text-dark-900 dark:bg-dark-400 cursor-pointer dark:hover:bg-dark-300 group"
                key={`${item}-${_i}`}
            >
                <div className="flex items-center">
                    <div 
                        className="w-[20px] h-[20px] rounded-md bg-purple-500" 
                        style={{ backgroundColor: item?.tag?.color && item.tag.color, }}
                    />
                    <h2 className="text-lg font-black px-3 py-1 rounded-md">
                        {item.title}
                    </h2>
                </div>
                {item?.membership && (
                    <div className="flex items-center justify-center">
                        {item?.membership.map((member, _i) => _i < 3 && (
                            <div 
                                className="grid place-items-center w-[30px] h-[30px] rounded-full bg-purple-500 text-xs font-semibold ring-2 ring-light-300 dark:ring-dark-400 group-hover:ring-light-400" 
                                key={`${member}-${_i}`}
                            >{member.userId}</div>
                        ))}
                        <span className="p-1 text-sm font-semibold">
                            {item.membership && item.membership.length > 3 ? `+${item.membership.length - 3}` : ""}
                        </span>
                    </div>
                )}
                <div className="min-w-[20ch] text-dark-100 tracking-wide text-xs font-semibold ">{item.start}~{item.end}</div>
            </div>
        ))}
    </div>
)