import {Container, List, ListItemButton, ListItemText, ListSubheader, Typography} from "@mui/material";
import {sortOptions} from "./sortOptions";
import {useState} from "react";
import {Category} from "../../app/models/category";


interface Props {
    categories: Category[]
    handleCategoryChanged: (value: number) => void;
    handleSortChanged: (value: string) => void;
    selectedCategoryId?: number;
}


export default function FiltersList({categories, handleCategoryChanged, handleSortChanged, selectedCategoryId = 0}: Props) {
    const [selectedItems, setSelectedItems] = useState({type: selectedCategoryId, sort: "name"})

    function handleTypeChange(value: number) {
        handleCategoryChanged(value);
        setSelectedItems({...selectedItems, type: value});
    }

    function handleSortChange(value: string) {
        handleSortChanged(value);
        setSelectedItems({...selectedItems, sort: value});
    }

    return (
        <Container className={"filters-list"}>
            <List dense subheader={<li/>}  >
                <ListSubheader color={"inherit"}>
                    <Typography fontWeight={"bold"}  variant={"subtitle1"}>Categories</Typography>
                </ListSubheader>
                {categories.map((category) => (
                    <ListItemButton
                        key={category.id}
                        selected={selectedItems.type === category.id}
                        onClick={() => handleTypeChange(category.id)}
                    >

                        <ListItemText primary={
                            <Typography variant={"subtitle2"}>{category.name}</Typography>
                        }/>
                    </ListItemButton>
                ))}
            </List>

            <List dense subheader={<li/>}>
                <ListSubheader color={"inherit"}>
                    <Typography  fontWeight={"bold"}  variant={"subtitle1"}>Sort</Typography>
                </ListSubheader>
                {sortOptions.map((option) => (
                    <ListItemButton
                        key={option.value}
                        selected={selectedItems.sort === option.value}
                        onClick={() => handleSortChange(option.value)}
                    >

                        <ListItemText primary={option.label}/>
                    </ListItemButton>
                ))}
            </List>
        </Container>
    )
}