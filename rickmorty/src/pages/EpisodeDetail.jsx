import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {episodeURL} from "../constants.js";

import {Typography} from "@mui/material";

import episodeImg from '@/assets/episodes.jpg'

const EpisodeDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState();


    useEffect(() => {
        axios.get(`${episodeURL}/${id}`).then((res) => {
            setData(res.data)
        })
    }, []);

    if(isNaN(id)) return <div>id must be number</div> // todo: hata bastır

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
                Characters
                {/* todo: Buraya pagination ile yazdırmak gerekiyor sanırımı*/}
            </div>
        </>
    );
};

export default EpisodeDetail;
