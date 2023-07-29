import React, { useState, useEffect } from 'react';
import { styled } from "@mui/system";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { Container } from '@mui/material';
import { getUserTopArtists, getUserTopTracks, getUserTopTracksAudioFeatures } from '../../util/user';
import ArtistList from '../lists/ArtistList';
import TrackList from '../lists/TrackList';
import TimeRangeDropDown from '../dropdowns/TimeRangeDropDown';
import AudioFeaturesRadarChart from '../charts/AudioFeaturesRadarChart';

const timeRanges = {
  'Past 4 Weeks': 'short_term',
  'Past 6 Months': 'medium_term',
  'All Time': 'long_term'
};

const styles = styled(({ theme }) => ({
  root: {
    display: 'flex',
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
}));

const Home = () => {
  const [artistTimeRange, setArtistTimeRange] = useState(timeRanges['Past 4 Weeks']);
  const [trackTimeRange, setTrackTimeRange] = useState(timeRanges['Past 4 Weeks']);
  const [audioFeaturesTimeRange, setAudioFeaturesTimeRange] = useState(timeRanges['Past 4 Weeks']);
  const [artists, setArtists] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [trackAudioFeatures, setTrackAudioFeatures] = useState(null);

  const handleUserTopArtists = async (topArtists, timeRange = null) => {
    if (topArtists.status === 'SUCCESS') {
      if (timeRange !== null) {
        setArtists(topArtists.data);
        setArtistTimeRange(timeRange);
      } else {
        setArtists(topArtists.data);
      }
    } else {
      // Handle error
    }
  };

  const handleUserTopTracks = async (topTracks, timeRange = null) => {
    if (topTracks.status === 'SUCCESS') {
      if (timeRange !== null) {
        setTracks(topTracks.data);
        setTrackTimeRange(timeRange);
      } else {
        setTracks(topTracks.data);
      }
    } else {
      // Handle error
    }
  };

  const handleUserTopTracksAudioFeatures = async (topTracksAudioFeatures, timeRange = null) => {
    if (topTracksAudioFeatures.status === 'SUCCESS') {
      if (timeRange !== null) {
        setTrackAudioFeatures(topTracksAudioFeatures.data);
        setAudioFeaturesTimeRange(timeRange);
      } else {
        setTrackAudioFeatures(topTracksAudioFeatures.data);
      }
    } else {
      // Handle error
    }
  };

  const handleArtistTimeRangeChange = async (event) => {
    setArtists(null);
    const topArtists = await getUserTopArtists(event.target.value);
    await handleUserTopArtists(topArtists, event.target.value);
  };

  const handleTrackTimeRangeChange = async (event) => {
    setTracks(null);
    const topTracks = await getUserTopTracks(event.target.value);
    await handleUserTopTracks(topTracks, event.target.value);
  };

  const handleAudioFeatureTimeRangeChange = async (event) => {
    setTrackAudioFeatures(null);
    const topTracks = await getUserTopTracksAudioFeatures(event.target.value);
    await handleUserTopTracksAudioFeatures(topTracks, event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const [
        topArtistsResult,
        topTracksResult,
        topTracksAudioFeaturesResult,
      ] = await Promise.all([
        getUserTopArtists(artistTimeRange),
        getUserTopTracks(trackTimeRange),
        getUserTopTracksAudioFeatures(audioFeaturesTimeRange),
      ]);

      handleUserTopArtists(topArtistsResult);
      handleUserTopTracks(topTracksResult);
      handleUserTopTracksAudioFeatures(topTracksAudioFeaturesResult);
    };

    fetchData();
  }, [artistTimeRange, trackTimeRange, audioFeaturesTimeRange]);

  const artistTimeRangeDropdown = (
    <TimeRangeDropDown
      timeRange={artistTimeRange}
      handleTimeRangeChange={handleArtistTimeRangeChange}
      timeRanges={timeRanges}
    />
  );

  const trackTimeRangeDropdown = (
    <TimeRangeDropDown
      timeRange={trackTimeRange}
      handleTimeRangeChange={handleTrackTimeRangeChange}
      timeRanges={timeRanges}
    />
  );

  const audioFeatureTimeRangeDropdown = (
    <TimeRangeDropDown
      timeRange={audioFeaturesTimeRange}
      handleTimeRangeChange={handleAudioFeatureTimeRangeChange}
      timeRanges={timeRanges}
    />
  );

  return (
    <Container sx={styles.root}>
        <Grid
            container
            sx={styles.grid}
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={3}
        >
            <Grid item xs={5}>
            <Paper sx={styles.listWrapper}>
                <div align="center" display="inline">
                <Typography variant="h3">Top Artists</Typography>
                {artistTimeRangeDropdown}
                </div>
                <Divider />
                <div align="center">
                {artists ? <ArtistList artists={artists} /> : <CircularProgress />}
                </div>
            </Paper>
            </Grid>

            <Grid item xs={5}>
            <Paper sx={styles.listWrapper}>
                <div align="center" display="inline">
                <Typography variant="h3">Top Tracks</Typography>
                {trackTimeRangeDropdown}
                </div>
                <Divider />
                <div align="center">
                {tracks ? <TrackList tracks={tracks} /> : <CircularProgress />}
                </div>
            </Paper>
            </Grid>

            <Grid item xs={6}>
            <Paper sx={styles.chartWrapper}>
                <div align="center">
                <Typography variant="h3">Top Tracks Audio Analysis</Typography>
                {audioFeatureTimeRangeDropdown}
                <Divider />
                {trackAudioFeatures ? (
                    <AudioFeaturesRadarChart width={500} height={500} data={trackAudioFeatures} />
                ) : (
                    <CircularProgress />
                )}
                </div>
            </Paper>
            </Grid>
        </Grid>
    </Container>
  );
};

export default Home;