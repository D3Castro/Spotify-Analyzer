import React from 'react';
import { styled } from '@mui/system';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { ListItemButton } from '@mui/material';

const styles = styled(() => ({
  list: {
    overflow: 'auto',
    maxHeight: '100%',
  },
}));

const TrackItem = ({ track }) => {
  const { name: trackName, external_urls: { spotify: trackSpotifyLink }, artists, album: { images } } = track;
  const trackArtistList = artists.map(trackArtists => trackArtists.name);
  const trackImageSrc = images[0]?.url;

  return (
    <ListItemButton component="a" href={trackSpotifyLink} target="_blank">
      <ListItemAvatar>
        <Avatar alt={trackName} src={trackImageSrc} />
      </ListItemAvatar>
      <ListItemText primary={trackName} secondary={`Artists: ${trackArtistList}`} />
    </ListItemButton>
  );
};

const TrackList = ({ tracks }) => {
  return (
    <List sx={styles.list}>
      {tracks.map((track) => <TrackItem key={track.name} track={track} />)}
    </List>
  );
};

export default TrackList;