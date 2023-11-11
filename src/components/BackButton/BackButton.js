import { useNavigate } from "react-router-dom";
import "./BackButton.css";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";

export const BackButton = ({ Root }) => {
  return (
    <Link to={`/${Root}`}>
      <button className="back-button" type="button">
        Back to List{" "}
        <AiIcons.AiOutlineRollback
          style={{ width: "20px", marginLeft: "10px" }}
        />
      </button>
    </Link>
  );
};
