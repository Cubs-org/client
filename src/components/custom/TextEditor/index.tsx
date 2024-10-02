import { useEffect, useState } from 'react';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextAlign from '@tiptap/extension-text-align'

import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight, FaAngleDown, FaListCheck, FaListOl, FaListUl } from 'react-icons/fa6';
import { RiContractLeftLine, RiContractRightLine, RiMarkPenFill } from "react-icons/ri";
import { Popover } from '../../Popover';

import './editor.css';

const COLORS = [
    { name: 'red', class: '[color]-red-400 dark-[color]-red-600' },
    { name: 'green', class: '[color]-green-400 dark-[color]-green-600' },
    { name: 'blue', class: '[color]-blue-400 dark-[color]-blue-600' },
    { name: 'orange', class: '[color]-orange-400 dark-[color]-orange-600' },
    { name: 'yellow', class: '[color]-yellow-400 dark-[color]-yellow-600' }
];

export const Editor = ({ content = "<p>Hey, você está no Cub's!</p>" }) => {
    // @ts-ignore
    const [isEditable, setIsEditable] = useState(true);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
            }),
            TextStyle.extend({
                addAttributes() {
                    return {
                        class: {
                            default: 'text-grey-400 dark:text-grey-600'
                        },
                    };
                }
            }),
            Highlight.extend({
                addAttributes() {
                    return {
                        class: {
                            default: 'bg-grey-400 dark:bg-grey-600'
                        },
                    };
                },
            }),
            ListItem,
            TaskList.configure({
                itemTypeName: 'taskItem',
            }),
            TaskItem.configure({
                nested: true
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content,
    });

    const handleColorChange = (colorClass) => {
        if (editor) {
            editor.chain().focus().toggleMark('textStyle', { class: colorClass }).run();
        }
    };

    const handleHighlightChange = (colorClass) => {
        if (editor) {
            editor.chain().focus().toggleMark('highlight', { class: colorClass }).run();
        }
    }

    const getCurrentColorClass = () => {
        if (editor) {
            if (editor.isActive('textStyle')) {
                const textStyle = editor.getAttributes('textStyle');
                return String(textStyle.class).replace(/text/g, 'bg');
            }
        }
    };

    const getCurrentHighlightClass = () => {
        if (editor) {
            if (editor.isActive('highlight')) {
                const textStyle = editor.getAttributes('highlight');
                return String(textStyle.class).replace(' px-1 py-0.5 rounded-sm text-sm', '');
            }
        }
    };

    useEffect(() => {
        if (editor) {
            editor.setEditable(isEditable);
        }
    }, [isEditable, editor]);

    return (
        <   >
            {editor && (
                <BubbleMenu editor={editor} className='border-none outline-none w-[635px] shadow-full'>
                    <div className="flex gap-x-1.5 p-0.5 rounded-md bg-glass-light border border-light-500 dark:bg-glass-dark dark:border-dark-300 backdrop-blur-md">
                        {[1, 2, 3].map((level) => (
                            <button
                                key={`heading-level-${level}`}
                                // @ts-ignore
                                onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                                className={clsx(
                                    "w-9 h-9 px-1.5 py-1 rounded-md hover:bg-purple-600 align-bottom hover:text-light-200",
                                    editor.isActive('heading', { level }) ? 'bg-purple-600 hover:!bg-purple-500 hover:shadow-full hover:shadow-purple-500 text-light-200' : ''
                                )}
                            >
                                H<small>{level}</small>
                            </button>
                        ))}
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={clsx(
                                "w-9 h-9 px-1.5 py-1 rounded-md hover:bg-purple-600 flex justify-center items-center hover:text-light-200",
                                editor.isActive('bold') ? 'bg-purple-600 hover:!bg-purple-500 hover:shadow-full hover:shadow-purple-500 text-light-200' : ''
                            )}
                        >
                            <b>B</b>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={clsx(
                                "w-9 h-9 px-1.5 py-1 rounded-md hover:bg-purple-600 flex justify-center items-center hover:text-light-200",
                                editor.isActive('italic') ? 'bg-purple-600 hover:!bg-purple-500 hover:shadow-full hover:shadow-purple-500 text-light-200' : ''
                            )}
                        >
                            <i className='font-serif'>I</i>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            className={clsx(
                                "w-9 h-9 px-1.5 py-1 rounded-md hover:bg-purple-600 flex justify-center items-center hover:text-light-200",
                                editor.isActive('strike') ? 'bg-purple-600 hover:!bg-purple-500 hover:shadow-full hover:shadow-purple-500 text-light-200' : ''
                            )}
                        >
                            <s>S</s>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={clsx(
                                "w-9 h-9 px-1.5 py-1 rounded-md hover:bg-purple-600 flex justify-center items-center hover:text-light-200",
                                editor.isActive('bulletList') ? 'bg-purple-600 hover:!bg-purple-500 hover:shadow-full hover:shadow-purple-500 text-light-200' : ''
                            )}
                        >
                            <FaListUl />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={clsx(
                                "w-9 h-9 px-1.5 py-1 rounded-md hover:bg-purple-600 flex justify-center items-center hover:text-light-200",
                                editor.isActive('orderedList') ? 'bg-purple-600 hover:!bg-purple-500 hover:shadow-full hover:shadow-purple-500 text-light-200' : ''
                            )}
                        >
                            <FaListOl />
                        </button>

                        <button
                            onClick={() => editor.chain().focus().toggleTaskList().run()}
                            className={clsx(
                                "w-9 h-9 px-1.5 py-1 rounded-md hover:bg-purple-600 flex justify-center items-center hover:text-light-200",
                                editor.isActive('taskList') ? 'bg-purple-600 hover:!bg-purple-500 hover:shadow-full hover:shadow-purple-500 text-light-200' : ''
                            )}
                        >
                            <FaListCheck />
                        </button>

                        {editor.isActive('taskList') && (
                            <>
                                <button
                                    onClick={() => editor.chain().focus().liftListItem('taskItem').run()}
                                    className={clsx("w-9 h-9 px-1.5 py-1 rounded-md hover:bg-purple-600 flex justify-center items-center hover:text-light-200")}
                                    disabled={!editor.can().liftListItem('taskItem')}
                                >
                                    <RiContractLeftLine />
                                </button>
                                <button
                                    onClick={() => editor.chain().focus().sinkListItem('taskItem').run()}
                                    className={clsx("w-9 h-9 px-1.5 py-1 rounded-md hover:bg-purple-600 flex justify-center items-center hover:text-light-200")}
                                    disabled={!editor.can().sinkListItem('taskItem')}
                                >
                                    <RiContractRightLine />
                                </button>
                            </>
                        )}

                        <button
                            onClick={() => editor.chain().focus().setTextAlign('left').run()}
                            className={clsx(
                                "w-9 h-9 px-1.5 py-1 rounded-md hover:bg-purple-600 flex justify-center items-center hover:text-light-200",
                                editor.isActive({ textAlign: 'left' }) ? 'bg-purple-600 hover:!bg-purple-500 hover:shadow-full hover:shadow-purple-500 text-light-200' : ''
                            )}
                        >
                            <FaAlignLeft />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().setTextAlign('center').run()}
                            className={clsx(
                                "w-9 h-9 px-1.5 py-1 rounded-md hover:bg-purple-600 flex justify-center items-center hover:text-light-200",
                                editor.isActive({ textAlign: 'center' }) ? 'bg-purple-600 hover:!bg-purple-500 hover:shadow-full hover:shadow-purple-500 text-light-200' : ''
                            )}
                        >
                            <FaAlignCenter />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().setTextAlign('right').run()}
                            className={clsx(
                                "w-9 h-9 px-1.5 py-1 rounded-md hover:bg-purple-600 flex justify-center items-center hover:text-light-200",
                                editor.isActive({ textAlign: 'right' }) ? 'bg-purple-600 hover:!bg-purple-500 hover:shadow-full hover:shadow-purple-500 text-light-200' : ''
                            )}
                        >
                            <FaAlignRight />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                            className={clsx(
                                "w-9 h-9 px-1.5 py-1 rounded-md hover:bg-purple-600 flex justify-center items-center hover:text-light-200",
                                editor.isActive({ textAlign: 'justify' }) ? 'bg-purple-600 hover:!bg-purple-500 hover:shadow-full hover:shadow-purple-500' : ''
                            )}
                        >
                            <FaAlignJustify />

                        </button>

                        <Popover content={
                            <div className='flex flex-col gap-1'>
                                {COLORS.map(color => {
                                    const bg = color.class.replace(/\[color\]/g, 'bg');
                                    const param = color.class.replace(/\[color\]/g, 'text')
                                    return (
                                        <button
                                            key={color.name}
                                            onClick={() => handleColorChange(param)}
                                            className={clsx(
                                                "w-9 h-9 px-1.5 py-1 rounded-md hover:bg-purple-600 flex justify-center items-center",
                                                editor.isActive('textStyle', { class: param }) ? 'bg-purple-600 hover:!bg-purple-500 hover:shadow-full hover:shadow-purple-500 text-light-200' : ''
                                            )}
                                        >
                                            <span className={clsx('min-w-[15px] min-h-[15px] rounded-full ', bg)} />
                                        </button>
                                    )
                                })}
                            </div>
                        }>
                            <button className="w-9 h-9 px-1.5 py-1 rounded-md hover:bg-purple-600 flex justify-center gap-0.5 items-center">
                                <span className={clsx('min-w-[15px] min-h-[15px] rounded-full bg-light-500 dark:bg-dark-500', getCurrentColorClass())} />
                                <FaAngleDown size={32} />
                            </button>
                        </Popover>

                        <Popover content={
                            <div className='flex flex-col gap-1'>
                                {COLORS.map(color => {
                                    const param = `${color.class.replace(/\[color\]/g, 'bg')} px-1 py-0.5 rounded-sm text-sm text-black dark:text-white`;
                                    const bg = color.class.replace(/\[color\]/g, 'bg');
                                    return (
                                        <button
                                            key={color.name}
                                            onClick={() => handleHighlightChange(param)}
                                            className={clsx(
                                                "w-9 h-9 px-1.5 py-1 rounded-md hover:bg-purple-600 flex justify-center items-center",
                                                editor.isActive('highlight', { class: param }) ? 'bg-purple-600 hover:!bg-purple-500 hover:shadow-full hover:shadow-purple-500' : ''
                                            )}
                                        >
                                            <span className={clsx('min-w-[15px] min-h-[15px] rounded-full', bg)} />
                                        </button>
                                    )
                                })}
                            </div>
                        }>
                            <button className="w-9 h-9 px-1.5 py-1 rounded-md hover:bg-purple-600 flex justify-center gap-0.5 items-center relative">
                                <span className="min-w-[15px] before:z-10 min-h-[15px]">
                                    <RiMarkPenFill className='relative z-20' size={24} />
                                    <span className={clsx("absolute bottom-1.5 left-0 bg-light-500 dark:bg-dark-500 w-full rounded-sm text-xs min-h-[8px]", getCurrentHighlightClass())} />
                                </span>
                                <FaAngleDown size={32} />
                            </button>
                        </Popover>
                    </div>
                </BubbleMenu>
            )}
            <EditorContent editor={editor} />
        </>
    );
};
