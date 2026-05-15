// Info Bar Real-time Updates
class InfoBar {
    constructor() {
        this.init();
        this.startUpdates();
    }

    init() {
        this.updateTime();
        this.updatePM25();
        this.updateTraffic();
        this.updateWeather();
    }

    // Update Local Time
    updateTime() {
        const updateClock = () => {
            const now = new Date();
            const timeElement = document.getElementById('local-time');
            const dateElement = document.getElementById('local-date');
            
            if (timeElement) {
                const hours = now.getHours().toString().padStart(2, '0');
                const minutes = now.getMinutes().toString().padStart(2, '0');
                timeElement.textContent = `${hours}:${minutes}`;
            }
            
            if (dateElement) {
                const options = { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                };
                const thaiDate = now.toLocaleDateString('th-TH', options);
                dateElement.textContent = thaiDate;
            }
        };
        
        updateClock();
        setInterval(updateClock, 1000);
    }

    // Update PM2.5 Data
    async updatePM25() {
        try {
            // TODO: Replace with actual API call
            // const response = await fetch('/api/pm25');
            // const data = await response.json();
            
            // Simulated data for now
            const pm25Value = Math.floor(Math.random() * 100);
            const aqi = this.calculateAQI(pm25Value);
            
            const valueElement = document.getElementById('pm25-value');
            const statusElement = valueElement?.parentElement.querySelector('.info-status');
            const progressElement = document.querySelector('.pm25-progress');
            const detailElement = valueElement?.parentElement.parentElement.querySelector('.info-detail');
            
            if (valueElement) {
                valueElement.textContent = aqi;
            }
            
            if (detailElement) {
                detailElement.textContent = `PM2.5: ${pm25Value} µg/m³ • อัพเดท: เมื่อสักครู่`;
            }
            
            // Update status and color
            const status = this.getPM25Status(aqi);
            if (statusElement) {
                statusElement.textContent = status.text;
                statusElement.className = `info-status ${status.class}`;
            }
            
            // Update progress ring (น้อย = ดี, มาก = ไม่ดี)
            if (progressElement) {
                const percentage = Math.min(aqi / 500, 1); // Max AQI 500
                const circumference = 150.8;
                const offset = circumference - (percentage * circumference);
                progressElement.style.strokeDashoffset = offset;
                progressElement.className = `progress-ring-circle pm25-progress ${status.class}`;
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

    // Update Traffic Data (น้อย = ดี, มาก = ไม่ดี)
    async updateTraffic() {
        try {
            // TODO: Replace with actual API call
            // const response = await fetch('/api/traffic');
            // const data = await response.json();
            
            // Simulated data
            const statuses = [
                { text: 'ราบรื่น', class: 'smooth', progress: 20 },      // น้อย = ดี
                { text: 'ปานกลาง', class: 'moderate', progress: 55 },   // กลาง
                { text: 'หนาแน่น', class: 'heavy', progress: 85 }        // มาก = ไม่ดี
            ];
            
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            
            const valueElement = document.getElementById('traffic-value');
            const progressElement = document.querySelector('.traffic-progress');
            
            if (valueElement) {
                valueElement.textContent = randomStatus.text;
                valueElement.className = `info-value traffic-${randomStatus.class}`;
            }
            
            // Update progress ring (น้อย = ดี, มาก = ไม่ดี)
            if (progressElement) {
                const circumference = 150.8;
                const offset = circumference - ((randomStatus.progress / 100) * circumference);
                progressElement.style.strokeDashoffset = offset;
                progressElement.className = `progress-ring-circle traffic-progress ${randomStatus.class}`;
            }
            
        } catch (error) {
            console.error('Error updating traffic:', error);
        }
    }

    // Update Weather Data (น้อย = สบาย, มาก = ร้อน)
    async updateWeather() {
        try {
            // TODO: Replace with actual API call
            // const response = await fetch('/api/weather');
            // const data = await response.json();
            
            // Simulated data
            const temp = Math.floor(Math.random() * 10) + 25; // 25-35°C
            const humidity = Math.floor(Math.random() * 30) + 50;
            const wind = Math.floor(Math.random() * 15) + 5;
            
            const conditions = ['แดดจัด', 'มีเมฆบางส่วน', 'มีเมฆมาก', 'ฝนตกเล็กน้อย'];
            const condition = conditions[Math.floor(Math.random() * conditions.length)];
            
            const tempElement = document.getElementById('temp-value');
            const descElement = tempElement?.parentElement.querySelector('.weather-desc');
            const detailElement = tempElement?.parentElement.parentElement.querySelector('.info-detail');
            const progressElement = document.querySelector('.weather-progress');
            
            if (tempElement) {
                tempElement.textContent = temp;
            }
            
            if (descElement) {
                descElement.textContent = condition;
            }
            
            if (detailElement) {
                detailElement.textContent = `ความชื้น: ${humidity}% • ลม: ${wind} km/h • อัพเดท: เมื่อสักครู่`;
            }
            
            // Update progress ring based on temperature (น้อย = สบาย, มาก = ร้อน)
            // 25°C = 0%, 40°C = 100%
            if (progressElement) {
                const minTemp = 25;
                const maxTemp = 40;
                const percentage = Math.min(Math.max((temp - minTemp) / (maxTemp - minTemp), 0), 1);
                const circumference = 150.8;
                const offset = circumference - (percentage * circumference);
                progressElement.style.strokeDashoffset = offset;
                
                // เปลี่ยนสีตามอุณหภูมิ
                let tempClass = 'cool';
                if (temp >= 35) {
                    tempClass = 'hot';
                } else if (temp >= 30) {
                    tempClass = 'warm';
                }
                progressElement.className = `progress-ring-circle weather-progress ${tempClass}`;
            }
            
        } catch (error) {
            console.error('Error updating weather:', error);
        }
    }

    // Start periodic updates
    startUpdates() {
        // Update PM2.5 every 5 minutes
        setInterval(() => this.updatePM25(), 5 * 60 * 1000);
        
        // Update traffic every 2 minutes
        setInterval(() => this.updateTraffic(), 2 * 60 * 1000);
        
        // Update weather every 10 minutes
        setInterval(() => this.updateWeather(), 10 * 60 * 1000);
    }
}

// Initialize Info Bar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InfoBar();
});
