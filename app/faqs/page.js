"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        category: "Orders & Shipping",
        questions: [
            {
                question: "How long does shipping take?",
                answer: "Standard shipping typically takes 5-7 business days. Express shipping is available and takes 2-3 business days. International orders may take 10-14 business days depending on your location."
            },
            {
                question: "Do you offer free shipping?",
                answer: "Yes! We offer free standard shipping on all orders over $100. For orders under $100, standard shipping is $8.99."
            },
            {
                question: "Can I track my order?",
                answer: "Absolutely! Once your order ships, you'll receive a tracking number via email. You can also track your order status by visiting the 'Track Order' page or logging into your account."
            },
            {
                question: "Do you ship internationally?",
                answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Please note that customs fees and import duties may apply."
            }
        ]
    },
    {
        category: "Returns & Exchanges",
        questions: [
            {
                question: "What is your return policy?",
                answer: "We offer a 30-day return policy on all items. Products must be unused, in original packaging, and with all tags attached. Simply contact our customer service team to initiate a return."
            },
            {
                question: "How do I exchange an item?",
                answer: "To exchange an item, please contact our customer service team with your order number and the item you'd like to exchange. We'll provide you with a prepaid shipping label and process your exchange once we receive the original item."
            },
            {
                question: "Who pays for return shipping?",
                answer: "For defective or incorrect items, we cover return shipping costs. For standard returns or exchanges, customers are responsible for return shipping fees unless you have a LuxeStore Premium membership."
            }
        ]
    },
    {
        category: "Payment & Security",
        questions: [
            {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. All payments are processed securely through encrypted connections."
            },
            {
                question: "Is my payment information secure?",
                answer: "Yes! We use industry-standard SSL encryption to protect your payment information. We never store your complete credit card details on our servers. All transactions are processed through secure, PCI-compliant payment gateways."
            },
            {
                question: "Can I use multiple payment methods?",
                answer: "Currently, we only support one payment method per order. However, you can use gift cards in combination with any other payment method."
            }
        ]
    },
    {
        category: "Products & Quality",
        questions: [
            {
                question: "Are your products authentic?",
                answer: "Yes, 100%! We source all our products directly from authorized distributors and brand partners. Every item comes with a certificate of authenticity and is backed by our quality guarantee."
            },
            {
                question: "Do you offer product warranties?",
                answer: "Many of our products come with manufacturer warranties. Warranty details are listed on individual product pages. Additionally, all purchases are covered by our 30-day satisfaction guarantee."
            },
            {
                question: "How do I care for my products?",
                answer: "Care instructions are included with each product. You can also find detailed care guides on individual product pages. For specific questions, our customer service team is always happy to help."
            }
        ]
    },
    {
        category: "Account & Membership",
        questions: [
            {
                question: "Do I need an account to make a purchase?",
                answer: "No, you can checkout as a guest. However, creating an account allows you to track orders, save items to your wishlist, and enjoy faster checkout on future purchases."
            },
            {
                question: "What is LuxeStore Premium?",
                answer: "LuxeStore Premium is our membership program offering exclusive benefits including free shipping on all orders, early access to sales, birthday rewards, and dedicated customer support. It's $49/year or $5.99/month."
            },
            {
                question: "How do I reset my password?",
                answer: "Click on 'Login' in the top navigation, then select 'Forgot Password'. Enter your email address and we'll send you a link to reset your password."
            }
        ]
    }
];

function FAQItem({ question, answer, isOpen, onClick }) {
    return (
        <div className="border-b border-border">
            <button
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between text-left hover:text-accent transition-colors group"
            >
                <span className="text-lg font-medium pr-8">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                >
                    <ChevronDown className="w-5 h-5 text-muted group-hover:text-accent transition-colors" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 text-muted leading-relaxed">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQsPage() {
    const [openItems, setOpenItems] = useState({});

    const toggleItem = (category, index) => {
        const key = `${category}-${index}`;
        setOpenItems(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-background">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
                    >
                        Frequently Asked <span className="text-accent">Questions</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted leading-relaxed"
                    >
                        Find answers to common questions about our products, shipping, returns, and more.
                        Can't find what you're looking for? Contact our support team.
                    </motion.p>
                </div>

                {/* FAQ Categories */}
                <div className="max-w-4xl mx-auto space-y-12">
                    {faqs.map((category, categoryIndex) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: categoryIndex * 0.1 + 0.2 }}
                        >
                            <h2 className="text-2xl font-bold mb-6 flex items-center">
                                <span className="w-1 h-8 bg-accent mr-4 rounded-full"></span>
                                {category.category}
                            </h2>
                            <div className="bg-secondary/10 rounded-2xl p-6 md:p-8">
                                {category.questions.map((faq, index) => (
                                    <FAQItem
                                        key={index}
                                        question={faq.question}
                                        answer={faq.answer}
                                        isOpen={openItems[`${category.category}-${index}`]}
                                        onClick={() => toggleItem(category.category, index)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="max-w-3xl mx-auto mt-16 text-center bg-accent/10 border border-accent/20 rounded-2xl p-8"
                >
                    <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                    <p className="text-muted mb-6">
                        Our customer support team is here to help you 24/7.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="mailto:support@luxestore.com"
                            className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                        >
                            Email Support
                        </a>
                        <a
                            href="/track-order"
                            className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                        >
                            Track Your Order
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
