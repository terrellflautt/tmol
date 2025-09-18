# Terrell K. Flautt - Portfolio Website

Terrell K. Flautt's peice of the interwebs built with cutting-edge web technologies and deployed on AWS CloudFront.

## 🎨 Features

- **Interactive Particle System**: Dynamic particle animations that respond to mouse movement
- **Smooth Animations**: Elegant scroll-triggered animations and transitions
- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern Typography**: Beautiful Inter and JetBrains Mono font combinations
- **Terminal Animation**: Interactive terminal simulation showcasing technical skills
- **Contact Form**: Functional contact form with validation
- **Performance Optimized**: Lazy loading, efficient animations, and optimized assets
- **PWA Ready**: Service worker support for offline functionality

## 🚀 Technologies Used

- **HTML5**: Semantic markup with accessibility in mind
- **CSS3**: Advanced animations, gradients, and modern layout techniques
- **Vanilla JavaScript**: High-performance interactive features
- **AWS S3**: Static website hosting
- **AWS CloudFront**: Global content delivery network
- **Canvas API**: Custom particle system animation

## 📁 Project Structure

```
terrellflautt/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
├── favicon.svg         # Website favicon
├── deploy.sh           # AWS deployment script
├── package.json        # Project configuration
└── README.md           # Project documentation
```

## 🛠️ Local Development

### Prerequisites

- Python 3.x (for local server)
- AWS CLI (for deployment)
- Git (for version control)

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/terrellflautt/terrellflautt.com.git
   cd terrellflautt
   ```

2. Start local development server:
   ```bash
   npm run dev
   # or
   python -m http.server 8000
   ```

3. Open your browser and navigate to `http://localhost:8000`

## ☁️ AWS Deployment

### Prerequisites

1. AWS Account with appropriate permissions
2. AWS CLI installed and configured
3. Domain registered with IONOS

### Deployment Steps

1. Make the deployment script executable:
   ```bash
   chmod +x deploy.sh
   ```

2. Run the deployment script:
   ```bash
   npm run deploy
   # or
   ./deploy.sh
   ```

The script will:
- Create an S3 bucket for static hosting
- Upload all website files
- Configure S3 bucket policies
- Create a CloudFront distribution
- Provide DNS configuration instructions

### Manual Deployment Commands

```bash
# Deploy to S3 only
npm run deploy:s3

# Invalidate CloudFront cache
npm run invalidate

# Check CloudFront distribution status
npm run status
```

## 🌐 DNS Configuration for IONOS

After successful deployment, configure your DNS settings in IONOS:

### 1. A Record (Root Domain)
- **Type**: A
- **Name**: @ (or leave blank)
- **Value**: CloudFront distribution IP (see deployment output)
- **TTL**: 3600

### 2. CNAME Record (WWW Subdomain)
- **Type**: CNAME
- **Name**: www
- **Value**: [CloudFront domain from deployment output]
- **TTL**: 3600

### Getting CloudFront IP Addresses

CloudFront uses dynamic IP addresses. You have two options:

1. **Use ALIAS/ANAME record** (if IONOS supports it):
   - Point directly to the CloudFront domain

2. **Use A record with current IPs**:
   ```bash
   # Get current IP addresses
   dig [cloudfront-domain]
   nslookup [cloudfront-domain]
   ```

## 📊 Performance Features

- **Lazy Loading**: Images and resources load as needed
- **Asset Optimization**: Minified and compressed assets
- **Caching Strategy**: Optimized CloudFront cache behaviors
- **Responsive Images**: Adaptive image loading
- **Service Worker**: Offline functionality and caching

## 🎨 Design System

### Color Palette
- **Primary**: `#00ffff` (Cyan)
- **Secondary**: `#ff6b6b` (Coral)
- **Accent**: `#4ecdc4` (Teal)
- **Background**: `#0a0a0a` (Deep Black)
- **Text**: `#ffffff` (White)

### Typography
- **Primary Font**: Inter (300, 400, 500, 600, 700)
- **Monospace Font**: JetBrains Mono (400, 500, 600)

### Animations
- **Particle System**: Interactive background particles
- **Scroll Animations**: Fade-in and slide-up effects
- **Hover Effects**: Smooth transitions and transforms
- **Terminal Animation**: Typing effect simulation

## 🔧 Customization

### Updating Content

1. **Personal Information**: Edit the contact details in `index.html`
2. **Projects**: Update the projects section with new work
3. **Skills**: Modify the skills grid in the about section
4. **Styling**: Customize colors and animations in `styles.css`

### Adding New Sections

1. Add HTML structure in `index.html`
2. Add corresponding styles in `styles.css`
3. Update navigation links
4. Add scroll animations in `script.js`

## 🚀 Performance Metrics

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.0s

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Terrell K. Flautt**
- Email: tkflau@protonmail.com (encrypted)
- terrell.flautt@gmail.com - regular daily contact
- Phone: (737) 300-0567
- Project Inquiries: birthmybuild@gmail.com

---

*Built from and with ❤️ to anyone who ever inspired or supported me*
