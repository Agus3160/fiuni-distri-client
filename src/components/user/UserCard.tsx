import { useState } from "react";
import { UserDto } from "../../lib/api/user/user.types";
import DeleteBtn from "../global/DeleteBtn";
import UpdateBtn from "../global/UpdateBtn";
import Modal from "../global/Modal";

type Props = {
  user: UserDto;
  deleteHandler: () => void;
};

const UserCard = ({ user, deleteHandler }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);

  const handleSubmitModal = () => {
    deleteHandler();
    setShowModal(false);
  };
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      {showModal && (
        <Modal
          type="danger"
          title="Eliminar usuario"
          body="¿Deseas eliminar este usuario?"
          cancelText="Cancelar"
          submitText="Eliminar usuario"
          onClose={handleCloseModal}
          onSubmit={handleSubmitModal}
        />
      )}

      <div className="d-flex flex-column shadow bg-light-subtle rounded p-3">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="m-0">{user.username}</h3>
          <div className="d-flex align-items-center gap-2">
            <UpdateBtn
              title="Actualizar usuario"
              to={`/user/update/${user.id}`}
            />
            <DeleteBtn
              title="Eliminar usuario"
              deleteHandler={handleShowModal}
            />
          </div>
        </div>
        <hr className="h-1"></hr>
        <p>
          <strong>Email</strong>: {user.email}
        </p>
        <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between justify-content-sm-between w-100">
          <div className="d-flex gap-2 align-items-center flex-wrap">
            {user.roles.length > 0 &&
              user.roles.map((role) => (
                <span key={role} className="badge text-bg-secondary">
                  {role}
                </span>
              ))}
          </div>
          <p className="text-xs m-0 text-secondary text-end">
            Created at: {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </>
  );
};

export default UserCard;
