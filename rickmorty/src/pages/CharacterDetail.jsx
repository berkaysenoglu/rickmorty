import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {characterURL} from "../constants.js";
import {Typography, Grid} from "@mui/material";
import EpisodeCard from "../components/EpisodeCard.jsx";
import EpisodeList from "./EpisodeList.jsx";
import CharacterCard from "../components/CharacterCard.jsx";
const CharacterDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState();
    const [episodeList, setEpisodeList] = useState([]);


    useEffect(() => {
       if (!isNaN(id)) {
           axios.get(`${characterURL}/${id}`).then((res) => {
               setData(res.data)
           })
       }
    }, []);

    console.log(data)

    useEffect(() => {
        if (data) {
            const ids = data.episode.map(url => url.split('/').pop()).join(',');
            const apiUrl = `https://rickandmortyapi.com/api/episode/${ids}`;
            axios.get(apiUrl).then((res) => {
                setEpisodeList(res.data)
            })
        }
    }, [data])

    if(isNaN(id)) return <div>id must be number</div> // todo: hata bastır

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
            <div className='bg-slate-600 text-white rounded p-5 mt-10'>
                Episodes
            </div>
            <div>
                <Grid container spacing={2}>
                    {episodeList.map((episode) => (
                        <Grid item key={episode.id} xs={12} sm={6} md={4} lg={3}>
                            <EpisodeCard {...episode} />
                        </Grid>
                    ))}

                </Grid>
            </div>
        </>
    );
};

export default CharacterDetail;
