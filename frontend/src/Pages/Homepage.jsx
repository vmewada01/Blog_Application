import { Box, Container, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../Components/BlogCard";
import Navbar from "../Components/Navbar";
import NewBlog from "../Components/NewBlog";
import { getBlogs } from "../Store/App/action";

const Homepage = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.appReducer);
  const loading = useSelector((store) => store.appReducer.isLoading);
  useEffect(() => {
    dispatch(getBlogs());
   
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Container>
        <NewBlog />
        <Box display={'flex'} justifyContent={'center'} alignContent={'center'}>
    {loading && (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    )}
    </Box>
        <Box>
          {blogs.length &&
            blogs.map((blog) => (
              <BlogCard dispatch={dispatch} {...blog} key={blog._id} />
            ))}
        </Box>
      </Container>
    </>
  );
};

export default Homepage;
