import { Route, Routes } from "react-router";
import SignUp from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";
import { AuthProvider } from "../context/AuthProvider";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};
export default AppRouter;
