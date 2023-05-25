'use client';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import { useState } from 'react';
import { Skeleton, TextField } from '@mui/material';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import getMostPopularTags from '../../../pages/api/gifs/getMostPopularTags';
import { useRouter } from 'next/router';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';

export default function MenuTemplate() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const { data: tagsInfo, isLoading: isLoadingTags } = useQuery(['tags'], async () => {
    const data = await getMostPopularTags();

    return data;
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = (e) => {
    if (e.key === 'Enter' && e.target.value.length > 1) {
      router.push(`/search/${e.target.value}`)
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: "center" }}>
        <Link href="/" ><CottageOutlinedIcon sx={{ marginRight: '40px' }} /></Link>
        <TextField id="outlined-basic" label="Search Gif" variant="outlined" inputProps={{ maxLength: 20 }} onKeyDown={(e) => handleSubmit(e)} />
        {
          isLoadingTags ?
            <Skeleton>
              <Typography sx={{ minWidth: 100 }}>a</Typography>
            </Skeleton>
            :
            (
              tagsInfo.status ?
              tagsInfo.data.map(tag => (
                <Typography sx={{ minWidth: 100 }}><Link href={`/tags/${tag._id}`}>{tag._id}</Link></Typography>
              ))
              :
              <p>We don't have tags yet.</p>
            )
        }

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {
              isLoading || !user ?
                <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                :
                <Avatar sx={{ width: 32, height: 32 }}><Image src={user?.picture} width={32} height={32} /></Avatar>
            }
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar />
          {
            !user ?
              'Profile'
              :
              user.name
          }
        </MenuItem>
        <Divider />
        {
          !user ?
            <Link href={'/api/auth/login'}>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Login
              </MenuItem>
            </Link>
            :
            <Link href={'/api/auth/logout'}>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Link>
        }
      </Menu>
    </>
  );
}