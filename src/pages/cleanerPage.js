import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import CommentCard from '../components/commentCard/CommentCard'
import StaticCleanerProfile from '../components/profile/StaticCleanerProfile'
import ProfileSkeleton from '../util/ProfileSkeleton'
import CardSkeleton from '../util/CardSkeleton'

// MUI stuff
import Grid from '@material-ui/core/Grid'

// Redux stuff
import { connect } from 'react-redux'
import { getCleanerData } from '../redux/actions/dataActions'

class cleanerPage extends Component {
    state = {
        cleanerProfile: null
    }
    componentDidMount() {
        const cleanerName = this.props.match.params.cleanerName; // from exact path /cleaners/cleanerName
        this.props.getCleanerData(cleanerName);
        axios.get(`/cleaner/${cleanerName}`)
            .then(res => {
                this.setState({
                    cleanerProfile: res.data.user
                })
            })
            .catch(err => console.log(err));
    }
    render() {
        const { comments, loadingData } = this.props.data

        const commentsMarkup = loadingData ? (
            <CardSkeleton />
        ) : comments === null ? (
            <p>No comment on this cleaner</p>
        ) : (
                    comments.map((comment) => <CommentCard key={comment.commentId} comment={comment} />)
                )
        return (
            <Grid container spacing={2}>
                <Grid item sm={4} xs={12}>
                    {this.state.cleanerProfile === null ? (
                        <p>No cleaner found</p>
                    ) : (
                            <StaticCleanerProfile profile={this.state.cleanerProfile} />
                        )}
                </Grid>

                <Grid item sm={8} xs={12}>
                    {commentsMarkup}
                </Grid>
            </Grid>

        )
        // need to check if no profile
    }
}

cleanerPage.propTypes = {
    data: PropTypes.object.isRequired,
    getCleanerData: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(mapStateToProps, { getCleanerData })(cleanerPage)
