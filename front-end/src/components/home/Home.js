import React, { Component } from 'react';

import { withStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

import { getUserTopArtists, getUserTopTracks, getUserTopTracksAudioFeatures } from '../../util/user';
import ArtistList from '../lists/ArtistList';
import TrackList from '../lists/TrackList';
import TimeRangeDropDown from '../dropdowns/TimeRangeDropDown';
import AudioFeaturesRadarChart from '../charts/AudioFeaturesRadarChart';

const timeRanges = {
    'Past 4 Weeks': 'short_term',
    'Past 6 Months': 'medium_term',
    'All Time': 'long_term'
}

const styles = theme => ({
    root: {
        display: 'flex',
    },
    content: {
        // padding: theme.spacing(2),
    },
    grid: {
        padding: theme.spacing(2),
    },
    listWrapper: {
        maxHeight: '70vh',
        overflow: 'auto',
    },
    chartWrapper: {
        padding: theme.spacing(2),
    },
});


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artistTimeRange: timeRanges['Past 4 Weeks'],
            trackTimeRange: timeRanges['Past 4 Weeks'],
            audioFeaturesTimeRange: timeRanges['Past 4 Weeks'],
            artists: null,
            tracks: null,
            trackAudioFeatures: null,
        };

        this.handleUserTopArtists = this.handleUserTopArtists.bind(this);
        this.handleUserTopTracks = this.handleUserTopTracks.bind(this);
        this.handleUserTopTracksAudioFeatures = this.handleUserTopTracksAudioFeatures.bind(this);
        this.handleArtistTimeRangeChange = this.handleArtistTimeRangeChange.bind(this);
        this.handleTrackTimeRangeChange = this.handleTrackTimeRangeChange.bind(this);
        this.handleAudioFeatureTimeRangeChange = this.handleAudioFeatureTimeRangeChange.bind(this);
    }

    async handleUserTopArtists(topArtists, timeRange=null) {
        if (topArtists.status === 'SUCCESS') {
            if (timeRange !== null) {
                this.setState({ artists: topArtists.data, artistTimeRange: timeRange });
            } else {
                this.setState({ artists: topArtists.data });
            }
        } else {
            // Alert
        }
    }

    async handleUserTopTracks(topTracks, timeRange=null) {
        if (topTracks.status === 'SUCCESS') {
            if (timeRange !== null) {
                this.setState({ tracks: topTracks.data, trackTimeRange: timeRange });
            } else {
                this.setState({ tracks: topTracks.data });
            }
        } else {
            // Alert
        }
    }

    async handleUserTopTracksAudioFeatures(topTracksAudioFeatures, timeRange=null) {
        if (topTracksAudioFeatures.status === "SUCCESS") {
            if (timeRange !== null) {
                this.setState({ trackAudioFeatures: topTracksAudioFeatures.data, audioFeaturesTimeRange: timeRange });
            } else {
                this.setState({ trackAudioFeatures: topTracksAudioFeatures.data });
            }
        } else {
            // Alert
        }
    }

    async handleArtistTimeRangeChange(event) {
        this.setState({ artists: null });
        const topArtists = await getUserTopArtists(event.target.value);
        await this.handleUserTopArtists(topArtists, event.target.value);
    };

    async handleTrackTimeRangeChange(event) {
        this.setState({ tracks: null });
        const topTracks = await getUserTopTracks(event.target.value);
        await this.handleUserTopTracks(topTracks, event.target.value);
    };

    async handleAudioFeatureTimeRangeChange(event) {
        this.setState({ trackAudioFeatures: null });
        const topTracks = await getUserTopTracksAudioFeatures(event.target.value);
        await this.handleUserTopTracksAudioFeatures(topTracks, event.target.value);
    };

    async componentDidMount() {
        await Promise.all([
            getUserTopArtists(this.state.artistTimeRange).then(this.handleUserTopArtists),
            getUserTopTracks(this.state.trackTimeRange).then(this.handleUserTopTracks),
            getUserTopTracksAudioFeatures(this.state.audioFeaturesTimeRange).then(this.handleUserTopTracksAudioFeatures),
        ]);
    }

    render() {
        const { classes } = this.props;

        const artistTimeRangeDropdown = <TimeRangeDropDown timeRange={this.state.artistTimeRange} handleTimeRangeChange={this.handleArtistTimeRangeChange} timeRanges={timeRanges}/>
        const trackTimeRangeDropdown = <TimeRangeDropDown timeRange={this.state.trackTimeRange} handleTimeRangeChange={this.handleTrackTimeRangeChange} timeRanges={timeRanges}/>
        const audioFeatureTimeRangeDropdown = <TimeRangeDropDown timeRange={this.state.audioFeaturesTimeRange} handleTimeRangeChange={this.handleAudioFeatureTimeRangeChange} timeRanges={timeRanges}/>

        return (
            <div className={classes.root}>
                <main className={classes.content}>
                    <Grid
                        container
                        className={classes.grid}
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={3}
                    >
                        <Grid item xs={5}>
                            <Paper>
                                <div align="center" display="inline">
                                    <Typography variant="h3">
                                        Top Artists
                                    </Typography>
                                    {artistTimeRangeDropdown}
                                </div>
                                <Divider />
                                <div className={classes.listWrapper} align="center">
                                    {this.state.artists
                                        ? <ArtistList artists={this.state.artists} />
                                        : <CircularProgress />}
                                </div>
                            </Paper>
                        </Grid>

                        <Grid item xs={5}>
                            <Paper>
                                <div align="center" display="inline">
                                    <Typography variant="h3">
                                        Top Tracks
                                    </Typography>
                                    {trackTimeRangeDropdown}
                                </div>
                                <Divider />
                                <div className={classes.listWrapper} align="center">
                                    {this.state.tracks
                                        ? <TrackList tracks={this.state.tracks} />
                                        : <CircularProgress />}
                                </div>
                            </Paper>
                        </Grid>

                        <Grid item xs={6}>
                            <Paper className={classes.chartWrapper}>
                                <div align="center" >
                                    <Typography variant="h3">
                                        Top Tracks Audio Analysis
                                    </Typography>
                                    {audioFeatureTimeRangeDropdown}
                                    <Divider />
                                    {this.state.trackAudioFeatures
                                        ? (
                                            <AudioFeaturesRadarChart width={500} height={500} data={this.state.trackAudioFeatures} />
                                        )
                                        : <CircularProgress />}
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Home);