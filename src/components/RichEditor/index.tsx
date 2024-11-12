import { useEffect, useState } from 'react'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import clsx from 'clsx'

import {
    FaAlignCenter,
    FaAlignJustify,
    FaAlignLeft,
    FaAlignRight,
    FaAngleDown,
    FaListCheck,
    FaListOl,
    FaListUl,
} from 'react-icons/fa6'
import { RiContractLeftLine, RiContractRightLine } from 'react-icons/ri'
import { MdFontDownload, MdOutlineFontDownload } from 'react-icons/md'
import { Popover } from '../Popover'

import { useExtensions } from '../Skeleton/useExtensions'

import { COLORS } from './colors'
import './editor.css'

interface EditorProps {
    content?: string
}

export const Editor = ({
    content = "<p>Hey, você está no Cub's!</p>",
}: EditorProps) => {
    const [isEditable, _] = useState(true)

    const editor = useEditor({
        extensions: useExtensions(),
        content,
    })

    const handleColorChange = (colorClass) => {
        if (editor) {
            editor
                .chain()
                .focus()
                .toggleMark('textStyle', { class: colorClass })
                .run()
        }
    }

    const handleHighlightChange = (colorClass) => {
        const replacedColorClass = colorClass.replace(/\btext-sm\b/g, '')
        if (editor) {
            editor
                .chain()
                .focus()
                .toggleMark('highlight', { class: replacedColorClass })
                .run()
        }
    }

    const getCurrentColorClass = () => {
        if (editor) {
            if (editor.isActive('textStyle')) {
                const textStyle = editor.getAttributes('textStyle')
                return String(textStyle.class)
            }
        }
    }

    const getCurrentHighlightClass = () => {
        if (editor) {
            if (editor.isActive('highlight')) {
                const textStyle = editor.getAttributes('highlight')
                return String(textStyle.class)
                    .replace(' px-1 py-0.5 rounded-sm', '')
                    .replace('text-sm', '')
                    .replace(/bg/g, 'text')
                    .replace('text-black dark:text-white', '')
            }
        }
    }

    useEffect(() => {
        if (editor) {
            editor.setEditable(isEditable)
            editor.commands.setContent(content)
        }
    }, [isEditable, editor])

    return (
        <>
            {editor && (
                <BubbleMenu
                    editor={editor}
                    pluginKey={'bubbleMenu'}
                    className="border-none outline-none w-[400px] shadow-full bg-black"
                    tippyOptions={{
                        placement: 'top',
                        maxWidth: '400px', // defines a container width
                    }}
                >
                    <div className="flex gap-1 p-0.5 rounded-md bg-glass-light border border-light-500 dark:bg-glass-dark dark:border-dark-300 backdrop-blur-md">
                        {/* Heading Levels */}
                        <Popover
                            direction="bottom-start"
                            content={
                                <div className="flex flex-col gap-0.5">
                                    {[1, 2, 3].map((level) => (
                                        <button
                                            key={`heading-level-${level}`}
                                            onClick={() =>
                                                editor
                                                    .chain()
                                                    .focus()
                                                    // @ts-ignore
                                                    .toggleHeading({ level })
                                                    .run()
                                            }
                                            className={clsx(
                                                'h-9 px-3 py-1 rounded-md hover:bg-violet-600 align-bottom hover:text-light-200 text-base',
                                                editor.isActive('heading', {
                                                    level,
                                                })
                                                    ? 'bg-violet-600 hover:!bg-violet-500 hover:shadow-full hover:shadow-violet-500 text-light-200'
                                                    : ''
                                            )}
                                        >
                                            Título <small>{level}</small>
                                        </button>
                                    ))}
                                </div>
                            }
                        >
                            <div
                                className={clsx(
                                    'w-fit h-9 px-2 py-0.5 rounded-md hover:bg-violet-600 flex justify-center gap-0.5 items-center text-base',
                                    {
                                        'bg-violet-600 hover:!bg-violet-500 hover:shadow-full hover:shadow-violet-500 text-light-200':
                                            editor.isActive('heading'),
                                    }
                                )}
                            >
                                <span className="mr-1">
                                    {editor.isActive('heading')
                                        ? `Título ${editor.getAttributes('heading').level}`
                                        : 'Texto'}
                                </span>
                                <FaAngleDown size={10} />
                            </div>
                        </Popover>
                        <button
                            onClick={() =>
                                editor.chain().focus().toggleBold().run()
                            }
                            className={clsx(
                                'w-9 h-9 px-1.5 py-1 rounded-md hover:bg-violet-600 flex justify-center items-center hover:text-light-200',
                                editor.isActive('bold')
                                    ? 'bg-violet-600 hover:!bg-violet-500 hover:shadow-full hover:shadow-violet-500 text-light-200'
                                    : ''
                            )}
                        >
                            <b>B</b>
                        </button>
                        <button
                            onClick={() =>
                                editor.chain().focus().toggleItalic().run()
                            }
                            className={clsx(
                                'w-9 h-9 px-1.5 py-1 rounded-md hover:bg-violet-600 flex justify-center items-center hover:text-light-200',
                                editor.isActive('italic')
                                    ? 'bg-violet-600 hover:!bg-violet-500 hover:shadow-full hover:shadow-violet-500 text-light-200'
                                    : ''
                            )}
                        >
                            <i className="font-serif">I</i>
                        </button>
                        <button
                            onClick={() =>
                                editor.chain().focus().toggleStrike().run()
                            }
                            className={clsx(
                                'w-9 h-9 px-1.5 py-1 rounded-md hover:bg-violet-600 flex justify-center items-center hover:text-light-200',
                                editor.isActive('strike')
                                    ? 'bg-violet-600 hover:!bg-violet-500 hover:shadow-full hover:shadow-violet-500 text-light-200'
                                    : ''
                            )}
                        >
                            <s>S</s>
                        </button>
                        {/* Lists styles */}
                        <Popover
                            direction="bottom-start"
                            content={
                                <div className="flex flex-col gap-0.5">
                                    <button
                                        onClick={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .toggleBulletList()
                                                .run()
                                        }
                                        className={clsx(
                                            'w-9 h-9 px-1.5 py-1 rounded-md hover:bg-violet-600 flex justify-center items-center hover:text-light-200',
                                            editor.isActive('bulletList')
                                                ? 'bg-violet-600 hover:!bg-violet-500 hover:shadow-full hover:shadow-violet-500 text-light-200'
                                                : ''
                                        )}
                                    >
                                        <FaListUl />
                                    </button>
                                    <button
                                        onClick={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .toggleOrderedList()
                                                .run()
                                        }
                                        className={clsx(
                                            'w-9 h-9 px-1.5 py-1 rounded-md hover:bg-violet-600 flex justify-center items-center hover:text-light-200',
                                            editor.isActive('orderedList')
                                                ? 'bg-violet-600 hover:!bg-violet-500 hover:shadow-full hover:shadow-violet-500 text-light-200'
                                                : ''
                                        )}
                                    >
                                        <FaListOl />
                                    </button>

                                    <button
                                        onClick={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .toggleTaskList()
                                                .run()
                                        }
                                        className={clsx(
                                            'w-9 h-9 px-1.5 py-1 rounded-md hover:bg-violet-600 flex justify-center items-center hover:text-light-200',
                                            editor.isActive('taskList')
                                                ? 'bg-violet-600 hover:!bg-violet-500 hover:shadow-full hover:shadow-violet-500 text-light-200'
                                                : ''
                                        )}
                                    >
                                        <FaListCheck />
                                    </button>
                                </div>
                            }
                        >
                            <span className="w-9 h-9 px-1.5 py-1 rounded-md hover:bg-violet-600 flex justify-center gap-0.5 items-center">
                                <FaListUl size={24} />
                                <FaAngleDown />
                            </span>
                        </Popover>

                        {/* Checklist */}
                        {editor.isActive('taskList') && (
                            <>
                                <button
                                    onClick={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .liftListItem('taskItem')
                                            .run()
                                    }
                                    className={clsx(
                                        'w-9 h-9 px-1.5 py-1 rounded-md hover:bg-violet-600 flex justify-center items-center hover:text-light-200'
                                    )}
                                    disabled={
                                        !editor.can().liftListItem('taskItem')
                                    }
                                >
                                    <RiContractLeftLine />
                                </button>
                                <button
                                    onClick={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .sinkListItem('taskItem')
                                            .run()
                                    }
                                    className={clsx(
                                        'w-9 h-9 px-1.5 py-1 rounded-md hover:bg-violet-600 flex justify-center items-center hover:text-light-200'
                                    )}
                                    disabled={
                                        !editor.can().sinkListItem('taskItem')
                                    }
                                >
                                    <RiContractRightLine />
                                </button>
                            </>
                        )}

                        <Popover
                            direction="bottom-end"
                            content={
                                <div className="flex flex-col gap-0.5">
                                    <button
                                        onClick={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .setTextAlign('left')
                                                .run()
                                        }
                                        className={clsx(
                                            'w-9 h-9 px-1.5 py-1 rounded-md hover:bg-violet-600 flex justify-center items-center hover:text-light-200',
                                            editor.isActive({
                                                textAlign: 'left',
                                            })
                                                ? 'bg-violet-600 hover:!bg-violet-500 hover:shadow-full hover:shadow-violet-500 text-light-200'
                                                : ''
                                        )}
                                    >
                                        <FaAlignLeft />
                                    </button>
                                    <button
                                        onClick={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .setTextAlign('center')
                                                .run()
                                        }
                                        className={clsx(
                                            'w-9 h-9 px-1.5 py-1 rounded-md hover:bg-violet-600 flex justify-center items-center hover:text-light-200',
                                            editor.isActive({
                                                textAlign: 'center',
                                            })
                                                ? 'bg-violet-600 hover:!bg-violet-500 hover:shadow-full hover:shadow-violet-500 text-light-200'
                                                : ''
                                        )}
                                    >
                                        <FaAlignCenter />
                                    </button>
                                    <button
                                        onClick={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .setTextAlign('right')
                                                .run()
                                        }
                                        className={clsx(
                                            'w-9 h-9 px-1.5 py-1 rounded-md hover:bg-violet-600 flex justify-center items-center hover:text-light-200',
                                            editor.isActive({
                                                textAlign: 'right',
                                            })
                                                ? 'bg-violet-600 hover:!bg-violet-500 hover:shadow-full hover:shadow-violet-500 text-light-200'
                                                : ''
                                        )}
                                    >
                                        <FaAlignRight />
                                    </button>
                                    <button
                                        onClick={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .setTextAlign('justify')
                                                .run()
                                        }
                                        className={clsx(
                                            'w-9 h-9 px-1.5 py-1 rounded-md hover:bg-violet-600 flex justify-center items-center hover:text-light-200',
                                            editor.isActive({
                                                textAlign: 'justify',
                                            })
                                                ? 'bg-violet-600 hover:!bg-violet-500 hover:shadow-full hover:shadow-violet-500'
                                                : ''
                                        )}
                                    >
                                        <FaAlignJustify />
                                    </button>
                                </div>
                            }
                        >
                            <span className="w-9 h-9 px-1.5 py-1 rounded-md hover:bg-violet-600 flex justify-center gap-0.5 items-center">
                                {editor.isActive('textAlign', {
                                    align: 'right',
                                }) ? (
                                    <FaAlignRight size={24} />
                                ) : editor.isActive('textAlign', {
                                      align: 'center',
                                  }) ? (
                                    <FaAlignCenter size={24} />
                                ) : editor.isActive('textAlign', {
                                      align: 'justify',
                                  }) ? (
                                    <FaAlignJustify size={24} />
                                ) : (
                                    <FaAlignLeft size={24} />
                                )}
                                <FaAngleDown />
                            </span>
                        </Popover>

                        <Popover
                            direction="bottom-start"
                            content={
                                <div className="flex flex-col gap-1">
                                    {COLORS.map((color) => {
                                        const param = color.class.replace(
                                            /\[color\]/g,
                                            'text'
                                        )
                                        return (
                                            <button
                                                key={color.name}
                                                onClick={() =>
                                                    handleColorChange(param)
                                                }
                                                className={clsx(
                                                    'px-1.5 py-1 rounded-md hover:bg-violet-600 flex justify-center items-center',
                                                    editor.isActive(
                                                        'textStyle',
                                                        { class: param }
                                                    )
                                                        ? 'bg-violet-600 hover:!bg-violet-500 hover:shadow-full hover:shadow-violet-500 text-light-200'
                                                        : ''
                                                )}
                                            >
                                                <span
                                                    className={clsx(
                                                        'text-base',
                                                        param
                                                    )}
                                                >
                                                    <MdOutlineFontDownload />
                                                </span>
                                            </button>
                                        )
                                    })}
                                </div>
                            }
                        >
                            <div className="px-1.5 py-1 rounded-md hover:bg-violet-600 flex justify-center gap-0.5 items-center">
                                <span
                                    className={clsx(
                                        'text-base ',
                                        getCurrentColorClass()
                                            ? getCurrentColorClass()?.replace(
                                                  'dark-',
                                                  '!dark:'
                                              )
                                            : 'text-light-400 dark:text-dark-400'
                                    )}
                                >
                                    <MdOutlineFontDownload />
                                </span>
                                <FaAngleDown />
                            </div>
                        </Popover>

                        <Popover
                            direction="bottom-start"
                            content={
                                <div className="flex flex-col gap-1">
                                    {COLORS.map((color) => {
                                        const param = `${color.class.replace(/\[color\]/g, 'bg')} px-1 py-0.5 rounded-sm text-sm text-black dark:text-white`
                                        const replacedColorClass =
                                            color.class.replace(
                                                /\[color\]/g,
                                                'text'
                                            )
                                        return (
                                            <button
                                                key={color.name}
                                                onClick={() =>
                                                    handleHighlightChange(param)
                                                }
                                                className={clsx(
                                                    'w-9 h-9 px-1.5 py-1 rounded-md hover:bg-violet-600 flex justify-center items-center',
                                                    editor.isActive(
                                                        'highlight',
                                                        { class: param }
                                                    )
                                                        ? 'bg-violet-600 hover:!bg-violet-500 hover:shadow-full hover:shadow-violet-500'
                                                        : ''
                                                )}
                                            >
                                                <span
                                                    className={clsx(
                                                        'rounded-sm ',
                                                        replacedColorClass
                                                    )}
                                                >
                                                    <MdFontDownload />
                                                </span>
                                            </button>
                                        )
                                    })}
                                </div>
                            }
                        >
                            <div className="h-9 px-1.5 py-1 rounded-md hover:bg-violet-600 flex justify-center gap-0.5 items-center relative">
                                <span
                                    className={clsx(
                                        'flex items-center justify-center text-base',
                                        getCurrentHighlightClass()
                                            ? getCurrentHighlightClass()?.replace(
                                                  'dark-',
                                                  '!dark:'
                                              )
                                            : 'text-light-400 dark:text-dark-400'
                                    )}
                                >
                                    <MdFontDownload />
                                </span>
                                <FaAngleDown />
                            </div>
                        </Popover>
                    </div>
                </BubbleMenu>
            )}
            <EditorContent editor={editor} />
        </>
    )
}
