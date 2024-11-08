import data from '@emoji-mart/data/sets/14/twitter.json'
import Picker from '@emoji-mart/react'
import { Emoji, EmojiStyle } from 'emoji-picker-react'

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
    setIcon?: Dispatch<SetStateAction<string>>
    classNames?: string
    hide?: boolean
    size?: number
}

export const IconPicker = ({
    icon,
    setIcon,
    classNames,
    size = 24,
    hide = false,
}: EmojiPickerProps) => {
    const handleSetEmoji = (e: Emoji) => setIcon?.(e.unified)

    return (
        <Popover
            classNames={classNames}
            direction="bottom-end"
            content={
                <Picker
                    set="twitter"
                    data={data}
                    onEmojiSelect={handleSetEmoji}
                    emojiSize={20}
                    locale="pt"
                    previewPosition="none"
                    perLine={8}
                />
            }
        >
            <Emoji
                emojiStyle={EmojiStyle.TWITTER}
                unified={hide ? '1f642' : icon}
                size={size}
            />
        </Popover>
    )
}

export const Icon = ({ icon, size = 24 }: EmojiPickerProps) => (
    <Emoji emojiStyle={EmojiStyle.TWITTER} unified={icon} size={size} />
)
