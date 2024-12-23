export const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
        return "Неверный формат даты";
    }
    return date.toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};
