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

export default function UploadUrl({ open, handleClose }) {
    const [disableAutocomplete, setDisableAutocomplete] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const { data: tagsInfo, isLoading } = useQuery(['tags'], async () => {
        const data = await getMostPopularTags();

        return data;
    });

    console.log(tagsInfo)

    const [data, setData] = useState({
        description: '',
        url: '',
        tags: []
    });

    const handleInputs = (e) => {
        const { target: { name, value } } = e;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleClosePopUpSuccess = () => {
        setIsPopUpOpen(false);
    };

    const handleTags = (tagsForm) => {
        setData(prevState => ({
            ...prevState,
            tags: tagsForm
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsUploading(true);


        const postGif = await postUrlGif(data);
        if (!postGif.status) {
            setIsUploading(false);
        }

        setIsPopUpOpen(true);
        setIsUploading(false);
    }

    const noTags = [{ _id: "Add a new tag" }]

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
                                label="URL"
                                variant="standard"
                                type="url"
                                fullWidth
                                inputProps={{ maxLength: 50 }}
                                name='url'
                                onChange={(e) => { handleInputs(e) }}
                                required
                            />
                            {
                                isLoading ?
                                    'Loading tags...'
                                    :
                                    (
                                        !tagsInfo.status ?
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
                                                options={noTags.map(option => option._id)}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="standard"
                                                        label="Tags"
                                                        placeholder="Doge Meme"
                                                    />
                                                )}
                                            />
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
                                                options={tagsInfo?.data.map(option => option._id)}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="standard"
                                                        label="Tags"
                                                        placeholder="Doge Meme"
                                                    />
                                                )}
                                            />
                                    )
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