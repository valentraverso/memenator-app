export default async function getMostPopularTags() {
    

    try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gifs/tags/most-upload`);
        const response = await request.json();

        return response;
    } catch (err) {
        return {
            status: false,
            data: err.message
        }
    }
}