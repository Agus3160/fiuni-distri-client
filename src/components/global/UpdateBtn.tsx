import { Edit } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  title?: string;
  to: string;
};

const UpdateBtn = ({ title, to }: Props) => {
  return (
    <Link
      title={title}
      to={to}
      className="btn btn-primary"
    >
      <Edit />
    </Link>
  );
};

export default UpdateBtn;
