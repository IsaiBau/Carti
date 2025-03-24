import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
interface User {
    id: string;
    rfc: string;
    password: string;
    rol?: string; // Puedes ajustar los roles según tu lógica
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
    User, // Tipo de dato que retorna la función (el usuario)
    { rfc: string; password: string; }, // Tipo de argumento que acepta
    { rejectValue: string } // Tipo del error que se retorna
>("user/LoginUser", async (user, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:5000/login", {
            rfc: user.rfc,
            password: user.password
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
        throw error; // Arroja cualquier otro error desconocido
    }
});

// Función que obtiene los datos del usuario que está logueado
export const getMe = createAsyncThunk<
    User, // Tipo del dato retornado
    void, // No recibe parámetros
    { rejectValue: string } // Tipo del error
>("user/getMe", async (_, thunkAPI) => {
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
});

// Función que destruye la sesión del usuario, cerrar sesión
export const LogOut = createAsyncThunk<void>("user/LogOut", async () => {
    await axios.delete("http://localhost:5000/logout");
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(LoginUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(LoginUser.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload || "An error occurred";
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
        builder.addCase(getMe.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload || "An error occurred";
        });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;