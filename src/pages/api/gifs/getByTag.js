export default async function getByTagName(query) {

    try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gifs/tags/name/${query}`);
        const response = await request.json();

        return response;
    } catch (err) {
        return {
            status: false,
            data: err.message
        }
    }
}