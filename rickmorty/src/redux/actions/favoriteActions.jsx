import { addFavorite, removeFavorite } from '../reducers/favoriteReducer';

export const addCharacterToFavorites = (character) => (dispatch) => {
    dispatch(addFavorite(character));
};

export const removeCharacterFromFavorites = (character) => (dispatch) => {
    dispatch(removeFavorite(character));
};