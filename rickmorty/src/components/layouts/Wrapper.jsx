import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import {Outlet} from "react-router-dom";
import Container from "@mui/material/Container";

const Wrapper = () => {
    return (
        <>
            <Header/>
            <Container maxWidth="xl">
                <Outlet />
            </Container>
            <Footer/>
        </>
    );
};

export default Wrapper;
