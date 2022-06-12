import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../app/hooks';
import { logout } from '../slices/authSlice';
import { User } from '../constants';

interface LinkTabProps {
    label: string;
    href: string;
}


export default function NavTabs({ user }: { user: User }) {
    const [value, setValue] = React.useState(0);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const handleLogout = () => {
        dispatch(logout());
    };

    function LinkTab(props: LinkTabProps) {
        return (
            <Tab
                component="a"
                onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                    event.preventDefault();
                    navigate(props.href);
                }}
                {...props}
            />
        );
    }

    return (
        <Box sx={{ height: '10%', width: '100%', display: 'flex', justifyContent: 'space-between'}}>
            <Tabs value={value} onChange={handleChange}>
                <LinkTab label="Home" href="" />
                <LinkTab label="New Poll" href="/add" />
                <LinkTab label="Leader Board" href="/leader-board" />
            </Tabs>
            <div style={{ display: 'flex',alignItems: 'center' }}>
                <Avatar
                    sx={{ m: 1, width: 30, height: 30 }}
                    src={user.avatarURL || ''}
                />
                {user.name}
                <Button variant='outlined' sx={{ ml: 2 }} onClick={handleLogout}>Logout &nbsp;<LogoutIcon /></Button>
            </div>
        </Box>
    );
}
