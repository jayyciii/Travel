import { createSlice } from "@reduxjs/toolkit";

// Hàm kiểm tra token trong cookie
const isTokenPresentInCookies = () => {
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
    return !!token;
};

// Hàm load user từ localStorage
const loadUserFromLocalStorage = () => {
    try {
        const serializedState = window.localStorage.getItem('user');
        if (serializedState === null) {
            console.log("Không có user trong localStorage");
            return { user: null };
        }
        return { user: JSON.parse(serializedState) };
    } catch (error) {
        return { user: null };
    }
};

// Khởi tạo state từ localStorage
const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: { // Lưu ý tên là `reducers` thay vì `reducer`
        setUser: (state, action) => {
            state.user = action.payload.user; // Sử dụng action.payload nếu action chỉ truyền user object
            window.localStorage.setItem('user', JSON.stringify(state.user)); // Lưu vào localStorage
            console.log("Thêm user vào localStorage thành công");
        },
        logout: (state) => {
            state.user = null;
            window.localStorage.removeItem('user'); // Xoá user từ localStorage
            console.log("Đăng xuất thành công, xoá khỏi localStorage");
        }
    }
});

export const { setUser, logout } = authSlice.actions; // Export đúng các actions
export default authSlice.reducer;
