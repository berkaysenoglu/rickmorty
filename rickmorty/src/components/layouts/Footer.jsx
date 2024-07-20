import Container from "@mui/material/Container";
import {Typography} from "@mui/material";

const Footer = () => {
    return (
        <div className='mt-auto bg-stone-800 text-white p-10'>
            <Container maxWidth="xl">
               <Typography variant='body2'>
                   Copyright © Berkay Şenoğlu 2024
               </Typography>
            </Container>
        </div>
    );
};

export default Footer;
