import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './influencer.css';
import { useNavigate } from 'react-router-dom';

const InfluencerDashboard = () => {
    const [profile, setProfile] = useState({});
    const [user, setUser] = useState({});
    const [adRequests, setAdRequests] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [filters, setFilters] = useState({ category: '', minBudget: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchProfile();
                await fetchAdRequests();
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
            const res = await axios.get('http://localhost:2020/api/influencer/ad-requests', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            const data = res.data;
            if (Array.isArray(data)) setAdRequests(data);
            else if (Array.isArray(data.adRequests)) setAdRequests(data.adRequests);
        } catch (err) {
            //console.error("Error fetching ad requests:", err);
        }
    };

    const fetchCampaigns = async () => {
        try {
            const params = {};
            if (filters.category) params.category = filters.category;
            if (filters.minBudget) params.minBudget = filters.minBudget;

            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await axios.get('http://localhost:2020/api/influencer/open-campaigns', {
                headers: { Authorization: `Bearer ${token}` },
                params,
            });
            setCampaigns(response.data);
        } catch (err) {
            console.error('Error fetching campaigns:', err);
        }
    };

    const handleAdAction = async (id, action) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:2020/api/influencer/ad-requests/${id}/${action}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchAdRequests();
        } catch (err) {
            console.error("Error handling ad request:", err);
        }
    };

    const handleAcceptCampaign = async (campaignId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:2020/api/influencer/campaigns/${campaignId}/accept`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchCampaigns();
        } catch (err) {
            console.error("Error accepting campaign:", err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) return <div className="text-center py-20 text-lg font-semibold">Loading...</div>;

    const fullPath = profile.profileImageUrl;
    const pathParts = fullPath.split('\\');
    const fileName = pathParts[pathParts.length - 1];
    return (
        <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-blue-100 text-gray-800">
            {/* Navbar */}
            <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    {/* Profile Image */}
                    <img
                        src={`http://localhost:2020/uploads/influencer_photos/${fileName}`}
                        alt="Profile"
                        className="w-12 h-12 object-cover rounded-full border border-gray-300 shadow"
                    />
                    <span className="font-bold text-lg text-indigo-700">{user.name}</span>
                </div>
                <div className="flex gap-6 items-center">
                    <button
                        onClick={() => navigate('/profile')}
                        className="text-sm text-indigo-600 hover:underline font-medium"
                    >
                        Profile
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Content */}
            <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ad Requests */}
                <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
                    <h2 className="text-xl font-bold mb-4 text-indigo-800">📩 Ad Requests</h2>
                    {adRequests.length === 0 ? (
                        <p className="text-gray-500 italic">No ad requests at the moment.</p>
                    ) : (
                        <div className="space-y-4 max-h-[400px] overflow-auto pr-2">
                            {adRequests.map((req) => (
                                <div key={req._id} className="bg-gray-50 p-4 rounded-md border flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">Brand: {req.brandName}</p>
                                        <p className="text-sm text-gray-600">Budget: ₹{req.budget}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleAdAction(req._id, 'accept')} className="btn-success">Accept</button>
                                        <button onClick={() => handleAdAction(req._id, 'reject')} className="btn-danger">Reject</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Open Campaigns */}
                <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
                    <h2 className="text-xl font-bold mb-4 text-indigo-800">📢 Open Campaigns</h2>
                    {campaigns.length === 0 ? (
                        <p className="text-gray-500 italic">No campaigns currently available.</p>
                    ) : (
                        <div className="space-y-4 max-h-[400px] overflow-auto pr-2">
                            {campaigns.map((camp) => (
                                <div key={camp._id} className="bg-gray-50 p-4 rounded-md border flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">Campaign: {camp.title}</p>
                                        <p className="text-sm text-gray-600">Category: {camp.category}</p>
                                        <p className="text-sm text-gray-600">Budget: ₹{camp.budget}</p>
                                    </div>
                                    <button
                                        onClick={() => handleAcceptCampaign(camp._id)}
                                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                                    >
                                        Accept
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InfluencerDashboard;
