import styles from './index.module.scss';
import { Scroll, Play } from 'phosphor-react';
import { NavLink } from 'react-router-dom';
import SvgComponent from '../../assets/Logo';


export function Header(){
    return(
        <header className={styles.Header}>
            <SvgComponent className={styles.svg}/>
                <nav>
                    <button>
                        <NavLink to={`/`}>
                            <Play size={24} color='white'/>
                        </NavLink>
                    </button>

                    <button>
                        <NavLink to={`/about`} >
                            <Scroll size={24} color='white'/>
                        </NavLink>
                    </button>
                </nav>  
        </header>
    );
}