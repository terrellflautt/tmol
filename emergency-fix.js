/**
 * EMERGENCY FIX - Prevents page-breaking errors
 * This file adds missing functions to prevent crashes
 */

(function() {
    'use strict';

    console.log('🚨 Emergency fix loaded - Disabling overlays');

    // Remove any full-screen overlays on page load
    function removeOverlays() {
        const overlays = document.querySelectorAll('[style*="position: fixed"], [style*="position:fixed"]');
        overlays.forEach(el => {
            const style = el.style;
            // Check if it covers the whole screen
            if ((style.width === '100%' || style.width === '100vw' ||
                 style.height === '100%' || style.height === '100vh' ||
                 (style.top === '0' && style.left === '0')) &&
                style.zIndex > 1000) {
                console.warn('🚫 Removing overlay:', el);
                el.remove();
            }
        });
    }

    // Run immediately and every 100ms for first 3 seconds
    removeOverlays();
    const intervalId = setInterval(removeOverlays, 100);
    setTimeout(() => clearInterval(intervalId), 3000);

    // Wait for page to load
    window.addEventListener('DOMContentLoaded', function() {

        // Fix InnerJourneyProgression if it exists
        if (window.InnerJourneyProgression && window.InnerJourneyProgression.prototype) {
            if (!window.InnerJourneyProgression.prototype.createReflectionOpportunities) {
                window.InnerJourneyProgression.prototype.createReflectionOpportunities = function() {
                    console.debug('🔧 Reflection opportunities placeholder');
                };
            }
        }

        // Fix ProgressiveCuriositySystem if it exists
        if (window.ProgressiveCuriositySystem && window.ProgressiveCuriositySystem.prototype) {
            if (!window.ProgressiveCuriositySystem.prototype.showPhaseNotification) {
                window.ProgressiveCuriositySystem.prototype.showPhaseNotification = function(message) {
                    console.debug('🔧 Phase notification:', message);
                };
            }
        }

        // Fix EternalDiscoveryVault if it exists
        if (window.EternalDiscoveryVault && window.EternalDiscoveryVault.prototype) {
            if (!window.EternalDiscoveryVault.prototype.generateClues) {
                window.EternalDiscoveryVault.prototype.generateClues = function() {
                    console.debug('🔧 Clues placeholder');
                    return [];
                };
            }
        }

        // Fix NeuralSymphony if it exists
        if (window.NeuralSymphony && window.NeuralSymphony.prototype) {
            window.NeuralSymphony.prototype.synchronizeNeuralElements = function() {
                // Safely handle symphonyElements
                if (this.symphonyElements && Array.isArray(this.symphonyElements)) {
                    this.symphonyElements.forEach(el => {
                        // Process elements
                    });
                }
            };
        }

        // Fix MagicUserSystem if it exists
        if (window.MagicUserSystem && window.MagicUserSystem.prototype) {
            if (!window.MagicUserSystem.prototype.getUserGoalProfile) {
                window.MagicUserSystem.prototype.getUserGoalProfile = function() {
                    return {
                        goals: [],
                        progress: 0
                    };
                };
            }
        }

        // Fix advanced animations if it exists
        if (window.AdvancedAnimations && window.AdvancedAnimations.prototype) {
            if (!window.AdvancedAnimations.prototype.setupSplitTextAnimations) {
                window.AdvancedAnimations.prototype.setupSplitTextAnimations = function() {
                    console.debug('🔧 Split text animations placeholder');
                };
            }
        }

        console.log('✅ Emergency fixes applied');
    });

    // Catch-all error handler to prevent page breaking
    window.addEventListener('error', function(e) {
        console.warn('⚠️ Error caught:', e.message);
        e.preventDefault(); // Prevent error from breaking page
        return true;
    });

})();
