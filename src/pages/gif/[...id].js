'use client';

import { useQuery } from "@tanstack/react-query";
import CardGif from "../../UI/components/Cards/CardGif";
import PrincipalLayout from "../../UI/layouts/PrincipalLayout";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import getGifById from "../api/gifs/getGifById";

export default function Page() {
    const { query: { id } } = useRouter();

    const { data, isLoading } = useQuery(["id", id], async () => {
        const data = await getGifById(id);

        return data;
    })
    return (
        <PrincipalLayout>
            {
                isLoading ?
                    <p>Loading...</p>
                    :
                    (
                        !data.status ?
                            <p>{data.msg}</p>
                            :
                            <Grid container spacing={4}
                                sx={{ marginLeft: 0, marginTop: 0 }}>
                                <Grid item xs md>
                                    <CardGif data={data.data} />
                                </Grid>
                            </Grid>
                    )
            }
        </PrincipalLayout>
    )
}