import { Link, useLocation } from "react-router-dom";

import { routeLabels } from "./breadcrumb-labels";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const breadcrumbItems = pathnames.map((path, index) => {
    const fullPath = `/${pathnames.slice(0, index + 1).join("/")}`;
    return {
      path: fullPath,
      label:
        routeLabels[fullPath] || path.charAt(0).toUpperCase() + path.slice(1)
    };
  });

  return (
    <nav aria-label="breadcrumb" className="h-12 bg-white ps-4">
      <ul className="flex h-full items-center space-x-2">
        <li className="flex items-center justify-center">
          <Link to="/" className="font-medium text-gray-700 hover:text-primary">
            {/* <Home /> */}
            <img
              src="/images/icons/dashboard.png"
              alt="dashboard"
              width="18px"
            />
          </Link>
          <span className="mx-4 text-gray-500">
            <svg
              width="23"
              height="41"
              viewBox="0 0 23 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0.92965"
                y1="20.788"
                x2="21.0713"
                y2="0.646357"
                stroke="#D8E7F4"
              />
              <line
                x1="1.63676"
                y1="20.5046"
                x2="21.7784"
                y2="40.6463"
                stroke="#D8E7F4"
              />
            </svg>
          </span>
        </li>
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index !== 0 && (
              <span className="mx-5 text-gray-500">
                <svg
                  width="23"
                  height="41"
                  viewBox="0 0 23 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="0.92965"
                    y1="20.788"
                    x2="21.0713"
                    y2="0.646357"
                    stroke="#D8E7F4"
                  />
                  <line
                    x1="1.63676"
                    y1="20.5046"
                    x2="21.7784"
                    y2="40.6463"
                    stroke="#D8E7F4"
                  />
                </svg>
              </span>
            )}
            {index === breadcrumbItems.length - 1 ? (
              <span className="font-medium text-gray-700">{item.label}</span>
            ) : (
              <Link to={item.path} className="text-gray-700 hover:text-primary">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
