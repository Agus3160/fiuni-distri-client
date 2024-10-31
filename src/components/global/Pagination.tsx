import { PageProps } from "../../lib/definitions";

type Props = {
  page: PageProps;
};

const Pagination = ({
  page
}: Props) => {

  const { number, totalPages } = page;
  const changePage = (currentPage: number, type:"next" | "prev") => {
    if(currentPage + 1 > totalPages || currentPage + 1 < 1) return currentPage;
    return type === "next" ? currentPage + 1 : currentPage - 1
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item disabled">
          <a className="page-link">Previous</a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
