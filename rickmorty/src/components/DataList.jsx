import { useEffect, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import useDebounce from "../hooks/useDebounce.jsx";
import Pagination from "../components/Pagination.jsx";

const DataList = ({ title, url, CardComponent }) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [searchData, setSearchData] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const debouncedSearch = useDebounce(searchData, 450);

    useEffect(() => {
        const fetchData = async () => {

            setError(null);
            try {
                const response = await axios.get(`${url}?name=${debouncedSearch}&page=${page}`);
                setData(response.data);
                if (response.data.results.length === 0) {
                    setError('No results found');
                    setData("");
                }
            } catch (error) {
                setError(`Couldn't find "${debouncedSearch}" in the list.`);
                console.error("Error fetching data: ", error);
                setData("");
            } finally {
                setLoading(false);
            }
        };

        if (debouncedSearch || page) {
            fetchData();
        }
    }, [debouncedSearch, page, url]);

    const handleSearch = (e) => {
        setSearchData(e.target.value);
        setPage(1);
    };

    const handleChangePage = (_, value) => {
        setPage(value);
        setSearchData("");
    };

    return (
        <div className="flex flex-col gap-10">
            <Typography variant="h2">{title}</Typography>
            <div className="flex justify-between">
                <TextField
                    value={searchData}
                    type="search"
                    label="Search"
                    variant="outlined"
                    onChange={handleSearch}
                />
                <Pagination page={page} count={data.info?.pages} onChange={handleChangePage} />
            </div>
            {loading && <Typography variant="body1">Loading...</Typography>}
            {error && <Typography variant="body1" color="error">{error}</Typography>}
            {data.results && data.results.length > 0 ? (
                <Grid container spacing={2}>
                    {data.results.map((episode) => (
                        <Grid item key={episode.id} xs={12} sm={6} md={4} lg={3}>
                            <CardComponent {...episode} />
                        </Grid>
                    ))}

                </Grid>
            ) : (
                !loading && !error && <Typography variant="body1">No data available</Typography>
            )}
            {data.results?.length > 0 && (
                <Pagination page={page} count={data.info?.pages} onChange={handleChangePage} />
            )}
        </div>
    );
};

export default DataList;
