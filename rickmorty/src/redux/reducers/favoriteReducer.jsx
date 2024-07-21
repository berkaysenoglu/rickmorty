import { createSlice } from '@reduxjs/toolkit';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage';

const INITIAL_STATE = {
    characters: getFromLocalStorage('favorites') || [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: INITIAL_STATE,
    reducers: {
        addFavorite(state, action) {
            if (state.characters.length < 10 && !state.characters.find(char => char.id === action.payload.id)) {
                state.characters.push(action.payload);
                saveToLocalStorage('favorites', state.characters);
            }
        },
        removeFavorite(state, action) {
            state.characters = state.characters.filter(char => char.id !== action.payload.id);
            saveToLocalStorage('favorites', state.characters);
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;