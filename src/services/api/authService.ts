import api from "./api";

// Service to handle API calls related to authentication
const authService = {
    login: async (credentials: { email: string; password: string }) => {
        const response = await api.post("/auth/login", credentials);
        return response.data;
    },
    
    register: async (userData: { email: string; password: string; name: string }) => {
        const response = await api.post("/auth/signUp", userData);
        return response.data;
    },
}

export default authService
// const login = async (credentials: { email: string; password: string }) => {
//   const response = await api.post("/auth/login", credentials);
//   return response.data;
// };

// const register = async (userData: { email: string; password: string; name: string }) => {
//   const response = await api.post("/auth/register", userData);
//   return response.data;
// };

// export default {
//   login,
//   register,
// };
