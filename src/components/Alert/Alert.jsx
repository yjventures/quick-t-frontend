import { ShieldExclamationIcon } from '@heroicons/react/20/solid'
import axios from 'axios';
import { useState } from 'react';
import { showFailedAlert, showSuccessAlert } from '../../utils/Tooast.Utils';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';

export default function Alert({ user_id, reference }) {
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
            })

            console.log(userDetails)

            const shuftiData = await axios.get(`https://shufty.quickt.com.au/api/verification-status?reference=${userDetails.data.reference}`)
            console.log(shuftiData)
            if (shuftiData?.data?.event === "verification.declined") {
                showFailedAlert("Your verification declined")
                setAllowResubmit(true)
                return;
            }
            // pending
            if (shuftiData?.data?.event === "review.pending") {
                showFailedAlert("Your verification is in pending")
                setAllowResubmit(true)
                return;
            }
            // invalid
            if (shuftiData?.data?.event === "request.invalid") {
                showFailedAlert("Your verification is in pending")
                setAllowResubmit(true)
                return;
            }
            // cancelled
            if (shuftiData?.data?.event === "verification.cancelled") {
                showFailedAlert("Your verification declined")
                setAllowResubmit(true)
                return;
            }
            // accepted
            if (shuftiData.data.event === "verification.accepted") {
                // save kyc_approved to strapi
                await axios.put(`https://api.quickt.com.au/api/users/${user_id}`,
                    {
                        kyc_approved: true
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                        },
                    }
                )
                showSuccessAlert("Your verification is approved")
            }
        } catch (error) {
            showFailedAlert(error.response.data.error)
        } finally {
            queryClient.invalidateQueries('kyc-approved')
            setLoading(false);
        }
    }


    const handleVerifyAccount = async () => {
        try {
            if (loading) return;
            setLoading(true);
            const email = localStorage.getItem("email");
            const res = await axios.post("https://shufty.quickt.com.au/api/verify", { email: email })
            const reference = res.data.reference;
            const verification_url = res.data.verification_url;
            console.log(verification_url)
            // referenec save to strapi
            await axios.put(`https://api.quickt.com.au/api/users/${user_id}`,
                {
                    reference: reference
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    },
                }
            )
            // console.log(updateReferece.data)

            // console.log(reference, verification_url)

            window.open(verification_url, "_blank")
        } catch (error) {
            showFailedAlert(error.response.data.error)
        } finally {
            setLoading(false);

        }
    }

    return (
        <div className="bg-blue-100 p-4 max-w-7xl md:mx-auto  rounded-lg ">
            <div className="flex ">
                <div className="flex-shrink-0">
                    <ShieldExclamationIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3 flex justify-between w-full flex-col md:flex-row ">
                    <div>
                        <h3 className="text-sm font-medium text-green-800">Account Verification Needed</h3>
                        <div className="mt-2 text-sm text-green-700">
                            <p>Without verifying your identification you can't complete a transaction!</p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            (reference !== '' || allowResubmit == true) ? handleSaveShuftiData() : handleVerifyAccount()
                        }}
                        className="rounded-md bg-blue-700 px-4 py-2 mt-4 md:mt-0 text-sm font-medium text-white hover:bg-blue-600 transition"
                    >
                        {
                            (reference !== '' || allowResubmit == false) ?
                                "Confirm Submission"
                                :
                                <>
                                    {
                                        loading ? "Checking Status.." : "Verify Account"
                                    }
                                </>
                        }
                        <ArrowRight className="h-4 w-4 inline-block ml-2" />
                    </button>
                </div>
            </div>
        </div>
    )
}