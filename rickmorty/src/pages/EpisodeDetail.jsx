import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { episodeURL } from "../constants.js";
import {Alert, Grid, Typography} from "@mui/material";
import episodeImg from '@/assets/episodes.jpg';
import CharacterCard from "../components/CharacterCard.jsx";
import Pagination from "../components/Pagination.jsx";
import Box from "@mui/material/Box";

const PER_PAGE = 8;

const EpisodeDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [characterList, setCharacterList] = useState([]);
    const [currentPageCharacters, setCurrentPageCharacters] = useState([]);
    const [characterPage, setCharacterPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isNaN(id)) {
            axios.get(`${episodeURL}/${id}`).then((res) => {
                setData(res.data);
            }).catch(error => {
                console.error("Error fetching episode data: ", error);
            });
        }
    }, [id]);

    useEffect(() => {
        if (data && data.characters.length > 0) {
            const ids = data.characters.map(url => url.split('/').pop()).join(',');
            const apiUrl = `https://rickandmortyapi.com/api/character/${ids}`;
            setLoading(true);
            axios.get(apiUrl).then((res) => {
                if (Array.isArray(res.data)) {
                    setCharacterList(res.data);
                } else {
                    setCharacterList([res.data]);
                }
                setLoading(false);
            }).catch(error => {
                console.error("Error fetching character data: ", error);
                setLoading(false);
            });
        } else {
            setCharacterList([]);
        }
    }, [data]);

    useEffect(() => {
        if (characterList.length > 0) {
            const startIndex = (characterPage - 1) * PER_PAGE;
            const endIndex = startIndex + PER_PAGE;
            setCurrentPageCharacters(characterList.slice(startIndex, endIndex));
        }
    }, [characterList, characterPage]);

    if (isNaN(id)) {
        return (
            <Box className="flex justify-center items-start h-screen mt-">
                <Alert severity="error" className="text-center">
                    ID must be a number
                </Alert>
            </Box>
        );
    }


    const handleChangeCharacterPage = (_, value) => {
        setCharacterPage(value);
    };

    return (
        <>
            <div className='flex gap-5 justify-between'>
                <div className='flex flex-col gap-10'>
                    <Typography variant='h2'>
                        {data?.name}
                    </Typography>
                    <Typography>
                        <span className='font-bold'>Episode:</span> {data?.episode}
                    </Typography>
                    <Typography>
                        <span className='font-bold'>Publish Date:</span> {data?.air_date}
                    </Typography>
                </div>
                <img
                    className='w-1/2 h-[500px] object-center object-cover rounded'
                    src={episodeImg}
                    alt={data?.name}
                />
            </div>
            <div className='bg-sky-800 text-white rounded p-5 mt-10'>
                <a className='font-medium'>CHARACTERS</a>
            </div>
            <div className="mt-5">
                {loading ? (
                    <Typography variant="body1">Loading...</Typography>
                ) : (
                    <Grid container spacing={7}>
                        {currentPageCharacters.map((character) => (
                            <Grid item key={character.id} xs={12} sm={6} md={4} lg={3}>
                                <CharacterCard {...character} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </div>
            {characterList.length > PER_PAGE && (
                <div className="flex justify-end mt-5">
                    <Pagination
                        page={characterPage}
                        count={Math.ceil(characterList.length / PER_PAGE)}
                        onChange={handleChangeCharacterPage}
                    />
                </div>
            )}
        </>
    );
};

export default EpisodeDetail;
