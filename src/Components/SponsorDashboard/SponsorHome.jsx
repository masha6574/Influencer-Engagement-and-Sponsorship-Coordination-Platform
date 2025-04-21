import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SponsorHome = () => {
    const [sponsorDetails, setSponsorDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSponsorDetails = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming the token is saved in localStorage after login/signup
                if (!token) {
                    setError('Authentication token not found. Please log in again.');
                    setLoading(false);
                    return;
                }

                // API call to fetch sponsor details (modify this endpoint as per your backend)
                const response = await axios.get('http://localhost:2020/api/sponsors/details', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setSponsorDetails(response.data); // Assuming the response returns sponsor details
                setLoading(false);
            } catch (err) {
                setError('Error fetching sponsor details. Please try again.');
                setLoading(false);
            }
        };

        fetchSponsorDetails();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Sponsor Dashboard</h2>

            {sponsorDetails ? (
                <div className="border p-4 rounded-lg shadow-sm bg-white">
                    <h3 className="text-xl font-semibold mb-4">Your Sponsor Details</h3>
                    <div className="mb-2">
                        <strong>Company Name:</strong> {sponsorDetails.companyName}
                    </div>
                    <div className="mb-2">
                        <strong>Industry:</strong> {sponsorDetails.industry}
                    </div>
                    <div className="mb-2">
                        <strong>Budget:</strong> ${sponsorDetails.budget}
                    </div>
                    <div className="mb-2">
                        <strong>Contact Email:</strong> {sponsorDetails.contactEmail}
                    </div>
                    <div className="mb-2">
                        <strong>Campaign Status:</strong> {sponsorDetails.campaignStatus ? 'Active' : 'Inactive'}
                    </div>
                    {/* Display other sponsor-specific details as necessary */}
                </div>
            ) : (
                <div>No sponsor details found.</div>
            )}
        </div>
    );
};

export default SponsorHome;
