const DeleteModal = ({ userId, stockId, handleDeleteStock }) => {
  const handleDelete = () => {
    handleDeleteStock(userId, stockId);
    document.getElementById("my_modal_5").close();
  };
  return (
    <div>
      <button
        className="btn text-red-500 border-red-600 hover:border-red-800 text-xs"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        Delete
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">
            Are you sure you want to delete this stock record?
          </p>
          <div className="modal-action">
            <button
              className="btn bg-red-600 hover:bg-red-800"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="btn"
              onClick={() => document.getElementById("my_modal_5").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DeleteModal;
