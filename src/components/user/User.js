import React from 'react';
import {
    Container,
    Box,
    Grid
} from '@material-ui/core';

import UserAvatar from './UserAvatar';
import UserDetails from './UserDetails';


export default function User(props) {

    var userDetail = {};
    if (props.location.state) {
        userDetail = props.location.state.userDetail;
    }
    return (
        <Box backgroundColor='background.default'
            minHeight='100%'
            py='3'>

            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xs={12}
                    >
                        <UserAvatar userDetail={userDetail}></UserAvatar>

                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={6}
                        xs={12}
                    >
                        <UserDetails userDetail={userDetail}></UserDetails>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
