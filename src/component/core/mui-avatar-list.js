import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Material ui 
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';



// OK
const MuiAvatarList = () => {

    const contact = useSelector(state => state.contacts.entities)

    const [selectedIndex, setSelectedIndex] = useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };


    return (
        <div>
            {
                !contact === true ?
                <>
                    <Typography variant='h3' >Contacts</Typography>
                    <List>
                        {
                            contact.map(user => (
                                <ListItemButton
                                    selected={selectedIndex === 0}
                                    onClick={(event) => handleListItemClick(event, 0)}
                                >
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={user.imageUrl} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        sx={{
                                            maxWidth: '300px',
                                        }}
                                        primaryTypographyProps={{ style: { whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' } }}
                                        secondaryTypographyProps={{
                                            style: { whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }
                                        }}
                                        primary={user.first + user.last} />

                                </ListItemButton>
                            ))
                        }
                    </List>
                </>
                : <Typography> 연결된 멤버들이 없습니다. </Typography>
            }

        </div>
    );
};

export default MuiAvatarList;   
