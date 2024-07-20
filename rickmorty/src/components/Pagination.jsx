import MuiPagination from "@mui/material/Pagination";

const Pagination = ({count, page, onChange}) => {
    return (
        <MuiPagination
            onChange={onChange}
            page={page}
            count={count}
            color="primary"
            className='flex justify-end' />
    );
};

export default Pagination;
