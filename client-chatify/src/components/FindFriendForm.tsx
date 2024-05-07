import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../utils/api";


export default function FindFriendForm({ setVisibility }: FindFriendProps) {

  const [state, setState] = useState<State>({
    user: null,
    result: ""
  })
  const { register, handleSubmit } = useForm<FormInput>();

  return <div>
    <h2>Find a friend</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} type="email" placeholder="Enter friend's email" required />
      <input type="submit" value="Search" />
    </form>
    {state.result && <p>{state.result}</p>}
  </div>


  async function onSubmit(data: FormInput) {
    try {
      const response = await api.findUserByEmail(data.email);
      console.log(response);
      setVisibility(true);
      setState(s => ({...s, result: response?.data.displayName}));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setState(s => ({...s, result: error.message}));
    }
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