import { Button } from '../Button'
import { Input } from '../Input'
import { NavTabProps } from './Tab'
import { NavTabs } from './Tabs'

interface TabsProps {
    children: React.ReactNode
    tabs: NavTabProps[]
    onChangeTab?: (tabId: number) => void
}

export const Tabs = ({ children, tabs, onChangeTab }: TabsProps) => (
    <>
        <div className="w-full flex items-center justify-between mb-2">
            <NavTabs tabs={tabs} onChangeTab={onChangeTab} />
            <div className="flex items-center gap-1">
                <Input
                    value={''}
                    variant="filled"
                    placeholder="Procure por títulos aqui..."
                    readOnly
                />
                <Button
                    classNames="bg-violet-500 hover:bg-violet-600 px-2 py-1"
                    variant="split"
                >
                    Novo
                </Button>
            </div>
        </div>
        {children}
    </>
)
