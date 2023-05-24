export default async function getGifById(query) {
    try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gifs/id/${query}`);
        const response = await request.json();

        return response;
    } catch (err) {
        return {
            status: false,
            data: err.message
        }
    }
}