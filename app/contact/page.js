"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const contactInfo = [
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Our Location",
            details: "123 Premium Way, Luxury District, NY 10001",
            description: "Visit our flagship showroom"
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Phone Number",
            details: "+1 (555) 123-4567",
            description: "Mon-Fri from 9am to 6pm"
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email Address",
            details: "support@luxestore.com",
            description: "Online support 24/7"
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Working Hours",
            details: "9:00 AM - 9:00 PM",
            description: "Open every day of the week"
        }
    ];

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
                        Get in <span className="text-accent">Touch</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted leading-relaxed"
                    >
                        Have a question or feedback? We'd love to hear from you.
                        Fill out the form below and our team will get back to you within 24 hours.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact details */}
                    <div className="lg:col-span-1 space-y-6">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 + 0.2 }}
                                className="bg-secondary/10 p-6 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-accent/10 rounded-xl text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                                        {info.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">{info.title}</h3>
                                        <p className="font-medium mb-1">{info.details}</p>
                                        <p className="text-sm text-muted">{info.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Social Links placeholder or Map Mockup */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 }}
                            className="bg-secondary/10 rounded-2xl overflow-hidden h-64 border border-border/50 flex items-center justify-center relative group"
                        >
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity"></div>
                            <div className="relative z-10 text-center p-6">
                                <MapPin className="w-10 h-10 text-accent mx-auto mb-4" />
                                <button className="bg-background/80 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-semibold border border-border hover:bg-accent hover:text-accent-foreground transition-all">
                                    Open in Google Maps
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-secondary/10 p-8 md:p-10 rounded-3xl border border-border/50 h-full"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <MessageSquare className="w-6 h-6 text-accent" />
                                <h2 className="text-2xl font-bold">Send us a Message</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium ml-1">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter You Name"
                                            className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter Your Email"
                                            className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium ml-1">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        placeholder="How can we help you?"
                                        className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium ml-1">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        placeholder="Type your message here..."
                                        className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
                                    ></textarea>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full sm:w-auto px-10 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-accent transition-all flex items-center justify-center gap-2 disabled:opacity-70 group"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>

                            <AnimatePresence>
                                {isSubmitted && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 flex items-center gap-3"
                                    >
                                        <CheckCircle2 className="w-5 h-5" />
                                        <p className="font-medium">Thank you! Your message has been sent successfully.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
