import {useDispatch, useSelector} from "react-redux";
import {Grid, Typography, TextField} from "@mui/material";
import {useState, useEffect} from "react";
import CharacterCard from "../components/CharacterCard.jsx";
import useDebounce from "../hooks/useDebounce.jsx";

const Favorites = () => {
    const favorites = useSelector((state) => state.favorites.characters);
    const [searchData, setSearchData] = useState("");
    const debouncedSearch = useDebounce(searchData, 450);
    const [filteredFavorites, setFilteredFavorites] = useState(favorites);

    useEffect(() => {
        setFilteredFavorites(
            favorites.filter((character) =>
                character.name.toLowerCase().includes(debouncedSearch.toLowerCase())
            )
        );
    }, [debouncedSearch, favorites]);

    const handleSearch = (e) => {
        setSearchData(e.target.value);
    };

    return (
        <div className='flex flex-col items-start'>
            <Typography className="pb-10" variant="h2">Favorites</Typography>
            <TextField
                value={searchData}
                type="search"
                label="Search"
                variant="outlined"
                onChange={handleSearch}
                className="pb-10"
            />
            <Grid className='pt-5' container spacing={7}>
                {filteredFavorites.length > 0 ? (
                    filteredFavorites.map((character) => (
                        <Grid item key={character.id} xs={12} sm={6} md={4} lg={3}>
                            <CharacterCard {...character} />
                        </Grid>
                    ))
                ) : (
                    <Typography className='p-16' variant="body1">No results found</Typography>
                )}
            </Grid>
        </div>
    );
};

export default Favorites;



// const Favorites = () => {
//
// const favorites =  useSelector((state) => state.favorites.characters);
// console.log(favorites);
//
//     return (
//         <div className='flex flex-col items-start '>
//             <Typography className="pb-10 " variant="h2">Favorites</Typography>
//             <Grid container spacing={7}>
//                 {favorites.map((character) => (
//                     <Grid item key={character.id} xs={12} sm={6} md={4} lg={3}>
//                         <CharacterCard {...character} />
//                     </Grid>
//                 ))}
//             </Grid>
//         </div>
//     );
// };
//
// export default Favorites;
