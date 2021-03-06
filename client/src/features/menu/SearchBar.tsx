import {Container, debounce, IconButton, InputBase} from "@mui/material";
import {setProductParams} from "../../app/slices/catalogSlice";
import {Close, Search} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {useState} from "react";


export default function SearchBar() {
    const dispatch = useAppDispatch();
    const {productParams} = useAppSelector(state => state.catalog);
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);

    const debouncedSearch = debounce((event: any) => {
        dispatch(setProductParams({searchTerm: event.target.value}))
    }, 1000)

    return (
        <Container sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            backgroundColor:"rgba(183,183,183,0.1)",
            borderRadius: 2,
            maxWidth: "400px",
            color:"white"
        }}>
            <InputBase

                value={searchTerm || ''}
                sx={{ml: 1, flex: 1, color:"white"}}
                placeholder="Search"
                inputProps={{'aria-label': 'recherche'}}
                onChange={(event: any) => {
                    setSearchTerm(event.target.value);
                    debouncedSearch(event);
                }}
            />
            <IconButton type="submit" sx={{p: '10px'}} aria-label="search" color={"inherit"}
                        onClick={() => dispatch(setProductParams({...productParams,searchTerm}))}>
                <Search/>
            </IconButton>
            <IconButton color={"inherit"} type="submit" sx={{p: '10px'}} aria-label="search" onClick={() => {
                setSearchTerm(undefined);
                dispatch(setProductParams({searchTerm: null}));
            }}>
                <Close/>
            </IconButton>
        </Container>
    )
}