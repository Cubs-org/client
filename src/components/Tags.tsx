import { useState } from 'react'
import clsx from 'clsx'
import { Discover, DiscoverDictionary } from './Discover'
import { CgClose } from 'react-icons/cg'
import cleanStr from '../utils/cleanStr'
import { TextArea } from './TextArea'

interface ITags {
    data: DiscoverDictionary[]
    dictionary: DiscoverDictionary[]
    onClick: (tag: DiscoverDictionary) => void
    onDelete: (tag: DiscoverDictionary) => void
    allowMultiPaste?: boolean
}

interface ITag {
    value: string
    color?: string
    onDelete: () => void
}

const Tag = ({ value, color, onDelete }: ITag) => {
    const tagColor = {
        'bg-red-600 hover:bg-red-700': color === 'red',
        'bg-green-600 hover:bg-green-700': color === 'green',
        'bg-blue-600 hover:bg-blue-700': color === 'blue',
        'bg-yellow-600 hover:bg-yellow-700': color === 'yellow',
        'bg-orange-600 hover:bg-orange-700': color === 'orange',
        'bg-violet-600 hover:bg-purple-700': color === 'purple',
        'bg-pink-600 hover:bg-pink-700': color === 'pink',
        'bg-indigo-600 hover:bg-indigo-700': color === 'indigo',
        'bg-gray-600 hover:bg-gray-700': color === 'gray',
        'bg-light-300 dark:bg-dark-700': !color,
    }

    return (
        <div
            className={clsx(
                'py-0.5 rounded-md flex items-center pl-1 pr-1.5 gap-x-1',
                {
                    ...tagColor,
                }
            )}
        >
            <CgClose
                size={16}
                onClick={onDelete}
                className={clsx(
                    'hover:bg-light-400 dark:hover:bg-dark-500 rounded-full p-0.5 cursor-pointer',
                    {
                        ...tagColor,
                    }
                )}
            />
            {value}
        </div>
    )
}

export const Tags = ({
    data,
    dictionary,
    onClick,
    onDelete,
    allowMultiPaste = true,
}: ITags) => {
    const [tags, setTags] = useState<DiscoverDictionary[]>(data || [])
    const [search, setSearch] = useState<string>('')
    const [onPaste, setOnPaste] = useState<boolean>(true)

    const handleAdd = (value: string) => {
        if (value.includes(',') && allowMultiPaste) {
            setOnPaste(true)

            loadPaste(value)
        } else {
            setOnPaste(false)
            setSearch(value)
        }
    }

    const handleClick = (tag: DiscoverDictionary) => {
        setTags([...tags, tag])
        tag = tags.find((item) => cleanStr(item.name) === tag.name) || tag
        onClick(tag)
        setSearch('')
    }

    const handleDelete = (tag: any) => {
        setTags((prevTags) => {
            return prevTags.filter((prevTag) => prevTag !== tag)
        })
        tag = tags.find((item) => item.name === tag.name) || tag
        onDelete(tag)
    }

    const loadPaste = (text: string) => {
        const pastedTags = serializePaste(text).map((name) => ({ name }))
        if (pastedTags.length > 0) setTags((prev) => [...prev, ...pastedTags])
    }

    const serializePaste = (str: string) => {
        const possibleTags = str
            .split(/[,;.\s]+/)
            .filter((item) => item.trim() !== '')
        const verifiedTags = possibleTags.filter((tag) =>
            dictionary.some(
                (item) => item.name.toLowerCase() === tag.toLowerCase()
            )
        )
        return verifiedTags
    }

    return (
        <div className="relative border border-light-500 dark:border-dark-500 rounded-md">
            <ul className="flex flex-wrap p-1.5 gap-1">
                {(tags ?? []).map((tag, _i) => (
                    <Tag
                        key={`${_i}-${JSON.stringify(tag)}`}
                        value={tag.name}
                        onDelete={() => handleDelete(tag)}
                    />
                ))}
                <li className="grow">
                    <TextArea
                        value={search}
                        handle={handleAdd}
                        updateOnChange={true}
                        outlineDisabled
                    />
                </li>
            </ul>
            {!onPaste && (
                <div
                    className={clsx(
                        'absolute bottom-0 left-0 w-full translate-y-full z-10',
                        {
                            hidden: !search,
                            block: search,
                        }
                    )}
                >
                    <Discover
                        dictionary={dictionary}
                        searchableBy={{ name: search }}
                        onClick={handleClick}
                    />
                </div>
            )}
        </div>
    )
}
