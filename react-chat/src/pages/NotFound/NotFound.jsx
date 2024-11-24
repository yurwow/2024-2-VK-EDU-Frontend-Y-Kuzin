import styles from './NotFound.module.css'
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className={styles.container}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link className={styles.link} to='/'>Back</Link>
        </div>
    );
};

export default NotFound;
