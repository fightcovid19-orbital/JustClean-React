import React, { Component } from 'react'
import axios from 'axios';
import CleanerCard from '../components/cleanerCard/CleanerCard';
import CustomerProfile from '../components/profile/CustomerProfile'

// MUI stuff
import Grid from '@material-ui/core/Grid'

class cleanerPage extends Component {
    state = {
        searchedCleaners: null
    }
    componentDidMount() {
        const location = this.props.match.params.location;
        const locationData = {
            location: location
        }
        axios.post('/location', locationData)
            .then(res => {
                this.setState({
                    searchedCleaners: res.data
                })
            })
            .catch(err => console.log(err));
    }
    render() {
        const { searchedCleaners } = this.state

        const cleanersMarkup = (searchedCleaners === null) ? (
            <p>No cleaner found</p>
        ) : (
                searchedCleaners.map((cleaner) => <CleanerCard key={cleaner.cleanerName} cleaner={cleaner} />)
            )

        return (
            <Grid container spacing={2}>
                <Grid item sm={4} xs={12}>
                    <CustomerProfile />
                </Grid>
                <Grid item sm={8} xs={12}>
                    {cleanersMarkup}
                </Grid>
            </Grid>

        )
    }
}

export default cleanerPage