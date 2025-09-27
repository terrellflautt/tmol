/**
 * Arabian City Map System
 * Interactive pixel art city map with discoverable locations
 * Players can only travel to locations they've unlocked through exploration
 */

class ArabianCityMap {
    constructor() {
        this.discoveredLocations = [];
        this.currentLocation = 'marketplace';
        this.visitedLocations = [];
        this.mapVisible = false;

        this.locations = {
            marketplace: {
                id: 'marketplace',
                name: 'The Grand Bazaar',
                x: 45, // Percentage position on map
                y: 60,
                discovered: true, // Starting location
                description: 'The heart of the ancient city, where merchants and travelers gather',
                characters: ['aziza'],
                quests: ['aliBaba', 'lampMerchant'],
                unlocks: ['palace_entrance', 'back_alleys'],
                backdrop: 'pixel-art-ancient-arabic-city-desert-with-buildings-palm-trees-background-8-bit-game-ai_985124-1627-3716854050.jpg'
            },

            palace_entrance: {
                id: 'palace_entrance',
                name: 'Palace Gates',
                x: 70,
                y: 35,
                discovered: false,
                description: 'Majestic golden gates guard the palace of the Sultan',
                characters: ['julanar'],
                quests: ['solomonWisdom', 'merchantPrince'],
                unlocks: ['royal_gardens', 'treasure_vault'],
                backdrop: 'arabiancity1.jpg'
            },

            back_alleys: {
                id: 'back_alleys',
                name: 'The Shadowed Alleys',
                x: 25,
                y: 75,
                discovered: false,
                description: 'Narrow passages where secrets are traded and mysteries dwell',
                characters: ['woman'],
                quests: ['baghdadThief', 'nightMarket'],
                unlocks: ['thieves_den', 'underground_passage'],
                backdrop: 'pixel-art-ancient-arabic-city-desert-with-buildings-palm-trees-background-8-bit-game-ai_985124-1627-3716854050.jpg'
            },

            royal_gardens: {
                id: 'royal_gardens',
                name: 'Royal Gardens',
                x: 80,
                y: 20,
                discovered: false,
                description: 'Lush oasis within the palace walls, where wisdom blooms eternal',
                characters: ['julanar'],
                quests: ['sinbadVoyage'],
                unlocks: ['celestial_tower'],
                backdrop: 'arabiancity1.jpg'
            },

            harbor: {
                id: 'harbor',
                name: 'The Ancient Harbor',
                x: 15,
                y: 45,
                discovered: false,
                description: 'Where Sinbad\'s ships dock and adventures begin',
                characters: ['woman'],
                quests: ['sinbadVoyage'],
                unlocks: ['lighthouse', 'ship_graveyard'],
                backdrop: 'pixel-art-ancient-arabic-city-desert-with-buildings-palm-trees-background-8-bit-game-ai_985124-1627-3716854050.jpg'
            },

            desert_outskirts: {
                id: 'desert_outskirts',
                name: 'Desert Outskirts',
                x: 85,
                y: 80,
                discovered: false,
                description: 'Where the city meets the endless sands and ancient secrets lie buried',
                characters: ['aziza'],
                quests: ['aliBaba'],
                unlocks: ['cave_entrance', 'oasis'],
                backdrop: 'pixel-art-ancient-arabic-city-desert-with-buildings-palm-trees-background-8-bit-game-ai_985124-1627-3716854050.jpg'
            },

            thieves_den: {
                id: 'thieves_den',
                name: 'The Thieves\' Den',
                x: 10,
                y: 85,
                discovered: false,
                description: 'Hidden sanctuary of the forty thieves, accessible only to the worthy',
                characters: ['aziza'],
                quests: ['aliBaba'],
                unlocks: ['secret_tunnel'],
                backdrop: 'pixel-art-ancient-arabic-city-desert-with-buildings-palm-trees-background-8-bit-game-ai_985124-1627-3716854050.jpg'
            },

            celestial_tower: {
                id: 'celestial_tower',
                name: 'The Celestial Tower',
                x: 90,
                y: 10,
                discovered: false,
                description: 'Ancient observatory where stars reveal their secrets to the wise',
                characters: ['woman'],
                quests: ['solomonWisdom'],
                unlocks: [],
                backdrop: 'arabiancity1.jpg'
            },

            underground_passage: {
                id: 'underground_passage',
                name: 'Underground Passage',
                x: 20,
                y: 90,
                discovered: false,
                description: 'Secret tunnels beneath the city, connecting all hidden places',
                characters: ['aziza', 'julanar', 'woman'],
                quests: ['nightMarket'],
                unlocks: ['cave_entrance'],
                backdrop: 'pixel-art-ancient-arabic-city-desert-with-buildings-palm-trees-background-8-bit-game-ai_985124-1627-3716854050.jpg'
            }
        };

        this.init();
    }

    init() {
        this.loadProgress();
        this.createMapInterface();
        this.setupEventListeners();
        this.checkLocationDiscoveries();
    }

    loadProgress() {
        const saved = localStorage.getItem('arabianCityMapProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            this.discoveredLocations = progress.discovered || ['marketplace'];
            this.currentLocation = progress.current || 'marketplace';
            this.visitedLocations = progress.visited || [];
        }

        // Ensure marketplace is always discovered
        if (!this.discoveredLocations.includes('marketplace')) {
            this.discoveredLocations.push('marketplace');
        }
    }

    saveProgress() {
        const progress = {
            discovered: this.discoveredLocations,
            current: this.currentLocation,
            visited: this.visitedLocations
        };
        localStorage.setItem('arabianCityMapProgress', JSON.stringify(progress));
    }

    createMapInterface() {
        // Create map button
        const mapButton = document.createElement('button');
        mapButton.id = 'city-map-button';
        mapButton.innerHTML = '🗺️';
        mapButton.title = 'City Map';
        mapButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #8B4513, #DAA520);
            border: 3px solid #FFD700;
            color: #FFD700;
            font-size: 24px;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        `;

        mapButton.addEventListener('click', () => this.toggleMap());
        mapButton.addEventListener('mouseenter', () => {
            mapButton.style.transform = 'scale(1.1)';
            mapButton.style.boxShadow = '0 8px 25px rgba(218, 165, 32, 0.4)';
        });
        mapButton.addEventListener('mouseleave', () => {
            mapButton.style.transform = 'scale(1)';
            mapButton.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
        });

        document.body.appendChild(mapButton);
    }

    toggleMap() {
        if (this.mapVisible) {
            this.hideMap();
        } else {
            this.showMap();
        }
    }

    showMap() {
        const mapModal = this.createMapModal();
        document.body.appendChild(mapModal);
        this.mapVisible = true;

        // Animate in
        setTimeout(() => {
            mapModal.style.opacity = '1';
            mapModal.style.transform = 'scale(1)';
        }, 50);
    }

    hideMap() {
        const mapModal = document.getElementById('city-map-modal');
        if (mapModal) {
            mapModal.style.opacity = '0';
            mapModal.style.transform = 'scale(0.9)';
            setTimeout(() => mapModal.remove(), 300);
        }
        this.mapVisible = false;
    }

    createMapModal() {
        const modal = document.createElement('div');
        modal.id = 'city-map-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transform: scale(0.9);
            transition: all 0.3s ease;
        `;

        const mapContainer = document.createElement('div');
        mapContainer.style.cssText = `
            position: relative;
            width: 90%;
            max-width: 800px;
            height: 70%;
            background: url('pixel-art-ancient-arabic-city-desert-with-buildings-palm-trees-background-8-bit-game-ai_985124-1627-3716854050.jpg');
            background-size: cover;
            background-position: center;
            border: 5px solid #DAA520;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        `;

        // Add map overlay for better visibility
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(rgba(139, 69, 19, 0.3), rgba(218, 165, 32, 0.2));
        `;
        mapContainer.appendChild(overlay);

        // Add location markers
        this.discoveredLocations.forEach(locationId => {
            const location = this.locations[locationId];
            if (location) {
                const marker = this.createLocationMarker(location);
                mapContainer.appendChild(marker);
            }
        });

        // Add map title
        const title = document.createElement('div');
        title.textContent = 'The Ancient City of Shapeir';
        title.style.cssText = `
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: #FFD700;
            font-size: 24px;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
            z-index: 10;
        `;
        mapContainer.appendChild(title);

        // Add current location indicator
        const currentLocationText = document.createElement('div');
        const currentLoc = this.locations[this.currentLocation];
        currentLocationText.textContent = `Current Location: ${currentLoc?.name || 'Unknown'}`;
        currentLocationText.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 20px;
            color: #FFD700;
            font-size: 16px;
            background: rgba(0,0,0,0.7);
            padding: 10px 15px;
            border-radius: 8px;
            z-index: 10;
        `;
        mapContainer.appendChild(currentLocationText);

        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = `
            position: absolute;
            top: 15px;
            right: 15px;
            width: 40px;
            height: 40px;
            border: none;
            border-radius: 50%;
            background: rgba(139, 69, 19, 0.8);
            color: #FFD700;
            font-size: 20px;
            cursor: pointer;
            z-index: 11;
        `;
        closeBtn.addEventListener('click', () => this.hideMap());
        mapContainer.appendChild(closeBtn);

        modal.appendChild(mapContainer);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.hideMap();
        });

        return modal;
    }

    createLocationMarker(location) {
        const marker = document.createElement('div');
        marker.className = 'location-marker';
        marker.style.cssText = `
            position: absolute;
            left: ${location.x}%;
            top: ${location.y}%;
            width: 30px;
            height: 30px;
            transform: translate(-50%, -50%);
            cursor: pointer;
            z-index: 10;
            transition: all 0.3s ease;
        `;

        // Different marker styles based on location type and status
        const isCurrentLocation = location.id === this.currentLocation;
        const hasBeenVisited = this.visitedLocations.includes(location.id);

        if (isCurrentLocation) {
            marker.innerHTML = '📍';
            marker.style.fontSize = '24px';
            marker.style.filter = 'drop-shadow(0 0 10px #FFD700)';
        } else if (hasBeenVisited) {
            marker.innerHTML = '🏛️';
            marker.style.fontSize = '20px';
            marker.style.opacity = '0.8';
        } else {
            marker.innerHTML = '⭐';
            marker.style.fontSize = '18px';
            marker.style.opacity = '0.7';
        }

        // Add tooltip
        const tooltip = document.createElement('div');
        tooltip.textContent = location.name;
        tooltip.style.cssText = `
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.9);
            color: #FFD700;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 12px;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            margin-bottom: 5px;
        `;
        marker.appendChild(tooltip);

        // Hover effects
        marker.addEventListener('mouseenter', () => {
            marker.style.transform = 'translate(-50%, -50%) scale(1.2)';
            tooltip.style.opacity = '1';
        });

        marker.addEventListener('mouseleave', () => {
            marker.style.transform = 'translate(-50%, -50%) scale(1)';
            tooltip.style.opacity = '0';
        });

        // Click to travel
        marker.addEventListener('click', () => {
            if (location.id !== this.currentLocation) {
                this.travelToLocation(location.id);
            } else {
                this.showLocationDetails(location);
            }
        });

        return marker;
    }

    travelToLocation(locationId) {
        const location = this.locations[locationId];
        if (!location) return;

        // Update current location
        this.currentLocation = locationId;

        // Add to visited locations
        if (!this.visitedLocations.includes(locationId)) {
            this.visitedLocations.push(locationId);
        }

        this.saveProgress();
        this.hideMap();

        // Show travel animation and location details
        this.showTravelSequence(location);

        // Check for new location unlocks
        this.checkLocationUnlocks(location);

        // Trigger any location-specific events
        this.triggerLocationEvents(location);
    }

    showTravelSequence(location) {
        const travelModal = document.createElement('div');
        travelModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(rgba(0,0,0,0.9), rgba(139,69,19,0.8)), url('${location.backdrop}');
            background-size: cover;
            background-position: center;
            z-index: 11000;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.8s ease;
        `;

        const title = document.createElement('h2');
        title.textContent = `Arriving at ${location.name}`;
        title.style.cssText = `
            color: #FFD700;
            font-size: 32px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
            margin-bottom: 20px;
            animation: fadeInUp 1s ease-out;
        `;

        const description = document.createElement('p');
        description.textContent = location.description;
        description.style.cssText = `
            color: #DAA520;
            font-size: 18px;
            text-align: center;
            max-width: 600px;
            line-height: 1.6;
            animation: fadeInUp 1s ease-out 0.5s both;
        `;

        const continueBtn = document.createElement('button');
        continueBtn.textContent = 'Explore';
        continueBtn.style.cssText = `
            margin-top: 30px;
            padding: 15px 30px;
            background: linear-gradient(135deg, #8B4513, #DAA520);
            border: 2px solid #FFD700;
            border-radius: 8px;
            color: #FFD700;
            font-size: 16px;
            cursor: pointer;
            animation: fadeInUp 1s ease-out 1s both;
        `;

        continueBtn.addEventListener('click', () => {
            travelModal.remove();
            this.onLocationEntered(location);
        });

        // Add keyframe animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);

        travelModal.appendChild(title);
        travelModal.appendChild(description);
        travelModal.appendChild(continueBtn);
        document.body.appendChild(travelModal);

        // Fade in
        setTimeout(() => {
            travelModal.style.opacity = '1';
        }, 100);

        // Auto-continue after 5 seconds
        setTimeout(() => {
            if (document.body.contains(travelModal)) {
                continueBtn.click();
            }
        }, 5000);
    }

    checkLocationUnlocks(location) {
        if (location.unlocks) {
            location.unlocks.forEach(unlockId => {
                if (!this.discoveredLocations.includes(unlockId)) {
                    this.discoverLocation(unlockId);
                }
            });
        }
    }

    discoverLocation(locationId) {
        if (!this.discoveredLocations.includes(locationId)) {
            this.discoveredLocations.push(locationId);
            this.saveProgress();

            const location = this.locations[locationId];
            if (location) {
                this.showLocationDiscovery(location);
            }
        }
    }

    showLocationDiscovery(location) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #8B4513, #DAA520);
            color: #FFD700;
            padding: 20px;
            border-radius: 10px;
            border: 2px solid #FFD700;
            z-index: 10000;
            max-width: 300px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
            animation: slideInRight 0.5s ease-out;
        `;

        notification.innerHTML = `
            <h4 style="margin: 0 0 10px 0;">✨ New Location Discovered!</h4>
            <p style="margin: 0; font-size: 14px;"><strong>${location.name}</strong></p>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">${location.description}</p>
        `;

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);

        // Add slide-in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    triggerLocationEvents(location) {
        // Notify other systems about location change
        if (window.userJourneySystem) {
            window.userJourneySystem.recordEvent('location_visited', {
                location: location.id,
                name: location.name
            });
        }

        // Check if any characters are at this location
        if (location.characters && location.characters.length > 0) {
            this.showLocationCharacters(location);
        }

        // Update background if applicable
        this.updateEnvironmentForLocation(location);
    }

    showLocationCharacters(location) {
        setTimeout(() => {
            const charactersInfo = document.createElement('div');
            charactersInfo.style.cssText = `
                position: fixed;
                bottom: 100px;
                right: 20px;
                background: rgba(139, 69, 19, 0.9);
                color: #FFD700;
                padding: 15px;
                border-radius: 8px;
                border: 1px solid #DAA520;
                z-index: 9999;
                max-width: 250px;
            `;

            const characterNames = location.characters.map(charId => {
                const charMap = {
                    'aziza': 'Aziza the Genie',
                    'julanar': 'Princess Julanar',
                    'woman': 'The Wise Woman'
                };
                return charMap[charId] || charId;
            });

            charactersInfo.innerHTML = `
                <h5 style="margin: 0 0 8px 0;">👥 Present Here:</h5>
                <p style="margin: 0; font-size: 13px;">${characterNames.join(', ')}</p>
            `;

            document.body.appendChild(charactersInfo);
            setTimeout(() => charactersInfo.remove(), 4000);
        }, 1000);
    }

    updateEnvironmentForLocation(location) {
        // Could update main page background or add location-specific effects
        document.documentElement.style.setProperty('--current-location-backdrop', `url('${location.backdrop}')`);
    }

    onLocationEntered(location) {
        // Hook for other systems to respond to location changes
        if (window.arabianStoryPathways) {
            window.arabianStoryPathways.checkLocationTriggers(location.id);
        }

        if (window.skillMasterySystem) {
            window.skillMasterySystem.onLocationEntered(location.id);
        }
    }

    checkLocationDiscoveries() {
        // Discovery through website interactions
        const userJourney = window.userJourneySystem?.getUserData() || {};
        const skills = window.skillMasterySystem?.getUnlockedSkills() || [];
        const logoClicks = userJourney.logoClicks || 0;
        const pageVisits = userJourney.pageVisits || 0;
        const contributionInteractions = userJourney.contributionInteractions || 0;

        // Palace Gates - discovered by clicking logo multiple times (seeking power/authority)
        if (logoClicks >= 15 && !this.discoveredLocations.includes('palace_entrance')) {
            this.discoverLocation('palace_entrance');
            this.showLocationDiscoveryMessage('palace_entrance',
                'Your persistence in seeking the source of power reveals the Palace Gates...');
        }

        // Back Alleys - discovered by exploring different pages (curiosity about hidden things)
        if (pageVisits >= 5 && !this.discoveredLocations.includes('back_alleys')) {
            this.discoverLocation('back_alleys');
            this.showLocationDiscoveryMessage('back_alleys',
                'Your exploration reveals hidden pathways in the shadows...');
        }

        // Harbor - discovered through contribution page interactions (desire for journey/adventure)
        if (contributionInteractions >= 3 && !this.discoveredLocations.includes('harbor')) {
            this.discoverLocation('harbor');
            this.showLocationDiscoveryMessage('harbor',
                'Your generosity opens the path to where adventures begin...');
        }

        // Desert Outskirts - discovered with specific skills (readiness for challenges)
        if (skills.includes('flow') && skills.includes('time') && !this.discoveredLocations.includes('desert_outskirts')) {
            this.discoverLocation('desert_outskirts');
            this.showLocationDiscoveryMessage('desert_outskirts',
                'Your mastery of flow and time reveals the path to ancient secrets...');
        }

        // Royal Gardens - discovered by creating multiple logos (creative spirit)
        const logosCreated = userJourney.logosCreated || 0;
        if (logosCreated >= 3 && !this.discoveredLocations.includes('royal_gardens')) {
            this.discoverLocation('royal_gardens');
            this.showLocationDiscoveryMessage('royal_gardens',
                'Your creative spirit blooms like flowers in the Royal Gardens...');
        }
    }

    // New method for NPC-triggered location discoveries
    discoverLocationThroughNPC(locationId, npcName, context) {
        if (!this.discoveredLocations.includes(locationId)) {
            this.discoverLocation(locationId);

            // Special discovery messages based on NPC interaction
            const messages = {
                'thieves_den': {
                    'aziza': 'Aziza whispers: "The forty thieves have noticed your courage. Their den awaits..."',
                    'woman': 'The Wise Woman points to shadows: "Where courage dwells, thieves respect..."'
                },
                'celestial_tower': {
                    'julanar': 'Princess Julanar gazes skyward: "Your wisdom has earned access to the stars..."',
                    'woman': 'The Oracle speaks: "Heaven opens its secrets to the worthy..."'
                },
                'underground_passage': {
                    'aziza': 'Aziza gestures mysteriously: "Ancient tunnels connect all hidden places..."',
                    'julanar': 'Princess Julanar reveals: "Beneath the city lies a web of secrets..."'
                },
                'oasis': {
                    'aziza': 'Aziza smiles: "In the heart of the desert, life blooms eternal..."',
                    'woman': 'The Desert Mother whispers: "Where water flows, miracles gather..."'
                }
            };

            const message = messages[locationId]?.[npcName] ||
                `${npcName} reveals a new path to ${this.locations[locationId]?.name}...`;

            this.showNPCLocationDiscovery(locationId, npcName, message);
        }
    }

    // Discovery through dialogue choices
    discoverLocationThroughChoice(storyId, choiceId, locationId) {
        const discoveryMap = {
            'aliBaba': {
                'speak_sesame': 'thieves_den',
                'guard_entrance': 'desert_outskirts'
            },
            'solomonWisdom': {
                'accept_riddle': 'celestial_tower',
                'seek_judgment': 'underground_passage'
            },
            'baghdadThief': {
                'help_thief': 'thieves_den',
                'observe_quietly': 'underground_passage'
            },
            'merchantPrince': {
                'generous_gift': 'royal_gardens',
                'negotiate_cleverly': 'back_alleys'
            },
            'sinbadVoyage': {
                'join_voyage': 'harbor',
                'chart_course': 'lighthouse'
            }
        };

        const targetLocation = discoveryMap[storyId]?.[choiceId];
        if (targetLocation && !this.discoveredLocations.includes(targetLocation)) {
            this.discoverLocation(targetLocation);
            this.showChoiceLocationDiscovery(targetLocation, storyId, choiceId);
        }
    }

    showLocationDiscoveryMessage(locationId, message) {
        const location = this.locations[locationId];
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(139, 69, 19, 0.95), rgba(218, 165, 32, 0.9));
            color: #FFD700;
            padding: 30px;
            border-radius: 15px;
            border: 3px solid #FFD700;
            z-index: 12000;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
            animation: mysticalAppear 1s ease-out;
        `;

        notification.innerHTML = `
            <div style="font-size: 24px; margin-bottom: 15px;">✨🗺️✨</div>
            <h3 style="margin: 0 0 15px 0; color: #FFD700;">Location Discovered!</h3>
            <h4 style="margin: 0 0 10px 0; color: #DAA520;">${location.name}</h4>
            <p style="margin: 0 0 15px 0; font-style: italic; line-height: 1.4;">${message}</p>
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">${location.description}</p>
            <div style="margin-top: 20px;">
                <button onclick="this.parentElement.parentElement.remove()"
                        style="background: #8B4513; border: 2px solid #DAA520; border-radius: 8px;
                               color: #FFD700; padding: 10px 20px; cursor: pointer;">
                    Continue Journey
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Add mystical appearance animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes mysticalAppear {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5) rotate(180deg);
                }
                50% {
                    opacity: 0.8;
                    transform: translate(-50%, -50%) scale(1.1) rotate(90deg);
                }
                100% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1) rotate(0deg);
                }
            }
        `;
        document.head.appendChild(style);

        // Auto-remove after 8 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.remove();
            }
        }, 8000);
    }

    showNPCLocationDiscovery(locationId, npcName, message) {
        const location = this.locations[locationId];
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: linear-gradient(135deg, rgba(75, 0, 130, 0.9), rgba(139, 69, 19, 0.8));
            color: #FFD700;
            padding: 20px;
            border-radius: 12px;
            border: 2px solid #DAA520;
            z-index: 11000;
            max-width: 350px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.4);
            animation: slideUpFade 0.8s ease-out;
        `;

        // Get NPC avatar
        const npcAvatars = {
            'aziza': '🧞‍♀️',
            'julanar': '👸',
            'woman': '🔮'
        };

        notification.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <span style="font-size: 24px; margin-right: 10px;">${npcAvatars[npcName] || '👤'}</span>
                <strong style="color: #DAA520;">${npcName}</strong>
            </div>
            <p style="margin: 0 0 10px 0; font-style: italic; line-height: 1.4;">"${message}"</p>
            <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px;">
                <small style="color: #FFD700;"><strong>${location.name}</strong> added to your map!</small>
            </div>
        `;

        document.body.appendChild(notification);

        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideUpFade {
                from {
                    opacity: 0;
                    transform: translateY(100%);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => notification.remove(), 6000);
    }

    showChoiceLocationDiscovery(locationId, storyId, choiceId) {
        const location = this.locations[locationId];
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, rgba(25, 25, 112, 0.9), rgba(139, 69, 19, 0.8));
            color: #FFD700;
            padding: 20px;
            border-radius: 10px;
            border: 2px solid #FFD700;
            z-index: 11000;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 10px 20px rgba(0,0,0,0.4);
            animation: choiceReveal 1s ease-out;
        `;

        notification.innerHTML = `
            <div style="font-size: 20px; margin-bottom: 10px;">⚡ Your choice echoes through the realm ⚡</div>
            <h4 style="margin: 0 0 10px 0; color: #DAA520;">Path Revealed: ${location.name}</h4>
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">${location.description}</p>
        `;

        document.body.appendChild(notification);

        const style = document.createElement('style');
        style.textContent = `
            @keyframes choiceReveal {
                0% {
                    opacity: 0;
                    transform: translateX(-50%) scale(0.8);
                }
                50% {
                    opacity: 0.8;
                    transform: translateX(-50%) scale(1.1);
                }
                100% {
                    opacity: 1;
                    transform: translateX(-50%) scale(1);
                }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => notification.remove(), 5000);
    }

    // Public API
    getCurrentLocation() {
        return this.currentLocation;
    }

    getDiscoveredLocations() {
        return [...this.discoveredLocations];
    }

    isLocationDiscovered(locationId) {
        return this.discoveredLocations.includes(locationId);
    }

    forceDiscoverLocation(locationId) {
        this.discoverLocation(locationId);
    }

    setupEventListeners() {
        // Close map on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mapVisible) {
                this.hideMap();
            }
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.arabianCityMap = new ArabianCityMap();
    });
} else {
    window.arabianCityMap = new ArabianCityMap();
}