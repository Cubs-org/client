import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import StarterKit from '@tiptap/starter-kit';

import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'

import { all, createLowlight } from 'lowlight';

const lowlight = createLowlight(all)

lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

export const useExtensions = () => ([
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
        codeBlock: false
    }),
    TextStyle.extend({
        addAttributes() {
            return {
                class: {
                    default: 'text-grey-400 dark:text-grey-600',
                },
            }
        },
    }),
    Highlight.extend({
        addAttributes() {
            return {
                class: {
                    default: 'bg-grey-400 dark:bg-grey-600',
                },
            }
        },
    }),
    CodeBlockLowlight.configure({
        lowlight
    }),
    TaskList.configure({
        itemTypeName: 'taskItem',
    }),
    TaskItem.configure({
        nested: true,
    }),
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
])