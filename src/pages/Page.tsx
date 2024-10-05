import React, { useEffect, useReducer, useState } from 'react'

import { IconPicker } from '../components/IconPicker'
import { TextArea } from '../components/TextArea'
import { NewTool } from '../components/custom/Page/NewTool/NewTool'
import { DataBlocks } from '../interfaces/page'
import { Blocks } from '../components/custom/Page/Blocks'
import { Header } from '../components/custom/Page/Header'
import { usePage } from '../contexts/pageContext'
import {
    DndContext,
    MouseSensor,
    PointerSensor,
    rectIntersection,
    useSensor,
    useSensors,
} from '@dnd-kit/core'

import { branch } from '../lib/skeleton.json'
import { SortableContext } from '@dnd-kit/sortable'
import { initialBlocks } from '../lib/initialBlocks'

const twiconsPath = '/twicons/'

// Construir um parser para tratar os dados linearmente
const initialBlocksState = initialBlocks

type BlockAction = {
    type: 'ADD' | 'REMOVE' | 'UPDATE' | 'MOVEROW' | 'MOVECOL' | 'MOVEBLOCK'
    payload: DataBlocks
}

const reducer = (state: DataBlocks[], action: BlockAction) => {
    const { type, payload } = action;
    const { id, row, orderX, orderY } = payload;

    const actions = {
        ADD: () => {
            return [...state, payload];
        },
        REMOVE: () => {
            return state.filter((block) => block.id !== id);
        },
        UPDATE: () => {
            return state.map((block) => {
                if (block.id === id) {
                    return { ...block, ...payload };
                }
                return block;
            });
        },
        MOVEROW: () => {
            return state.map((block) => {
                if (block.id === id) {
                    return { ...block, row };
                }
                return block;
            });
        },
        MOVECOL: () => {
            return state.map((block) => {
                if (block.id === id) {
                    return { ...block, orderX };
                }
                return block;
            });
        },
        MOVEBLOCK: () => {
            return state.map((block) => {
                if (block.id === id) {
                    return { ...block, orderY };
                }
                return block;
            });
        },
    };

    return actions[type]();
}

function Page() {
    const {
        currentPage,
        setPageData,
        setBranch,
        setMembers,
        titleVisible,
        // setTitleVisible
    } = usePage()

    const {
        title,
        data: { icon },
    } = currentPage

    const [loading, setLoading] = useState<boolean>(true)
    // TODO: Implementar o estado de blocos
    const [blocks, _] = useReducer(reducer, initialBlocksState)

    const sensors = useSensors(useSensor(MouseSensor), useSensor(PointerSensor))

    const generateSortableItems = (blocks) => {
        return blocks.map((block) => {
            const rowIndex = block.row - 1
            const colIndex = block.orderX - 1
            const blockIndex = block.orderY - 1
            const blockId = block.id
            return `${rowIndex}-${colIndex}-${blockIndex}-${blockId}`
        })
    }

    useEffect(() => {
        document.title = title || 'Sem título'
        if (icon !== '') {
            let link = document.querySelector(
                "link[rel='icon']"
            ) as HTMLLinkElement
            // link.href = pageData.data.icon;
            link.href = `${twiconsPath}/${icon}.svg`
        }
    }, [currentPage])

    useEffect(() => {
        if (loading) {
            setBranch(branch)
            setPageData(branch[0])
            setMembers([
                {
                    name: 'Helder Martins',
                    icon: 'cervo',
                    email: 'helder@gmail.com',
                },
                {
                    name: 'Gabriel Nogueira',
                    icon: 'gorila',
                    email: 'nogs@gmail.com',
                },
                {
                    name: 'Augusto Kawashima',
                    icon: 'panda',
                    email: 'gutin@hotmail.com',
                },
            ])
            // if (titleVisible === true) setTitleVisible(false)
            setLoading(false)
        }
    }, [loading])

    return (
        <React.Fragment>
            <Header />
            {titleVisible && (
                <div className="px-4 flex items-center gap-x-3 my-3 w-full"> {/** md:w-4/5 lg:w-4/6 m-auto */}
                    {icon && (
                        <IconPicker
                            icon={icon}
                            setIcon={(icon) => {
                                setPageData({
                                    data: {
                                        icon: icon as string,
                                    },
                                })
                            }}
                            size={42}
                            classNames={
                                'p-1 rounded-md text-2xl hover:bg-light-300 dark:hover:bg-dark-700 flex items-center justify-center cursor-pointer'
                            }
                            hide={!icon}
                        />
                    )}

                    <TextArea
                        value={currentPage.title}
                        placeholder={'Sem título'}
                        handle={(title) => setPageData({ title })}
                        classNames="!w-[calc(100%-48px)] text-4xl font-bold break-words !px-0"
                        outlineDisabled
                    />
                </div>
            )}

            <main className='w-full'> {/** md:w-4/5 lg:w-4/6 m-auto */}
                <DndContext
                    sensors={sensors}
                    collisionDetection={rectIntersection}
                    onDragEnd={({ active, over }) =>
                        console.log(active.id, over?.id)
                    }
                >
                    <SortableContext items={generateSortableItems(blocks)}>
                        <Blocks blocks={blocks} />
                    </SortableContext>
                </DndContext>

                <NewTool />
            </main>
        </React.Fragment>
    )
}

export default Page
