import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Divider,
    Grid,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    ListSubheader,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/store/configureStore";
import {useEffect, useState} from "react";
import {Category} from "../../../app/models/category";
import {FieldValues, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import AppTextInput from "../../../app/components/AppTextInput";
import AppDropzone from "../../../app/components/AppDropzone";
import {LoadingButton} from "@mui/lab";
import {categoryValidation} from "../categoryValidation";
import {Add, ArrowLeft, ChevronLeft} from "@mui/icons-material";
import agent from "../../../app/api/agent";
import {fetchCategoriesAsync} from "../../../app/slices/catalogSlice";

interface Props{
    onClose : () => void;
}

export default function AdminCategoriesEdit({onClose}: Props) {
    const dispatch = useAppDispatch();
    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
    const {control, watch, handleSubmit, reset, formState: {isSubmitting, isValid}} = useForm({
        mode: "onTouched",
        resolver: yupResolver<any>(categoryValidation)
    });
    const {
        categoriesLoaded,
        categories
    } = useAppSelector((state) => state.catalog);
    const watchFile = watch('file', null);
    const [busy, setBusy] = useState(false);
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!categoriesLoaded) {
            dispatch(fetchCategoriesAsync())
        }
    }, [categoriesLoaded, dispatch])

    async function handleSubmitData(data: FieldValues) {
        try {
            setBusy(true);
            const item = {
                id: selectedCategory?.id ?? 0,
                name: data.name,
                file: data.file
            }
            if (selectedCategory) {
                await agent.Admin.updateCategory(item);
            } else {
                await agent.Admin.createCategory({name: item.name, file: item.file});
            }
        } catch (e) {
            console.log(e)
        } finally {
            resetForm();
            setBusy(false);
            dispatch(fetchCategoriesAsync())
        }
    }

    const resetForm = () => {
        setSelectedCategory(undefined);
        reset({
            id: 0,
            name: "",
            pictureUrl: null,
            file: null
        });

    }

    useEffect(() => {
        if (selectedCategory) {
            reset(selectedCategory);
        } else {
            reset({
                id: 0,
                name: "",
                pictureUrl: "",
            }, {
                keepTouched: false
            });
        }
    }, [reset, selectedCategory])

    function handSelectedCategoryChanged(category: Category) {
        setSelectedCategory(category);

    }

    function handleDeleteCategory() {
        if (selectedCategory) {
            setBusy(true);
            agent.Admin.deleteCategory(selectedCategory.id)
                .then(() => dispatch(fetchCategoriesAsync()))
                .catch(error => console.log(error))
                .finally(() => {
                    setBusy(false);
                    setSelectedCategory(undefined)
                    setOpen(false)
                });
        }
    }

    return (
        <Container>
            <Typography variant={"h6"} component={"h1"} sx={{mb: 5}}>Categories Management</Typography>
            <Paper sx={{p: 4}}>
                {!categoriesLoaded && "Loading Categories"}
                <Grid container>
                    <Grid item xs={12} md={4}>
                        <List>
                            <ListSubheader>
                                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                    <Typography variant={"caption"}>Categories</Typography>
                                    <IconButton onClick={() => setSelectedCategory(undefined)}>
                                        <Add/>
                                    </IconButton>
                                </Stack>
                            </ListSubheader>
                            {categories.map(category => (
                                <ListItemButton key={category.id}
                                                selected={selectedCategory?.id === category.id}
                                                onClick={() => handSelectedCategoryChanged(category)}
                                >
                                    <ListItemText primary={category.name}/>
                                </ListItemButton>
                            ))}
                        </List>
                    </Grid>
                    <Divider flexItem/>
                    <Grid item xs={12} md={8} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>

                        <Container>
                            <Typography variant={"h6"}
                                        gutterBottom>{selectedCategory ? "Edit Category" : "Add Category"}</Typography>
                            <form onSubmit={handleSubmit(handleSubmitData)}>
                                <Grid container spacing={3}>
                                    <Grid item md={12} xs={12}>
                                        <AppTextInput control={control} name='name' label='Category name'/>
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
                                                        <Box component={"img"} sx={{borderRadius: 3}}
                                                             src={watchFile.preview}
                                                             alt='preview'
                                                             style={{maxHeight: 200}}/>
                                                    ) : (
                                                        <Box component={"img"}
                                                             sx={{
                                                                 borderRadius: 3,
                                                                 objectFit: "cover",
                                                                 objectPosition: "center"
                                                             }}
                                                             src={selectedCategory?.pictureUrl}
                                                             alt={selectedCategory?.name}
                                                             style={{maxHeight: 200}}/>
                                                    )}
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Stack direction={"row"} justifyContent='space-between' sx={{mt: 3}}>
                                    {selectedCategory && (
                                        <LoadingButton size={"small"} disableElevation loading={busy}
                                                       type='button'
                                                       variant='contained'
                                                       onClick={() => setOpen(true)}
                                                       color='error'>Delete</LoadingButton>
                                    )}
                                    <Stack direction={"row"} justifyContent='space-between' sx={{ml: "auto"}}>
                                        <Button sx={{ml: "auto", mr: 1}}
                                                onClick={() => resetForm()}
                                                variant='outlined'
                                                disableElevation
                                                color='inherit'>Cancel</Button>
                                        <LoadingButton disabled={!isValid} disableElevation
                                                       loading={isSubmitting || busy} type='submit'
                                                       variant='contained'
                                                       color='primary'>{selectedCategory ? "Update" : "Create"}</LoadingButton>
                                    </Stack>
                                </Stack>
                            </form>
                        </Container>
                    </Grid>
                </Grid>
                <Divider flexItem sx={{my:2}}/>
                <Button onClick={() => {
                    resetForm();
                    onClose();
                }} variant={"outlined"} color={"inherit"} sx={{width:{xs:"100%", md:"auto"}}}
                        startIcon={<ChevronLeft/>}>
                    Back to products
                </Button>
            </Paper>
            <Dialog

                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box sx={{p: 3}}>
                    <DialogTitle id="alert-dialog-title">
                        {`Delete ${selectedCategory?.name}`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {`This will delete ${selectedCategory?.name} permanently, are you sure you want to proceed?`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button disableElevation onClick={() => handleDeleteCategory()} color={"error"}
                                variant={"contained"}>YES</Button>
                        <Button variant={"outlined"} color={"inherit"} onClick={() => setOpen(false)} autoFocus>
                            No
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Container>
    )
}