import {
  Box,
  Heading,
  HStack,
  Image,
  Tag,
  Text,
  Wrap,
  WrapItem,
  Link,
  Flex,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaRegComment,
  FaRegComments,
  FaRegHeart,
  FaRegThumbsUp,
} from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  COMMENT_BLOG_FAILURE,
  COMMENT_BLOG_SUCCESS,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  LIKE_BLOG_FAILURE,
  LIKE_BLOG_SUCCESS,
} from "../Store/App/actionTypes";
import {
  commentBlog,
  deleteComment,
  getBlog,
  getBlogs,
  getCommentedBlogs,
  getLikeCommentBlogs,
  likeBlog,
  removelikeBlog,
} from "../Store/App/action";
import { AiFillDelete } from "react-icons/ai";

const BlogTags = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      <Tag size={"md"} variant="solid" colorScheme="green">
        {props.tags}
      </Tag>
    </HStack>
  );
};

export const BlogAuthor = (props) => {
  return (
    <HStack
      py={"2"}
      as={Flex}
      justifyContent={"space-between"}
      px={"2"}
      alignItems="center"
      border={"2px solid black"}
    >
      <Box as={Flex} alignItems={"center"}>
        <Image
          borderRadius="full"
          boxSize="40px"
          src={props.avatar}
          alt={`Avatar of ${props.name}`}
        />
        <Text fontWeight={"semibold"} fontSize={["xs", "sm", "md"]}>
          {props.name}
        </Text>
      </Box>
      <Text>—</Text>
      <Text>{props.date}</Text>
    </HStack>
  );
};

const BlogCard = ({
  _id,
  userId,
  title,
  image_url,
  description,
  category,
  date,
  author,
  author_profile_pic,
  blog_likes,
  blog_comments,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [like, setLike] = useState(blog_likes);
  const [comment, setComment] = useState("");

  const store = useSelector((store) => store.authReducer);
  // console.log(store.user)

  const handleClick = (params) => {
    navigate(`/blog/${params}`);
  };

  const handleComments = (params) => {
    const payload = {
      comment: comment,
      author: store.user.name,
      image: store.user.profile_pic,
    };
    dispatch(commentBlog(params, payload)).then((res) => {
      // console.log(res)
      if (res.status === COMMENT_BLOG_SUCCESS) {
        toast({
          title: res.message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        window.location.reload()
      } else if (res.status === COMMENT_BLOG_FAILURE) {
        setLike(!like);
        toast({
          title: res.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    });
  };
  const toShow = description.substring(0, 100) + "...";

  const handleDeleteFunc = (blogId,commentId) => {
    console.log(blogId,commentId)
    dispatch(deleteComment(blogId,commentId)).then((res)=> {
      if (res.status === DELETE_COMMENT_SUCCESS) {
        toast({
          title: res.message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        window.location.reload();
      } else if (res.status === DELETE_COMMENT_FAILURE) {
        toast({
          title: res.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } 
    }).catch((err)=>{
      console.log(err)
    })
  };

  
  const handlelikeFunc = (_id) => {

    dispatch(likeBlog(_id)).then((res) => {
      // console.log(res)
      if (res.status === LIKE_BLOG_SUCCESS) {
        toast({
          title: res.message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        window.location.reload()
      } else if (res.status === LIKE_BLOG_FAILURE) {
        setLike(!like);
        toast({
          title: res.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    });
  };



  return (
    <Wrap
      spacing="1rem"
      marginTop="1rem"
      p={"2"}
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
    >
      <WrapItem
        w={"100%"}
        border={"1px solid rgba(0,0,0,0.1)"}
        p={"0.25rem"}
        borderRadius="lg"
      >
        <Box w="100%">
          <Box borderRadius="lg" w={"100%"} height="300px" overflow={"hidden"}>
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              <Image
                transform="scale(1.0)"
                src={image_url}
                alt="some text"
                objectFit="fill"
                width="100%"
                height={"100%"}
                transition="0.3s ease-in-out"
                _hover={{
                  transform: "scale(1.1)",
                }}
                onClick={() => handleClick(_id, comment)}
              />
            </Link>
          </Box>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <BlogTags tags={category} marginTop="3" />
            <Box mr="2rem">
           
            {blog_likes ? (
                <FaHeart size={"25"} onClick={(e) => handlelikeFunc(_id)} />
              ) : (
                <FaRegHeart size={"25"} onClick={(e) => handlelikeFunc(_id)} />
              )}
             
            </Box>

          </Flex>

          <Heading fontSize="xl" marginTop="2">
            <Link
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
              fontStyle={"italic"}
            >
              {title}
            </Link>
          </Heading>
          <Text as="p" fontSize="md" marginTop="2">
            {toShow}
            <span onClick={() => handleClick(_id,)}>
              <Link>Read More</Link>
            </span>
          </Text>
          <BlogAuthor name={author} date={date} avatar={author_profile_pic} />
          <Flex mx={"1"} gap={"1rem"} alignItems={"center"} my={"1"}>
            <Input
              type="text"
              placeholder="comments......."
              onChange={(e) => setComment(e.target.value)}
            />

            <FaRegComments onClick={() => handleComments(_id)} size={"30"} />
          </Flex>
          <Flex direction={"column"} gap={"1rem"}>
            {blog_comments.map((item) => {
              return (
                <Box key={item.id}>
                  <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <Flex alignItems={"center"}>
                      <Box>
                        <Image
                          width={"30px"}
                          height={"40px"}
                          borderRadius={"50%"}
                          src={item.author_image}
                        />{" "}
                      </Box>
                      <Box fontStyle={"oblique"} fontWeight={"bold"}>
                        {item.author}
                      </Box>
                    </Flex>
                    <Box>{item.createdAt}</Box>
                  </Flex>

                  <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <Box>{item.text}</Box>
                    <Box onClick={() => handleDeleteFunc(item._id,_id)}>
                      {" "}
                      <AiFillDelete size={"20"} />
                    </Box>
                  </Flex>
                </Box>
              );
            })}
          </Flex>
        </Box>
      </WrapItem>
    </Wrap>
  );
};

export default BlogCard;
