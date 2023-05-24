import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function getToken(req, res) {
    try {
        const { accessToken } = await getAccessToken(req, res);

        res.status(200).send({ accessToken })
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
})