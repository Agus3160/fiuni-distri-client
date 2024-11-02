import { Trash2 } from "lucide-react";

type Props = {
  onClick: () => Promise<void> | void;
};

const DeleteBtn = ({ onClick }: Props) => {
  return (
    <button onClick={onClick} type="button" className="btn btn-danger">
      <Trash2 />
    </button>
  );
};

export default DeleteBtn;
