import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import UploadUrl from '../Forms/UploadUrl';
import { useState } from 'react';
import UploadGif from '../Forms/UploadGif';


const actions = [
    { icon: <AddPhotoAlternateOutlinedIcon />, name: 'Upload gif' },
    { icon: <LinkOutlinedIcon />, name: 'Upload by link' }
];

export default function BasicSpeedDial() {

    const [openModalUploadUrl, setopenModalUploadUrl] = useState(false);
    const [openModalUploadGif, setOpenModalUploadGif] = useState(false);

    const handleOpenModalUploadUrl = () => {
        setopenModalUploadUrl(true);
    };

    const handleCloseModalUploadUrl = () => {
        setopenModalUploadUrl(false);
    };

    const handleOpenModalUploadGif = () => {
        setOpenModalUploadGif(true);
    };

    const handleCloseModalUploadGif = () => {
        setOpenModalUploadGif(false);
    };

    return (
        <>
            <UploadUrl open={openModalUploadUrl} handleClose={handleCloseModalUploadUrl} />
            <UploadGif open={openModalUploadGif} handleClose={handleCloseModalUploadGif} />
            <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'fixed', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                >
                    <SpeedDialAction
                        key={'Upload gif'}
                        icon={<AddPhotoAlternateOutlinedIcon />}
                        tooltipTitle={'Upload gif'}
                        onClick={handleOpenModalUploadGif}
                    />
                    <SpeedDialAction
                        key={'Upload gif by url'}
                        icon={<LinkOutlinedIcon />}
                        tooltipTitle={'Upload gif by url'}
                        onClick={handleOpenModalUploadUrl}
                    />
                </SpeedDial>
            </Box>
        </>
    );
}