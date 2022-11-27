import styles from './index.module.scss';
import { useContext} from 'react';
import { useForm } from 'react-hook-form';
import { Countdown } from '../Countdown';
import { ContextGlobal } from '../../contexts/Context';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

const Informations = zod.object({
    task: zod.string().min(1, 'Digite Algum Numero').max(100, 'Texto muito grande'),
    time: zod.number().min(1, 'Minímo 1 minuto').max(60, 'Máximo 60 minutos'),
});

type Information = zod.infer<typeof Informations>;

export function Form(){
    
    const { register, handleSubmit, watch, reset, formState, } = useForm<Information>({
        resolver: zodResolver(Informations),
        defaultValues: {
            task: '',
            time: 0,
          },
    });
    const {  handleCreateNewCycle,handleInterruptCycle,activeCycle   } = useContext(ContextGlobal)
    
    function CreateNewCycle(data: Information){
        handleCreateNewCycle(data);
        reset();
    }
    const task = watch('task')
    const isSubmitDisable = !task
    /* console.log(formState.errors) */
    return(
        
            <form onSubmit={handleSubmit((CreateNewCycle))}>

                <section>
                    <label className={styles.Task}>
                        <span>Vou trabalhar em </span>  
                        <input 
                            type="text"
                            {...register("task")}
                            name="task"
                            placeholder="Your name"
                        />
                    </label>

                    <label className={styles.Timer}>
                        <span> Durante </span> 
                        <input 
                            type="number"
                            {...register("time", {valueAsNumber: true})}
                            name="time"
                            placeholder="00"
                            maxLength={2}
                        />
                        <span> minutos.</span> 
                    </label>
                </section>

                <Countdown/>

                {activeCycle ? 
                (
                    <button onClick={handleInterruptCycle} type="button">
                        Interromper
                    </button>
                ) : 
                (
                    <button disabled={isSubmitDisable} type="submit">
                        Começar
                    </button>
                )}

            </form>
    );
}