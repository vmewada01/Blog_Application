import {
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Select,
    Stack,
    Textarea,
    useColorMode,
    useDisclosure,
    useToast,
  } from "@chakra-ui/react";
  import React, { useRef, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { createBlog } from "../Store/App/action";
  import {
    CREATE_BLOG_FAILURE,
    CREATE_BLOG_SUCCESS,
  } from "../Store/App/actionTypes";
  import { getData } from "../Utils/localStorage";
  
  const NewBlog = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [blog, setBlog] = useState({});
    const btnRef = useRef(null);
    const { isAuth } = useSelector((state) => state.authReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { colorMode } = useColorMode();
    const toast = useToast();
    const { isLoading } = useSelector((state) => state.appReducer);
  
    const alerMessage = () => {
      toast({
        title: "You've to Login to Access This Feature.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      navigate("/login");
    };
  
    const handleChange = (e) => {
      const { name, value, type, files } = e.target;
      if (type === "file") {
        setBlog({
          ...blog,
          [name]: files[0],
        });
      } else {
        setBlog({
          ...blog,
          [name]: value,
        });
      }
    };
  
    const handleSubmit = async (e) => {
      const userId = getData("userId");
      e.preventDefault();
      await dispatch(createBlog(userId, blog)).then((r) => {
        if (r.status === CREATE_BLOG_SUCCESS) {
          toast({
            title: r.payload,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          window.location.reload();
        } else if (r.status === CREATE_BLOG_FAILURE) {
          toast({
            title: r.payload,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      });
      onClose();
    };
  
    return (
      <>
        {isAuth === false ? (
          <Button
            fontSize={{ base: "lg", md: "lg", lg: "xl", xl: "xl" }}
            mt={5}
            colorScheme="blackAlpha"
            ref={btnRef}
            onClick={alerMessage}
            bg={colorMode === "light" ? "black" : "white"}
            color={colorMode === "light" ? "white" : "black"}
            fontStyle={'oblique'}
         >
            Create Your Story
          </Button>
        ) : (
          <>
            <Button
              fontSize={{ base: "lg", md: "lg", lg: "xl", xl: "xl" }}
              mt={5}
              colorScheme="blackAlpha"
              ref={btnRef}
              onClick={onOpen}
              bg={colorMode === "light" ? "black" : "white"}
              color={colorMode === "light" ? "white" : "black"}
             fontStyle={'oblique'}
           >
              Create Your Story
            </Button>
  
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Create A New Story</ModalHeader>
                <ModalCloseButton />
                <ModalBody bg={"white"} color={"black"}>
                  <Stack spacing={4}>
                    <form onSubmit={handleSubmit}>
                      <Stack spacing={2}>
                        <FormControl id="title" isRequired>
                          <FormLabel>TITLE</FormLabel>
                          <Input
                            type="text"
                            name="title"
                            onChange={handleChange}
                          />
                        </FormControl>
                        <FormControl id="blog_img" isRequired>
                          <FormLabel>IMAGE</FormLabel>
                          <Input
                            py={"1"}
                            px={"1"}
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
                            placeholder="Write your story here"
                            name="description"
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
                            colorScheme="blackAlpha"
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
          </>
        )}
      </>
    );
  };
  
  export default NewBlog;
  