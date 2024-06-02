import Styles from './Modal.module.css';

interface PropsType {
    setVisibility: (value: boolean) => void;
    children: React.ReactNode;
}

export default function Modal({ setVisibility, children }: PropsType) {
    return <div className={Styles["modal"]}>
        <div className={Styles["modal-content"]}>
            {children}
            <button className={Styles.close} onClick={() => setVisibility(false)}>x</button>
        </div>
    </div>
}