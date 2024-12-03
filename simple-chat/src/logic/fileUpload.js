export function handleFileUpload(event, setAttachedImage, imagePreview) {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const attachedImage = e.target.result;
            const imgElement = document.createElement('img');
            imgElement.src = attachedImage;
            imgElement.alt = 'Uploaded Image';
            imgElement.style.maxWidth = '200px';

            imagePreview.innerHTML = '';
            imagePreview.appendChild(imgElement);

            setAttachedImage(attachedImage);
        };

        reader.readAsDataURL(file);
    }
}
