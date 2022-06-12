import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { RootState } from '../app/store';
import { DEFAULT_LOGIN_IMAGE } from '../constants';
import { setUserAuthed } from '../slices/authSlice';

export default function Login() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [selectedUser, setSelectedUser] = React.useState({
    id: '',
    name: '',
    avatarURL: '',
    answers: {},
    questions: {}
  });

  const { users } = useAppSelector((state: RootState) => state.user);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(selectedUser.id){
      dispatch(setUserAuthed(selectedUser.id));
    }else{
      alert("Please select a friend !")
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    const foundUser = Object.values(users).find(u => u.id === event.target.value);
    setSelectedUser(foundUser);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{ m: 1, width: 200, height: 200 }}
            src={ selectedUser.avatarURL || DEFAULT_LOGIN_IMAGE}
          />
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <FormControl sx={{ m: 1, width: 400 }} onSubmit={handleSubmit} component={'form'}>
            <InputLabel>Select a friend</InputLabel>
            <Select
              value={selectedUser.id}
              onChange={handleChange}
              input={<OutlinedInput
                label="Select a friend" />}
            >
              {
                Object.values(users).map(user => (
                  <MenuItem
                    key={user.id}
                    value={user.id}
                  >
                    <div className='thumbnail-image'>
                      <Avatar
                        sx={{ m: 1, width: 30, height: 30 }}
                        src={user.avatarURL}
                      />
                      {user.name}
                    </div>
                  </MenuItem>
                ))
              }
            </Select>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, p: 1 }}
            >
              Login
            </Button>
          </FormControl>
        </Box>
      </Container>
    </ThemeProvider>
  );
}