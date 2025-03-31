import { Outlet } from "react-router-dom";

import ArticleNavbar from "./_components/article-navbar";

const ArticlePage = () => {
  return (
    <section>
      <ArticleNavbar />
      <div className="pb-5">
        <Outlet />
      </div>
    </section>
  );
};

export default ArticlePage;
