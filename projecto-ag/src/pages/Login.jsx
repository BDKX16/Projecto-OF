import { useDispatch, useSelector } from "react-redux";
import useFetchAndLoad from "../hooks/useFetchAndLoad";
import { login, register } from "../services/public";
import { createUserAdapter } from "../adapters/user";
import {
  Container,
  Typography,
  Button,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createUser } from "./../redux/states/user";

import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://almendragala.com/">
        Almendragala
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  const { loading, callEndpoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const userState = useSelector((store) => store.user);
  const [newUser, setNewUser] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const result = await callEndpoint(
      login(data.get("email"), data.get("password"))
    );
    dispatch(createUser(createUserAdapter(result)));
  };

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      pass: data.get("password"),
      repass: data.get("repeat-password"),
    });

    if (data.get("repeat-password") !== data.get("password")) {
      //notistack las passwords no coinciden
      return;
    }

    const result = await callEndpoint(
      register(data.get("email"), data.get("password"))
    );
    dispatch(createUser(createUserAdapter(result)));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        {newUser ? (
          <>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmitRegister}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="repeat-password"
                label="Repeat  Password"
                type="password"
                id="repeat-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="#"
                    onClick={() => setNewUser(false)}
                    variant="body2"
                  >
                    {"Already have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="#"
                    onClick={() => setNewUser(true)}
                    variant="body2"
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

/*

export const Login = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const userState = useSelector((store) => store.user);

  const handleClick = async () => {
    const result = await callEndpoint(login("xavimegag@gmail.com", "Luna999"));
    console.log(result);
    dispatch(createUser(createUserAdapter(result)));
  };



  return (
    <>
      {loading ? (
        <div>
          <h3>Loading</h3>
        </div>
      ) : (
        <>
          <Button variant="text" onClick={handleClick}>
            Login
          </Button>
          <Button variant="text" onClick={handleModify}>
            Modificar
          </Button>
          <div>
            <h3>{JSON.stringify(userState)}</h3>
          </div>
        </>
      )}
    </>
  );
};

export default Login;

*/
