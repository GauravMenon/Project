import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ChannelList.css';

const server = 'http://localhost:8080/api'

function ChannelList() {
    const [channels, setChannels] = React.useState([]);
    const [newChannelName, setNewChannelName] = React.useState('');

    const createChannel = () => {
        axios.post(`${server}/channels`, { name: newChannelName }).then(() => {
            setNewChannelName('');
            fetchChannels();
        });
    };

    const fetchChannels = () => {
        axios.get(`${server}/channels`).then((response) => {
            setChannels(response.data);
        });
    };

    React.useEffect(() => {
        fetchChannels();
    }, []);

    return (
        <div>
            <h2>Channels</h2>
            <ul>
                {channels.map((channel) => (
                    <li key={channel.id}>
                        <Link to={`/channels/${channel.id}`}>{channel.name}</Link>
                    </li>
                ))}
            </ul>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createChannel();
                }}
            >
                <label>
                    New channel name:
                    <input
                        type="text"
                        value={newChannelName}
                        onChange={(e) => setNewChannelName(e.target.value)}
                    />
                </label>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default ChannelList;
