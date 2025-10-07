const { chromium } = require('playwright');

async function manualTestJourney() {
    console.log('🧪 Manual Transcendental Journey Test');
    console.log('====================================');

    const browser = await chromium.launch({
        headless: false,
        slowMo: 2000, // Very slow for manual observation
    });

    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 }
    });

    const page = await context.newPage();

    // Enable console logging from the page
    page.on('console', msg => {
        if (msg.type() === 'log') {
            console.log(`🌐 Page: ${msg.text()}`);
        } else if (msg.type() === 'error') {
            console.log(`❌ Page Error: ${msg.text()}`);
        }
    });

    try {
        console.log('📍 Loading page...');
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');
        console.log('✅ Page loaded');

        // Find and click Begin Your Journey button
        console.log('🔍 Looking for Begin Your Journey button...');
        const journeyButton = page.locator('#transcendental-trigger');
        const buttonExists = await journeyButton.count() > 0;

        if (buttonExists) {
            console.log('✅ Found Begin Your Journey button');

            const buttonText = await journeyButton.textContent();
            console.log(`   Button text: "${buttonText.trim()}"`);

            console.log('🚀 Clicking Begin Your Journey...');
            await journeyButton.click();

            // Wait for overlay to appear
            await page.waitForTimeout(2000);

            // Check for overlay
            const overlay = page.locator('.transcendental-overlay');
            const overlayExists = await overlay.count() > 0;

            if (overlayExists) {
                console.log('✅ Transcendental overlay appeared!');

                // Check if overlay is visible
                const isVisible = await overlay.isVisible();
                console.log(`   Overlay visible: ${isVisible}`);

                // Look for question content
                const questionText = page.locator('.question-text');
                const questionExists = await questionText.count() > 0;

                if (questionExists) {
                    console.log('✅ Question found!');
                    const firstQuestion = await questionText.textContent();
                    console.log(`   Question: "${firstQuestion.substring(0, 80)}..."`);

                    // Look for answer options with correct selector
                    const answerOptions = page.locator('.option-btn');
                    const optionCount = await answerOptions.count();

                    if (optionCount > 0) {
                        console.log(`✅ Found ${optionCount} answer options!`);

                        // Display all options
                        for (let i = 0; i < optionCount; i++) {
                            const option = answerOptions.nth(i);
                            const optionText = await option.locator('.option-text').textContent();
                            console.log(`   Option ${i + 1}: "${optionText.substring(0, 50)}..."`);
                        }

                        // Test answering all 6 questions
                        console.log('\n🧠 Starting to answer questions...');

                        for (let questionNum = 0; questionNum < 6; questionNum++) {
                            console.log(`\n📝 Question ${questionNum + 1}/6`);

                            // Wait for question to load
                            await page.waitForSelector('.option-btn', { timeout: 5000 });

                            const currentOptions = page.locator('.option-btn');
                            const currentOptionCount = await currentOptions.count();

                            if (currentOptionCount > 0) {
                                console.log(`   Found ${currentOptionCount} options for question ${questionNum + 1}`);

                                // Click first option
                                await currentOptions.first().click();
                                console.log(`   ✅ Selected option 1`);

                                // Wait for transition to next question
                                await page.waitForTimeout(1000);

                                // Check progress
                                const progressText = page.locator('.progress-text');
                                if (await progressText.count() > 0) {
                                    const progress = await progressText.textContent();
                                    console.log(`   Progress: ${progress}`);
                                }
                            } else {
                                console.log(`   ❌ No options found for question ${questionNum + 1}`);
                                break;
                            }
                        }

                        // After all questions, wait for personalized content
                        console.log('\n🎨 Waiting for personalized content...');
                        await page.waitForTimeout(3000);

                        // Check for different types of content
                        const poemContent = page.locator('.wisdom-poem, .poem-text');
                        const songContent = page.locator('.song-lyrics');
                        const experienceContent = page.locator('.experience-container');

                        if (await poemContent.count() > 0) {
                            console.log('✅ Personalized poem content generated!');
                        }

                        if (await songContent.count() > 0) {
                            console.log('✅ Personalized song content generated!');
                        }

                        if (await experienceContent.count() > 0) {
                            console.log('✅ Experience container found!');
                        }

                        // Check for audio controls
                        const audioControls = page.locator('.audio-controls, .music-interface, .platform-btn');
                        if (await audioControls.count() > 0) {
                            console.log('✅ Audio/music interface found!');
                        }

                    } else {
                        console.log('❌ No answer options found');
                    }

                } else {
                    console.log('❌ No question text found');
                }

            } else {
                console.log('❌ No transcendental overlay appeared');
            }

        } else {
            console.log('❌ Begin Your Journey button not found');
        }

        console.log('\n✨ Manual test complete. Keeping browser open for 10 seconds...');
        await page.waitForTimeout(10000);

    } catch (error) {
        console.error(`❌ Test failed: ${error.message}`);
    }

    await browser.close();
}

if (require.main === module) {
    manualTestJourney();
}

module.exports = { manualTestJourney };