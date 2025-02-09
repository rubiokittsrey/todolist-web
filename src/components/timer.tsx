"use client";

import { useState, useEffect } from "react";

const Timer = () => {
    const defaultTime = 30;

    const [timeSet, setTimeSet] = useState("");
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
        const minutesStr = Math.floor((time / 60) % 60)
            .toString()
            .padStart(2, "0");
        const secondsStr = (time % 60)
            .toString()
            .padStart(2, "0");

        const timeStr = `
            ${hours > 0 ? `${hoursStr}:` : ''}${minutesStr}:${secondsStr}`;

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
        setStartedFlag(false);
    };

    // the reset button tailwind classes with logic
    const resetBtnClasses = () => {
        var bg = 'bg-neutral-600';
        var hoverBg = 'hover:bg-neutral-500';
        var textColor = 'text-white';

        if (!startedFlag) {
            bg = 'bg-neutral-600/40';
            hoverBg = '';
            textColor = 'text-white/25'
        }

        return `
        w-28
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
        
        flex flex-row
        items-center
        m-auto
        justify-center    

        md:bg-neutral-800
        lg:w-5/12
        xl:w-3/12
        text-white`;
    };

    const timeLeftClasses = () => {
        return `
        text-6xl
        font-sans
        mb-11
        font-semibold
        inline
        `;
    };

    const mainBtnValue = () => {
      var value = "Start";

      if (!timerRunning && startedFlag) {
        value = "Resume";
      } else if (!timerRunning && !startedFlag) {
        value = "Start";
      } else if (timerRunning) {
        value = "Pause";
      }
      
      return value;
    };

    const mainBtnClasses = () => {
        var finalStr = "";
        
        if (!timerRunning) {
            finalStr = `
            w-28
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
            w-28
            py-3
            font-sans
            text-xl
            font-semibold
            bg-yellow-500/40
            hover:bg-yellow-600/90
            text-white
            rounded-xl
            `;
        }

        return finalStr;
    };

    return (
        <div className={containerClasses()}>
            <div className="w-2/12">
                <button className="">
                    <svg fill="none" height="25px" width="25px" id="Layer_1" data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path className="cls-1" d="M8,6.5A1.5,1.5,0,1,1,6.5,8,1.5,1.5,0,0,1,8,6.5ZM.5,8A1.5,1.5,0,1,0,2,6.5,1.5,1.5,0,0,0,.5,8Zm12,0A1.5,1.5,0,1,0,14,6.5,1.5,1.5,0,0,0,12.5,8Z"/>
                    </svg>
                </button>
            </div>
            <div className="flex flex-col items-center w-8/12">
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
                    <button onClick={resetTimer} disabled={!startedFlag} className={resetBtnClasses()}>
                        Reset
                    </button>
                </div>
            </div>
            <div className="w-2/12 flex flex-col justify-start items-center h-full">
                <button className="mr-11 mt-9 fill-white/25 hover:fill-white">
                    <svg height="25px" width="25px" id="Layer_1" data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path className="cls-1" d="M8,6.5A1.5,1.5,0,1,1,6.5,8,1.5,1.5,0,0,1,8,6.5ZM.5,8A1.5,1.5,0,1,0,2,6.5,1.5,1.5,0,0,0,.5,8Zm12,0A1.5,1.5,0,1,0,14,6.5,1.5,1.5,0,0,0,12.5,8Z"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Timer;