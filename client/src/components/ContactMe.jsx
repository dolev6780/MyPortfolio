import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, MessageSquare, Loader, CheckCircle, AlertTriangle } from 'lucide-react';

const FormInput = ({ icon, type = "text", name, placeholder, value, onChange, error }) => {
  const Icon = icon;
  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Icon size={20} />
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-gray-100/50 dark:bg-gray-800/50 border-2 ${error ? 'border-red-500' : 'border-transparent'} focus:border-blue-500 rounded-lg py-3 pl-10 pr-4 text-gray-800 dark:text-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            className="text-xs text-red-500 mt-1 ml-2"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main ContactMe Component
export default function ContactMe() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid.";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    else if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters long.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormStatus('submitting');
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Form Submitted:", formData);
      setFormStatus('success');
    } catch (error) {
      console.error("Submission failed:", error);
      setFormStatus('error');
    }
  };
  
  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
    setFormStatus('idle');
  }

  return (
    <div className="flex items-center justify-center w-full h-full p-4 bg-gray-100 dark:bg-gray-900">
      <motion.div
        className="w-full max-w-lg p-8 space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl shadow-blue-500/10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <AnimatePresence mode="wait">
          {formStatus === 'success' ? (
            <motion.div
              key="success"
              className="text-center py-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Message Sent!</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Thanks for reaching out. I'll get back to you soon.</p>
              <button onClick={resetForm} className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                Send Another
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Contact Me</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Let's create something amazing together.</p>
              </div>

              <FormInput
                icon={User}
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />
              <FormInput
                icon={Mail}
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <div className="relative w-full">
                <div className="absolute left-3 top-4 text-gray-400">
                  <MessageSquare size={20} />
                </div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full bg-gray-100/50 dark:bg-gray-800/50 border-2 ${errors.message ? 'border-red-500' : 'border-transparent'} focus:border-blue-500 rounded-lg py-3 pl-10 pr-4 text-gray-800 dark:text-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none`}
                ></textarea>
                <AnimatePresence>
                  {errors.message && (
                    <motion.p className="text-xs text-red-500 mt-1 ml-2" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                      {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                type="submit"
                className="w-full flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={formStatus === 'submitting'}
                whileHover={{ y: -2 }}
                whileTap={{ y: 1 }}
              >
                <AnimatePresence mode="wait">
                  {formStatus === 'submitting' && (
                    <motion.div key="loader" initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:10}}>
                      <Loader className="animate-spin mr-2" />
                    </motion.div>
                  )}
                  {formStatus === 'error' && (
                     <motion.div key="error" initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:10}}>
                      <AlertTriangle className="mr-2" />
                    </motion.div>
                  )}
                  <motion.span key="text" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                    {formStatus === 'submitting' ? 'Sending...' : formStatus === 'error' ? 'Try Again' : 'Send Message'}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
