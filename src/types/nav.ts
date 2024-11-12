export interface ChildLinksProps {
    section: string
    links: LinksProps[]
}

export interface LinksProps {
    name: string
    path: string
    child?: ChildLinksProps[]
}
