import { ShieldExclamationIcon } from '@heroicons/react/20/solid'
import axios from 'axios';
import { useState } from 'react';
import { showFailedAlert, showSuccessAlert } from '../../utils/Tooast.Utils';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowRight, CheckCheckIcon, X } from 'lucide-react';

export default function Alert({ user_id, reference, verificationStatus }) {
    const [allowResubmit, setAllowResubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();

    const handleSaveShuftiData = async () => {
        try {
            if (loading) return;
            setLoading(true);

            const userDetails = await axios.get(`https://api.quickt.com.au/api/users/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });

            const shuftiData = await axios.get(`https://shufty.quickt.com.au/api/verification-status?reference=${userDetails.data.reference}`);

            console.log(shuftiData?.data?.event, 'shuftiData');

            if (shuftiData?.data?.event === "verification.declined") {
                showFailedAlert("Your verification declined");
                setAllowResubmit(true);
                return;
            }
            if (shuftiData?.data?.event === "request.pending") {
                showFailedAlert("Your verification is in pending");
                setAllowResubmit(true);
                return;
            }
            if (shuftiData?.data?.event === "request.invalid") {
                showFailedAlert("Your verification is not completed, try again");
                setAllowResubmit(true);
                return;
            }
            if (shuftiData?.data?.event === "verification.cancelled") {
                showFailedAlert("Your verification declined");
                setAllowResubmit(true);
                return;
            }
            if (shuftiData?.data?.event === "verification.accepted") {
                await axios.put(`https://api.quickt.com.au/api/users/${user_id}`,
                    { kyc_approved: true },
                    { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }
                );
                showSuccessAlert("Your verification is approved");
            }
        } catch (error) {
            showFailedAlert(error.response.data.error);
        } finally {
            queryClient.invalidateQueries('kyc-approved');
            setLoading(false);
        }
    };

    const handleVerifyAccount = async (e) => {
        e.preventDefault();
        try {
            if (loading) return;
            setLoading(true);
            const email = localStorage.getItem("email");
            const res = await axios.post("https://shufty.quickt.com.au/api/verify", { email: email });
            const reference = res.data.reference;
            const verification_url = res.data.verification_url;

            await axios.put(`https://api.quickt.com.au/api/users/${user_id}`,
                { reference: reference },
                { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }
            );

            window.open(verification_url, "_blank");
        } catch (error) {
            showFailedAlert(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-blue-100 p-4 max-w-7xl md:mx-auto rounded-lg ">
            <div className="flex ">
                <div className="flex-shrink-0">
                    <ShieldExclamationIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3 flex justify-between w-full flex-col md:flex-row ">
                    <div>
                        <h3 className="text-sm font-medium text-green-800">
                            {reference !== null && !verificationStatus && !allowResubmit ? "Verification Incomplete" : "Account Verification Needed"}
                        </h3>
                        <div className="mt-2 text-sm text-green-700">
                            <p>
                                {reference !== null && !verificationStatus && !allowResubmit
                                    ? "Have you completed the verification process? Please confirm below."
                                    : "Without verifying your identification, you can't complete a transaction!"}
                            </p>
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                        {
                            (reference !== null && !verificationStatus && !allowResubmit) ? (
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setAllowResubmit(true)}
                                        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
                                    >
                                        <X className="h-4 w-4 inline-block mr-2" />
                                        No
                                    </button>

                                    <button
                                        onClick={handleSaveShuftiData}
                                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
                                    >
                                        <CheckCheckIcon className="h-4 w-4 inline-block mr-2" />
                                        Yes
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handleVerifyAccount}
                                    className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition cursor-pointer"
                                >
                                    {loading ? "Checking Status..." : verificationStatus ? 'Confirm Submission' : "Verify Account"}
                                    <ArrowRight className="h-4 w-4 inline-block ml-2" />
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
