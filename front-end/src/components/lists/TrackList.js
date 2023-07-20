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
}


function TrackItem(props) {
    const track = props.track;
    const trackName = track.name;
    const trackSpotifyLink = track.external_urls.spotify;
    const trackArtistList = track.artists.map(trackArtists => trackArtists.name);
    const trackImageSrc = track.album.images[0].url;

    return (
        <ListItem button component="a" href={trackSpotifyLink} target="_blank">
            <ListItemAvatar>
                <Avatar alt={trackName} src={trackImageSrc} />
            </ListItemAvatar>
            <ListItemText
                primary={trackName}
                secondary={"Artists: " + trackArtistList}
            />
        </ListItem>
    )
}


function TrackList(props) {
    const tracks = props.tracks;
    const listItems = tracks.map((track) =>
        <TrackItem key={track.name} track={track} />
    );

    return (
        <List className={props.classes.list} >
            {listItems}
        </List>
    );
}

export default withStyles(styles)(TrackList);