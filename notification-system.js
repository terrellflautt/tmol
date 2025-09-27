// Universal Notification System
// Replaces all intrusive popups with smooth, dismissible notifications

class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.container = null;
        this.init();
    }

    init() {
        // Create notification container
        this.container = document.createElement('div');
        this.container.className = 'notification-container';
        this.container.innerHTML = `
            <style>
                .notification-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10001;
                    pointer-events: none;
                }

                .notification {
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
                    border: 2px solid #667eea;
                    border-radius: 12px;
                    padding: 16px 20px;
                    margin-bottom: 12px;
                    color: #ffffff;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(10px);
                    max-width: 400px;
                    min-width: 300px;
                    opacity: 0;
                    transform: translateX(100%);
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    pointer-events: auto;
                    cursor: pointer;
                    position: relative;
                }

                .notification.show {
                    opacity: 1;
                    transform: translateX(0);
                }

                .notification.success {
                    border-color: #00ff88;
                    background: linear-gradient(135deg, #001a0d 0%, #002919 50%, #003d26 100%);
                }

                .notification.error {
                    border-color: #ff4757;
                    background: linear-gradient(135deg, #1a0a0a 0%, #2d1414 50%, #3d1a1a 100%);
                }

                .notification.warning {
                    border-color: #ffa502;
                    background: linear-gradient(135deg, #1a1607 0%, #2d260a 50%, #3d330e 100%);
                }

                .notification-icon {
                    display: inline-block;
                    margin-right: 8px;
                    font-size: 1.2rem;
                }

                .notification-text {
                    display: inline-block;
                    vertical-align: top;
                    line-height: 1.4;
                }

                .notification-close {
                    position: absolute;
                    top: 8px;
                    right: 12px;
                    background: none;
                    border: none;
                    color: rgba(255, 255, 255, 0.6);
                    cursor: pointer;
                    font-size: 18px;
                    line-height: 1;
                    padding: 0;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: color 0.2s;
                }

                .notification-close:hover {
                    color: rgba(255, 255, 255, 1);
                }

                @media (max-width: 480px) {
                    .notification-container {
                        left: 20px;
                        right: 20px;
                        top: 20px;
                    }

                    .notification {
                        min-width: auto;
                        max-width: none;
                    }
                }
            </style>
        `;
        document.body.appendChild(this.container);
    }

    show(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;

        const icons = {
            info: 'ℹ️',
            success: '✅',
            error: '❌',
            warning: '⚠️'
        };

        notification.innerHTML = `
            <span class="notification-icon">${icons[type] || icons.info}</span>
            <span class="notification-text">${message}</span>
            <button class="notification-close" type="button">×</button>
        `;

        // Add to container
        this.container.appendChild(notification);
        this.notifications.push(notification);

        // Show animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto dismiss
        const timeoutId = setTimeout(() => {
            this.dismiss(notification);
        }, duration);

        // Click to dismiss
        const clickHandler = () => {
            clearTimeout(timeoutId);
            this.dismiss(notification);
        };

        // Right-click to dismiss
        const rightClickHandler = (e) => {
            e.preventDefault();
            clearTimeout(timeoutId);
            this.dismiss(notification);
        };

        // Close button
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            clearTimeout(timeoutId);
            this.dismiss(notification);
        });

        notification.addEventListener('click', clickHandler);
        notification.addEventListener('contextmenu', rightClickHandler);

        return {
            dismiss: () => {
                clearTimeout(timeoutId);
                this.dismiss(notification);
            }
        };
    }

    dismiss(notification) {
        if (!notification.parentNode) return;

        notification.classList.remove('show');
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';

        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            const index = this.notifications.indexOf(notification);
            if (index > -1) {
                this.notifications.splice(index, 1);
            }
        }, 400);
    }

    success(message, duration = 4000) {
        return this.show(message, 'success', duration);
    }

    error(message, duration = 6000) {
        return this.show(message, 'error', duration);
    }

    warning(message, duration = 5000) {
        return this.show(message, 'warning', duration);
    }

    info(message, duration = 4000) {
        return this.show(message, 'info', duration);
    }

    // Replace global alert function
    static replaceAlerts() {
        if (window.originalAlert) return; // Already replaced

        window.originalAlert = window.alert;
        window.originalConfirm = window.confirm;

        const notifier = new NotificationSystem();

        window.alert = (message) => {
            notifier.info(message);
        };

        window.confirm = (message) => {
            // For confirmations, we'll show a notification and return true
            // This removes the blocking nature of confirm dialogs
            notifier.warning(message + ' (Auto-confirmed)');
            return true;
        };

        // Make notifier globally available
        window.notify = notifier;
    }
}

// Auto-initialize and replace alerts when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', NotificationSystem.replaceAlerts);
} else {
    NotificationSystem.replaceAlerts();
}