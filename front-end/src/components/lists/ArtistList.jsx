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

const ArtistItem = ({ artist }) => {
  const { name: artistName, external_urls: { spotify: artistSpotifyLink }, genres: artistGenreList, images } = artist;
  const artistImageSrc = images[0]?.url;

  return (
    <ListItemButton component="a" href={artistSpotifyLink} target="_blank">
      <ListItemAvatar>
        <Avatar alt={artistName} src={artistImageSrc} />
      </ListItemAvatar>
      <ListItemText primary={artistName} secondary={`Genres: ${artistGenreList}`} />
    </ListItemButton>
  );
};

const ArtistList = ({ artists }) => {
  return (
    <List sx={styles.list}>
      {artists.map((artist) => <ArtistItem key={artist.name} artist={artist} />)}
    </List>
  );
};

export default ArtistList;