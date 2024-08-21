import Headers from "../../components/Headers";
import Footer from "../Footer/Footer";

const faqs = [
    {
        question: 'Can we send money to Lebanon from any part of the World?',
        answer: 'Now you can send money from Australia to your Family & Friends in Lebanon. In the near future, you will be able to send money from Countries other than Australia to Lebanon.',
    },
    {
        question: 'How much can I send?',
        answer: 'You can choose to send from 3 preset amounts displayed on the website or enter a custom amount in the designated field on the home page.',
    },
    {
        question: 'Do you deliver amounts anywhere in Lebanon?',
        answer: 'Yes, the receiver can collect money transferred to them from over 600 Whish locations in Lebanon.',
    },
    {
        question: 'Do you pay receiver amounts in Cash?',
        answer: 'Yes.',
    },
    {
        question: 'How long does it take for money to be paid to the receiver in Lebanon?',
        answer: 'Instantly.',
    },
    {
        question: 'How do we send money?',
        answer: 'Online through our website www.quickt.com.au or through Quick T mobile apps.',
    },
    {
        question: 'Can I send money using my mobile?',
        answer: 'Yes.',
    },
    {
        question: 'What does the receiver need to get the money?',
        answer: 'The receiver needs the transfer id and a photo ID.',
    },
    {
        question: 'هل أستطيع إرسال الأموال إلى لبنان من أي مكان في العالم؟',
        answer: 'نعم',
    },
    {
        question: 'ما هو المبلغ الممكن إرساله؟',
        answer: 'يمكنك إرسال أحد المبالغ التالية الموجودة على صفحة الموقع أو إدخال أي مبلغ تريده أقل من 5000 دولار أسترالي.',
    },
    {
        question: 'هل لديكم نقاط دفع في كافة المناطق اللبنانية؟',
        answer: 'نعم',
    },
    {
        question: 'من هي الشركة التي تدفعون من خلالها في لبنان؟',
        answer: 'وكلاؤنا هم شركة Whish Money.',
    },
    {
        question: 'هل تدفعون قيمة الحوالات نقدا؟',
        answer: 'نعم',
    },
    {
        question: 'كم من الوقت تحتاج الحوالة لتصل إلى المحول له؟',
        answer: 'فورا',
    },
    {
        question: 'كيف يمكنني إرسال الأموال؟',
        answer: 'من خلال تطبيقات الهاتف المحمول أو من خلال موقعنا www.quickt.com.au',
    },
    {
        question: 'إلى ماذا يحتاج المرسل إليه للحصول على المبلغ المحول له؟',
        answer: 'يحتاج إلى رقم الحوالة وألى بطاقة هوية.',
    },
];

export default function HelpCenter() {
    return (
        <>
            <Headers />
            <div className="bg-white"
                style={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                }}>
                <div className="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:px-8 lg:py-10">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        <div className="lg:col-span-5">
                            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
                            <p className="mt-4 text-base leading-7 text-gray-600">
                                Can’t find the answer you’re looking for? Reach out to our {' '}
                                <a href="mailto:support@quickt.com.au" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    customer support
                                </a>{' '}
                                team.
                            </p>
                            <div className="flex flex-col gap-2 mt-4">
                                <p>
                                    If you have any additional enquiries please contact us on
                                </p>
                                <p>
                                    Email: <a href="mailto:support@quickt.com.au" className="font-semibold text-indigo-600 hover:text-indigo-500">support@quickt.com.au</a>
                                </p>
                                <p>
                                    Whatsapp: <a href="tel: +61490918727" className="font-semibold text-indigo-600 hover:text-indigo-500"> +61490918727</a>
                                </p>
                            </div>
                        </div>
                        <div className="mt-10 lg:col-span-7 lg:mt-0">
                            <dl className="space-y-10">
                                {faqs.map((faq) => (
                                    <div key={faq.question}>
                                        <dt className="text-base font-semibold leading-7 text-gray-900">{faq.question}</dt>
                                        <dd className="mt-2 text-base leading-7 text-gray-600 whitespace-pre-line">{faq.answer}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
}
