import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from 'react-redux';
import  store  from './redux/store.js'; // Store'u import edin

import EpisodeList from "./pages/EpisodeList.jsx";
import EpisodeDetail from "./pages/EpisodeDetail.jsx";
import Wrapper from "./components/layouts/Wrapper.jsx";
import CharacterList from "./pages/CharacterList.jsx";
import CharacterDetail from "./pages/CharacterDetail.jsx";
import LocationList from "./pages/LocationList.jsx";
import Location from "./pages/Location.jsx";
import Favorites from "./pages/Favorites.jsx";

const router = createBrowserRouter([
    {
        element: <Wrapper/>,
        children: [
            {
                path: "/",
                element: <EpisodeList/>,
            },
            {
                path: "/episodes",
                element: <EpisodeList/>,
            },
            {
                path: "/episodes/:id",
                element: <EpisodeDetail/>,
            },
            {
                path: "/characters",
                element: <CharacterList/>,
            },
            {
                path: "/characters/:id",
                element: <CharacterDetail/>,
            },
            {
                path: "/locations",
                element: <LocationList/>,
            },
            {
                path: "/locations/:id",
                element: <Location/>,
            },
            {
                path: "/favorites/",
                element: <Favorites/>,
            },
        ],
    }
]);

const theme = createTheme({
    palette: {
        primary: {
            main: "#673ab7",
            contrastText: "#fff"
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}> {/* Redux Provider ile store'u sağlıyoruz */}
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </Provider>
);
