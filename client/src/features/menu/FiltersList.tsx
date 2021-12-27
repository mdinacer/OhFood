import {Container, List, ListItemButton, ListItemText, ListSubheader} from "@mui/material";
import {sortOptions} from "./sortOptions";
import {useState} from "react";
import {ProductType} from "../../app/models/productType";


interface Props {
    productTypes: ProductType[]
    handleTypeChanged: (value: ProductType) => void;
    handleSortChanged: (value: string) => void;
}


export default function FiltersList({productTypes, handleTypeChanged, handleSortChanged}: Props) {
    const [selectedItems, setSelectedItems] = useState({type: 0, sort: "name"})

    function handleTypeChange(value: ProductType) {
        handleTypeChanged(value);
        setSelectedItems({...selectedItems, type: value.id});
    }

    function handleSortChange(value: string) {
        handleSortChanged(value);
        setSelectedItems({...selectedItems, sort: value});
    }

    return (
        <Container className={"filters-list"}>
            <List subheader={<li/>}>
                <ListSubheader color={"primary"}>Type</ListSubheader>
                {productTypes.map((type) => (
                    <ListItemButton
                        key={type.id}
                        selected={selectedItems.type === type.id}
                        onClick={() => handleTypeChange(type)}
                    >

                        <ListItemText primary={type.name}/>
                    </ListItemButton>
                ))}
            </List>

            <List subheader={<li/>}>
                <ListSubheader color={"primary"}>Sort</ListSubheader>
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