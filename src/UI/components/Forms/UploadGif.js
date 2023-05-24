import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Autocomplete, Backdrop, Chip, CircularProgress, Snackbar } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import getMostPopularTags from '../../../pages/api/gifs/getMostPopularTags';
import postUrlGif from '../../../pages/api/gifs/postUrlGif';

export default function UploadGif({ open, handleClose }) {
    const [disableAutocomplete, setDisableAutocomplete] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const { data: tagsInfo, isLoading } = useQuery(['tags'], async () => {
        const data = await getMostPopularTags();

        console.log(await data)

        return data;
    });


    const [data, setData] = useState({
        description: '',
        url: '',
        tags: []
    });

    const handleInputs = (e) => {
        const { target: { name, value } } = e;
        setData(prevState => ({
            ...data,
            [name]: value
        }))
    }

    const handleImages = (e) => {
        const { target: { files } } = e;
        setData(prevState => ({
            ...data,
            gif: files[0]
        }))
    }

    const handleClosePopUpSuccess = () => {
        setIsPopUpOpen(false);
    };

    const handleTags = (tagsForm) => {
        setData(prevState => ({
            ...data,
            tags: tagsForm
        }))

        setIsPopUpOpen
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsUploading(true);


        const postGif = await fetch('/api/gifs/postGif', {
            method: 'POST',
            body: data
        });

        const errorCodes = [404, 401];

        if (!postGif.status || errorCodes.includes(postGif.status)) {
            console.log("error", postGif)
            setIsUploading(false);
            return;
        }

        console.log("post", postGif)

        setIsPopUpOpen(true);
        setIsUploading(false);
    }

    return (
        isUploading ?
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            :
            <div>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={isPopUpOpen}
                    onClose={handleClosePopUpSuccess}
                    message="Succesfully Upload"
                    key={'top' + 'center'}
                    severity="success"
                />
                <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth={'md'}
                    fullWidth={true}>
                    <DialogTitle>Upload GIF by URL</DialogTitle>
                    <form onSubmit={(e) => {
                        handleSubmit(e);
                    }}>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Description"
                                type="text"
                                fullWidth
                                variant="standard"
                                name='description'
                                inputProps={{ maxLength: 20 }}
                                onChange={(e) => { handleInputs(e) }}
                                required
                            />
                            <TextField
                                name='gif'
                                type='file'
                                inputProps={{ accept: "image/gif" }}
                                fullWidth
                                margin="dense"
                                sx={{ margin: '20px 0' }}
                                onChange={(e) => { handleImages(e) }}
                                required
                            />
                            {
                                isLoading ?
                                    'Loading tags...'
                                    :
                                    <Autocomplete
                                        multiple
                                        freeSolo
                                        disabled={disableAutocomplete === 5}
                                        onChange={(_event, value) => {
                                            setDisableAutocomplete(value.length)
                                            handleTags(value)
                                        }}
                                        renderTags={(value, getTagProps) =>
                                            value.map((option, index) => (
                                                <Chip
                                                    variant="outlined"
                                                    label={option}
                                                    {...getTagProps({ index })}
                                                    disabled={false} />

                                            ))
                                        }
                                        limitTags={5}
                                        options={tagsInfo.data.map(option => option._id)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="standard"
                                                label="Tags"
                                                placeholder="Doge Meme"
                                            />
                                        )}
                                    />
                            }
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type='submit'>Upload</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
    );
}

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
]