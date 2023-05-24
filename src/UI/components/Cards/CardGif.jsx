'use client';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Link from 'next/link';
import { useState } from 'react';
import { Snackbar } from '@mui/material';

export default function CardGif({ data }) {
    const [isCopy, setIsCopy] = useState(false);

    const handleShare = async () => {
         navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_MAIN_URL}/gif/${data._id}`)
        setIsCopy(true);
    }

    const handleIsCopy = () => {
        setIsCopy(false)
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={isCopy}
                onClose={handleIsCopy}
                message="Copy to clipboard"
                key={'top' + 'center'}
                severity="success"
            />
            <Card sx={{ maxWidth: 345 }}>
                <Link href={`/gif/${data._id}`}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                R
                            </Avatar>
                        }
                        title={data.description}
                        subheader={data.createdAt.slice(0, 10)}
                    />
                </Link>
                <CardMedia
                    component="img"
                    height="194"
                    image={data.file.secure_url}
                    alt="Paella dish"
                />
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon onClick={handleShare} />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
}