import {
    debounce,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    TextField
} from "@mui/material";
import {Close, Search} from "@mui/icons-material";
import {setProductParams} from "../../../app/slices/catalogSlice";
import {ChangeEvent, useState} from "react";
import {ProductParams} from "../../../app/models/product";
import {useAppDispatch} from "../../../app/store/configureStore";
import {Category} from "../../../app/models/category";

interface Props {
    productParams: ProductParams,
    categories: Category[],
    categoriesLoaded: boolean,
}

export default function AdminProductsTableHeader({productParams, categories, categoriesLoaded}: Props) {
    const dispatch = useAppDispatch();
    const [sortBy, setSortBy] = useState("name");
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
    const [selectedCategory, setSelectedCategory] = useState("");

    function handleSortChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value as string;
        dispatch(setProductParams({...productParams, orderBy: value, pageNumber: 1}));
        setSortBy(value);
    }

    function handleSelectCategory(event: ChangeEvent<HTMLInputElement>) {
        dispatch(setProductParams({...productParams, category: +event.target.value, pageNumber: 1}));
        setSelectedCategory(event.target.value);
    }

    const debouncedSearch = debounce((event: any) => {
        dispatch(setProductParams({searchTerm: event.target.value}))
    }, 1000);

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
                <TextField
                    fullWidth
                    select
                    id="sort-select"
                    value={sortBy}
                    label="Sort"
                    size={"small"}
                    onChange={handleSortChange}
                >
                    <MenuItem value={"id"}>ID</MenuItem>
                    <MenuItem value={"name"}>Name</MenuItem>
                    <MenuItem value={"category"}>Category</MenuItem>
                    <MenuItem value={"priceDesc"}>Price: Descending</MenuItem>
                    <MenuItem value={"priceAsc"}>Price: Ascending</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
                <FormControl variant="outlined" fullWidth size={'small'}>
                    <InputLabel>Search</InputLabel>
                    <OutlinedInput
                        value={searchTerm || ""}
                        onChange={(event: any) => {
                            setSearchTerm(event.target.value);
                            debouncedSearch(event);
                        }}
                        startAdornment={(<InputAdornment position={"start"}> <Search/></InputAdornment>)}
                        endAdornment={
                            <InputAdornment position={"end"}>
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => {
                                        setSearchTerm("");
                                        dispatch(setProductParams({...productParams, searchTerm: null}))
                                    }}
                                    onMouseDown={() => {
                                        setSearchTerm("");
                                        dispatch(setProductParams({...productParams, searchTerm: null}))
                                    }}
                                    edge="end"
                                >
                                    <Close/>
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Search"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
                {categoriesLoaded && (
                    <TextField
                        fullWidth
                        select
                        size={"small"}

                        id="categories-select"
                        value={selectedCategory}
                        label="Category"
                        onChange={handleSelectCategory}
                    >
                        <MenuItem key={0} value={0}>All</MenuItem>
                        {categories.map(category => (
                            <MenuItem key={category.id}
                                      value={category.id}>{category.name}</MenuItem>
                        ))}
                    </TextField>
                )}
            </Grid>
        </Grid>
    )
}