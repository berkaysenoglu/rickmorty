import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {episodeURL} from "../constants.js";

import {Grid, Typography} from "@mui/material";

import episodeImg from '@/assets/episodes.jpg'
import CharacterList from "./CharacterList.jsx";
import CharacterCard from "../components/CharacterCard.jsx";

const EpisodeDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState();
    const [characterList, setCharaceterList] = useState([]);


    useEffect(() => {
        if (!isNaN(id)) {
            axios.get(`${episodeURL}/${id}`).then((res) => {
                setData(res.data)
            })
        }
    }, []);

    useEffect(() => {
        if (data) {
            const ids = data.characters.map(url => url.split('/').pop()).join(',');
            const apiUrl = `https://rickandmortyapi.com/api/character/${ids}`;
            axios.get(apiUrl).then((res) => {
                setCharaceterList(res.data)
            })
        }
    }, [data])

    if(isNaN(id)) return <div>id must be number</div> // todo: hata bastır

    console.log(characterList);

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
            <div className='bg-slate-600 text-white rounded p-5 mt-10'>
                <Grid container spacing={2}>
                    {characterList.map((character) => (
                        <Grid item key={character.id} xs={12} sm={6} md={4} lg={3}>
                            <CharacterCard {...character} />
                        </Grid>
                    ))}

                </Grid>
            </div>
        </>
    );
};

export default EpisodeDetail;
