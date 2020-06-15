
import React, { Component } from 'react'
import axios from 'axios'
import Cleaner from '../components/Cleaner'
import Profile from '../components/Profile'

// MUI stuff
import Grid from '@material-ui/core/Grid'

class home extends Component {
    state = {
        cleaners: null
    }
    componentDidMount() {
        axios.get('/cleaners')
            .then(res => {
                console.log(res.data)
                this.setState({
                    cleaners: res.data
                })
            })
            .catch(err => console.log(err))
    }
    render() {
        let recentCleanersMarkup = this.state.cleaners
            ? (this.state.cleaners.map(cleaner => <Cleaner key={cleaner.cleanerId} cleaner={cleaner} />))
            : <p>Loading...</p>
        return (
            <Grid container spacing={16}>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
                <Grid item sm={8} xs={12}>
                    {recentCleanersMarkup}
                </Grid>

            </Grid>
        )
    }
}

export default home
