import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Typography
} from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import {useNavigate} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from "@mui/icons-material/Favorite";
import {useState} from "react";

const CharacterCard = ({ id, name, status, gender, image}) => {
    const navigate = useNavigate();
    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);

    const handleGoToEpisode = () => {
        navigate(`/characters/${id}`)
    }

    return (
        <Card onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              sx={{
                  transition: 'box-shadow 0.3s',
                  boxShadow: hover ? 6 : 1,
              }}>
            <CardHeader title={name} subheader={status}/>
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
                        Go to character <ArrowForward sx={{fontSize: 18}} />
                    </Typography>
                </Button>
                <IconButton aria-label="add to favorites">
                    <FavoriteBorderIcon color='error' />
                    <FavoriteIcon color='error' />
                    {/*  todo: favorilere ekliyse fill halini göster  */}
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default CharacterCard;
