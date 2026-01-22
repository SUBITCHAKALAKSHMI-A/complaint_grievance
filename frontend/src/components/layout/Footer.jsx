import React from 'react'
import { Link } from 'react-router-dom'
import { 
  FiMessageSquare, 
  FiGithub, 
  FiTwitter, 
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin
} from 'react-icons/fi'
import '../../styles/global.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = {
    Product: [
      { label: 'Features', path: '/features' },
      { label: 'Pricing', path: '/pricing' },
      { label: 'Documentation', path: '/docs' },
      { label: 'API Status', path: '/status' },
    ],
    Company: [
      { label: 'About', path: '/about' },
      { label: 'Blog', path: '/blog' },
      { label: 'Careers', path: '/careers' },
      { label: 'Contact', path: '/contact' },
    ],
    Legal: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Cookie Policy', path: '/cookies' },
      { label: 'GDPR', path: '/gdpr' },
    ],
    Support: [
      { label: 'Help Center', path: '/help' },
      { label: 'Community', path: '/community' },
      { label: 'Security', path: '/security' },
      { label: 'Report Abuse', path: '/abuse' },
    ],
  }
  
  const socialLinks = [
    { icon: <FiGithub />, label: 'GitHub', url: 'https://github.com' },
    { icon: <FiTwitter />, label: 'Twitter', url: 'https://twitter.com' },
    { icon: <FiLinkedin />, label: 'LinkedIn', url: 'https://linkedin.com' },
  ]
  
  const contactInfo = [
    { icon: <FiMail />, text: 'support@grievanceportal.com' },
    { icon: <FiPhone />, text: '+1 (555) 123-4567' },
    { icon: <FiMapPin />, text: '123 Main St, City, Country' },
  ]
  
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-purple-900 text-white mt-16">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 flex items-center justify-center">
                <FiMessageSquare className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-bold">Grievance Portal</h2>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              A transparent and efficient platform for handling complaints and grievances. 
              Empowering institutions with modern solutions for better user experiences.
            </p>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-lg mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  {info.icon}
                </div>
                <span className="text-gray-300">{info.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="bg-black/30 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Grievance Portal. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-400">
                Version 1.0.0
              </span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm text-gray-400">System Status: Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer