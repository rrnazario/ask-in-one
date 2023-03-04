import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { toast } from 'react-toastify';
import LoginService, { DoLoginRequest } from './login.service';
import { AuthContext } from '../../providers/auth.provider';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function Login() {

  const loginService = new LoginService();
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate();
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const values : DoLoginRequest = {
      username: String(formData.get('email')),
      password: String(formData.get('password')),
      company: String(formData.get('company'))
    };

    if (!isValid(values)) return;

   const { data } = await loginService.doLogin(values);
   if (data){
    toast.success('Logado com sucesso!');
    auth.onLogin(data.access_token);
    navigate('/');
   }
  };

  const isValid = (info: DoLoginRequest) : boolean => {
    if (!info.username){
        toast.error('E-mail inválido.');
        return false;
    }

    if (!info.password){
        toast.error('É necessário informar uma senha.')
        return false;
    }
    
    return true;
  }

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
          <Avatar sx={{ m: 1, bgcolor: blue[500] }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="company"
              label="Empresa"
              name="company"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Usuário"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar de mim"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Logar
            </Button>
          </Box>
        </Box>
      </Container>      
    </ThemeProvider>
  );
}