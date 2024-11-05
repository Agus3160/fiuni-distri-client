import { Trash2 } from "lucide-react";

type Props = {
  deleteHandler: () => void;
  title?:string
};

const DeleteBtn = ({ deleteHandler, title }: Props) => {
  return (
    <button title={title} onClick={deleteHandler} type="button" className="btn btn-danger">
      <Trash2 />
    </button>
  );
};

export default DeleteBtn;
