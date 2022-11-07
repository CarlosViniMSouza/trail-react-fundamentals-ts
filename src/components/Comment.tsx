import { ThumbsUp, Trash } from 'phosphor-react';
import { useState } from 'react';
import { Avatar } from './Avatar';

import styles from './styles/Comment.module.css';

interface CommentProps {
    content: string;
    onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {

    const [countLikes, setLikeCount] = useState(0);

    function handleDeleteComment() {

        onDeleteComment(content);
    }

    function handleLikeComment() {
        setLikeCount((state) => {
            return state + 1;
        });
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false}
                src='https://github.com/CarlosViniMSouza.png'
            />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Carlos Souza</strong>
                            <time
                                title='03 October at 10:15h'
                                dateTime='2022-10-11 09:15:20'>
                                Há cerca de 2h
                            </time>
                        </div>
                        <button onClick={handleDeleteComment} title="Delete Comment">
                            <Trash size={24} />
                        </button>
                    </header>

                    <p> {content} </p>
                </div>

                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        Applaud <span> {countLikes} </span>
                    </button>
                </footer>
            </div>
        </div>
    )
}
