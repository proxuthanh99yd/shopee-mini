import PropTypes from "prop-types";
import { Link } from "react-router-dom";

Breadcrumb.propTypes = {
  currentLink: PropTypes.object,
  prevLinks: PropTypes.array,
};

export default function Breadcrumb({ currentLink, prevLinks }) {
  return (
    <div className="text-slate-400">
      <div className="flex items-center gap-1">
        {prevLinks.map((link) => (
          <div className="flex items-center gap-1" key={link.name}>
            <Link className="hover:text-slate-900" to={link.path}>
              {link.name}
            </Link>
            /
          </div>
        ))}
        <div>
          <Link
            className="text-slate-700 hover:text-slate-900"
            to={currentLink.path}
          >
            {currentLink.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
