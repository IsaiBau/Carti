import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

interface User {
    id: number;
    nombre: string;
    apellido_pat: string;
    apellido_mat: string;
    rfc: string;
    password: string;
    email?: string; // Añadido para Google Auth
    uid?: string;   // Añadido para Google Auth
    rol?: string;
}

interface AuthState {
    user: User | null;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
}

const initialState: AuthState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Función para loguear al usuario
export const LoginUser = createAsyncThunk<
    User,
    { rfc: string; password: string; },
    { rejectValue: string }
>("user/LoginUser", async (user, thunkAPI) => {
    try {
        const response = await axios.post("https://localhost:5000/login", {
            rfc: user.rfc,
            password: user.password
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
        throw error;
    }
});

// Función para login con Google
export const LoginWithGoogle = createAsyncThunk<
    User,
    { token: string; email: string; name: string; uid: string },
    { rejectValue: string }
>("user/LoginWithGoogle", async (userData, thunkAPI) => {
    try {
        const response = await axios.post("https://localhost:5000/google-auth", {
            token: userData.token,
            email: userData.email,
            name: userData.name,
            uid: userData.uid
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
        throw error;
    }
});

// Función que obtiene los datos del usuario
export const getMe = createAsyncThunk<User, void, { rejectValue: string }>(
    "user/getMe",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:5000/me");
            return response.data;
        } catch (error: any) {
            if (error.response) {
                const message = error.response.data.msg;
                return thunkAPI.rejectWithValue(message);
            }
            throw error;
        }
    }
);

// Función para cerrar sesión
export const LogOut = createAsyncThunk<void>("user/LogOut", async () => {
    await axios.delete("https://localhost:5000/logout");
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            return initialState;
        },
        // Añade este reducer para setUser temporal
        setTempUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isSuccess = true;
        }
    },
    extraReducers: (builder) => {
        // Login normal
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(LoginUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload || "Error desconocido";
        });

        // Login con Google
        builder.addCase(LoginWithGoogle.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(LoginWithGoogle.fulfilled, (state, action: PayloadAction<User>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(LoginWithGoogle.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload || "Error con Google Auth";
        });

        // Get User Login
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action: PayloadAction<User>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload || "Error al obtener usuario";
        });

        // Logout
        builder.addCase(LogOut.fulfilled, () => {
            return initialState;
        });
    },
});

export const { reset, setTempUser } = authSlice.actions;
export default authSlice.reducer;