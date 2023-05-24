import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function postGif(req, res) {
    console.log(req.files)
    try {
        const { accessToken } = await getAccessToken(req, res);

        console.log("code", accessToken)

        const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gifs/post`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const response = request.json();

        res.status(request.status).send(Response)
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
})