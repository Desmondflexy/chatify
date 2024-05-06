import myApi from "../api.config";
import { useState } from "react";
import { useForm } from "react-hook-form";


export default function FindFriendForm({ setVisibility }: FindFriendProps) {

  const [user, setUser] = useState<User | null>(null);
  const { register, handleSubmit } = useForm<FormInput>();


  return <div>
    <h2>Find a friend</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} type="email" placeholder="Enter friend's email" required />
      <input type="submit" value="Search" />
    </form>
    {user && <p>{user.displayName}</p>}
  </div>


  async function onSubmit(data: FormInput) {
    try {
      const response = await myApi.get(`/users?email=${data.email}`);
      setVisibility(false);
      setUser(response.data);

    } catch (error) {
      console.error(error);
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
}


interface FindFriendProps {
  setVisibility: (value: boolean) => void;
}