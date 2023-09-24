export default async (e) => {
    var formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', 'highseasmarket');
    const data = await fetch('https://api.cloudinary.com/v1_1/dp4imt42j/image/upload', {
        method: 'POST',
        body: formData
    }).then(res => res.json());

    const { secure_url: imageUrl } = data;
    return imageUrl;
}