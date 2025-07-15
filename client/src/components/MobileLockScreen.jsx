import React from 'react'

export default function MobileLockScreen() {
  const [dateTime, setDateTime] = useState(new Date('2025-07-15T15:44:00'));

    useEffect(() => {
        const timer = setInterval(() => setDateTime(d => new Date(d.getTime() + 1000)), 1000);
        return () => clearInterval(timer);
    }, []);

    const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const date = dateTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <div className="w-full h-full flex flex-col justify-between p-6 animate-fade-in">
            <StatusBar isLocked={true} />
            <div className="flex flex-col items-center text-center -mt-16">
                 <h1 className="text-8xl font-bold text-white mb-2">{time}</h1>
                 <p className="text-xl text-white/90">{date}</p>
                 <div className="mt-8">
                    <WeatherWidget />
                 </div>
            </div>
            <div className="flex flex-col items-center">
                 <button onClick={onUnlock} className="text-white font-semibold bg-white/20 backdrop-blur-md py-3 px-8 rounded-full">
                    Unlock
                </button>
            </div>
        </div>
    );
}
