import React from 'react';
import { styled } from "@mui/system";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';


const styles = styled(() => ({
    list: {
        overflow: 'auto',
        maxHeight: '100%',
    }
}));


function ArtistItem(props) {
    const artist = props.artist;
    const artistName = artist.name;
    const artistSpotifyLink = artist.external_urls.spotify;
    const artistGenreList = artist.genres;
    const artistImageSrc = artist.images[0].url;

    return (
        <ListItem button component="a" href={artistSpotifyLink} target="_blank">
            <ListItemAvatar>
                <Avatar alt={artistName} src={artistImageSrc} />
            </ListItemAvatar>
            <ListItemText
                primary={artistName}
                secondary={"Genres: " + artistGenreList}
            />
        </ListItem>
    )
}


function ArtistList(props) {
    const artists = props.artists;
    const listItems = artists.map((artist) =>
        <ArtistItem key={artist.name} artist={artist} />
    );

    return (
        <List sx={styles.list} >
            {listItems}
        </List>
    );
}

export default ArtistList;