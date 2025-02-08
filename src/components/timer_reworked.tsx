"use client";

import { useState, useEffect } from "react";

const Timer = () => {
    const defaultTime = 0.5;

    const [timeLeft, setTimeLeft] = useState(defaultTime * 60);
    const [timerRunning, setTimerRunning] = useState(false);
    const [startedFlag, setStartedFlag] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        
        // if timer running logic
        if(timerRunning) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);
        }

        // if timer done logic
        if (timeLeft == 0) {
            resetTimer();
        }

        return () => clearInterval(timer);
    }, [timerRunning, timeLeft]);

    const formatTime = (time: number) => {
        const hours = Math.floor((time / 60) / 60);
        
        const hoursStr = Math.floor((time / 60) / 60)
            .toString()
            .padStart(2, "0");
        const minutesStr = Math.floor((time / 60) / 60)
            .toString()
            .padStart(2, "0");
        const secondsStr = (time % 60)
            .toString()
            .padStart(2, "0");

        const timeStr = `
            ${hours > 0 ? `${hoursStr}:` : ''}
            ${minutesStr}:
            ${secondsStr}`;

        return timeStr;
    };

    const starTimer = () => {
        setTimerRunning(true);
        setStartedFlag(true);
    };
    const pauseTimer = () => setTimerRunning(false);
    const resetTimer = () => {
        setTimerRunning(false);
        setTimeLeft(defaultTime * 60);
    };

    // the reset button tailwind classes with logic
    const resetBtnClasses = () => {
        var bg = 'bg-neutral-600';
        var hoverBg = 'hover:bg-neutral-500';
        var textColor = 'text-white';

        if (startedFlag) {
            bg = 'bg-neutral-600/40';
            hoverBg = '';
            textColor = 'text-white/25'
        }

        return `
        px-8
        py-3
        rounded-xl
        font-sans
        text-xl
        font-semibold
        ${bg}
        ${hoverBg}
        ${textColor}`;
    };

    // main container tailwind classes
    const containerClasses = () => {
        return `
        w-96
        h-[305px]
        rounded-3xl
        
        flex flex-col
        items-center
        m-auto
        justify-center    

        md:bg-neutral-800
        lg:w-4/12
        text-white`;
    };

    const timeLeftClasses = () => {
        return `
        text-6xl
        font-sans
        mb-11
        font-semibold
        `;
    };

    const mainBtnValue = () => {
        return !timerRunning ? "Start" : "Pause";  
    };

    const mainBtnClasses = () => {
        var finalStr = "";
        
        if (!timerRunning) {
            finalStr = `
            px-8
            py-3
            font-sans
            text-xl
            font-semibold
            text-white
            rounded-xl
            border-green-400/25
            bg-green-500/40
            hover:bg-green-600
            `;
        } else {
            finalStr = `
            px-8
            py-3
            font-sans
            text-xl
            font-semibold
            bg-yellow-500/40
            hover:bg-yellow
            text-white
            rounded-xl
            `;
        }

        return finalStr;
    };

    return (
        <div className={containerClasses()}>
            <div className={timeLeftClasses()}>
                {formatTime(timeLeft)}
            </div>
            <div className="space-x-4">
                <button 
                    onClick={!timerRunning ? starTimer : pauseTimer}
                    className={mainBtnClasses()}
                >
                    {mainBtnValue()}
                </button>
                <button disabled={!startedFlag} className={resetBtnClasses()}>
                    Reset
                </button>
            </div>
        </div>
    )
}

export default Timer;