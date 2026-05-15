// Info Bar Real-time Updates
class InfoBar {
    constructor() {
        this.init();
        this.startUpdates();
    }

    init() {
        this.updatePM25();
        this.updateTraffic();
        this.updateTime();
    }

    // Update PM2.5 Data (แสดงเป็น %)
    async updatePM25() {
        try {
            // TODO: Replace with actual API call
            // const response = await fetch('/api/pm25');
            // const data = await response.json();
            
            // Simulated data
            const pm25Value = Math.floor(Math.random() * 100);
            const aqi = this.calculateAQI(pm25Value);
            
            // คำนวณเปอร์เซ็นต์ (0-100%)
            const percentage = Math.min(Math.round((aqi / 500) * 100), 100);
            
            const percentElement = document.getElementById('pm25-percent');
            
            if (percentElement) {
                percentElement.textContent = `${percentage}%`;
            }
            
        } catch (error) {
            console.error('Error updating PM2.5:', error);
        }
    }

    // Calculate AQI from PM2.5
    calculateAQI(pm25) {
        if (pm25 <= 12) return Math.round(pm25 * 4.17);
        if (pm25 <= 35.4) return Math.round(((pm25 - 12.1) / 23.3) * 49 + 51);
        if (pm25 <= 55.4) return Math.round(((pm25 - 35.5) / 19.9) * 49 + 101);
        if (pm25 <= 150.4) return Math.round(((pm25 - 55.5) / 94.9) * 99 + 151);
        if (pm25 <= 250.4) return Math.round(((pm25 - 150.5) / 99.9) * 99 + 201);
        return Math.round(((pm25 - 250.5) / 99.9) * 99 + 301);
    }

    // Update Traffic Data
    async updateTraffic() {
        try {
            // TODO: Replace with actual API call
            // const response = await fetch('/api/traffic');
            // const data = await response.json();
            
            // Simulated data
            const statuses = ['ปกติ', 'ปานกลาง', 'หนาแน่น'];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            
            const statusElement = document.getElementById('traffic-status');
            
            if (statusElement) {
                statusElement.textContent = randomStatus;
            }
            
        } catch (error) {
            console.error('Error updating traffic:', error);
        }
    }

    // Update Time
    updateTime() {
        const updateClock = () => {
            const now = new Date();
            const timeElement = document.getElementById('current-time');
            
            if (timeElement) {
                const hours = now.getHours();
                const minutes = now.getMinutes().toString().padStart(2, '0');
                const period = hours >= 12 ? 'น.' : 'น.';
                const displayHours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
                
                timeElement.textContent = `${displayHours}.${minutes} ${period}`;
            }
        };
        
        updateClock();
        setInterval(updateClock, 60000); // Update every minute
    }

    // Start periodic updates
    startUpdates() {
        // Update PM2.5 every 5 minutes
        setInterval(() => this.updatePM25(), 5 * 60 * 1000);
        
        // Update traffic every 2 minutes
        setInterval(() => this.updateTraffic(), 2 * 60 * 1000);
    }
}

// Initialize Info Bar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InfoBar();
});
