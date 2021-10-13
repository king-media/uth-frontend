import _camelCase from 'lodash/camelCase'

export function lowerAndCamelCase(text) {
    const camelText = _camelCase(text)
    return camelText.toLowerCase()
}
