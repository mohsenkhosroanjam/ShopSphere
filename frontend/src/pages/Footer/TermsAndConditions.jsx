import React, {useEffect} from "react";
import { useTheme } from "../../context/ThemeContext";

export const TermsAndConditions = () => {
    const {isDarkMode} = useTheme();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const termsData = {
        title: "Terms and Conditions",
        lastUpdated: "January 2025",
        sections: [
            {
                heading: "General Terms of Using ShopSphere",
                content:
                    "Welcome to ShopSphere! By accessing or using our website, you agree to comply with these terms and conditions. You must be at least 18 years old to use our platform. ShopSphere reserves the right to update these terms at any time, and it is your responsibility to review them periodically.",
            },
            {
                heading: "Purchases, Returns, and Refunds",
                content:
                    "All purchases made through ShopSphere are subject to availability. If an item is unavailable, we will notify you and offer alternatives or a full refund. Returns and refunds must comply with our Return Policy, which can be accessed in your account settings. Refunds are processed within 7-10 business days after approval.",
            },
            {
                heading: "User Responsibilities and Prohibited Actions",
                content:
                    "As a user of ShopSphere, you agree to provide accurate information and refrain from engaging in prohibited activities, such as using false identities, uploading malicious content, or violating any local, national, or international laws. Violation of these rules may result in suspension or termination of your account.",
            },
            {
                heading: "Privacy and Data Usage Policies",
                content:
                    "ShopSphere values your privacy and ensures the security of your personal data. By using our website, you consent to the collection and processing of your data as outlined in our Privacy Policy. For more details, please visit the Privacy Policy page.",
            },
            {
                heading: "Disclaimer of Liability",
                content:
                    "ShopSphere is not liable for any direct, indirect, or incidental damages arising from the use or inability to use our platform. We strive to maintain uninterrupted service but do not guarantee that our website will always be available, error-free, or secure.",
            },
        ],
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-black text-pink-200' : 'bg-white text-black'} p-6`}>
            <div key={isDarkMode} className={`max-w-5xl mx-auto border border-pink-500 shadow-lg rounded-lg overflow-hidden`}>
                {/* Header */}
                <header className={`py-6 px-8 transition-colors duration-300 ${isDarkMode ? "bg-pink-500 text-black" : "bg-pink-400 text-white"}`}>
                    <h1 className="text-4xl font-bold">{termsData.title}</h1>
                    <p className="text-sm mt-2">Last updated: {termsData.lastUpdated}</p>
                </header>

                {/* Main Content */}
                <main className="p-8 space-y-8">
                    {termsData.sections.map((section, index) => (
                        <section key={index}>
                        <h2 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${isDarkMode ? "text-pink-400" : "text-pink-600"}`}>
                            {section.heading}
                        </h2>
                        <p className="leading-relaxed">{section.content}</p>
                    </section>
                    ))}
                </main>

                {/* Footer */}
                <footer className={`py-4 px-8 text-sm font-bold transition-colors duration-300 ${isDarkMode ? "bg-pink-800 text-white" : "bg-pink-300 text-black"}`}>
                    <p>
                        By using ShopSphere, you agree to these terms and conditions. For
                        questions or concerns, please contact us at{" "}
                        <a
                            href="mailto:support@shopsphere.com"
                            className={`hover:underline transition-colors duration-300 ${isDarkMode ? "text-pink-300" : "text-pink-700"}`}
                        >
                            support@shopsphere.com
                        </a>
                        .
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default TermsAndConditions;