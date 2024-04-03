import data from '@emoji-mart/data/sets/14/twitter.json'
import Picker from '@emoji-mart/react'
import { Emoji, EmojiStyle } from 'emoji-picker-react';

import { Dispatch, SetStateAction } from 'react'
import { Popover } from './Popover'

interface Emoji {
    id: string
    name: string
    native: string
    unified: string
    keywords: string[]
}

interface EmojiPickerProps {
    icon: string
    setIcon: Dispatch<SetStateAction<string>>
    classNames?: string
}

export const IconPicker = ({ icon, setIcon, classNames }:EmojiPickerProps) => {

    const handleSetEmoji = (e: Emoji) => setIcon(e.unified);

    return (
        <Popover
            classNames={classNames}
            direction='bottom-end'
            content={
                <Picker
                    set='twitter'
                    data={data}
                    onEmojiSelect={handleSetEmoji}
                    emojiSize={20}
                    locale="pt"
                    previewPosition="none"
                    perLine={8}
                />
            }>
            <Emoji 
                emojiStyle={EmojiStyle.TWITTER}
                unified={icon} 
                size={32}
            />
        </Popover>
    )
}