import Headers from "../../components/Headers";
import Footer from "../Footer/Footer";

export default function About() {
    return (
        <>
            <Headers />

            <div className="bg-white"
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                }}>
                <div className="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:px-8 lg:py-10">
                    <div className="">
                        <h2 className="text-3xl font-bold leading-10 tracking-tight text-gray-900">Curious to know who we are?</h2>
                        <h2 className="text-2xl mt-6 leading-7 text-gray-600">
                            Quick T (A.C.N 649 535 688 PTY LTD) is committed to providing fast, secure, and reliable money transfer services to customers across the globe.
                        </h2>
                    </div>

                    <div className="mt-10">
                        <p className="text-base leading-7 text-gray-600">
                            The Quick T name, logo, and related trademarks and service marks, owned by Quick T, are registered and/or used in Australia and many foreign countries. All other trademarks, service marks, and trade names referenced in this site or mobile application are the property of their respective owners.
                        </p>
                        <p className="mt-6 text-base leading-7 text-gray-600">
                            ANY USE, COPYING, OR REPRODUCTION OF THE QUICK T TRADEMARKS OR LOGOS CONTAINED IN THIS SITE, WITHOUT PRIOR WRITTEN PERMISSION OF QUICK T, IS STRICTLY PROHIBITED.
                        </p>
                    </div>

                    <div className="mx-auto mt-10 sm:px-6 md:px-0">
                        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
                            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Our Customers Love Us
                            </h2>
                            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                                At Quick T, our customers are at the heart of everything we do. We're proud to serve a diverse community of users who trust us to deliver fast, secure, and reliable money transfer services.
                            </p>

                            <div className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl opacity-50" aria-hidden="true">
                                <div
                                    className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50"
                                    style={{
                                        clipPath:
                                            'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                                    }}
                                />
                            </div>

                            <div className="mt-12 flex justify-center space-x-8 flex-col md:flex-row">
                                <blockquote className="text-gray-300">
                                    “Quick T has made sending money to my family so much easier and faster. I can always rely on them for a smooth transaction.”
                                    <cite className="block mt-4 text-sm text-white">– Sarah, Australia</cite>
                                </blockquote>
                                <blockquote className="text-gray-300">
                                    “The customer service is exceptional, and the platform is incredibly user-friendly. I wouldn’t choose any other service.”
                                    <cite className="block mt-4 text-sm text-white">– Ahmed, Lebanon</cite>
                                </blockquote>
                            </div>
                        </div>
                    </div>


                    <div className="mt-10 border-t border-gray-200 pt-6">
                        <p className="text-sm leading-6 text-gray-500">
                            © 2021 Quick T (A.C.N 649 535 688 PTY LTD). All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    );
}
