export default async function getMostPopularTags(data, token) {
    const formData = new FormData();

    formData.append('description', data.description);
    formData.append('url', data.url);
    formData.append('tags', data.tags);
    
    try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gifs/tags/most-upload`, {
            headers: {

            },
            body: formData
        });
        const response = await request.json();

        return response;
    } catch (err) {
        return {
            status: false,
            data: err.message
        }
    }
}