export default async function getAllGifs() {
    try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gifs/all`);
        const response = await request.json();

        return response;
    } catch (err) {
        return {
            status: false,
            data: err.message
        }
    }
}