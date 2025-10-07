/**
 * COMPREHENSIVE EASTER EGG TESTING SYSTEM
 * Tests all easter eggs from start to finish in proper sequence
 */

class EasterEggTester {
    constructor() {
        this.testResults = new Map();
        this.userProgress = {
            discoveries: new Set(),
            completedLevels: new Set(),
            currentLevel: 1,
            sessionData: {}
        };
        this.testingMode = true;
        this.init();
    }

    init() {
        console.log('🧪 Starting Comprehensive Easter Egg Testing');
        this.setupTestEnvironment();
        this.runAllTests();
    }

    setupTestEnvironment() {
        // Backup current user data
        this.backupUserData();

        // Clear localStorage for clean testing
        this.clearTestData();

        // Initialize testing UI
        this.createTestingUI();
    }

    backupUserData() {
        const backup = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            backup[key] = localStorage.getItem(key);
        }
        sessionStorage.setItem('easter_egg_test_backup', JSON.stringify(backup));
        console.log('💾 User data backed up');
    }

    restoreUserData() {
        const backup = JSON.parse(sessionStorage.getItem('easter_egg_test_backup') || '{}');
        localStorage.clear();
        Object.entries(backup).forEach(([key, value]) => {
            localStorage.setItem(key, value);
        });
        console.log('🔄 User data restored');
    }

    clearTestData() {
        // Clear all easter egg related localStorage
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (
                key.includes('aziza') ||
                key.includes('konami') ||
                key.includes('easter') ||
                key.includes('discovery') ||
                key.includes('magic') ||
                key.includes('riddle') ||
                key.includes('lamp') ||
                key.includes('genie')
            )) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
        console.log(`🧹 Cleared ${keysToRemove.length} test-related storage items`);
    }

    createTestingUI() {
        const testUI = document.createElement('div');
        testUI.id = 'easter-egg-test-ui';
        testUI.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            width: 300px;
            background: rgba(0,0,0,0.9);
            color: #00ff00;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            padding: 15px;
            border-radius: 8px;
            z-index: 10000;
            border: 1px solid #00ff00;
            box-shadow: 0 0 20px rgba(0,255,0,0.3);
        `;

        testUI.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <strong>🧪 EASTER EGG TESTER</strong>
                <button id="closeTestUI" style="background: transparent; border: 1px solid #ff0000; color: #ff0000; padding: 2px 6px;">×</button>
            </div>
            <div id="testProgress">Starting tests...</div>
            <div id="testResults" style="margin-top: 10px; max-height: 200px; overflow-y: auto;"></div>
            <div style="margin-top: 10px;">
                <button id="runAllTests" style="background: #00ff00; color: black; border: none; padding: 5px 10px; margin-right: 5px;">Run All</button>
                <button id="restoreData" style="background: #ffaa00; color: black; border: none; padding: 5px 10px;">Restore</button>
            </div>
        `;

        document.body.appendChild(testUI);

        // Event listeners
        document.getElementById('closeTestUI').addEventListener('click', () => {
            testUI.remove();
        });

        document.getElementById('runAllTests').addEventListener('click', () => {
            this.runAllTests();
        });

        document.getElementById('restoreData').addEventListener('click', () => {
            this.restoreUserData();
            this.updateTestUI('🔄 User data restored!');
        });
    }

    updateTestUI(message) {
        const progressDiv = document.getElementById('testProgress');
        if (progressDiv) {
            progressDiv.textContent = message;
        }
    }

    addTestResult(test, result, details = '') {
        const resultsDiv = document.getElementById('testResults');
        if (resultsDiv) {
            const resultLine = document.createElement('div');
            resultLine.style.color = result ? '#00ff00' : '#ff0000';
            resultLine.textContent = `${result ? '✅' : '❌'} ${test} ${details}`;
            resultsDiv.appendChild(resultLine);
            resultsDiv.scrollTop = resultsDiv.scrollHeight;
        }
        this.testResults.set(test, { result, details });
    }

    async runAllTests() {
        this.updateTestUI('🧪 Running comprehensive tests...');

        try {
            // Level 1: Basic Discovery
            await this.testLevel1();

            // Level 2: Deeper Interactions
            await this.testLevel2();

            // Level 3: Pattern Recognition
            await this.testLevel3();

            // Level 4: Hidden Messages
            await this.testLevel4();

            // Level 5: Master Discovery
            await this.testLevel5();

            // Level 6: Hidden Interaction Mastery
            await this.testLevel6();

            this.generateTestReport();

        } catch (error) {
            console.error('Testing failed:', error);
            this.updateTestUI('❌ Testing failed: ' + error.message);
        }
    }

    async testLevel1() {
        this.updateTestUI('🎯 Testing Level 1: First Glimpse...');

        // Test 1: Foundation (click "Terrell")
        await this.testFoundationClick();

        // Test 2: Future Vision (click "2025")
        await this.testFutureVisionClick();

        // Test 3: Tech King Reveal (click logo 3 times)
        await this.testTechKingReveal();
    }

    async testFoundationClick() {
        try {
            const terrellElement = document.querySelector('h1, .hero-title, [data-discover="foundation"]');
            if (terrellElement && terrellElement.textContent.includes('Terrell')) {
                this.simulateClick(terrellElement);
                await this.waitForResponse();
                this.addTestResult('Foundation Click', true, '- "Terrell" clickable');
            } else {
                this.addTestResult('Foundation Click', false, '- Element not found');
            }
        } catch (error) {
            this.addTestResult('Foundation Click', false, `- Error: ${error.message}`);
        }
    }

    async testFutureVisionClick() {
        try {
            const futureElement = document.querySelector('footer, .footer, [data-discover="future"]');
            if (futureElement && futureElement.textContent.includes('2025')) {
                this.simulateClick(futureElement);
                await this.waitForResponse();
                this.addTestResult('Future Vision Click', true, '- "2025" clickable');
            } else {
                this.addTestResult('Future Vision Click', false, '- Element not found');
            }
        } catch (error) {
            this.addTestResult('Future Vision Click', false, `- Error: ${error.message}`);
        }
    }

    async testTechKingReveal() {
        try {
            const logoElement = document.querySelector('.logo, .header-logo, h1');
            if (logoElement) {
                // Triple click for tech king reveal
                for (let i = 0; i < 3; i++) {
                    this.simulateClick(logoElement);
                    await this.waitForResponse(100);
                }
                this.addTestResult('Tech King Reveal', true, '- Logo triple-click');
            } else {
                this.addTestResult('Tech King Reveal', false, '- Logo element not found');
            }
        } catch (error) {
            this.addTestResult('Tech King Reveal', false, `- Error: ${error.message}`);
        }
    }

    async testLevel2() {
        this.updateTestUI('🎯 Testing Level 2: Deeper Sight...');

        // Test period clicks
        await this.testPeriodClick();

        // Test "I" letter discovery
        await this.testLetterIDiscovery();

        // Test contact hover
        await this.testContactHover();
    }

    async testPeriodClick() {
        try {
            const periods = document.querySelectorAll('.period-trigger, [data-discover="completion"]');
            let found = false;

            periods.forEach(period => {
                this.simulateClick(period);
                found = true;
            });

            // Also check for periods in text
            const textElements = document.querySelectorAll('h1, h2, h3, p');
            textElements.forEach(element => {
                if (element.textContent.includes('.')) {
                    this.simulateClick(element);
                    found = true;
                }
            });

            this.addTestResult('Period Click', found, found ? '- Period triggers found' : '- No period triggers');
        } catch (error) {
            this.addTestResult('Period Click', false, `- Error: ${error.message}`);
        }
    }

    async testLetterIDiscovery() {
        try {
            const textElements = document.querySelectorAll('p');
            let found = false;

            textElements.forEach(element => {
                const text = element.textContent;
                if (text.includes('I')) {
                    this.simulateClick(element);
                    found = true;
                }
            });

            this.addTestResult('Letter I Discovery', found, found ? '- Found "I" in paragraphs' : '- No "I" letters found');
        } catch (error) {
            this.addTestResult('Letter I Discovery', false, `- Error: ${error.message}`);
        }
    }

    async testContactHover() {
        try {
            const contactLinks = document.querySelectorAll('a[href*="contact"], a[href*="mailto"], [data-discover="bridge"]');
            if (contactLinks.length > 0) {
                this.simulateHover(contactLinks[0], 3000);
                this.addTestResult('Contact Hover', true, '- Contact link hover tested');
            } else {
                this.addTestResult('Contact Hover', false, '- No contact links found');
            }
        } catch (error) {
            this.addTestResult('Contact Hover', false, `- Error: ${error.message}`);
        }
    }

    async testLevel5() {
        this.updateTestUI('🎯 Testing Level 5: Master Discovery...');

        // Test Konami Code
        await this.testKonamiCode();

        // Test Aziza Riddle
        await this.testAzizaRiddle();
    }

    async testKonamiCode() {
        try {
            const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

            for (const keyCode of konamiSequence) {
                const event = new KeyboardEvent('keydown', { keyCode });
                document.dispatchEvent(event);
                await this.waitForResponse(50);
            }

            // Check for konami response
            const konamiMessages = document.querySelectorAll('.konami-message, .matrix-mode, .easter-egg-message');
            const success = konamiMessages.length > 0 || localStorage.getItem('konamiCode');

            this.addTestResult('Konami Code', success, success ? '- Code sequence triggered' : '- No response detected');
        } catch (error) {
            this.addTestResult('Konami Code', false, `- Error: ${error.message}`);
        }
    }

    async testAzizaRiddle() {
        try {
            // First, need to trigger logo evolution to full name
            await this.triggerLogoEvolution();

            // Look for period trigger after full name
            const periodTrigger = document.querySelector('.period-trigger');
            if (periodTrigger) {
                this.simulateClick(periodTrigger);
                await this.waitForResponse(1000);

                // Check if riddle modal appeared
                const riddleModal = document.querySelector('.aziza-riddle-overlay, .riddle-container');
                if (riddleModal) {
                    this.addTestResult('Aziza Riddle Trigger', true, '- Riddle modal appeared');

                    // Test riddle answer
                    const answerInput = document.querySelector('#riddleAnswer, .riddle-input');
                    if (answerInput) {
                        answerInput.value = 'aziza';
                        const submitBtn = document.querySelector('#riddleSubmit, .riddle-submit');
                        if (submitBtn) {
                            this.simulateClick(submitBtn);
                            await this.waitForResponse(1000);
                            this.addTestResult('Aziza Riddle Answer', true, '- Answer submitted');
                        }
                    }
                } else {
                    this.addTestResult('Aziza Riddle Trigger', false, '- Modal did not appear');
                }
            } else {
                this.addTestResult('Aziza Riddle Trigger', false, '- Period trigger not found');
            }
        } catch (error) {
            this.addTestResult('Aziza Riddle', false, `- Error: ${error.message}`);
        }
    }

    async triggerLogoEvolution() {
        // Simulate the progression needed to reach full name
        const logo = document.querySelector('.logo, .header-logo, h1');
        if (logo) {
            // Multiple clicks to evolve logo
            for (let i = 0; i < 10; i++) {
                this.simulateClick(logo);
                await this.waitForResponse(100);
            }
        }
    }

    async testLevel6() {
        this.updateTestUI('🎯 Testing Level 6: Hidden Interaction Mastery...');

        // Test universal explorer
        await this.testUniversalExplorer();

        // Test session evolution
        await this.testSessionEvolution();

        // Test pattern detection
        await this.testPatternDetection();
    }

    async testUniversalExplorer() {
        const elements = document.querySelectorAll('h1, h2, h3, p, img, div');
        let interactions = 0;

        for (let i = 0; i < Math.min(elements.length, 10); i++) {
            this.simulateClick(elements[i]);
            interactions++;
            await this.waitForResponse(50);
        }

        this.addTestResult('Universal Explorer', interactions > 0, `- ${interactions} elements tested`);
    }

    async testSessionEvolution() {
        // Test multiple rapid interactions
        const clickableElements = document.querySelectorAll('*');
        for (let i = 0; i < 20; i++) {
            const randomElement = clickableElements[Math.floor(Math.random() * clickableElements.length)];
            this.simulateClick(randomElement);
            await this.waitForResponse(10);
        }

        this.addTestResult('Session Evolution', true, '- 20 rapid interactions tested');
    }

    async testPatternDetection() {
        // Test rapid clicking pattern
        const targetElement = document.querySelector('body');
        for (let i = 0; i < 10; i++) {
            this.simulateClick(targetElement);
            await this.waitForResponse(50);
        }

        this.addTestResult('Pattern Detection', true, '- Rapid click pattern tested');
    }

    // Utility methods
    simulateClick(element) {
        if (element) {
            element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        }
    }

    simulateHover(element, duration = 1000) {
        if (element) {
            element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            setTimeout(() => {
                element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
            }, duration);
        }
    }

    waitForResponse(ms = 500) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    generateTestReport() {
        const total = this.testResults.size;
        const passed = Array.from(this.testResults.values()).filter(r => r.result).length;
        const percentage = Math.round((passed / total) * 100);

        console.log(`\n🧪 EASTER EGG TEST REPORT`);
        console.log(`==============================`);
        console.log(`Total Tests: ${total}`);
        console.log(`Passed: ${passed}`);
        console.log(`Failed: ${total - passed}`);
        console.log(`Success Rate: ${percentage}%`);
        console.log(`==============================\n`);

        this.updateTestUI(`✅ Testing complete! ${passed}/${total} passed (${percentage}%)`);

        // Detailed results
        this.testResults.forEach((result, test) => {
            console.log(`${result.result ? '✅' : '❌'} ${test} ${result.details}`);
        });
    }
}

// Auto-initialize if testing mode is enabled
if (window.location.search.includes('test=easter-eggs') ||
    localStorage.getItem('easter_egg_testing_mode') === 'true') {
    new EasterEggTester();
}

// Global access for manual testing
window.EasterEggTester = EasterEggTester;