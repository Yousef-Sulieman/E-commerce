import { createContext, useContext, useState, useEffect } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshToken as refreshTokenAPI,
  updateProfile,
} from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [refreshTokenValue, setRefreshTokenValue] = useState(
    localStorage.getItem("refreshToken") || null
  );

  console.log("Loaded user:", user);

  // مراقبة accessToken لو تحب تعمل refresh تلقائي عند تغييره
  useEffect(() => {
    if (accessToken) {
      // refresh();
    }
  }, [accessToken]);

  const login = async (data) => {
    const res = await loginUser(data);
    const token = res.data?.AccessToken;
    const refresh = res.data?.refreshToken;
    const userData = res.data?.user;

    if (!token || !userData) throw new Error("Invalid response");

    const fixedUser = { ...userData, _id: userData._id || userData.id };

    localStorage.setItem("user", JSON.stringify(fixedUser));
    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", refresh);

    setUser(fixedUser);
    setAccessToken(token);
    setRefreshTokenValue(refresh);

    return fixedUser;
  };

  const register = async (data) => {
    const res = await registerUser(data);
    return res.data;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.log(err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setAccessToken(null);
      setRefreshTokenValue(null);
      setUser(null);
    }
  };

  const updateProfileData = async (userId, data) => {
    const res = await updateProfile(userId, data);
    setUser((prev) => ({ ...prev, ...data }));
    localStorage.setItem("user", JSON.stringify({ ...user, ...data }));
    return res.data;
  };

  // 🔹 تحديث التوكن تلقائي
  const refresh = async () => {
    if (!refreshTokenValue) {
      console.log("No refresh token, login required");
      await logout();
      return null;
    }

    try {
      const res = await refreshTokenAPI(refreshTokenValue);
      const newToken = res.data?.AccessToken;
      const newRefresh = res.data?.refreshToken;

      if (newToken) {
        localStorage.setItem("accessToken", newToken);
        setAccessToken(newToken);
      }
      if (newRefresh) {
        localStorage.setItem("refreshToken", newRefresh);
        setRefreshTokenValue(newRefresh);
      }

      return newToken;
    } catch (err) {
      console.log("Refresh failed, login required");
      await logout();
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken: refreshTokenValue,
        login,
        register,
        logout,
        updateProfileData,
        refresh, // 🔹 يمكن استدعاؤه من CartContext أو axiosClient
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
