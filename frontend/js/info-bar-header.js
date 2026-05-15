// Info Bar Header Real-time Updates
class InfoBarHeader {
    constructor() {
        this.init();
        this.startUpdates();
    }

    init() {
        this.updatePM25();
        this.updateTraffic();
        this.updateTemperature();
    }

    // Update PM2.5
    async updatePM25() {
        try {
            // TODO: Replace with actual API call
            // const response = await fetch('/api/pm25');
            // const data = await response.json();
            
            // Simulated data
            const pm25Raw = Math.floor(Math.random() * 100);
            const aqi = this.calculateAQI(pm25Raw);
            
            // Update value
            const valueElement = document.getElementById('header-pm25');
            if (valueElement) {
                valueElement.textContent = aqi;
            }
            
            // Update status
            const status = this.getPM25Status(aqi);
            const statusElement = document.getElementById('header-pm25-status');
            if (statusElement) {
                statusElement.textContent = status.text;
                statusElement.className = `info-bar-status ${status.class}`;
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

    // Get PM2.5 Status
    getPM25Status(aqi) {
        if (aqi <= 50) return { text: 'ดี', class: 'good' };
        if (aqi <= 100) return { text: 'ปานกลาง', class: 'moderate' };
        return { text: 'ไม่ดี', class: 'unhealthy' };
    }

    // Update Traffic
    async updateTraffic() {
        try {
            // TODO: Replace with actual API call
            // const response = await fetch('/api/traffic');
            // const data = await response.json();
            
            // Simulated data
            const statuses = [
                { text: 'ราบรื่น', class: 'smooth' },
                { text: 'ปานกลาง', class: 'moderate' },
                { text: 'หนาแน่น', class: 'unhealthy' }
            ];
            
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            
            // Update value
            const valueElement = document.getElementById('header-traffic');
            if (valueElement) {
                valueElement.textContent = randomStatus.text;
            }
            
            // Update status (always show Live for traffic)
            const statusElement = document.getElementById('header-traffic-status');
            if (statusElement) {
                statusElement.className = `info-bar-status ${randomStatus.class}`;
            }
            
        } catch (error) {
            console.error('Error updating traffic:', error);
        }
    }

    // Update Temperature
    async updateTemperature() {
        try {
            // TODO: Replace with actual API call
            // const response = await fetch('/api/weather');
            // const data = await response.json();
            
            // Simulated data
            const temp = Math.floor(Math.random() * 15) + 25; // 25-40°C
            
            // Update value
            const valueElement = document.getElementById('header-temp');
            if (valueElement) {
                valueElement.textContent = temp;
            }
            
            // Get status
            let status = { text: 'เย็นสบาย', class: 'good' };
            if (temp >= 35) {
                status = { text: 'ร้อนจัด', class: 'hot' };
            } else if (temp >= 30) {
                status = { text: 'อบอุ่น', class: 'warm' };
            }
            
            // Update status
            const statusElement = document.getElementById('header-temp-status');
            if (statusElement) {
                statusElement.textContent = status.text;
                statusElement.className = `info-bar-status ${status.class}`;
            }
            
        } catch (error) {
            console.error('Error updating temperature:', error);
        }
    }

    // Start periodic updates
    startUpdates() {
        // Update PM2.5 every 5 minutes
        setInterval(() => this.updatePM25(), 5 * 60 * 1000);
        
        // Update traffic every 2 minutes
        setInterval(() => this.updateTraffic(), 2 * 60 * 1000);
        
        // Update temperature every 10 minutes
        setInterval(() => this.updateTemperature(), 10 * 60 * 1000);
    }
}

// Initialize Info Bar Header when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InfoBarHeader();
});
