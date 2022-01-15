import {
    Box,
    Container,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Modal,
    Typography,
} from "@mui/material";
import {useState} from "react";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import "./Gallery.scss";
import {Close} from "@mui/icons-material";

function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
            size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}

export default function Gallery() {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const handleOpen = (item: any) => {
        setSelectedItem(item);
        setOpen(true);
    };
    const handleClose = () => {
        setSelectedItem(null);
        setOpen(false);
    };
    return (
        <section className="gallery">
            <Container sx={{py: 4}}>
                <Typography
                    variant="h4"
                    sx={{
                        textTransform: "uppercase",
                        pt: {md:"60px", xs:1},
                        pb: {xs:"60px", md:1},
                        mb: 2,
                        color: "white",
                    }}
                >
                    Photos Gallery
                </Typography>
                <ImageList
                    sx={{width: "100%", height: "100%", borderRadius: 3, py: 3}}
                    variant="quilted"
                    cols={4}
                    rowHeight={250}
                >
                    {itemData.map((item) => (
                        <ImageListItem
                            key={item.img}
                            cols={item.cols || 1}
                            rows={item.rows || 1}
                        >
                            <img
                                {...srcset(item.img, 121, item.rows, item.cols)}
                                alt={item.title}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={item.title}
                                subtitle={item.author}
                                actionIcon={
                                    <IconButton
                                        onClick={() => handleOpen(item)}
                                        sx={{color: "rgba(255, 255, 255, 0.54)"}}
                                        aria-label={`info about ${item.title}`}
                                    >
                                        <AspectRatioIcon/>
                                    </IconButton>
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Container>
            {selectedItem && (
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{color: "black", p:3}}
                    >
                        <Box
                            sx={{

                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "absolute" as "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                maxWidth: "800px",
                                bgcolor: "background.paper",
                                border: "2px solid #000",
                                boxShadow: 24,
                                overflow:"hidden",
                                borderRadius: {md:0, lg:3},
                                width:"100%",

                            }}
                        >
                            <IconButton onClick={handleClose}
                                sx={{
                                    position: "absolute" as "absolute",
                                    top:0, right:0,
                                    m:1
                                }}
                            >
                                <Close/>
                            </IconButton>
                            <Box
                                component="img"
                                src={`${selectedItem.img}?w=800&h=600&fit=crop&auto=format`}
                                srcSet={`${selectedItem.img}?w=800&h=600&fit=crop&auto=format`}
                                sx={{
                                    maxWidth: "800px",
                                    minWidth: "300px",
                                    width:"100%",
                                    borderRadius: 0,
                                    maxHeight: "500px",
                                    height:"100%",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                    mb: 1,
                                }}
                                loading="lazy"
                            />
                            <Container sx={{
                                my:1,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                pb:3
                            }}>
                                <Typography
                                    id="modal-modal-title"
                                    variant="h3"
                                    component="h2"
                                >
                                    {selectedItem.title}
                                </Typography>
                                <Typography id="modal-modal-description" sx={{mt: 0}}>
                                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                </Typography>
                            </Container>
                        </Box>
                    </Modal>
                </div>
            )}
        </section>
    );
}
const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
        cols: 2,
    },
];
