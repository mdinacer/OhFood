import {Box, Button, Container, FormGroup, Grid, MenuItem, Stack, TextField, Typography} from "@mui/material";
import {Product} from "../../../app/models/product";
import {FieldValues, useController, UseControllerProps, useForm} from "react-hook-form";
import AppTextInput from "../../../app/components/AppTextInput";
import {LoadingButton} from "@mui/lab";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {productValidation} from "../productValidation";
import AppDropzone from "../../../app/components/AppDropzone";
import {useAppDispatch, useAppSelector} from "../../../app/store/configureStore";
import {useEffect} from "react";
import {Category} from "../../../app/models/category";
import CheckboxList from "../../../app/components/CheckboxList";
import AppCurrencyInput from "../../../app/components/AppCurrencyInput";
import agent from "../../../app/api/agent";
import {setProduct, updateProduct} from "../../../app/slices/catalogSlice";


interface Props {
    product?: Product | null;
    cancelEdit: () => void;
}

const ingredients = [
    "Frites",
    "Viande Hachée",
    "Salade",
    "Cheddar",
    "Camambert",
    "Gouda",
    "Pain Noir",
    "Cornishon",
    "Escalope Grillé",
    "Poulet Hachée",
    "Fois Grillé",
    "Oeuf",
];


export default function AdminProductForm({product, cancelEdit}: Props) {
    const isEdit = !!product;
    const {
        categories
    } = useAppSelector((state) => state.catalog);
    const {control, setValue, watch, handleSubmit, reset, formState: {isSubmitting, isDirty}} = useForm({
        mode: "all",
        resolver: yupResolver<any>(productValidation)
    });
    const watchFile = watch('file', null);
    const dispatch = useAppDispatch();

    useEffect(() => {

        if (product && !watchFile && !isDirty) {
            const item = {
                name: product.name,
                category: product.category,
                price: product.price,
                description: product.description ?? "",
                ingredients: product.ingredients ?? "",
                pictureUrl: product.pictureUrl ?? ""
            }
            reset(item);
        }

        return () => {
            if (watchFile) URL.revokeObjectURL(watchFile.preview);
        }
    }, [product, reset, watchFile, isDirty]);

    async function handleSubmitData(data: FieldValues) {
        const item = {id: product?.id ?? 0, ...data}
        try {
            if (isEdit) {
                const result = await agent.Admin.updateProduct(item);
                dispatch(updateProduct({id: product.id, changes: {...result}}))
            } else {
                const result = await agent.Admin.createProduct(item);
                dispatch(setProduct(result));
            }
        } catch (e) {
            console.log(e)
        } finally {
            cancelEdit()
        }
    }

    async function handleIngredientsChange(data: string[]) {
        const value = data.join(", ");

        setValue("ingredients", value)

    }

    function handleClose() {
        reset({});
        cancelEdit()
    }

    function getIngredients() {
        return product?.ingredients.split(", ") ?? [];
    }

    return (
        <Container maxWidth={"md"}>
            <Box sx={{
                bgcolor: 'background.paper',
                borderRadius: {md: 3, sm: 0},
                boxShadow: 24,
                p: {md: 4, xs: 2},
                mx: "auto"
            }}>
                <Typography id="transition-modal-title" variant="h6" component="h1" sx={{mb: 3}}>
                    Product Modification
                </Typography>
                <form onSubmit={handleSubmit(handleSubmitData)}>
                    <Grid container spacing={3}>
                        <Grid item md={4} xs={12}>
                            <AppTextInput control={control} name='name' label='Product name'/>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <CategorySelectList items={categories} control={control} name='category'
                                                label='Categories'/>
                        </Grid>

                        <Grid item md={4} xs={12}>
                            <AppCurrencyInput currency={"$"} type='number' control={control} name='price'
                                              label='Price'/>
                        </Grid>

                        <Grid item xs={12}>
                            <Box display={"none"}>
                                <AppTextInput control={control} name='ingredients' label='Ingredients'/>
                            </Box>
                            <FormGroup>
                                <Box overflow={"auto"} maxHeight={150} display={"flex"} flexDirection={"column"}
                                     flexWrap={"wrap"} justifyContent={"space-evenly"}>
                                    <CheckboxList checked={getIngredients()} items={ingredients}
                                                  onChange={handleIngredientsChange}/>

                                </Box>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <AppTextInput multiline={true} rows={2} control={control} name='description'
                                          label='Description'/>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{
                                        width: "100%",
                                    }}>
                                        <AppDropzone control={control} name='file'/>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "100%",
                                        height: "100%"
                                    }}>
                                        {watchFile ? (
                                            <Box component={"img"} sx={{borderRadius: 3}} src={watchFile.preview}
                                                 alt='preview'
                                                 style={{maxHeight: 200}}/>
                                        ) : (
                                            <Box component={"img"}
                                                 sx={{
                                                     borderRadius: 3,
                                                     objectFit: "cover",
                                                     objectPosition: "center"
                                                 }}
                                                 src={product?.pictureUrl} alt={product?.name}
                                                 style={{maxHeight: 200}}/>
                                        )}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Stack direction={"row"} justifyContent='space-between' sx={{mt: 3, ml: "auto"}}>
                        <Button sx={{ml: "auto", mr: 1}} onClick={handleClose} variant='outlined' disableElevation
                                color='inherit'>{isDirty ? "Cancel" : "Back"}</Button>
                        <LoadingButton disableElevation loading={isSubmitting} type='submit' variant='contained'
                                       color='primary'>{product ? "Update" : "Create"}</LoadingButton>
                    </Stack>
                </form>
            </Box>
        </Container>
    )
}


interface SelectProps extends UseControllerProps {
    label: string;
    items: Category[];
}

function CategorySelectList(props: SelectProps) {
    const {fieldState, field} = useController({...props, defaultValue: ''});
    return (
        <TextField
            {...props}
            {...field}
            select
            fullWidth
            value={field.value}
            label={props.label}
            onChange={field.onChange}
            size={"small"}
            variant='outlined'
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
        >
            {props.items.map((category, index) => (
                <MenuItem key={index} value={category.name}>{category.name}</MenuItem>
            ))}
        </TextField>
    )
}