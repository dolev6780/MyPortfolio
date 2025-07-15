import React from 'react'
import { Folder, FileText, Mail, Gamepad2, Calculator as CalculatorIcon, Contact, MoreHorizontal, Home, Sun, Wifi, Battery, X, Divide, Minus, Plus, Percent, ArrowLeft, Cloud, CloudSun, CloudRain } from 'lucide-react';

export default function Weather() {
  const weather = {
        location: "Arad, South District",
        temperature: 32, // Celsius
        condition: "Sunny",
        icon: Sun,
    };

    return (
        <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl flex items-center space-x-4 h-full">
            <weather.icon size={48} className="text-white" />
            <div>
                <p className="text-3xl font-bold text-white">{weather.temperature}°C</p>
                <p className="text-white">{weather.condition}</p>
                <p className="text-white/80 text-sm">{weather.location}</p>
            </div>
        </div>
    );
}
