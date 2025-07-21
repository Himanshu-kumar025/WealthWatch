import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    question: "What is WealthWatch?",
    answer:
      "An expense tracker is a tool or app that helps you record, categorize, and monitor your spending to manage your finances effectively.",
  },
  {
    question: "How do I add an expense or income?",
    answer:
      "Go to the add transaction section, enter the details (amount, category, date), and save.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, all your data is stored securely and never shared with third parties.",
  },
  {
    question: "Can I set budgets for different categories?",
    answer:
      "Yes, you can set monthly budgets per category and track your progress.",
  },
  {
    question: "Does WealthWatch support multiple currencies?",
    answer: "Yes, WealthWatch supports various currencies for global use.",
  },
];


export default function Faq() {

  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


    return (
        <>

            {/* Heading */}
            <div className=" text-center mt-32 mb-2">
                <h1 className="faq-heading px-3 text-4xl font-semibold" style={{color: "rgb(2, 62, 138)"}}>Frequently Asked Questions</h1>
            </div>


 <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-4 mb-8">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className=" border border-gray-700 rounded-lg transition-all" style={{backgroundColor: "rgba(10, 67, 140, 0.9)"}}
        >
          <button
            className="w-full flex justify-between items-center px-6 py-4 text-left text-white  rounded-lg font-medium  transition-colors"
            onClick={() => toggleIndex(index)}
          >
            <span className="text-base sm:text-lg">{faq.question}</span>
            <svg
              className={`w-5 h-5 transition-transform ${
                openIndex === index ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="px-6 py-4 bg-[#4193ff]   text-white rounded-br-lg rounded-bl-lg text-sm sm:text-base">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  


        </>
    )
}