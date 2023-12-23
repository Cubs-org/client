import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import clsx from 'clsx'
import { Dispatch, SetStateAction, useState } from 'react'
import { Popover } from './Popover'

interface Emoji {
    id: string
    name: string
    native: string
    unified: string
    keywords: string[]
}

interface EmojiPickerProps {
    emoji: string
    setEmoji: Dispatch<SetStateAction<string>>
    classNames?: string
}

export const EmojiPicker = ({ emoji, setEmoji, classNames }:EmojiPickerProps) => {

    const handleSetEmoji = (e: Emoji) => {
        // console.log(e)
        setEmoji(e.native)
    }

    const [visible, setVisible] = useState(false);

    return (
        <div className={clsx("bg-red-500", classNames)}>
            <Popover 
                show={visible} 
                content={
                    <Picker
                        data={data} 
                        onEmojiSelect={handleSetEmoji}
                        onClickOutside={() => setVisible(false)}
                        emojiSize={18}
                        perLine={9}
                        locale="pt"
                        previewPosition="none"
                        autoFocus
                    />
            }>
                {emoji}
            </Popover>
        </div>
    )
}