export default async function getByDescription(query) {

    try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gifs/description/${query}`);
        const response = await request.json();

        return response;
    } catch (err) {
        return {
            status: false,
            data: err.message
        }
    }
}