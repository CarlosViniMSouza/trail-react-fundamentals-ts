import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './styles/Post.module.css';
import ptBR from 'date-fns/locale/pt-br';

import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';

interface Author {
    name: string;
    role: string;
    avatarURL: string;
}

interface Content {
    type: 'link' | 'paragraph';
    content: string;
}

interface PostPros {
    author: Author;
    publishedAt: Date;
    content: Content[];
}

export function Post({ author, publishedAt, content }: PostPros) {
    const [comments, setComments] = useState([
        'Post da hora!',
    ]);

    const [newCommentText, setNewCommentText] = useState('');

    const pubDataFormat = format(
        publishedAt,
        "d LLLL 'as' HH:mm'h'",
        { locale: ptBR }
    );

    const pubDateRelativeToNow = formatDistanceToNow(
        publishedAt, {
        locale: ptBR,
        addSuffix: true,
    }
    );

    const isNewCommentEmpty = newCommentText.length === 0;

    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete;
        });

        setComments(commentsWithoutDeletedOne);
    }

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();

        setComments([...comments, newCommentText]);
        setNewCommentText('');
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');

        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Required field');
    }

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarURL} />
                    <div className={styles.authorInfo}>
                        <strong> {author.name} </strong>
                        <span> {author.role} </span>
                    </div>
                </div>

                <time
                    title={pubDataFormat}
                    dateTime={publishedAt.toISOString()}>
                    {pubDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>
                    } else if (line.type === 'link') {
                        return <p key={line.content}><a href="#">{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Leave your Feedback</strong>

                <textarea
                    name="comment"
                    placeholder='Leave an comment'
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>
                        Publish
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment
                            key={comment}
                            content={comment}
                            onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>
        </article>
    )
}