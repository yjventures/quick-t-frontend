import { ShieldExclamationIcon } from '@heroicons/react/20/solid'
import axios from 'axios';

export default function Alert() {

    const handleVerifyAccount = async () => {
        try {
            const email = localStorage.getItem("email");
            const res = await axios.post("https://shufty.quickt.com.au/api/verify", { email: email })
            console.log(res.data)
            console.log("Verify Account")
            window.open(res.data.response.verificaion_url, "_blank")
            // window.open(res.data.url, "_blank")
        } catch (error) {
            console.log(error.response.data.error)
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
                        onClick={() => handleVerifyAccount()}
                        className="rounded-md bg-blue-700 px-4 py-2 mt-4 md:mt-0 text-sm font-medium text-white hover:bg-blue-600 transition"
                    >
                        Verify Account
                    </button>
                </div>
            </div>
        </div>
    )
}