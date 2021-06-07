import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
    IconButton,
} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

function UserAvatar(props) {
    var user={};
     
    if(props.userDetail){
        user = props.userDetail;
    }
    return (
        <Card {...props}>
            <CardContent>
                <Box display="flex" justifyContent="center">
                    <Avatar height='100' width='100' src={user.avatar} />
                </Box>
                <Box display="flex" justifyContent="center" >
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h5"
                    >
                        {user.firstName} { user.lastName}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center" >
                    <Typography
                        color="textSecondary"
                        variant="body1"
                    >
                        {user.email}
                    </Typography>
                </Box>
            </CardContent>
            <Divider />
            <CardActions display="flex" justifyContent="center" >

                <input accept="image/*" hidden="true" id="icon-button-file" type="file" />

                <label htmlFor="icon-button-file" style={{margin: "0 auto"}}>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>

            </CardActions>
        </Card>
    )
};

export default UserAvatar