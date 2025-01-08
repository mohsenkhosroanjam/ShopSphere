import { useState } from 'react';
import { toast } from 'react-toastify';

const NewsletterSection = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address');
            setIsSubmitting(false);
            return;
        }

        try {
            // TODO: Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1000)); // just for testing
            toast.success('Thank you for subscribing!');
            setEmail('');
        } catch (error) {
            toast.error('Subscription failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="w-full py-16 px-4 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="animate-fade-in-slide-down">
                    <h2 className="text-4xl font-bold mb-4 text-white hover:text-pink-500 relative inline-block transition-colors duration-300 after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out">
                        Stay Updated !!
                    </h2>
                    <p className="text-gray-300 mb-8 text-lg hover:text-white transition-colors duration-300">
                        Subscribe to our newsletter for exclusive deals and updates!
                    </p>
                </div>

                <form onSubmit={handleSubscribe} className="relative group">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="px-6 py-3 rounded-lg w-full sm:w-96 text-white border-2 border-transparent focus:border-pink-500 outline-none transition-all duration-300 hover:shadow-lg"
                            required
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg transition-all duration-300 transform disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto"
                        >
                            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 animate-pulse" />
        </section>
    );
};

export default NewsletterSection;