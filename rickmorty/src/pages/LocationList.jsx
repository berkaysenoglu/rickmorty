import DataList from "../components/DataList.jsx";
import {locationURL} from "../constants.js";
import LocationCard from "../components/LocationCard.jsx";

const LocationList = () => {
    return (
        <DataList title='Locations' url={locationURL} CardComponent={LocationCard}/>
    );
};

export default LocationList;
