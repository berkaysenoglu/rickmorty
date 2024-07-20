import {episodeURL} from "../constants.js";

import EpisodeCard from "../components/EpisodeCard.jsx";
import DataList from "../components/DataList.jsx";

const EpisodeList = () => {
    return (
        <DataList title='Episodes' url={episodeURL} CardComponent={EpisodeCard}/>
    );
}

export default EpisodeList;
