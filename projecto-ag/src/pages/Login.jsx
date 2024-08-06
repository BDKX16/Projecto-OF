import { useDispatch, useSelector } from "react-redux";
import useFetchAndLoad from "../hooks/useFetchAndLoad";
import { login, register } from "../services/public";
import { createUserAdapter } from "../adapters/user";
import { Button } from "@mui/material";
import { createUser, modifyUser } from "./../redux/states/user";
export const Login = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const userState = useSelector((store) => store.user);

  const handleClick = async () => {
    const result = await callEndpoint(login("xavimegag@gmail.com", "Luna999"));
    console.log(result);
    dispatch(createUser(createUserAdapter(result)));
  };

  const handleModify = async () => {
    dispatch(modifyUser({ name: "pepe" }));
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
