# Oparides Website

A clean, professional, and SEO-optimized website for Oparides - Kenya's leading peer-to-peer car rental platform.

## Overview

This is a static website designed to help with SEO and provide information about Oparides. It's not a booking site, but rather an informational website that includes:

- **Home Page**: Overview of Oparides and key features
- **About Page**: Detailed information about the company, mission, and values
- **Services Page**: Comprehensive list of services offered
- **Contact Page**: Contact information and contact form
- **Terms of Service**: Legal terms and conditions
- **Privacy Policy**: Privacy policy and data handling information

## Features

- ✅ **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, semantic HTML
- ✅ **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- ✅ **Clean & Professional**: Modern, minimalist design
- ✅ **Fast Loading**: Lightweight static files, no heavy dependencies
- ✅ **Accessible**: Proper HTML semantics and ARIA labels
- ✅ **Mobile Navigation**: Hamburger menu for mobile devices

## File Structure

```
oparides-website/
├── index.html          # Homepage
├── about.html          # About page
├── services.html       # Services page
├── contact.html        # Contact page
├── terms.html          # Terms of Service
├── privacy.html        # Privacy Policy
├── styles.css          # All styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Setup

1. **No build process required** - This is a static website that can be opened directly in a browser.

2. **To view locally:**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```

3. **To deploy:**
   - Upload all files to your web hosting service
   - Ensure all files are in the root directory or adjust paths accordingly
   - Update the canonical URLs in each HTML file to match your domain

## Customization

### Updating Content
- Edit the HTML files directly to update content
- All content is in plain HTML, easy to modify

### Changing Colors
- Edit the CSS variables in `styles.css` (lines 7-18)
- Main color variables:
  - `--primary-color`: Main brand color
  - `--primary-dark`: Darker shade for hover states
  - `--text-primary`: Main text color
  - `--text-secondary`: Secondary text color

### SEO Settings
- Update meta tags in each HTML file's `<head>` section
- Update canonical URLs to match your domain
- Add your actual domain to Open Graph and Twitter Card meta tags

### Contact Form
- The contact form currently shows a success message (client-side only)
- To make it functional, you'll need to:
  1. Set up a backend endpoint to handle form submissions
  2. Update the JavaScript in `script.js` (around line 50) to send data to your server
  3. Or use a service like Formspree, Netlify Forms, or similar

## SEO Best Practices Included

- ✅ Semantic HTML5 elements
- ✅ Proper heading hierarchy (H1, H2, H3)
- ✅ Meta descriptions on all pages
- ✅ Canonical URLs
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ✅ Alt text ready for images (add images as needed)
- ✅ Mobile-friendly responsive design
- ✅ Fast loading times
- ✅ Clean URL structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- This website is designed to be relocated easily - just move the entire folder
- All paths are relative, so the site structure should remain intact
- No external dependencies required
- Images can be added to an `images/` folder and referenced in the HTML

## Contact Information

For questions about this website, contact:
- Email: support@oparides.com
- Phone: +254 7022 48 984
- Website: ardena.xyz

## License

© 2024 Oparides. All rights reserved.
