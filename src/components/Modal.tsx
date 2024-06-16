import Styles from './Modal.module.css';

interface PropsType {
    showModal: (value: boolean) => void;
    children: React.ReactNode;
}

export default function Modal({ showModal, children }: PropsType) {
    return <div className={Styles["modal"]}>
        <div className={Styles["modal-content"]}>
            {children}
            <button className={Styles.close} onClick={() => showModal(false)}>x</button>
        </div>
    </div>
}