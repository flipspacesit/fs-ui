export const capitalizeWord = (sentence: string): string => {
    if (typeof sentence !== 'string' || sentence.length === 0) {
        return sentence
    }

    const words = sentence.split(' ')
    const capitalizedWords = words.map(word => {
        if (word.length === 0) {
            return word
        }
        return word.charAt(0).toUpperCase() + word.slice(1)
    })

    return capitalizedWords.join(' ')
};

export default capitalizeWord;
