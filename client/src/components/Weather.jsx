import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind, Loader, AlertCircle } from 'lucide-react';

// Weather Icon Mapping (remains the same)
const weatherIcons = {
  0: Sun, 1: Sun, 2: Cloud, 3: Cloud, 45: Wind, 48: Wind, 51: CloudRain, 53: CloudRain, 55: CloudRain,
  61: CloudRain, 63: CloudRain, 65: CloudRain, 71: CloudSnow, 73: CloudSnow, 75: CloudSnow, 80: CloudRain,
  81: CloudRain, 82: CloudRain, 95: CloudLightning, 96: CloudLightning, 99: CloudLightning,
};

// Weather Condition Mapping in Hebrew
const weatherConditionsHebrew = {
    0: "שמיים בהירים",
    1: "בהיר בדרך כלל",
    2: "מעונן חלקית",
    3: "מעונן",
    45: "ערפל",
    48: "ערפל כפור",
    51: "טפטוף קל",
    53: "טפטוף בינוני",
    55: "טפטוף צפוף",
    61: "גשם קל",
    63: "גשם בינוני",
    65: "גשם כבד",
    71: "שלג קל",
    73: "שלג בינוני",
    75: "שלג כבד",
    80: "ממטרי גשם קלים",
    81: "ממטרי גשם בינוניים",
    82: "ממטרי גשם עזים",
    95: "סופת רעמים",
    96: "סופת רעמים עם ברד קל",
    99: "סופת רעמים עם ברד כבד"
};


export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('מאחזר מיקום...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Effect for updating date and time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Effect for fetching weather data on mount
  useEffect(() => {
    const fetchWeatherData = (lat, lon) => {
      // Using Open-Meteo API (no key required)
      const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
      
      fetch(weatherApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch weather data.');
            }
            return response.json();
        })
        .then(data => {
          setWeather({
            temperature: Math.round(data.current_weather.temperature),
            condition: weatherConditionsHebrew[data.current_weather.weathercode] || "לא ידוע",
            icon: weatherIcons[data.current_weather.weathercode] || AlertCircle,
            timezone: data.timezone,
          });
        })
        .catch(err => {
          console.error("Weather API error:", err);
          setError('לא ניתן היה לקבל נתוני מזג אוויר.');
        });
    };

    const fetchLocationName = (lat, lon) => {
        // Using Nominatim for reverse geocoding with Hebrew language preference
        const locationApiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=he`;

        fetch(locationApiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch location name.');
                }
                return response.json();
            })
            .then(data => {
                const city = data.address.city || data.address.town || data.address.village || 'אזור לא ידוע';
                const country = data.address.country || '';
                setLocation(`${city}, ${country}`);
            })
            .catch(err => {
                console.error("Location API error:", err);
                setLocation("מיקום לא זמין");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
          fetchLocationName(latitude, longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError('הגישה למיקום נדחתה. יש לאפשר אותה בהגדרות הדפדפן.');
          setLocation('מיקום מושבת');
          // Fallback to a default location if permission is denied
          fetchWeatherData(31.2529, 34.7915); // Arad, Israel as a fallback
          fetchLocationName(31.2529, 34.7915);
        }
      );
    } else {
      setError("שירותי מיקום אינם נתמכים בדפדפן זה.");
      setLocation('מיקום לא נתמך');
      setLoading(false);
    }
  }, []); // Empty dependency array means this runs once on mount

  // Loading State
  if (loading) {
    return (
      <div dir="rtl" className="bg-white/20 backdrop-blur-md p-4 rounded-2xl flex items-center justify-center space-x-4 h-full">
        <Loader size={48} className="text-white animate-spin" />
        <p className="text-white">טוען מזג אוויר...</p>
      </div>
    );
  }

  // Error State
  if (error) {
      return (
          <div dir="rtl" className="bg-red-500/50 backdrop-blur-md p-4 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 h-full">
              <AlertCircle size={40} className="text-white" />
              <p className="text-white font-semibold">שגיאה</p>
              <p className="text-white/90 text-sm">{error}</p>
          </div>
      );
  }
  
  // FIX: Add a check to ensure weather data is available before rendering
  if (!weather) {
    // This can happen in a transient state between loading and success
    return (
        <div dir="rtl" className="bg-white/20 backdrop-blur-md p-4 rounded-2xl flex items-center justify-center space-x-4 h-full">
            <Loader size={48} className="text-white animate-spin" />
            <p className="text-white">מעבד נתונים...</p>
        </div>
    );
  }

  // Success State
  const WeatherIcon = weather.icon;
  return (
    <div dir="rtl" className="bg-white/20 backdrop-blur-md p-4 rounded-2xl flex items-center justify-center space-x-4 h-full">
      {WeatherIcon && <WeatherIcon size={48} className="text-white ml-4" />}
      <div>
        <p className="text-3xl font-bold text-white">{weather.temperature}°C</p>
        <p className="text-white">{weather.condition}</p>
        <p className="text-white/80 text-sm">{location}</p>
        <p className="text-white/80 text-xs mt-2">
            {currentDateTime.toLocaleString('he-IL', {
                timeZone: weather.timezone,
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            })}
        </p>
      </div>
    </div>
  );
}
