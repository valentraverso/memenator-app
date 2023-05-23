'use client';

import { useQuery } from "@tanstack/react-query";
import CardGif from "../UI/components/Cards/CardGif";
import getAllGifs from "../api/gifs/getAllGifs";
import PrincipalLayout from "../UI/layouts/PrincipalLayout";
import { Grid } from "@mui/material";

export default function Page() {
    const { data, isLoading } = useQuery(["all"], async () => {
        const data = await getAllGifs();

        return data;
    })

    console.log(data)

    return (
        isLoading ?
            <p>Loading...</p>
            :
            <PrincipalLayout>
                <Grid container spacing={4} 
                sx={{marginLeft: 0, marginTop: 0}}>
                    {
                        data.data.map(gif => (
                            <Grid item xs>
                                <CardGif data={gif} />
                            </Grid>
                        ))
                    }
                </Grid>
            </PrincipalLayout>
    )
}