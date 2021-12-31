import {Container, List, ListItemButton, ListItemText, ListSubheader, Typography} from "@mui/material";
import {sortOptions} from "./sortOptions";
import {useState} from "react";
import {ProductType} from "../../app/models/productType";


interface Props {
    productTypes: ProductType[]
    handleTypeChanged: (value: number) => void;
    handleSortChanged: (value: string) => void;
    selectedTypeId?: number | null
}


export default function FiltersList({productTypes, handleTypeChanged, handleSortChanged, selectedTypeId = 0}: Props) {
    const [selectedItems, setSelectedItems] = useState({type: selectedTypeId, sort: "name"})

    function handleTypeChange(value: number) {
        handleTypeChanged(value);
        setSelectedItems({...selectedItems, type: value});
    }

    function handleSortChange(value: string) {
        handleSortChanged(value);
        setSelectedItems({...selectedItems, sort: value});
    }

    return (
        <Container className={"filters-list"}>
            <List dense subheader={<li/>}>
                <ListSubheader>
                    <Typography variant={"subtitle1"}>Types</Typography>
                </ListSubheader>
                {productTypes.map((type) => (
                    <ListItemButton
                        key={type.id}
                        selected={selectedItems.type === type.id}
                        onClick={() => handleTypeChange(type.id)}
                    >

                        <ListItemText primary={
                            <Typography variant={"subtitle2"}>{type.name}</Typography>
                        }/>
                    </ListItemButton>
                ))}
            </List>

            <List dense subheader={<li/>}>
                <ListSubheader>
                    <Typography variant={"subtitle1"}>Sort</Typography>
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