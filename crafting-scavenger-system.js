/**
 * CRAFTING & SCAVENGER HUNT SYSTEM
 * Find ingredients hidden across the website, craft potions and items
 * Quest for Glory inspired - items hidden in unexpected places
 */

class CraftingScavengerSystem {
    constructor() {
        this.inventory = [];
        this.recipes = {
            dispel_potion: {
                name: 'Dispel Potion',
                description: 'Banishes evil spirits and cosmic horrors',
                ingredients: [
                    { item: 'elemental_essence_fire', quantity: 1 },
                    { item: 'elemental_essence_water', quantity: 1 },
                    { item: 'elemental_essence_air', quantity: 1 },
                    { item: 'elemental_essence_earth', quantity: 1 },
                    { item: 'moonlight_dew', quantity: 3 },
                    { item: 'dr_cranium_catalyst', quantity: 1 }
                ],
                craftLocation: 'dr_cranium_lab',
                result: 'dispel_potion'
            },
            healing_elixir: {
                name: 'Healing Elixir',
                description: 'Restores health and sanity',
                ingredients: [
                    { item: 'desert_flower', quantity: 2 },
                    { item: 'spring_water', quantity: 1 },
                    { item: 'honey_crystal', quantity: 1 }
                ],
                craftLocation: 'anywhere',
                result: 'healing_elixir'
            },
            lamp_oil: {
                name: 'Enchanted Lamp Oil',
                description: 'Fuels the magic lamp for genie summons',
                ingredients: [
                    { item: 'olive_oil', quantity: 1 },
                    { item: 'star_fragment', quantity: 1 },
                    { item: 'aziza_blessing', quantity: 1 }
                ],
                craftLocation: 'lamp',
                result: 'lamp_oil'
            }
        };

        this.scavengable_items = {
            // Hidden in Projects Section
            desert_flower: {
                location: 'project-card[data-project="snapitqr"]',
                hint: 'Where QR codes bloom in the desert...',
                action: 'triple_click',
                description: 'A vibrant flower that only grows in digital sands'
            },
            olive_oil: {
                location: 'project-card[data-project="snapitforms"]',
                hint: 'Forms take shape like oil and water...',
                action: 'hover_5_seconds',
                description: 'Pure oil from the ancient groves'
            },

            // Hidden in Logo/About
            moonlight_dew: {
                location: '.logo-container',
                hint: 'The lamp glows brightest under the moon...',
                action: 'click_at_midnight',
                description: 'Dew collected from moonlit nights',
                count: 3 // Need to collect 3 times
            },
            star_fragment: {
                location: '.particles-container',
                hint: 'Catch a falling star...',
                action: 'click_particle',
                description: 'A fragment of a fallen star'
            },

            // Hidden in Skills/About Section
            honey_crystal: {
                location: '.skill-item:contains("React.js")',
                hint: 'Where the sweetest framework crystallizes...',
                action: 'double_click',
                description: 'Crystallized honey from digital bees'
            },

            // Hidden in Contact Form
            spring_water: {
                location: '#contact',
                hint: 'Where messages flow like fresh spring water...',
                action: 'fill_form_with_wisdom',
                description: 'Pure water from an ancient spring'
            },

            // Hidden in Footer
            aziza_blessing: {
                location: 'footer',
                hint: 'The foundation holds ancient blessings...',
                action: 'scroll_to_bottom_and_wait',
                description: 'Aziza\'s mystical blessing'
            },

            // Hidden in Terminal
            dr_cranium_catalyst: {
                location: '.terminal-body',
                hint: 'Type "sudo craft" in the terminal of the mind...',
                action: 'type_secret_command',
                secretCommand: 'sudo craft',
                description: 'Dr. Cranium\'s secret alchemical catalyst'
            },

            // Elemental Essences (earned from defeating elementals)
            elemental_essence_fire: {
                location: 'logomaker',
                hint: 'Defeat the Fire Elemental in the forge of creation',
                action: 'defeat_elemental',
                description: 'The essence of pure flame'
            },
            elemental_essence_water: {
                location: 'forum',
                hint: 'Defeat the Water Elemental in the sea of knowledge',
                action: 'defeat_elemental',
                description: 'The essence of flowing water'
            },
            elemental_essence_air: {
                location: '#projects',
                hint: 'Defeat the Air Elemental among your works',
                action: 'defeat_elemental',
                description: 'The essence of the wind'
            },
            elemental_essence_earth: {
                location: '#contact',
                hint: 'Defeat the Earth Elemental at the foundation',
                action: 'defeat_elemental',
                description: 'The essence of solid ground'
            }
        };

        this.init();
    }

    init() {
        this.loadInventory();
        this.setupScavengerListeners();
        this.setupCraftingInterface();
        console.log('🔍 Crafting & Scavenger Hunt System loaded');
    }

    loadInventory() {
        const saved = localStorage.getItem('player_inventory');
        if (saved) {
            this.inventory = JSON.parse(saved);
        }
    }

    saveInventory() {
        localStorage.setItem('player_inventory', JSON.stringify(this.inventory));
    }

    setupScavengerListeners() {
        // Triple click listener
        this.setupTripleClickListener();

        // Hover timer listener
        this.setupHoverListener();

        // Midnight click listener
        this.setupMidnightListener();

        // Particle click listener
        this.setupParticleListener();

        // Terminal command listener
        this.setupTerminalListener();

        // Scroll listener
        this.setupScrollListener();

        // Form wisdom listener
        this.setupFormListener();
    }

    setupTripleClickListener() {
        let clickCount = 0;
        let lastClick = 0;

        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-project="snapitqr"]');
            if (!target) {
                clickCount = 0;
                return;
            }

            const now = Date.now();
            if (now - lastClick < 500) {
                clickCount++;
                if (clickCount === 3) {
                    this.collectItem('desert_flower');
                    clickCount = 0;
                }
            } else {
                clickCount = 1;
            }
            lastClick = now;
        });
    }

    setupHoverListener() {
        let hoverStart = 0;
        const target = document.querySelector('[data-project="snapitforms"]');
        if (!target) return;

        target.addEventListener('mouseenter', () => {
            hoverStart = Date.now();
        });

        target.addEventListener('mouseleave', () => {
            const duration = Date.now() - hoverStart;
            if (duration >= 5000) {
                this.collectItem('olive_oil');
            }
        });
    }

    setupMidnightListener() {
        document.querySelector('.logo-container')?.addEventListener('click', () => {
            const now = new Date();
            if (now.getHours() === 0 || now.getHours() === 23) {
                this.collectItem('moonlight_dew');
            }
        });
    }

    setupParticleListener() {
        const canvas = document.getElementById('particles');
        if (!canvas) return;

        canvas.addEventListener('click', (e) => {
            // If clicked near a particle (simplified - would need actual particle detection)
            if (Math.random() < 0.1) { // 10% chance
                this.collectItem('star_fragment');
            }
        });
    }

    setupTerminalListener() {
        let typed = '';
        document.addEventListener('keypress', (e) => {
            if (document.activeElement.tagName === 'INPUT' ||
                document.activeElement.tagName === 'TEXTAREA') {
                return;
            }

            typed += e.key;
            if (typed.length > 15) {
                typed = typed.slice(-15);
            }

            if (typed.includes('sudo craft')) {
                this.collectItem('dr_cranium_catalyst');
                typed = '';
                this.showNotification('🔬 Dr. Cranium\'s Catalyst acquired!', 'success');
            }
        });
    }

    setupScrollListener() {
        let atBottom = false;
        let bottomTime = 0;

        window.addEventListener('scroll', () => {
            const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50;

            if (isAtBottom && !atBottom) {
                atBottom = true;
                bottomTime = Date.now();
            } else if (!isAtBottom) {
                atBottom = false;
            }

            if (atBottom && (Date.now() - bottomTime >= 3000)) {
                this.collectItem('aziza_blessing');
                atBottom = false;
            }
        });
    }

    setupFormListener() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            const message = document.getElementById('message')?.value || '';

            // Check if message contains wisdom keywords
            const wisdomWords = ['wisdom', 'knowledge', 'enlightenment', 'truth', 'understanding'];
            const hasWisdom = wisdomWords.some(word => message.toLowerCase().includes(word));

            if (hasWisdom) {
                this.collectItem('spring_water');
            }
        });
    }

    collectItem(itemId) {
        const item = this.scavengable_items[itemId];
        if (!item) return;

        // Check if already collected (except items with count > 1)
        const existing = this.inventory.filter(i => i === itemId);
        if (existing.length >= (item.count || 1)) {
            this.showNotification('You already have this item!', 'info');
            return;
        }

        this.inventory.push(itemId);
        this.saveInventory();

        // Show collection notification
        this.showCollectionNotification(item);

        // Dispatch event
        window.dispatchEvent(new CustomEvent('item-collected', {
            detail: { itemId, item }
        }));

        // Check if Aziza should comment
        if (window.masterStory) {
            this.azizaCommentOnCollection(itemId);
        }
    }

    azizaCommentOnCollection(itemId) {
        const comments = {
            desert_flower: 'Ah, you found the desert bloom. Beauty in unexpected places...',
            olive_oil: 'The oil of ancient groves. Good for lamps... and wisdom.',
            moonlight_dew: 'The moon\'s tears. Collect three, as I have shown you.',
            star_fragment: 'You caught a piece of heaven itself. Impressive.',
            dr_cranium_catalyst: 'The doctor\'s secret. He trusts you now...',
            elemental_essence_fire: 'Fire\'s essence. One of four you must gather.',
            aziza_blessing: 'You found my blessing at the foundation. You are learning...'
        };

        if (comments[itemId]) {
            setTimeout(() => {
                this.showAzizaNarration(comments[itemId]);
            }, 1500);
        }
    }

    showAzizaNarration(text) {
        const narration = document.createElement('div');
        narration.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, rgba(75, 0, 130, 0.95), rgba(138, 43, 226, 0.9));
            color: #DDA0DD;
            padding: 20px 30px;
            border-radius: 15px;
            border: 2px solid #DDA0DD;
            box-shadow: 0 10px 30px rgba(138, 43, 226, 0.4);
            z-index: 20000;
            max-width: 600px;
            text-align: center;
            font-style: italic;
            font-family: Georgia, serif;
            animation: azizaSpeak 0.5s ease-out;
        `;

        narration.innerHTML = `
            <div style="font-size: 12px; opacity: 0.8; margin-bottom: 5px;">AZIZA</div>
            <div style="font-size: 16px;">"${text}"</div>
        `;

        document.body.appendChild(narration);

        setTimeout(() => {
            narration.style.animation = 'azizaFade 0.5s ease-out';
            setTimeout(() => narration.remove(), 500);
        }, 5000);
    }

    showCollectionNotification(item) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4B0082, #8A2BE2);
            color: #DDA0DD;
            padding: 15px 25px;
            border-radius: 10px;
            border: 2px solid #DDA0DD;
            box-shadow: 0 5px 15px rgba(138, 43, 226, 0.3);
            z-index: 25000;
            animation: slideIn 0.5s ease-out;
        `;

        notification.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 5px;">✨ Item Acquired</div>
            <div style="font-size: 18px; margin-bottom: 5px;">${item.description}</div>
            <div style="font-size: 12px; opacity: 0.8;">Added to inventory</div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease-out';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    showNotification(message, type) {
        const colors = {
            success: '#00d4ff',
            info: '#8A2BE2',
            warning: '#FFD700',
            error: '#ff6b6b'
        };

        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: #000;
            padding: 15px 25px;
            border-radius: 8px;
            font-size: 16px;
            z-index: 30000;
            animation: slideIn 0.5s ease-out;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease-out';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    setupCraftingInterface() {
        // Add crafting button to interface (appears after first item collected)
        window.addEventListener('item-collected', () => {
            if (!document.getElementById('crafting-btn') && this.inventory.length > 0) {
                this.createCraftingButton();
            }
        });
    }

    createCraftingButton() {
        const btn = document.createElement('button');
        btn.id = 'crafting-btn';
        btn.textContent = '🧪 Craft';
        btn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4B0082, #8A2BE2);
            color: #DDA0DD;
            border: 2px solid #DDA0DD;
            padding: 15px 25px;
            border-radius: 50%;
            width: 70px;
            height: 70px;
            font-size: 24px;
            cursor: pointer;
            z-index: 15000;
            box-shadow: 0 5px 15px rgba(138, 43, 226, 0.4);
            transition: all 0.3s ease;
        `;

        btn.addEventListener('click', () => this.openCraftingInterface());
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.1) rotate(10deg)';
            btn.style.boxShadow = '0 10px 25px rgba(138, 43, 226, 0.6)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1) rotate(0deg)';
            btn.style.boxShadow = '0 5px 15px rgba(138, 43, 226, 0.4)';
        });

        document.body.appendChild(btn);
    }

    openCraftingInterface() {
        const modal = document.createElement('div');
        modal.id = 'crafting-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 20000;
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border: 3px solid #8A2BE2;
            border-radius: 15px;
            padding: 40px;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            color: #DDA0DD;
        `;

        content.innerHTML = `
            <h2 style="text-align: center; margin-bottom: 30px; font-size: 32px;">
                🧪 Aziza's Crafting Table
            </h2>
            <div style="margin-bottom: 30px;">
                <h3 style="font-size: 20px; margin-bottom: 15px;">Your Inventory (${this.inventory.length} items)</h3>
                <div class="inventory-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px;">
                    ${this.renderInventory()}
                </div>
            </div>
            <div>
                <h3 style="font-size: 20px; margin-bottom: 15px;">Available Recipes</h3>
                <div class="recipes-list">
                    ${this.renderRecipes()}
                </div>
            </div>
            <button onclick="document.getElementById('crafting-modal').remove()"
                    style="margin-top: 20px; padding: 10px 30px; background: #8A2BE2; color: #fff;
                           border: 2px solid #DDA0DD; border-radius: 8px; cursor: pointer; font-size: 16px;">
                Close
            </button>
        `;

        modal.appendChild(content);
        document.body.appendChild(modal);
    }

    renderInventory() {
        const itemCounts = {};
        this.inventory.forEach(item => {
            itemCounts[item] = (itemCounts[item] || 0) + 1;
        });

        return Object.entries(itemCounts).map(([itemId, count]) => {
            const item = this.scavengable_items[itemId];
            return `
                <div style="background: rgba(138, 43, 226, 0.2); padding: 10px; border-radius: 8px; border: 1px solid #8A2BE2; text-align: center;">
                    <div style="font-size: 12px; opacity: 0.8;">${item?.description || itemId}</div>
                    <div style="font-size: 18px; margin-top: 5px;">x${count}</div>
                </div>
            `;
        }).join('');
    }

    renderRecipes() {
        return Object.values(this.recipes).map(recipe => {
            const canCraft = this.canCraft(recipe);
            return `
                <div style="background: rgba(138, 43, 226, ${canCraft ? '0.3' : '0.1'});
                            padding: 15px; margin-bottom: 15px; border-radius: 10px;
                            border: 2px solid ${canCraft ? '#8A2BE2' : '#555'};">
                    <div style="font-size: 20px; margin-bottom: 10px;">${recipe.name}</div>
                    <div style="font-size: 14px; opacity: 0.8; margin-bottom: 10px;">${recipe.description}</div>
                    <div style="font-size: 12px; margin-bottom: 15px;">
                        <strong>Ingredients:</strong><br>
                        ${recipe.ingredients.map(ing => {
                            const has = this.countItem(ing.item);
                            const need = ing.quantity;
                            return `- ${this.scavengable_items[ing.item]?.description || ing.item}: ${has}/${need}`;
                        }).join('<br>')}
                    </div>
                    ${canCraft ? `
                        <button onclick="window.craftingSystem.craft('${recipe.result}')"
                                style="padding: 10px 20px; background: #8A2BE2; color: #fff; border: none;
                                       border-radius: 5px; cursor: pointer; font-size: 14px;">
                            Craft ${recipe.name}
                        </button>
                    ` : `
                        <div style="opacity: 0.5; font-style: italic;">Missing ingredients...</div>
                    `}
                </div>
            `;
        }).join('');
    }

    canCraft(recipe) {
        return recipe.ingredients.every(ing => {
            return this.countItem(ing.item) >= ing.quantity;
        });
    }

    countItem(itemId) {
        return this.inventory.filter(i => i === itemId).length;
    }

    craft(recipeId) {
        const recipe = this.recipes[recipeId];
        if (!recipe || !this.canCraft(recipe)) {
            this.showNotification('Cannot craft - missing ingredients!', 'error');
            return;
        }

        // Remove ingredients
        recipe.ingredients.forEach(ing => {
            for (let i = 0; i < ing.quantity; i++) {
                const index = this.inventory.indexOf(ing.item);
                if (index > -1) {
                    this.inventory.splice(index, 1);
                }
            }
        });

        // Add crafted item
        this.inventory.push(recipe.result);
        this.saveInventory();

        // Show success
        this.showNotification(`✨ Crafted ${recipe.name}!`, 'success');
        this.showAzizaNarration(`Well done. The ${recipe.name} is complete. Use it wisely...`);

        // Close and reopen to refresh
        document.getElementById('crafting-modal')?.remove();
        setTimeout(() => this.openCraftingInterface(), 500);

        // Dispatch event
        window.dispatchEvent(new CustomEvent('item-crafted', {
            detail: { recipeId, item: recipe.result }
        }));
    }

    hasItem(itemId) {
        return this.inventory.includes(itemId);
    }

    getInventory() {
        return [...this.inventory];
    }
}

// Add CSS animations
(function() {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
        @keyframes azizaSpeak {
            0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
            100% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes azizaFade {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }
        @keyframes slideIn {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            0% { transform: translateX(0); opacity: 1; }
            100% { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(styleEl);
})();

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.craftingSystem = new CraftingScavengerSystem();
    });
} else {
    window.craftingSystem = new CraftingScavengerSystem();
}
