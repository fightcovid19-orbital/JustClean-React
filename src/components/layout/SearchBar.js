import React, { Component } from 'react'

// MUI stuff
import TextField from '@material-ui/core/TextField'

class SearchBar extends Component {
    state = {
        location: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleKeyPress = (event) => {
        if (event.keyCode === 13) {
            window.location.href = `/cleaners/search/${this.state.location}`;
        }
    }

    render() {
        return (
            <TextField id='location' name='location' type='text' placeholder='Search by Location' variant='outlined' size='small'
                value={this.state.location} onChange={this.handleChange} onKeyDown={this.handleKeyPress} fullWidth />
        )
    }
}

export default SearchBar
