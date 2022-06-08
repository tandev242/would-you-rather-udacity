import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom'


export default function NavBar() {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            haha
            <Tabs value={value} onChange={handleChange}>
                <Tab 
                    label={"label"}
                    component={Link}
                    to={'/hahaa'} />
                <Tab 
                    label={"label"}
                    component={Link}
                    to={'/hahaa'} />
            </Tabs>
        </Box>
    );
}