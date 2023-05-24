export default async function postGif(data) {
    const fetchToken = await fetch(`/api/getTokenUser`);
    const token = await fetchToken.json();

    const formData = new FormData();

    formData.append('description', data.description);
    formData.append('tags', data.tags);
    formData.append('gifs', data.gif);

    try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gifs/post`, {
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
            msg: err.message
        }
    }
}