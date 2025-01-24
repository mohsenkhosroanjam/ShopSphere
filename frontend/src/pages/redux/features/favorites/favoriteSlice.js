import { createSlice } from "@reduxjs/toolkit";

const getFavoritesFromStorage = () => {
    try {
        const storedFavorites = localStorage.getItem("favorites");
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
        console.error("Error reading favorites from localStorage:", error);
        return [];
    }
};

const initialState = {
    favorites: getFavoritesFromStorage(),
};

const favoriteSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            const newProduct = action.payload;
            const exists = state.favorites.some(item => item._id === newProduct._id);              

            if (!exists) {
                const updatedFavorites = [...state.favorites, newProduct];
                state.favorites = updatedFavorites;

                try {
                    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
                } catch (error) {
                    console.error("Error saving to localStorage:", error);
                }
            }
        },
        removeFromFavorites: (state, action) => {
            const productToRemove = action.payload;
            const updatedFavorites = state.favorites.filter(item => (item._id !== productToRemove._id));

            state.favorites = updatedFavorites;

            try {
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            } catch (error) {
                console.error("Error saving to localStorage:", error);
            }
        },
    },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;