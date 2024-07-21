import {useDispatch, useSelector} from "react-redux";
import {Grid, Typography} from "@mui/material";
import CharacterCard from "../components/CharacterCard.jsx";







const Favorites = () => {

const favorites =  useSelector((state) => state.favorites.characters);
console.log(favorites);

    return (
        <div className='flex flex-col items-start '>
            <Typography className="pb-10 " variant="h2">Favorites</Typography>
            <Grid container spacing={7}>
                {favorites.map((character) => (
                    <Grid item key={character.id} xs={12} sm={6} md={4} lg={3}>
                        <CharacterCard {...character} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Favorites;
