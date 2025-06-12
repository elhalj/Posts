import { useMutation } from "@tanstack/react-query";
import { useAuthStore, User } from "../store/authStore";
import authService from "../services/api/authService";

export const useAuth = () => {
  const { login: storeLogin, logout: storeLogout } = useAuthStore();
//  user connexion
    const handleLogin = useMutation({
        mutationFn: (credential: User) => authService.login(credential),
        onSuccess: (data) => {
            storeLogin(data.user, data.token.token);
        }
    });
// user registration
    const handleRegister = useMutation({
        mutationFn: (userData: { email: string; password: string; name: string }) => authService.register(userData),
        onSuccess: (data) => {
            storeLogin(data.user, data.token.token);
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