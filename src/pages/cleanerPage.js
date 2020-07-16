import React, { Component } from 'react'
import PropTypes from 'prop-types';
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

    componentDidMount() {
        const cleanerName = this.props.match.params.cleanerName;
        this.props.getCleanerData(cleanerName);
    }
    render() {
        const { comments, loadingData, cleaner } = this.props.data

        let commentsMarkup, profile
        if (loadingData) {
            commentsMarkup = <CardSkeleton />
            profile = <ProfileSkeleton />
        } else if (comments && cleaner) {
            commentsMarkup = comments.map((comment) => <CommentCard key={comment.commentId} comment={comment} />)
            profile = <StaticCleanerProfile profile={cleaner} />
        } else {
            commentsMarkup = <p>No comment on this cleaner</p>
            profile = <p>No cleaner found</p>
        }

        return (
            <Grid container spacing={2}>
                <Grid item sm={4} xs={12}>
                    {profile}
                </Grid>

                <Grid item sm={8} xs={12}>
                    {commentsMarkup}
                </Grid>
            </Grid>
        )
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
