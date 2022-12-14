import styles from './index.module.scss';
import { useEffect, useContext } from 'react';
import { differenceInSeconds } from 'date-fns'
import { ContextGlobal } from '../../contexts/Context';

export function Countdown(){

    const {
        setAmountSecondsPassed, 
        amountSecondsPassed, 
        activeCycle, 
        activeCycleId, 
        markCurrentCycleAsFinished
    } = useContext(ContextGlobal);

    const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0;
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds/ 60);
    const secondsAmount = currentSeconds % 60;
    
    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');
    

    useEffect(() => {
        let interval: number

        if(activeCycle){
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(
                    new Date(),
                    activeCycle.startDate,
                )

                if(secondsDifference >= totalSeconds){
                    markCurrentCycleAsFinished();

                    setAmountSecondsPassed(totalSeconds)
                    clearInterval(interval);

                }else {
                    setAmountSecondsPassed(secondsDifference)
                }
            }, 1000)
        }
        return () => {
            clearInterval(interval);
        }

    },[activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished])

    useEffect(() => {
        if (activeCycle) {
          document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])
    
    return(
        <div>
           <span>{minutes[0]}</span>
           <span>{minutes[1]}</span>
           <span>:</span>
           <span>{seconds[0]}</span>
           <span>{seconds[1]}</span>
        </div>
    );
}