import React, { useState } from 'react';
import axios from 'axios';

const YouTubeLogin = () => {
    const [channelId, setChannelId] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.get('https://hod1-a52bc53a961e.herokuapp.com/verify-subscription', {
                params: { userId: channelId }
            });

            setResult(response.data.message);
        } catch (error) {
            setResult('Failed to verify subscription');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Check YouTube Subscription</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="channelId">YouTube Channel ID:</label>
                <input
                    type="text"
                    id="channelId"
                    value={channelId}
                    onChange={(e) => setChannelId(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Checking...' : 'Check Subscription'}
                </button>
            </form>
            {result && <p>{result}</p>}
        </div>
    );
};

export default YouTubeLogin;
