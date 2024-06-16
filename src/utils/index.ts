const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function formatDate(string: string, type: 'full' | 'short' = 'full') {
    const { date, days } = daysAgo(string);
    if (days === 0) {
        return removeSeconds(date.toLocaleTimeString())
    } else if (days === 1) {
        if (type === 'full') return `yesterday, ${removeSeconds(date.toLocaleTimeString())}`
        return 'yesterday';
    } else if (days < 6) {
        const dayOfWeek = daysOfWeek[date.getDay()];
        if (type === 'full') return `${dayOfWeek}, ${removeSeconds(date.toLocaleTimeString())}`;
        return dayOfWeek;
    } else if (type === 'full') return removeSeconds(date.toLocaleString());
    return removeSeconds(date.toLocaleDateString());
}

function daysAgo(dateString: string) {
    const date = new Date(dateString);
    const today = new Date();
    const diff = today.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return { date, days };
}

function removeSeconds(dateTimeString: string): string {
    // Regular expression to match the time part and remove the seconds
    const timeRegex = /(\d{1,2}:\d{2}):\d{2}(\s?[APMapm]{2})/;

    // Replace the matched seconds part with an empty string
    return dateTimeString.replace(timeRegex, '$1$2');
}