import { useEffect, useState } from 'react';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import { Level } from '@tiptap/extension-heading';

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'

import './editor.css';
import { FaListOl, FaListUl } from 'react-icons/fa6';

export const Editor = ({ content = "<p>Hey, você está no Cub's!</p>" }) => {
    const editor = useEditor({
        extensions: [
            Color.configure({ types: [TextStyle.name, ListItem.name] }),
            TextStyle.configure({ 
                HTMLAttributes: {
                    style: {
                        color: 'color',
                    },
                }
             }),
            ListItem.configure({
                HTMLAttributes: {
                    style: {
                        color: 'color',
                    },
                },
            }),
            StarterKit.configure({
                bulletList: {
                keepMarks: true,
                keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
                orderedList: {
                keepMarks: true,
                keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
            }),
          ],
        content,
    });

    // @ts-ignore
    const [isEditable, setIsEditable] = useState(true);

    useEffect(() => {
        if (editor) {
            editor.setEditable(isEditable);
        }
    }, [isEditable, editor]);

    return (
        <>
            {editor && (
                <BubbleMenu editor={editor} className='border-none outline-none w-[500px] shadow-full'>
                    <div className="flex gap-x-1.5 p-0.5 rounded-md bg-glass-light border border-light-500 dark:bg-glass-dark dark:border-dark-300 backdrop-blur-md">
                        {[1, 2, 3].map((level) => (
                            <button
                                key={`heading-level-${level}`}
                                onClick={() => editor.chain().focus().toggleHeading({ level: level as unknown as Level }).run()}
                                className={clsx(
                                    "w-9 h-9 px-1.5 py-1 rounded-md hover:bg-purple-600 flex justify-center items-center",
                                    editor.isActive('heading', { level }) ? 'bg-purple-600 hover:!bg-purple-500 hover:shadow-full hover:shadow-purple-500 text-light-200' : ''
                                )}
                            >
                                H<small>{level}</small>
                            </button>
                        ))}
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={clsx(
                                "w-9 h-9 px-1.5 py-1 rounded-md hover:bg-purple-600 flex justify-center items-center",
                                editor.isActive('bold') ? 'bg-purple-600 hover:!bg-purple-500 hover:shadow-full hover:shadow-purple-500 text-light-200' : ''
                            )}
                        >
                            <b>B</b>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={clsx(
                                "w-9 h-9 px-1.5 py-1 rounded-md hover:bg-purple-600 flex justify-center items-center",
                                editor.isActive('italic') ? 'bg-purple-600 hover:!bg-purple-500 hover:shadow-full hover:shadow-purple-500 text-light-200' : ''
                            )}
                        >
                            <i className='font-serif'>I</i>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            className={clsx(
                                "w-9 h-9 px-1.5 py-1 rounded-md hover:bg-purple-600 flex justify-center items-center",
                                editor.isActive('strike') ? 'bg-purple-600 hover:!bg-purple-500 hover:shadow-full hover:shadow-purple-500 text-light-200' : ''
                            )}
                        >
                            <s>S</s>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={clsx(
                                "w-9 h-9 px-1.5 py-1 rounded-md hover:bg-purple-600 flex justify-center items-center",
                                editor.isActive('bulletList') ? 'bg-purple-600 hover:!bg-purple-500 hover:shadow-full hover:shadow-purple-500 text-light-200' : ''
                            )}
                        >
                            <FaListUl />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={clsx(
                                "w-9 h-9 px-1.5 py-1 rounded-md hover:bg-purple-600 flex justify-center items-center",
                                editor.isActive('orderedList') ? 'bg-purple-600 hover:!bg-purple-500 hover:shadow-full hover:shadow-purple-500 text-light-200' : ''
                            )}
                        >
                            <FaListOl />
                        </button>

                        {/* <button
                            onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                            className={clsx(
                                "w-9 h-9 px-1.5 py-1 rounded-md hover:bg-purple-600 flex justify-center items-center",
                                editor.isActive('color') ? 'bg-purple-600 hover:!bg-purple-500 hover:shadow-full hover:shadow-purple-500 text-light-200' : ''
                            )}
                        >
                            Color
                        </button> */}
                    </div>
                </BubbleMenu>
            )}
            <EditorContent editor={editor} />
        </>
    );
};
