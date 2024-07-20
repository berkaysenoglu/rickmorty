import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {locationURL} from "../constants.js";
import {Typography} from "@mui/material";

import locationImg from '@/assets/locations.webp'

const Location = () => {
    const { id } = useParams();
    const [data, setData] = useState();


    useEffect(() => {
        axios.get(`${locationURL}/${id}`).then((res) => {
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
                    <div>
                        <Typography>
                            <span className='font-bold'>Type:</span> {data?.type}
                        </Typography>
                        <Typography>
                            <span className='font-bold'>Dimension:</span> {data?.dimension}
                        </Typography>
                    </div>
                </div>
                <img
                    className='w-1/2 h-[500px] object-center object-cover rounded'
                    src={locationImg}
                    alt={data?.name}
                />
            </div>
            <div className='bg-slate-600 text-white rounded p-5 mt-10'>
                Residents
            </div>
        </>
    );
};

export default Location;
