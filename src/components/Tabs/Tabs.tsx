import { Button } from '@/components/Button'
import { Tab, NavTabProps } from './Tab'
import { useState } from 'react'

interface NavTabsProps {
    tabs: NavTabProps[]
    onChangeTab?: (tabId: number) => void
}

export const NavTabs = ({ tabs, onChangeTab }: NavTabsProps) => {
    const [activeTab, setActiveTab] = useState<number>(0)

    const handleClick = (tabId: number) => {
        setActiveTab(tabId)
        onChangeTab?.(tabId)
    }

    return (
        <div className="flex gap-1.5">
            {tabs.map((item) => (
                <Tab
                    key={item.id}
                    {...item}
                    active={activeTab === item.id}
                    onChangeTab={() => handleClick(item.id)}
                />
            ))}
            <Button classNames="bg-light-900 px-2 py-0">+</Button>
        </div>
    )
}
