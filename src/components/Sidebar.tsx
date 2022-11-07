import { PencilLine } from 'phosphor-react';
import { Avatar } from './Avatar';

import styles from './styles/Sidebar.module.css';

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <img
                className={styles.cover}
                src="https://images.unsplash.com/photo-1597239450996-ea7c2c564412?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=40" />

            <div className={styles.profile}>
                <Avatar src='https://github.com/CarlosViniMSouza.png' />

                <strong>Carlos Souza</strong>
                <span>Full-Stack JS Developer</span>
            </div>

            <footer>
                <a href="#">
                    <PencilLine size={16} />
                    Edit Your Profile
                </a>
            </footer>
        </aside>
    );
}