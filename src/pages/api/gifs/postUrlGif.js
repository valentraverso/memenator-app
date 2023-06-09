export default async function postUrlGif(data) {
    const fetchToken = await fetch(`/api/getTokenUser`);
    const token = await fetchToken.json();
    const formData = new FormData();

    formData.append('description', data.description);
    formData.append('url', data.url);
    formData.append('tags', data.tags);

    try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gifs/post/url`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token.accessToken}`
            },
            body: formData
        });
        const response = await request.json();

        return response;
    } catch (err) {
        return {
            status: false,
            msg: "There was an error while uploading the data."
        }
    }
}