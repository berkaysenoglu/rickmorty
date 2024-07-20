import {characterURL} from "../constants.js";

import DataList from "../components/DataList.jsx";
import CharacterCard from "../components/CharacterCard.jsx";

const CharacterList = () => {
    return (
        <DataList title='Characters' url={characterURL} CardComponent={CharacterCard}/>
    );
}

export default CharacterList;
