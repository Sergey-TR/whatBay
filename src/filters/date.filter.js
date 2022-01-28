export default function dateFilter(value, format='date') {
    const options = {}
    if (format.includes('date')) {
        options.day = '2-digit'
        options.month = 'short'
        options.year = 'numeric'
    }
    if (format.includes('short')) {
        options.day = '2-digit'
        options.month = 'short'
    }

    return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
}