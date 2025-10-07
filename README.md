# Terrell K. Flautt - Portfolio Website

A modern, interactive portfolio website showcasing cloud architecture and DevOps expertise, built with cutting-edge web technologies and deployed on AWS CloudFront.

My code is my gift to you, use it/edit how you please for your own purpose. 
I appreciate it if you credit me and send support my way:
http://terrellflautt.com/contribute.html



## 🎨 Features

- **Interactive Particle System**: Dynamic particle animations that respond to mouse movement
- **Smooth Animations**: Elegant scroll-triggered animations and transitions
- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern Typography**: Beautiful Inter and JetBrains Mono font combinations
- **Terminal Animation**: Interactive terminal simulation showcasing technical skills
- **Contact Form**: Functional contact form with validation
- **Performance Optimized**: Lazy loading, efficient animations, and optimized assets
- **PWA Ready**: Service worker support for offline functionality
- **🎮 Quest for Glory RPG System**: Complete character progression with 17 skills, turn-based PvP combat, and Hall of Fame leaderboards
- **Hidden Easter Eggs**: Mysterious door discovery, cryptic riddles, and secret pathways ([See Guide](EASTER-EGGS-GUIDE.md))
- **AI NPCs**: Chat with Aziza (the Sphinx), Dr. Cranium, Time Keeper, and more
- **Character Progression**: 17 skills (0-100), dynamic level calculation, class system (Fighter, Wizard, Thief, Paladin, Hero)
- **PvP Dueling**: Turn-based combat using actual player stats with AI opponents
- **Privacy Education**: Transparent tracking that teaches you about data collection

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
├── index.html               # Main HTML file
├── character.html           # Character sheet page
├── hall-of-fame.html        # Leaderboards page
├── styles.css               # CSS styles and animations
├── script.js                # JavaScript functionality
├── css/
│   └── character-sheet.css  # QFG-style character UI
├── js/
│   ├── core/
│   │   ├── quest-engine.js          # Main game engine
│   │   ├── adaptive-rpg-system.js   # 300+ hours content scheduler
│   │   ├── skill-system.js          # 17-skill progression
│   │   ├── puzzle-system.js         # 50+ adaptive puzzles
│   │   ├── consequence-system.js    # Permanent outcomes
│   │   ├── main-story-arc.js        # Cryptic narrative
│   │   ├── hidden-world-system.js   # Secret discovery
│   │   └── tracking.js              # Privacy-aware analytics
│   └── features/
│       ├── character-sheet.js       # Stat visualization
│       ├── pvp-system.js            # Turn-based combat
│       ├── hall-of-fame.js          # Leaderboards
│       └── rpg-dialogue.js          # NPC conversations
├── voting-api/              # Serverless voting backend
│   ├── vote.js              # Vote handler (Lambda)
│   ├── tracking.js          # User tracking API
│   ├── game-tracking.js     # RPG progress tracking
│   ├── npc-ai.js           # AI NPC chat system
│   ├── consciousness.js     # User profile aggregation
│   ├── serverless.yml       # Infrastructure as code
│   └── README.md            # API documentation
├── favicon.svg              # Website favicon
├── deploy.sh                # AWS deployment script
├── package.json             # Project configuration
├── README.md                # Project documentation
└── EASTER-EGGS-GUIDE.md     # Hidden features guide
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

## 🎮 Quest for Glory RPG System

This site includes a **complete Quest for Glory inspired RPG** with 300+ hours of content:

### Character Progression
- **17 Skills**: Strength, Intelligence, Agility, Vitality, Luck, Wisdom, Curiosity, Attention, Patience, Speed, Precision, Creativity, Code Reading, Problem Solving, Pattern Recognition
- **Dynamic Leveling**: Level = Total Skill Points / 50
- **5 Classes**: Fighter, Wizard, Thief, Paladin, Hero (based on highest stats)
- **Character Sheet**: View your stats at character.html after solving the door riddle

### PvP Combat System
- **Turn-Based Dueling**: Fight AI opponents using your actual stats
- **3 Actions**: Attack (strength-based), Defend (vitality healing), Special (intelligence + luck crits)
- **Battle History**: Track wins/losses to Hall of Fame

### Hall of Fame Leaderboards
- **6 Categories**: Overall Score, Highest Level, Puzzles Solved, Secrets Discovered, PvP Wins, Time Spent
- **Real Rankings**: Top players shown with gold/silver/bronze badges
- **View Rankings**: hall-of-fame.html

### Discovery Methods
1. **Click the logo 7 times** - The door appears
2. **Type "aziza"** - Summons the guardian
3. **Breathing logo** - Watch for subtle animation
4. **Solve the riddle** - "My first is the first..." (Answer: Aziza/Terrell/TK/Sphinx/Enchantress)

**👉 [Full Easter Eggs Guide](EASTER-EGGS-GUIDE.md)**

### Quest Flow
1. Discover door → "Try the door?"
2. Aziza's riddle → "My first is the first..."
3. Door opens → "You may enter"
4. Name greeting → Enter your name
5. Conversation → "What calls you here?" (4 choices)
6. Elemental prophecy → Personalized with your city
7. Character progression → Skills/Hall of Fame unlocked

## 🔌 Backend API

The site is powered by a **serverless API** built with AWS Lambda:

- **Voting System**: Upvote/downvote projects
- **User Tracking**: Privacy-aware analytics
- **RPG Progress Tracking**: Save character stats, discoveries, achievements
- **AI Chat**: Powered by OpenAI GPT-4
- **Real-time Sync**: DynamoDB with PITR backups
- **X-Ray Tracing**: Distributed request tracing

**API Endpoint:** `api.terrellflautt.com`

**API Documentation:** See [voting-api/README.md](voting-api/README.md)

**Key Endpoints:**
- `POST /vote` - Vote on projects
- `GET /vote/{projectId}` - Get project votes
- `POST /journey` - Track RPG journey
- `GET /journey/{userId}` - Get user journey data
- `POST /user-profile` - Save character stats
- `GET /user-profile/{userId}` - Get character profile
- `POST /npc/chat` - Chat with AI NPCs
- `POST /consciousness/sync` - Sync user profile
- `POST /tracking` - Track user events
- `POST /forum/messages` - Post forum messages
- `GET /forum/messages` - Get forum messages

**Infrastructure:**
- **14 Lambda Functions**: vote, feedback, analytics, userJourney, tracking, userProfile, genie, contributions, forum, consciousness, npcAI, createCheckoutSession, stripeWebhook, contributionsWebhook
- **CloudFront CDN**: Custom domain with api.terrellflautt.com
- **DynamoDB Tables**: votes, feedback, user-journeys, tracking, tracking-events, hall-of-fame, donations, forum-messages, rate-limits
- **X-Ray Tracing**: Distributed request tracing enabled
- **CORS Configured**: Secure cross-origin requests

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
