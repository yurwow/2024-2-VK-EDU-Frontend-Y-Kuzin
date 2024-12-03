export function adjustTextHeight(textHeightElement, messageContainer) {
    textHeightElement.addEventListener('input', function () {
        this.style.height = 'auto';
        const scrollHeight = this.scrollHeight;

        if (scrollHeight <= 250) {
            this.style.height = scrollHeight + 'px';
        } else {
            this.style.height = '250px';
        }

        const textareaHeight = this.offsetHeight;
        const containerHeight = `calc(100vh - ${textareaHeight + 150}px)`;
        messageContainer.style.height = containerHeight;
    });
}
