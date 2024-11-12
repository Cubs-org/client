import { FaUserPlus } from 'react-icons/fa6'
import { Avatar } from '../../Avatar'
import { Button } from '../../Button'
import { Popover } from '../../Popover'
import { usePage } from '../../../contexts/pageContext'
import clsx from 'clsx'

export const Members = () => {
    const { members } = usePage()

    return (
        <Popover
            direction="bottom-start"
            content={
                <ul className="min-w-[300px] flex flex-col gap-1 p-1">
                    {members.length > 0 ? (
                        members.map((member, _i) => {
                            return (
                                <li
                                    key={`${member}-${_i}`}
                                    className="w-full flex justify-between items-center px-1 py-0.5 rounded-md cursor-pointer hover:bg-light-500 dark:hover:bg-dark-500"
                                >
                                    <div className="flex items-center gap-2">
                                        <Avatar
                                            icon={member.icon}
                                            size={24}
                                            classNames="border-2 border-violet-500 border-separate rounded-full"
                                            isCircle
                                        />
                                        <span className="text-sm font-medium">
                                            {member.name}
                                        </span>
                                    </div>
                                    <span className="ml-4 text-xs text-light-900">
                                        {member.email}
                                    </span>
                                </li>
                            )
                        })
                    ) : (
                        <div className="min-h-[100px] grid place-items-center">
                            Nenhum membro adicionado ainda.
                        </div>
                    )}

                    <Button classNames="w-full py-1 mt-3">Novo membro</Button>
                </ul>
            }
        >
            <div className="flex items-center cursor-pointer">
                {members.length > 0 ? (
                    members.map((member, _i) => {
                        return (
                            <Avatar
                                key={`${member}-${_i}`}
                                icon={member.icon}
                                size={28}
                                classNames={clsx(
                                    'ring ring-light-100 dark:ring-dark-900 rounded-full overflow-hidden',
                                    {
                                        '-ml-1': _i > 0,
                                    }
                                )}
                                isCircle
                                notDisplayUsername
                            />
                        )
                    })
                ) : (
                    <span className="bg-transparent text-dark-700 dark:text-light-300 text-xl md:text-2xl rounded-md hover:bg-light-300 dark:hover:bg-dark-700 p-2 cursor-pointer">
                        <FaUserPlus />
                    </span>
                )}
            </div>
        </Popover>
    )
}
