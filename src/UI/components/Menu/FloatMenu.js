import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import UploadUrl from '../Forms/UploadUrl';
import { useState } from 'react';


const actions = [
    { icon: <AddPhotoAlternateOutlinedIcon />, name: 'Upload gif' },
    { icon: <LinkOutlinedIcon />, name: 'Upload by link' }
];

export default function BasicSpeedDial() {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <UploadUrl open={open} handleClose={handleClose} />
            <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                >

                    <SpeedDialAction
                        key={'Upload gif'}
                        icon={<AddPhotoAlternateOutlinedIcon />}
                        tooltipTitle={'Upload gif'}
                        onClick={handleClickOpen}
                    />

                </SpeedDial>
            </Box>
        </>
    );
}