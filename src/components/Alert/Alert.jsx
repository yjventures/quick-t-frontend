import { ShieldExclamationIcon } from '@heroicons/react/20/solid'

export default function Alert() {
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
                        type="button"
                        className="rounded-md bg-blue-700 px-4 py-2 mt-4 md:mt-0 text-sm font-medium text-white hover:bg-blue-600 transition"
                    >
                        Verify status
                    </button>
                </div>
            </div>
        </div>
    )
}