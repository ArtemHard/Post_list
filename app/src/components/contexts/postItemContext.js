import { createContext, useState } from "react";
import { ProfileContext } from "./profileContext";

const PostItemContext = createContext();

const PostItemProvider = ({ children }) => {
  const [modal, setModal] = useState(false);

  return (
    <PostItemContext.Provider
      value={{
        modal,
        setModal,
      }}
    >
      {children}
    </PostItemContext.Provider>
  );
};

export default PostItemProvider;

export { ProfileContext };
