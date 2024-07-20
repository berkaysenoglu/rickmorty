
import episodeImg from '@/assets/episodes.jpg'
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
import { formatEpisode } from '@/constants';
import {useState} from "react";

const EpisodeCard = ({ id, name, episode, air_date }) => {
    const navigate = useNavigate();

    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);


    const handleGoToEpisode = () => {
        navigate(`/episodes/${id}`)
    }
    // todo: Çok tekrar ediyor kartlar tasarımları aynı olacaksa teke düşür
    return (
        <Card onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              sx={{
                  transition: 'box-shadow 0.3s',
                  boxShadow: hover ? 6 : 1,
              }}>
            <CardHeader title={name} subheader={formatEpisode(episode)}/>
            <CardMedia
                className='cursor-pointer h-96'
                component="img"
                image={episodeImg}
                alt={name}
                onClick={handleGoToEpisode}
            />
            <CardContent>
                <Typography variant="body2">
                    {air_date}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className='m-2'>
                <Button variant="outlined" aria-label="go to episode" onClick={handleGoToEpisode}>
                    <Typography variant="body2" className='flex items-start gap-1'>
                        Go to episode <ArrowForward sx={{fontSize: 18}} />
                    </Typography>
                </Button>
            </CardActions>
        </Card>
    );
};

export default EpisodeCard;
