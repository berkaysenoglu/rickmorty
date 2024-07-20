import React, { useState, useEffect } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography, IconButton, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { addCharacterToFavorites, removeCharacterFromFavorites } from '../redux/actions/favoriteActions';
import { useNavigate } from "react-router-dom";

const CharacterCard = ({ id, name, status, gender, image }) => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites.characters);
    const [hover, setHover] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [pendingCharacter, setPendingCharacter] = useState(null);
    const isFavorite = favorites.some(char => char.id === id);
    const navigate = useNavigate();

    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);

    const handleGoToEpisode = () => {
        navigate(`/characters/${id}`);
    };

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            setPendingCharacter({ id, name });
            setDialogOpen(true);
        } else {
            if (favorites.length >= 10) {
                setSnackbarOpen(true);
                return;
            }
            dispatch(addCharacterToFavorites({ id, name, status, gender, image }));
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleDialogClose = (confirm) => {
        if (confirm && pendingCharacter) {
            dispatch(removeCharacterFromFavorites({ id: pendingCharacter.id }));
        }
        setPendingCharacter(null);
        setDialogOpen(false);
    };

    useEffect(() => {
        console.log(favorites);
    }, [favorites]);

    return (
        <Card onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              sx={{
                  transition: 'box-shadow 0.3s',
                  boxShadow: hover ? 6 : 1,
              }}>
            <CardHeader title={name} subheader={status} />
            <CardMedia
                className='cursor-pointer h-96'
                component="img"
                image={image}
                alt={name}
                onClick={handleGoToEpisode}
            />
            <CardContent>
                <Typography variant="body2">
                    {gender}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className='m-2 justify-between'>
                <Button variant="outlined" aria-label="go to episode" onClick={handleGoToEpisode}>
                    <Typography variant="body2" className='flex items-start gap-1'>
                        Go to character <ArrowForward sx={{ fontSize: 18 }} />
                    </Typography>
                </Button>
                <IconButton
                    aria-label="add to favorites"
                    onClick={handleFavoriteToggle}
                >
                    {isFavorite ? <FavoriteIcon color='error' /> : <FavoriteBorderIcon color='error' />}
                </IconButton>
            </CardActions>

            {/* Snackbar for character limit */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
                    Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız.
                </Alert>
            </Snackbar>

            {/* Dialog for confirmation */}
            <Dialog
                open={dialogOpen}
                onClose={() => handleDialogClose(false)}
            >
                <DialogTitle>Confirm Removal</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {pendingCharacter && `${pendingCharacter.name} isimli karakteri favorilerden kaldırmak istediğinize emin misiniz?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogClose(false)}>Hayır</Button>
                    <Button onClick={() => handleDialogClose(true)} color="error">Evet</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default CharacterCard;
