import {Card, CardActions, CardContent, Skeleton} from "@mui/material";

export default function ProductItemSkeleton() {
    return (
        <Card sx={{maxHeight: "350px", height: "100%", display: "flex", flexDirection: "column", pt: 2}}>

            <Skeleton animation="wave" sx={{flex: "0 1 140px"}} variant="rectangular" width={"100%"} height={140}/>
            <CardContent sx={{flex: "1 1 auto", display: "flex", flexDirection: "column"}}>

                <Skeleton animation="wave" sx={{flex: "0 1 auto"}}/>

                <Skeleton animation="wave" sx={{flex: "1 1 auto"}}/>

                <Skeleton animation="wave" sx={{flex: "0 1 auto"}}/>
            </CardContent>
            <CardActions sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                flex: "0 1 auto"
            }}>
                <Skeleton width={"100%"} animation="wave"/>
                <Skeleton width={"100%"} animation="wave"/>
            </CardActions>
        </Card>
    )
}