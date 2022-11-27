import { useContext } from 'react';
import { ContextGlobal } from '../../contexts/Context';
import styles from './index.module.scss';
import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/esm/locale/pt-BR/index';
export function History(){
    const { cycles } = useContext(ContextGlobal);

    return(
            <div className={styles.Container}>
                <table>
                    <thead>
                        <tr>
                          <th>Tarefa</th>
                          <th>Duração</th>
                          <th>Início</th>
                          <th>Status</th>
                        </tr>
                    </thead>
                <tbody>
                    {cycles.map((cycle)=>{
                        return(
                            <tr key={cycle.id}>
                                <td>{cycle.task}</td>
                                <td>{cycle.minutes} minutos</td>
                                <td>{formatDistanceToNow(cycle.startDate, {addSuffix:true, locale:ptBR})}</td>
                                <td>
                                    {cycle.finishedDate && (<p>Concluido</p>)}

                                    {cycle.interruptedDate && (<p>Interrompido</p>)}

                                    {!cycle.finishedDate && !cycle.interruptedDate && (<p>Em andamento</p>)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}