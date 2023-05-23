export default async function postUrlGif() {
    try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gifs/post/url`);
        const response = await request.json();

        return response;
    } catch (err) {
        return {
            status: false,
            msg: "There was an error while fetching the data."
        }
    }
}