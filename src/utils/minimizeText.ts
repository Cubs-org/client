function minimizeText(text: string, limit: number) {
    var _text = text

    if (text.length > limit) _text = `${text.substring(0, limit)}...`

    return _text
}

export default minimizeText
