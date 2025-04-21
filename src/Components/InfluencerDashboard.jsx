import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './influencer.css';

const InfluencerDashboard = () => {
    const [profile, setProfile] = useState({});
    const [user, setUser] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [adRequests, setAdRequests] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [filters, setFilters] = useState({ category: '', minBudget: '' });
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(''); // Error state
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchProfile();
                //await fetchAdRequests();
                await fetchCampaigns();
                setLoading(false);
            } catch (err) {
                setError("Error fetching data. Please try again.");
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const fetchProfile = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication token not found. Please log in again.');
            setLoading(false);
            return;
        }

        try {
            const res = await axios.get('http://localhost:2020/api/influencer/profile', {
                headers: {
                    Authorization: `Bearer ${token}`, // Correctly include the JWT token
                },
            });
            setProfile(res.data.influencer); // The backend should return the influencer profile data
            setUser(res.data.user);
        } catch (err) {
            setError('Failed to fetch profile. Please try again.');
            console.error("Error fetching profile:", err);
            // Optionally handle different error statuses (e.g., 401 for unauthorized)
            if (err.response && err.response.status === 401) {
                setMessage('Your session has expired. Please log in again.');
                // Optionally redirect to the login page
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchAdRequests = async () => {
        try {
            const res = await axios.get('/ad-requests'); // Updated API endpoint
            const data = res.data;
            if (Array.isArray(data)) {
                setAdRequests(data);
            } else if (Array.isArray(data.adRequests)) {
                setAdRequests(data.adRequests);
            } else {
                console.error("Unexpected response for ad requests:", data);
                setAdRequests([]);
            }
        } catch (err) {
            setError('Failed to fetch ad requests. Please try again.');
            console.error("Error fetching ad requests:", err);
        }
    };

    const fetchCampaigns = async () => {
        try {
            setCampaigns("");
            // Prepare the params object conditionally
            const params = {};

            // Add filters if they are present
            if (filters.category) {
                params.category = filters.category;
            }
            if (filters.minBudget) {
                params.minBudget = filters.minBudget;
            }

            // Get the token (assuming you're storing it in localStorage or sessionStorage)
            const token = localStorage.getItem('token');  // Change this according to your implementation

            // If there's no token, handle the error or redirect to login page
            if (!token) {
                console.error('No token found, user is not authenticated');
                return;
            }

            // Adjust the URL to the route that fetches open campaigns
            const response = await axios.get('http://localhost:2020/api/influencer/open-campaigns', {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
                params,
            });
            setCampaigns(response.data);  // Update the state with the filtered campaigns
        } catch (err) {
            console.error('Error fetching campaigns:', err);
        }
    };

    const handleProfileSave = async () => {
        if (!user.name || !profile.category || !profile.niche || !profile.reach) {
            setError('All fields are required!');
            return;
        }

        setError('');
        setSuccessMessage('');
        try {
            const token = localStorage.getItem("token"); // Or sessionStorage.getItem("token") if that’s what you’re using

            await axios.put(
                'http://localhost:2020/api/influencer/profile',
                {
                    name: user.name,
                    category: profile.category,
                    niche: profile.niche,
                    reach: profile.reach,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSuccessMessage('Profile updated successfully!');
            setEditMode(false);
        } catch (err) {
            console.error("Error saving profile:", err);
            setError('Failed to save profile. Please try again.');
        }
    };

    const handleAdAction = async (id, action) => {
        try {
            await axios.post(`/ad-requests/${id}/${action}`); // Updated API endpoint
            fetchAdRequests();
        } catch (err) {
            setError('Error handling ad request. Please try again.');
            console.error("Error handling ad request:", err);
        }
    };

    const handleFilterChange = (e) => {
        setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleAcceptCampaign = async (campaignId) => {
        try {
            const token = localStorage.getItem('token'); // Or sessionStorage, depending on where you store it
    
            const response = await axios.post(
                `http://localhost:2020/api/influencer/campaigns/${campaignId}/accept`,
                {}, // No body needed
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
    
            if (response.data.message === 'Campaign accepted') {
                fetchCampaigns(); // Refresh campaigns
            }
        } catch (err) {
            setError('Error accepting campaign. Please try again.');
            console.error("Error accepting campaign:", err);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    const successStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        margin: 0,
        padding: '10px',
        textAlign: 'center',
        backgroundColor: '#28a745',
        color: 'white',
        transition: 'transform 0.3s ease-in-out, opacity 0.3s ease, visibility 0s',
        visibility: successMessage ? 'visible' : 'hidden',  // Show or hide based on the message
        opacity: successMessage ? 1 : 0, // Set opacity to 1 when message is present, otherwise 0
    };

    const errorStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        margin: 0,
        padding: '10px',
        textAlign: 'center',
        backgroundColor: '#dc3545',
        color: 'white',
        transition: 'transform 0.3s ease-in-out, opacity 0.3s ease, visibility 0s',
        visibility: error ? 'visible' : 'hidden',  // Show or hide based on the message
        opacity: error ? 1 : 0, // Set opacity to 1 when message is present, otherwise 0
    };

    return (
        <div className="p-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {successMessage && (
                <div style={successStyle}>
                    {successMessage}
                </div>
            )}
            {error && (
                <div style={errorStyle}>
                    {error}
                </div>
            )}

            {/* Profile Section */}
            <div className="border p-4 rounded-lg shadow-sm bg-white">
                <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
                {editMode ? (
                    <>
                        <input
                            type="text"
                            className="border p-2 w-full mb-2"
                            value={user.name || ''}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            className="border p-2 w-full mb-2"
                            value={profile.category || ''}
                            onChange={(e) => setProfile({ ...profile, category: e.target.value })}
                            placeholder="Category"
                        />
                        <input
                            type="text"
                            className="border p-2 w-full mb-2"
                            value={profile.niche || ''}
                            onChange={(e) => setProfile({ ...profile, niche: e.target.value })}
                            placeholder="Niche"
                        />
                        <input
                            type="number"
                            className="border p-2 w-full mb-4"
                            value={profile.reach || ''}
                            onChange={(e) => setProfile({ ...profile, reach: e.target.value })}
                            placeholder="Reach"
                        />
                        <button
                            onClick={handleProfileSave}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </>

                ) : (
                    <>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Category:</strong> {profile.category}</p>
                        <p><strong>Niche:</strong> {profile.niche}</p>
                        <p><strong>Reach:</strong> {profile.reach}</p>
                        <button onClick={() => setEditMode(true)} className="mt-3 bg-blue-500 text-white px-4 py-2 rounded">
                            Edit
                        </button>
                    </>
                )}
            </div>

            {/* Ad Requests */}
            <div className="border p-4 rounded-lg shadow-sm bg-white">
                <h2 className="text-xl font-semibold mb-4">Ad Requests</h2>
                {adRequests.length === 0 ? (
                    <p>No ad requests at the moment.</p>
                ) : (
                    adRequests.map((req) => (
                        <div key={req.id} className="border p-3 rounded mb-3">
                            <p><strong>Brand:</strong> {req.brand}</p>
                            <p><strong>Details:</strong> {req.details}</p>
                            <div className="flex gap-2 mt-2">
                                <button onClick={() => handleAdAction(req.id, 'accept')} className="bg-green-500 text-white px-3 py-1 rounded">Accept</button>
                                <button onClick={() => handleAdAction(req.id, 'reject')} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
                                <button onClick={() => handleAdAction(req.id, 'negotiate')} className="bg-yellow-500 text-white px-3 py-1 rounded">Negotiate</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Public Campaigns */}
            <div className="border p-4 rounded-lg shadow-sm bg-white md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">Explore Public Campaigns</h2>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        className="border p-2 w-full md:w-1/3"
                        value={filters.category}
                        onChange={handleFilterChange}
                    />
                    <input
                        type="number"
                        name="minBudget"
                        placeholder="Min Budget"
                        className="border p-2 w-full md:w-1/3"
                        value={filters.minBudget}
                        onChange={handleFilterChange}
                    />
                    <button onClick={fetchCampaigns} className="bg-blue-600 text-white px-4 py-2 rounded">
                        Search
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {campaigns.length === 0 ? (
                        <p>No campaigns found.</p>
                    ) : (
                        campaigns.map((c) => {
                            //console.log(campaigns);
                            return (
                                <div key={c.id} className="border p-3 rounded">
                                    <p><strong>Title:</strong> {c.title}</p>
                                    <p><strong>Category:</strong> {c.category}</p>
                                    <p><strong>Budget:</strong> ${c.budget}</p>
                                    <p><strong>Description:</strong> {c.description}</p>
                                    <p><strong>Sponsor:</strong> {c.Sponsor.companyName}</p>
                                    {c.isAcceptedByUser ? (
                            <p className="mt-2 text-green-600 font-semibold">
                                You have already accepted this campaign.
                            </p>
                        ) : (
                            <button 
                                onClick={() => handleAcceptCampaign(c.id)} 
                                className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
                            >
                                Accept Campaign
                            </button>
                        )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

        </div>
    );
};

export default InfluencerDashboard;