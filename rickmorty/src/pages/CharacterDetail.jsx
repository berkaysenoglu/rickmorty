import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { characterURL } from "../constants.js";
import {Typography, Grid, Alert} from "@mui/material";
import EpisodeCard from "../components/EpisodeCard.jsx";
import Pagination from "../components/Pagination.jsx";
import Box from "@mui/material/Box";

const PER_PAGE = 8;

const CharacterDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [episodeList, setEpisodeList] = useState([]);
    const [currentPageEpisodes, setCurrentPageEpisodes] = useState([]);
    const [episodePage, setEpisodePage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isNaN(id)) {
            axios.get(`${characterURL}/${id}`).then((res) => {
                setData(res.data);
            }).catch(error => {
                console.error("Error fetching character data: ", error);
            });
        }
    }, [id]);

    useEffect(() => {
        if (data && data.episode.length > 0) {
            const ids = data.episode.map(url => url.split('/').pop()).join(',');
            const apiUrl = `https://rickandmortyapi.com/api/episode/${ids}`;
            setLoading(true);
            axios.get(apiUrl).then((res) => {
                if (Array.isArray(res.data)) {
                    setEpisodeList(res.data);
                } else {
                    setEpisodeList([res.data]);
                }
                setLoading(false);
            }).catch(error => {
                console.error("Error fetching episode data: ", error);
                setLoading(false);
            });
        } else {
            setEpisodeList([]);
        }
    }, [data]);

    useEffect(() => {
        if (episodeList.length > 0) {
            const startIndex = (episodePage - 1) * PER_PAGE;
            const endIndex = startIndex + PER_PAGE;
            setCurrentPageEpisodes(episodeList.slice(startIndex, endIndex));
        }
    }, [episodeList, episodePage]);

    if (isNaN(id)) {
        return (
            <Box className="flex justify-center items-start h-screen mt-">
                <Alert severity="error" className="text-center">
                    ID must be a number
                </Alert>
            </Box>
        );
    }

    const handleChangeEpisodePage = (_, value) => {
        setEpisodePage(value);
    };

    return (
        <>
            <div className='flex gap-5 justify-between'>
                <div className='flex flex-col gap-10'>
                    <Typography variant='h2'>
                        {data?.name}
                    </Typography>
                    <div>
                        <Typography>
                            <span className='font-bold'>Status:</span> {data?.status}
                        </Typography>
                        <Typography>
                            <span className='font-bold'>Gender:</span> {data?.gender}
                        </Typography>
                    </div>
                </div>
                <img
                    className='w-1/2 h-[500px] object-center object-cover rounded'
                    src={data?.image}
                    alt={data?.name}
                />
            </div>
            <div className='bg-sky-800 text-white rounded p-5 mt-10'>
                Episodes
            </div>
            <div className="mt-6">
                {loading ? (
                    <Typography variant="body1">Loading...</Typography>
                ) : (
                    <Grid container spacing={9}>
                        {currentPageEpisodes.map((episode) => (
                            <Grid item key={episode.id} xs={12} sm={6} md={4} lg={3}>
                                <EpisodeCard {...episode} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </div>
            {episodeList.length > PER_PAGE && (
                <div className="flex justify-end mt-5">
                    <Pagination
                        page={episodePage}
                        count={Math.ceil(episodeList.length / PER_PAGE)}
                        onChange={handleChangeEpisodePage}
                    />
                </div>
            )}
        </>
    );
};

export default CharacterDetail;
