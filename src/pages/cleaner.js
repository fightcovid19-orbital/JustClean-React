import React, { Component } from 'react';
 
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import Comment from '../components/cleaner/Comment'
import CleanerProfile from '../components/cleaner/CleanerProfile'
 
class cleaner extends Component {
    state = {
        comments: null
    }
    
    componentDidMount(){
        axios.get('/comments')
            .then(res => {
                this.setState({
                    comments: res.data
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        let recentCommentsMarkup = this.state.comments ? (
            this.state.comments.map(comment => <Comment comment={comment}/>)
        ) : <p>Loading...</p>

        return (
            <Grid container spacing={2}>
                <Grid item sm={4} xs={12}>
                    <CleanerProfile/>
                </Grid>
                <Grid item sm={8} xs={12}>
                    {recentCommentsMarkup}
                </Grid>
            </Grid>
        );
    }
}
 
 export default cleaner
 