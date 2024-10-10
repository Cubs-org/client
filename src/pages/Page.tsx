import React, { useEffect, useReducer, useState } from 'react'

import { IconPicker } from '../components/IconPicker'
import { TextArea } from '../components/TextArea'
import { NewTool } from '../components/custom/Page/NewTool/NewTool'
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
import { blockReducer } from '../utils/dnd/blocks/blockReducer'
import createGroupedBlocks from '../utils/dnd/blocks/createGroupedBlocks'

const twiconsPath = '/twicons/'

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

    const [sortables, setSortables] = useState([]);
    const [blocks, dispatch] = useReducer(blockReducer, []);

    const sensors = useSensors(useSensor(MouseSensor, {
        activationConstraint: {
            delay: 200,
            tolerance: 5
        }
    }), useSensor(PointerSensor, {
        activationConstraint: {
            delay: 200,
            tolerance: 5
        }
    }))

    const generateSortableItems = (blocks) => {
        return blocks.map((block) => {
            const rowIndex = block.row
            const colIndex = block.orderX
            const blockIndex = block.orderY
            const blockId = block.id
            return `${rowIndex}-${colIndex}-${blockIndex}-${blockId}`
        })
    }

    const handleDragEnd = ({ active, over }) => {
        const id = active.id
        const targetRow = over.id.split('-')[1]

        console.log('id', id, 'targetRow', targetRow)

        dispatch({ type: 'MOVEROW', payload: { id, targetRow } })
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
    }, [currentPage]);

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
    }, [loading]);

    useEffect(() => {
        const data = createGroupedBlocks(initialBlocks)
        dispatch({ type: 'LOAD', payload: { data } })
        setSortables(generateSortableItems(initialBlocks))
    }, [initialBlocks]);

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
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={sortables}>
                        <Blocks blocks={blocks} />
                    </SortableContext>
                </DndContext>
                :{JSON.stringify(blocks)}

                <NewTool />
            </main>
        </React.Fragment>
    )
}

export default Page
