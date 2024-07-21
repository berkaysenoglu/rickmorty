
import locationImg from '@/assets/locations.webp'
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
import {useState} from "react";

const LocationCard = ({ id, name, type, dimension }) => {
    const navigate = useNavigate();

    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);


    const handleGoToEpisode = () => {
        navigate(`/locations/${id}`)
    }

    return (
        <Card onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              sx={{
                  transition: 'box-shadow 0.3s',
                  boxShadow: hover ? 6 : 1,
              }}>
            <CardHeader title={<p className='line-clamp-1'>{name}</p>} subheader={type}/>

            <CardMedia
                className='cursor-pointer h-96'
                component="img"
                image={locationImg}
                alt={name}
                onClick={handleGoToEpisode}
            />
            <CardContent>
                <Typography variant="body2">
                    {dimension}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className='m-2'>
                <Button variant="outlined" aria-label="go to episode" onClick={handleGoToEpisode}>
                    <Typography variant="body2" className='flex items-start gap-1'>
                        Go to location <ArrowForward sx={{fontSize: 18}} />
                    </Typography>
                </Button>
            </CardActions>
        </Card>
    );
};

export default LocationCard;
