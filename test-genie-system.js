const { chromium } = require('playwright');

async function testGenieSystem() {
    console.log('🧞 Starting Comprehensive Genie System Test');
    console.log('==========================================');

    const browser = await chromium.launch({
        headless: false,
        slowMo: 1000
    });

    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 }
    });

    const page = await context.newPage();

    try {
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');

        console.log('✅ Page loaded - Beginning Genie System Tests');

        // 1. GENIE POPUP FUNCTIONALITY TEST
        console.log('\n🪔 PHASE 1: Genie Popup Functionality Test');
        console.log('-------------------------------------------');

        // Look for genie trigger elements
        const genieTriggers = await page.locator('.genie-trigger, #genie-lamp, .lamp-icon, [data-genie], button:has-text("Genie")');
        const triggerCount = await genieTriggers.count();

        if (triggerCount > 0) {
            console.log(`✅ Found ${triggerCount} potential genie trigger(s)`);

            // Test clicking the first trigger
            await genieTriggers.first().click();
            console.log('✅ Genie trigger clicked');

            await page.waitForTimeout(2000);

            // Check if genie popup appears
            const geniePopup = await page.locator('.genie-popup, .genie-modal, .genie-container, #genie-interface');
            const popupAppears = await geniePopup.count() > 0;

            if (popupAppears) {
                console.log('✅ Genie popup appeared');

                // Check for genie character/animation
                const genieCharacter = await page.locator('.genie-character, .genie-avatar, .genie-animation');
                if (await genieCharacter.count() > 0) {
                    console.log('✅ Genie character/animation found');
                } else {
                    console.log('⚠️  No genie character/animation found');
                }

                // 2. GENIE RESPONSE OPTIONS TEST
                console.log('\n🗣️ PHASE 2: Genie Response Options Test');
                console.log('----------------------------------------');

                // Look for genie response options
                const responseOptions = await page.locator('.genie-option, .genie-response, button[data-genie-option]');
                const optionCount = await responseOptions.count();

                if (optionCount > 0) {
                    console.log(`✅ Found ${optionCount} genie response option(s)`);

                    // Test each response option
                    for (let i = 0; i < Math.min(optionCount, 5); i++) {
                        const option = await responseOptions.nth(i);
                        const optionText = await option.textContent();
                        console.log(`   Testing option ${i + 1}: "${optionText.trim().substring(0, 30)}..."`);

                        await option.click();
                        await page.waitForTimeout(1500);

                        // Check for genie response
                        const genieResponse = await page.locator('.genie-response-text, .genie-message, .genie-dialogue');
                        if (await genieResponse.count() > 0) {
                            const responseText = await genieResponse.textContent();
                            console.log(`   ✅ Genie responded: "${responseText.substring(0, 50)}..."`);
                        } else {
                            console.log('   ⚠️  No genie response detected');
                        }

                        await page.waitForTimeout(1000);
                    }
                } else {
                    console.log('⚠️  No genie response options found');
                }

                // 3. LAMP GIFT SYSTEM TEST
                console.log('\n🎁 PHASE 3: Lamp Gift System Test');
                console.log('----------------------------------');

                // Look for gift/reward elements
                const giftElements = await page.locator('.genie-gift, .lamp-gift, .magical-reward, [data-gift]');
                const giftCount = await giftElements.count();

                if (giftCount > 0) {
                    console.log(`✅ Found ${giftCount} potential gift element(s)`);

                    // Test gift interactions
                    for (let i = 0; i < Math.min(giftCount, 3); i++) {
                        const gift = await giftElements.nth(i);
                        console.log(`   Testing gift ${i + 1}`);

                        await gift.click();
                        await page.waitForTimeout(2000);

                        // Check for gift reveal/animation
                        const giftReveal = await page.locator('.gift-reveal, .reward-animation, .gift-content');
                        if (await giftReveal.count() > 0) {
                            console.log('   ✅ Gift reveal animation/content found');
                        }
                    }
                } else {
                    console.log('⚠️  No gift elements found');
                }

                // 4. AZIZA RIDDLE SYSTEM TEST
                console.log('\n🧩 PHASE 4: Aziza Riddle System Test');
                console.log('------------------------------------');

                // Look for Aziza-related elements
                const azizaElements = await page.locator('.aziza, [data-aziza], img[src*="aziza"], .riddle-container');
                const azizaCount = await azizaElements.count();

                if (azizaCount > 0) {
                    console.log(`✅ Found ${azizaCount} Aziza-related element(s)`);

                    // Test Aziza interactions
                    for (let i = 0; i < Math.min(azizaCount, 3); i++) {
                        const aziza = await azizaElements.nth(i);
                        console.log(`   Testing Aziza element ${i + 1}`);

                        await aziza.click();
                        await page.waitForTimeout(2000);

                        // Check for riddle content
                        const riddleContent = await page.locator('.riddle-text, .aziza-riddle, .wisdom-riddle, .riddle-question');
                        if (await riddleContent.count() > 0) {
                            const riddleText = await riddleContent.textContent();
                            console.log(`   ✅ Riddle found: "${riddleText.substring(0, 60)}..."`);

                            // Look for riddle answer options
                            const riddleOptions = await page.locator('.riddle-option, .riddle-answer, button[data-riddle-answer]');
                            const riddleOptionCount = await riddleOptions.count();

                            if (riddleOptionCount > 0) {
                                console.log(`   ✅ Found ${riddleOptionCount} riddle answer option(s)`);

                                // Test riddle answer
                                await riddleOptions.first().click();
                                await page.waitForTimeout(2000);

                                // Check for riddle response
                                const riddleResponse = await page.locator('.riddle-response, .riddle-result, .aziza-wisdom');
                                if (await riddleResponse.count() > 0) {
                                    const responseText = await riddleResponse.textContent();
                                    console.log(`   ✅ Riddle response: "${responseText.substring(0, 50)}..."`);
                                }
                            } else {
                                console.log('   ⚠️  No riddle answer options found');
                            }
                        } else {
                            console.log('   ⚠️  No riddle content found');
                        }
                    }
                } else {
                    console.log('⚠️  No Aziza-related elements found');
                }

                // 5. GENIE SYSTEM INTEGRATION TEST
                console.log('\n🔮 PHASE 5: Genie System Integration Test');
                console.log('-----------------------------------------');

                // Test genie with transcendental system
                const transcendentalInGenie = await page.locator('.genie-transcendental, [data-genie-transcendental]');
                if (await transcendentalInGenie.count() > 0) {
                    console.log('✅ Genie-Transcendental integration found');
                }

                // Test genie with easter eggs
                const genieEasterEggs = await page.locator('.genie-easter-egg, [data-genie-easter]');
                if (await genieEasterEggs.count() > 0) {
                    console.log('✅ Genie-Easter Egg integration found');
                }

                // Check for genie close functionality
                const closeButton = await page.locator('.genie-close, .close-genie, button:has-text("Close"), .modal-close');
                if (await closeButton.count() > 0) {
                    console.log('✅ Genie close button found');
                    await closeButton.click();
                    await page.waitForTimeout(1000);

                    const popupStillVisible = await geniePopup.count() > 0;
                    if (!popupStillVisible) {
                        console.log('✅ Genie popup closed successfully');
                    } else {
                        console.log('⚠️  Genie popup still visible after close');
                    }
                } else {
                    console.log('⚠️  No genie close button found');
                }

            } else {
                console.log('❌ Genie popup did not appear');
            }

        } else {
            console.log('❌ No genie trigger elements found');

            // Alternative: Look for any lamp or magic-related imagery
            console.log('🔍 Searching for alternative genie triggers...');

            const lampImages = await page.locator('img[src*="lamp"], img[alt*="lamp"], img[src*="genie"]');
            const magicElements = await page.locator('[class*="magic"], [class*="lamp"], [id*="genie"]');

            if (await lampImages.count() > 0) {
                console.log(`   Found ${await lampImages.count()} lamp-related images`);
                await lampImages.first().click();
                console.log('   ✅ Clicked lamp image');
                await page.waitForTimeout(2000);
            }

            if (await magicElements.count() > 0) {
                console.log(`   Found ${await magicElements.count()} magic-related elements`);
            }
        }

        // 6. JAVASCRIPT ERROR CHECK
        console.log('\n🔧 PHASE 6: JavaScript Error Check');
        console.log('-----------------------------------');

        // Check for JavaScript errors in console
        const logs = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                logs.push(msg.text());
            }
        });

        // Trigger some interactions to check for errors
        await page.click('body');
        await page.waitForTimeout(1000);

        if (logs.length > 0) {
            console.log('⚠️  JavaScript errors detected:');
            logs.forEach(log => console.log(`   ${log}`));
        } else {
            console.log('✅ No JavaScript errors detected');
        }

        console.log('\n✨ GENIE SYSTEM TEST COMPLETE');
        console.log('==============================');

    } catch (error) {
        console.error('❌ Test failed with error:', error.message);
    }

    await page.waitForTimeout(5000);
    await browser.close();
}

if (require.main === module) {
    testGenieSystem();
}

module.exports = { testGenieSystem };