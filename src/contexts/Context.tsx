import { createContext, ReactNode, useState } from "react";

interface Information{
    task:string;
    time:number;
}

interface Cycle {
    id: string
    task: string
    minutes: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

interface CyclesContextType {
    cycles: Cycle[];
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    markCurrentCycleAsFinished: () => void
    amountSecondsPassed: number;
    setAmountSecondsPassed: React.Dispatch<React.SetStateAction<number>>
    handleCreateNewCycle:(data: Information) => void;
    handleInterruptCycle:() => void;
}

export const ContextGlobal = createContext({} as CyclesContextType);

interface ContextInterface {children: ReactNode;}

export function Context({children}: ContextInterface){
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
    
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function handleInterruptCycle() {
        setCycles((state) =>
          state.map((cycle) => {
            if (cycle.id === activeCycleId) {
              return { ...cycle, interruptedDate: new Date() }
            } else {
              return cycle
            }
          }),
        )
        setActiveCycleId(null)
    }

    function markCurrentCycleAsFinished() {
        setCycles((state) =>
          state.map((cycle) => {
            if (cycle.id === activeCycleId) {
              return { ...cycle, finishedDate: new Date() }
            } else {
              return cycle
            }
          }),
        )
    }

    function handleCreateNewCycle(data: Information) {
        const id = String(new Date().getTime())
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutes: data.time,
            startDate: new Date(),
          }
          setCycles((state) => [...state, newCycle]);
          setActiveCycleId(id)
          setAmountSecondsPassed(0)
    }
    return (
        <ContextGlobal.Provider value={{
            activeCycle,
            activeCycleId,
            amountSecondsPassed,
            cycles,
            handleCreateNewCycle,
            handleInterruptCycle,
            markCurrentCycleAsFinished,
            setAmountSecondsPassed,
        }}>
            {children}
        </ContextGlobal.Provider>
    );
}
