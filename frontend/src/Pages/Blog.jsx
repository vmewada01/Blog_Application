/* eslint-disable react-hooks/exhaustive-deps */
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  Image,
  Tag,
  Text,
  WrapItem,
  Link,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { deleteBlog, getBlog, updateBlog } from "../Store/App/action";
import {
  DELETE_BLOG_FAILURE,
  DELETE_BLOG_SUCCESS,
  UPDATE_BLOG_FAILURE,
  UPDATE_BLOG_SUCCESS,
} from "../Store/App/actionTypes";
import { getData } from "../Utils/localStorage";

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
      my={"1"}
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

export const Blog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { blogId } = useParams();
  const userId = getData("userId");
  const toast = useToast();
  const { blog } = useSelector((state) => state.appReducer);
  const dispatch = useDispatch();
  const [blogData, setBlogData] = useState({
    title: blog?.title,
    category: blog?.category,
    description: blog?.description,
  });
  const { isLoading } = useSelector((state) => state.appReducer);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setBlogData({
        ...blogData,
        [name]: files[0],
      });
    } else {
      setBlogData({
        ...blogData,
        [name]: value,
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await dispatch(updateBlog(blogId, blogData)).then((res) => {
      if (res.status === UPDATE_BLOG_SUCCESS) {
        toast({
          title: res.message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        window.location.reload();
      } else if (res.status === UPDATE_BLOG_FAILURE) {
        toast({
          title: res.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    });
    onClose();
  };

  const hanldeBlogDelete = (params) => {
    dispatch(deleteBlog(params)).then((res) => {
      if (res.status === DELETE_BLOG_SUCCESS) {
        toast({
          title: res.message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate("/");
      } else if (res.status === DELETE_BLOG_FAILURE) {
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

  useEffect(() => {
    dispatch(getBlog(blogId));
  }, [blogId]);

  return (
    <>
      <Navbar />
      <Container spacing="10px" marginTop="5">
        <WrapItem w={"100%"}>
          <Box
            w="100%"
            border={"1px solid rgba(0,0,0,0.1)"}
            p={"0.25rem"}
            m={"0.50rem"}
          >
            <Heading
              as={"h4"}
              fontSize="2xl"
              marginTop="2"
              textAlign={"center"}
              fontStyle={"italic"}
            >
              <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                {blog.title}
              </Link>
            </Heading>

            <Box borderRadius="lg" w={"100%"} overflow={"hidden"} my="5">
              <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                <Image
                  transform="scale(1.0)"
                  src={blog.image_url}
                  alt="some text"
                  objectFit="fill"
                  width="100%"
                  height={"100%"}
                  transition="0.3s ease-in-out"
                  _hover={{
                    transform: "scale(1.05)",
                  }}
                />
              </Link>
            </Box>
            <Flex justify="space-between" align="center">
              <BlogTags tags={blog.category} marginTop="3" />
              {userId === blog.userId ? (
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<i className="fa-solid fa-ellipsis-vertical"></i>}
                    variant="outline"
                  />
                  <MenuList size="lg">
                    <MenuItem icon={<EditIcon />} onClick={onOpen}>
                      Edit
                    </MenuItem>
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Update Your Story</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <Stack spacing={4}>
                            <form onSubmit={handleUpdate}>
                              <Stack spacing={2}>
                                <FormControl id="title" isRequired>
                                  <FormLabel>TITLE</FormLabel>
                                  <Input
                                    type="text"
                                    name="title"
                                    value={blogData.title}
                                    onChange={handleChange}
                                  />
                                </FormControl>
                                <FormControl id="blog_img" isRequired>
                                  <FormLabel>IMAGE</FormLabel>
                                  <Input
                                    type="file"
                                    name="blog_img"
                                    onChange={handleChange}
                                  />
                                </FormControl>
                                <FormControl id="topic" isRequired>
                                  <FormLabel>TOPIC</FormLabel>
                                  <Select
                                    placeholder="Select topic"
                                    name="category"
                                    onChange={handleChange}
                                    value={blogData.category}
                                  >
                                    <option value="Family">Family</option>
                                    <option value="Moments">Moments</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Thoughts">Thoughts</option>
                                  </Select>
                                </FormControl>
                                <FormControl id="description" isRequired>
                                  <FormLabel>CONTENT</FormLabel>
                                  <Textarea
                                    placeholder="Write your blog here"
                                    name="description"
                                    value={blogData.description}
                                    onChange={handleChange}
                                  />
                                </FormControl>
                                <HStack justifyContent="flex-end" py={2}>
                                  <Button
                                    p={{
                                      base: "1rem 1rem",
                                      lg: "1rem 2rem",
                                      xl: "1rem 2rem",
                                    }}
                                    isLoading={isLoading}
                                    type="submit"
                                    colorScheme="blue"
                                    mr={3}
                                    bg={"black"}
                                    color={"white"}
                                  >
                                    Submit
                                  </Button>
                                  <Button
                                    p={{
                                      base: "1rem 1rem",
                                      lg: "1rem 2rem",
                                      xl: "1rem 2rem",
                                    }}
                                    colorScheme="red"
                                    onClick={onClose}
                                    bg={"red"}
                                    color={"white"}
                                  >
                                    Cancel
                                  </Button>
                                </HStack>
                              </Stack>
                            </form>
                          </Stack>
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                    <MenuItem
                      icon={<DeleteIcon />}
                      onClick={() => hanldeBlogDelete(blog._id)}
                    >
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : null}
            </Flex>
            <Text as="p" fontSize="md" marginTop="2" textAlign={"justify"}>
              {blog.description}
            </Text>
            <BlogAuthor
              name={blog.author}
              date={blog.date}
              avatar={blog.author_profile_pic}
            />
          </Box>
        </WrapItem>
      </Container>
    </>
  );
};

export default Blog;
