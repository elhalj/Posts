import { useMutation } from "@tanstack/react-query";
import { useAuthStore, User } from "../store/authStore";
import authService from "../services/api/authService";

export const useAuth = () => {
  const { login: storeLogin, logout: storeLogout } = useAuthStore();
//  user connexion
    const handleLogin = useMutation({
        mutationFn: (credential: User) => authService.login(credential),
        onSuccess: (data) => {
            const { user, token } = data;
            storeLogin(user.user, token.token);
            localStorage.setItem("token", token);
        }
    });
// user registration
    const handleRegister = useMutation({
        mutationFn: (userData: { email: string; password: string; name: string }) => authService.register(userData),
        onSuccess: (data) => {
            const { user, token } = data;
            storeLogin(user.user, token.token);
            localStorage.setItem("token", token);
        }
    })
// user logout
  const handleLogout = () => {
    storeLogout();
  };

  return {
      handleLogin,
      handleRegister,
    handleLogout,
  };
}