'use client';

import { useQuery } from "@tanstack/react-query";
import CardGif from "../../UI/components/Cards/CardGif";
import PrincipalLayout from "../../UI/layouts/PrincipalLayout";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import getByDescription from "../api/gifs/getByDescription";

export default function Page() {
    const { query: { slug } } = useRouter();

    const { data, isLoading } = useQuery(["description", slug], async () => {
        const data = await getByDescription(slug);

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
                                {
                                    data.data.map((gif, index) => (
                                        <Grid key={index} item xs md>
                                            <CardGif data={gif} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                    )
            }
        </PrincipalLayout>
    )
}