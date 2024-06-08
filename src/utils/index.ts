export function formatDate(string:string) {
    const date = new Date(string);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
        return date.toLocaleTimeString();
    }
    return date.toLocaleString();
}