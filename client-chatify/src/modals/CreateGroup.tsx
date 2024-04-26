import {useForm} from 'react-hook-form';

interface GroupDataType {
  "name": string;
}

interface Prop {
  setFormVisible: (visible: boolean) => void;
}


export default function CreateGroupForm({setFormVisible}: Prop) {
  const {register, handleSubmit} = useForm<GroupDataType>();

  function createGroup(data: GroupDataType) {
    console.log(data);
    setFormVisible(false);
  }

  return <form onSubmit={handleSubmit(createGroup)}>
    <h3>Create a new group</h3>
    <input {...register("name")} placeholder="Group name" />
    <input type="submit"/>
  </form>
}