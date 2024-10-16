import React, { useEffect, useState } from 'react'

import { IconPicker } from '../components/IconPicker'
import { TextArea } from '../components/TextArea'
import { NewTool } from '../components/Page/NewTool/NewTool'
import { Header } from '../components/Page/Header'
import { usePage } from '../contexts/pageContext'

import { branch } from '../lib/skeleton.json'
import { initialBlocks } from '../lib/initialBlocks'
import { GroupedBlocks } from '../components/Page/Blocks'

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

    const [blocks, _] = useState(initialBlocks);

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
                <GroupedBlocks blocks={blocks} />

                <NewTool />
            </main>
        </React.Fragment>
    )
}

export default Page
