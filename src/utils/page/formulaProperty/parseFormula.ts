export default function parseFormula(formula) {
    const regex = /(?:text=([^;]+);)?(?:color=([^;]+))?/

    const matches = !formula ? '' : formula.match(regex)

    let text, color

    text = matches[1] || formula || ''
    color = matches[2] || null

    text = !text ? text : text.replace(/text=/, '')

    return { text, color }
}
