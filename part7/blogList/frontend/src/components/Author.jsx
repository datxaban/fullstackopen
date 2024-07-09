import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Author = () => {
  const id = useParams().id;
  const author = useSelector((state) =>
    state.users.find((user) => user.id === id),
  );

  if (!author) {
    return null;
  }

  return (
    <div>
      <h2>{author.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {author.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Author;
