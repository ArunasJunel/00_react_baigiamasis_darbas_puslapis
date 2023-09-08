import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ShopsPage from "./pages/ShopsPage";
import AddShopPage from "./pages/AddShopPage";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuth } from "./store/AuthProvider";

export default function App() {
  const ctx = useAuth();
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/shops"
          element={
            ctx.isUserLoggedIn ? <ShopsPage /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/add-shop"
          element={
            ctx.isUserLoggedIn ? <AddShopPage /> : <Navigate to={"/login"} />
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
