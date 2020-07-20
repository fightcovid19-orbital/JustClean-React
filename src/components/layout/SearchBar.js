import React, { Component, Fragment } from 'react'
import { regions } from '../../util/Regions'

// MUI stuff
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

class SearchBar extends Component {
    state = {
        location: ''
    }

    handleInputChange = (event, value) => {
        this.setState({
            location: value
        })
    }

    handleChange = (event, value) => {
        this.setState({
            [event.target.name]: value
        })
    }

    handleKeyPress = (event) => {
        if (event.keyCode === 13) {
            window.location.href = `/cleaners/search/${this.state.location}`;
        }
    }

    render() {
        return (
            <Autocomplete
                id="region-select"
                style={{ width: 200 }}
                options={regions}
                autoHighlight
                getOptionLabel={(option) => option.regionName}
                renderOption={(option) => (
                    <Fragment>
                        {option.regionName}
                    </Fragment>
                )}
                onInputChange={this.handleInputChange}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyPress}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Location"
                        variant="outlined"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password'
                        }}
                    />
                )}
            />
        )
    }
}


export default SearchBar
