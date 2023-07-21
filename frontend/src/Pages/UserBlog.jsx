import { Box, Container, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BlogCard from "../Components/BlogCard";
import Navbar from "../Components/Navbar";
import { getUserBlogs } from "../Store/App/action";

const UserBlog = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const { userBlogs } = useSelector((state) => state.appReducer);

  useEffect(() => {
    dispatch(getUserBlogs(userId));
  }, [dispatch, userId]);
  const loading = useSelector((store) => store.appReducer.isLoading);

  return (
    <>
      <Navbar />
      <Container>
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
          {userBlogs.map((blog) => (
            <BlogCard {...blog} key={blog._id} />
          ))}
        </Box>
      </Container>
    </>
  );
};

export default UserBlog;
