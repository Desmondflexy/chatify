import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";


export default function FindFriendForm({ setVisibility }: FindFriendProps) {
    const [state, setState] = useState<State>({
        user: null,
        result: ""
    })
    const { register, handleSubmit } = useForm<FormInput>();
    const navigate = useNavigate();

    return <div>
        <h2>Find a friend</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email")} type="email" placeholder="Enter friend's email" required />
            <input type="submit" value="Search" />
        </form>
        {state.result && <p>{state.result}</p>}
    </div>


    async function onSubmit(data: FormInput) {
        api.findUserByEmail(data.email).then(user => {
            setVisibility(false);
            api.startMessage(user._id, "")
                .then(res => navigate('/chat/' + res.chatId))
                .catch((err) => {
                    if (err.message !== 'text is required') {
                        console.error(err.message);
                    }
                });
            navigate("draft/" + user._id);
            setState(s => ({ ...s, result: user.displayName }));
        }).catch(error => {
            setState(s => ({ ...s, result: error.message }));
        });
    }

    interface FormInput {
        email: string;
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
    setVisibility: (value: boolean) => void;
}