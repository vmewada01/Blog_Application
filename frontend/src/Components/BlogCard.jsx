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
import { FaRegThumbsUp } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { COMMENT_BLOG_FAILURE, COMMENT_BLOG_SUCCESS, LIKE_BLOG_FAILURE, LIKE_BLOG_SUCCESS } from "../Store/App/actionTypes";
import { commentBlog, getCommentedBlogs, getLikeCommentBlogs, likeBlog } from "../Store/App/action";

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
  blog_comments
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [like, setLike]= useState(false)
 const [comment, setComment]= useState("")


  const handleClick = (params) => {
    navigate(`/blog/${params}`);
  };

  const handleComments = (params) => {
    const payload={
       comment: comment
    }
  
    dispatch(commentBlog(params,payload)).then((res) => {
      // console.log(res)
      if (res.status === COMMENT_BLOG_SUCCESS) {
      
        toast({
          title: res.message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else if (res.status === COMMENT_BLOG_FAILURE) {
        setLike(!like)
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

  const handlelikeFunc = (params) => {
    // console.log(params);
    dispatch(likeBlog(params)).then((res) => {
      // console.log(res)
      if (res.status === LIKE_BLOG_SUCCESS) {
      
        toast({
          title: res.message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else if (res.status === LIKE_BLOG_FAILURE) {
        setLike(!like)
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
 
  //  console.log(blog_likes.length)
  //  console.log(blog_comments)
   
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
          <Flex
            justifyContent={"space-between"}
            margin={"auto"}
            textAlign={"center"}
            alignItems={"center"}
            alignContent={"center"}
          >
            <BlogTags tags={category} marginTop="3" />
            <Box mr="2rem" onClick={() => handlelikeFunc(userId)}>
           {blog_likes.length>0  ?  <FaThumbsUp size={24} /> :<FaRegThumbsUp size={24} /> }   {" "}
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
            <span onClick={() => handleClick(_id)}>
              <Link>Read More</Link>
            </span>
          </Text>
          <BlogAuthor name={author} date={date} avatar={author_profile_pic} />
          <Flex mx={"1"} gap={"1rem"} alignItems={"center"} my={"1"}>
            <Input type='text' placeholder='comment...' onChange={(e)=> setComment(e.target.value) } />
            <Button onClick={()=> handleComments(userId)} fontSize={"10px"}>
              add
            </Button>
           
          </Flex>
        
        </Box>
      </WrapItem>
    </Wrap>
  );
};

export default BlogCard;
