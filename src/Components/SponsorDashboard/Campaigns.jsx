import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaignId, setSelectedCampaignId] = useState(null);
    const [campaignAds, setCampaignAds] = useState({});
    const [newCampaign, setNewCampaign] = useState({
        title: '',
        description: '',
        category: '',
        budget: '',
        isPublic: false,
    });
    const [newAdRequest, setNewAdRequest] = useState({
        message: '',
        proposedTerms: '',
    });
    const [error, setError] = useState('');
    const [selectedAdRequestId, setSelectedAdRequestId] = useState(null);
    const [isEditingCampaign, setIsEditingCampaign] = useState(false);
    const [isEditingAdRequest, setIsEditingAdRequest] = useState(false);

    // Fetch all campaigns from the backend
    const fetchCampaigns = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:2020/api/campaign/my-campaigns', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCampaigns(res.data || []);
            setError('');
        } catch (err) {
            setCampaigns([]);
            setError('No campaigns found.');
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    // Fetch ads for a specific campaign
    const fetchAdsForCampaign = async (campaignId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:2020/api/campaign/campaign/${campaignId}/ad-requests`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCampaignAds((prevState) => ({
                ...prevState,
                [campaignId]: res.data || [], // Store ads for this campaign
            }));
        } catch (err) {
            setError('Failed to fetch ads for this campaign');
        }
    };

    // Handle clicking on a campaign (toggle ads display)
    const handleCampaignClick = (campaignId) => {
        if (selectedCampaignId === campaignId) {
            setSelectedCampaignId(null); // Close the campaign if already selected
        } else {
            setSelectedCampaignId(campaignId);
            fetchAdsForCampaign(campaignId); // Fetch ads when campaign is clicked
        }
    };

    // Handle submission for creating or editing campaigns
    const handleCampaignSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = isEditingCampaign
                ? await axios.put(`http://localhost:2020/api/campaign/${newCampaign.id}`, newCampaign, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                : await axios.post('http://localhost:2020/api/campaign', newCampaign, {
                    headers: { Authorization: `Bearer ${token}` },
                });

            if (res.status === 200 || res.status === 201) {
                setNewCampaign({
                    title: '',
                    description: '',
                    category: '',
                    budget: '',
                    isPublic: false,
                });
                setIsEditingCampaign(false); // Reset editing state
                fetchCampaigns(); // Refresh campaign list
            }
        } catch (err) {
            setError('Failed to create/update campaign');
        }
    };

    // Handle submission for creating or editing ad requests
    const handleAdRequestSubmit = async (e, campaignId) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = isEditingAdRequest
                ? await axios.put(`http://localhost:2020/api/campaign/ad-request/${selectedAdRequestId}`, newAdRequest, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                : await axios.post(`http://localhost:2020/api/campaign/campaign/${campaignId}/ad-request`, newAdRequest, {
                    headers: { Authorization: `Bearer ${token}` },
                });

            if (res.status === 200 || res.status === 201) {
                setNewAdRequest({
                    message: '',
                    proposedTerms: '',
                });
                setIsEditingAdRequest(false); // Reset editing state for ad request
                fetchAdsForCampaign(campaignId); // Refresh ads for the campaign
            }
        } catch (err) {
            setError('Failed to create/update ad request');
        }
    };

    // Handle deleting campaigns
    const handleDeleteCampaign = async (campaignId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:2020/api/campaign/${campaignId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchCampaigns(); // Refresh campaign list
        } catch (err) {
            setError('Failed to delete campaign');
        }
    };

    // Handle deleting ad requests
    const handleDeleteAdRequest = async (adRequestId, campaignId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:2020/api/campaign/ad-request/${adRequestId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchAdsForCampaign(campaignId); // Refresh ads for the campaign
        } catch (err) {
            setError('Failed to delete ad request');
        }
    };

    // Set the selected campaign for editing
    const handleEditCampaign = (campaign) => {
        setNewCampaign(campaign);
        setIsEditingCampaign(true);
    };

    // Set the selected ad request for editing
    const handleEditAdRequest = (adRequest) => {
        setNewAdRequest(adRequest);
        setSelectedAdRequestId(adRequest.id);
        setIsEditingAdRequest(true);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Campaigns</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Campaign Form */}
            <div className="mb-4">
                <h3 className="text-xl mb-2">{isEditingCampaign ? 'Edit Campaign' : 'Create Campaign'}</h3>
                <form onSubmit={handleCampaignSubmit}>
                    <input
                        type="text"
                        className="mb-2 p-2 border rounded"
                        placeholder="Title"
                        value={newCampaign.title}
                        onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                    />
                    <textarea
                        className="mb-2 p-2 border rounded"
                        placeholder="Description"
                        value={newCampaign.description}
                        onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                    />
                    <input
                        type="text"
                        className="mb-2 p-2 border rounded"
                        placeholder="Category"
                        value={newCampaign.category}
                        onChange={(e) => setNewCampaign({ ...newCampaign, category: e.target.value })}
                    />
                    <input
                        type="number"
                        className="mb-2 p-2 border rounded"
                        placeholder="Budget"
                        value={newCampaign.budget}
                        onChange={(e) => setNewCampaign({ ...newCampaign, budget: e.target.value })}
                    />
                    <label>
                        Public:
                        <input
                            type="checkbox"
                            checked={newCampaign.isPublic}
                            onChange={(e) => setNewCampaign({ ...newCampaign, isPublic: e.target.checked })}
                        />
                    </label>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">
                        {isEditingCampaign ? 'Update Campaign' : 'Create Campaign'}
                    </button>
                </form>
            </div>

            {/* Display all campaigns */}
            <div className="grid gap-4">
                {campaigns.length === 0 ? (
                    <p className="text-gray-600">No campaigns found.</p>
                ) : (
                    campaigns.map((campaign) => (
                        <div
                            key={campaign.id}
                            className="border p-4 rounded bg-white shadow cursor-pointer"
                            onClick={() => handleCampaignClick(campaign.id)}
                        >
                            <h3 className="text-lg font-semibold">{campaign.title}</h3>
                            <p>{campaign.description}</p>
                            <p><strong>Category:</strong> {campaign.category}</p>
                            <p><strong>Budget:</strong> ${campaign.budget}</p>
                            <p><strong>Public:</strong> {campaign.isPublic ? 'Yes' : 'No'}</p>

                            {/* Edit and delete campaign buttons */}
                            <button
                                className="bg-yellow-500 text-white p-2 rounded mt-2"
                                onClick={() => handleEditCampaign(campaign)}
                            >
                                Edit Campaign
                            </button>
                            <button
                                className="bg-red-500 text-white p-2 rounded mt-2"
                                onClick={() => handleDeleteCampaign(campaign.id)}
                            >
                                Delete Campaign
                            </button>

                            {/* Display ad requests for the selected campaign */}
                            {selectedCampaignId === campaign.id && campaignAds[campaign.id] && (
                                <div className="mt-4" onClick={(e) => e.stopPropagation()}>
                                    <h4 className="font-semibold">Ad Requests:</h4>

                                    {/* Ad Request Form */}
                                    <form
                                        onSubmit={(e) => handleAdRequestSubmit(e, campaign.id)}
                                        className="flex flex-col space-y-2"
                                    >
                                        <input
                                            type="text"
                                            className="p-2 border rounded"
                                            placeholder="Message"
                                            value={newAdRequest.message}
                                            onChange={(e) => setNewAdRequest({ ...newAdRequest, message: e.target.value })}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <input
                                            type="text"
                                            className="p-2 border rounded"
                                            placeholder="Proposed Terms"
                                            value={newAdRequest.proposedTerms}
                                            onChange={(e) => setNewAdRequest({ ...newAdRequest, proposedTerms: e.target.value })}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white p-2 rounded"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {isEditingAdRequest ? 'Update Ad Request' : 'Create Ad Request'}
                                        </button>
                                    </form>


                                    {campaignAds[campaign.id].map((adRequest) => (
                                        <div
                                            key={adRequest.id}
                                            className="border p-2 rounded mt-2"
                                        >
                                            <p>{adRequest.message}</p>
                                            <p><strong>Proposed Terms:</strong> {adRequest.proposedTerms}</p>

                                            {/* Edit and delete ad request buttons */}
                                            <button
                                                className="bg-yellow-500 text-white p-2 rounded mt-2"
                                                onClick={() => handleEditAdRequest(adRequest)}
                                            >
                                                Edit Ad Request
                                            </button>
                                            <button
                                                className="bg-red-500 text-white p-2 rounded mt-2"
                                                onClick={() => handleDeleteAdRequest(adRequest.id, campaign.id)}
                                            >
                                                Delete Ad Request
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Campaigns;
