import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";


export default function FindFriendForm({ showModal }: FindFriendProps) {
    const [state, setState] = useState<State>({
        user: null,
        result: ""
    })
    const { register, handleSubmit } = useForm<FormInput>();
    const navigate = useNavigate();

    const onSubmit = async (data: FormInput) => {
        try {
            const user = await api.findUserByCPin(data.cPin);
            showModal(false);
            navigate("draft?cPin=" + data.cPin);
            setState(s => ({ ...s, result: user.displayName }));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setState(s => ({ ...s, result: error.message }));
            setTimeout(() => {
                setState(s => ({ ...s, result: "" }));
            }, 2000);
        }

    };

    return (
        <div>
            <h2>Find a friend</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("cPin")} placeholder="Enter friend's cPin" required />
                <input type="submit" value="Search" />
            </form>
            {state.result && <p>{state.result}</p>}
        </div>
    );

    interface FormInput {
        cPin: string;
    }

    interface User {
        id: string;
        email: string;
        displayName: string;
    }

    interface State {
        user: User | null;
        result: string;
    }
}


interface FindFriendProps {
    showModal: (value: boolean) => void;
}