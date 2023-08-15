import Button from "@mui/material/Button";

const Genre = () => {
    return(
        <>
            <Button className= "fantasy-btn" variant="text" color="primary">
            Fantasy
            </Button>
            <Button variant="text" color="primary">
                Noir
            </Button>
            <Button variant="text" color="primary">
                Space
            </Button>
        </>
        
    )
}

export default Genre;