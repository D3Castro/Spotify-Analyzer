import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';


const styles = {
    list: {
        overflow: 'auto',
        maxHeight: '100%',
    }
};


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
        <List className={props.classes.list} >
            {listItems}
        </List>
    );
}

export default withStyles(styles)(ArtistList);