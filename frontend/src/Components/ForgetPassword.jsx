import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    useToast,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { useDispatch } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { resetPassword } from "../Store/Authentication/action";
  import { RESET_PASSWORD_SUCCESS } from "../Store/Authentication/actionTypes";
  import Navbar from "./Navbar";
  
  export default function ForgetPassword() {
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData({
        ...userData,
        [name]: value,
      });
    };
  
    const handleReset = (e) => {
      e.preventDefault();
  
      dispatch(resetPassword(userData)).then((r) => {
        if (r.status === RESET_PASSWORD_SUCCESS) {
          toast({
            title: r.message,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          navigate("/login");
        } else {
          toast({
            title: r.message,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      });
    };
  
    return (
      <>
        <Navbar />
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
              Enter New Password
            </Heading>
            <form onSubmit={handleReset}>
              <FormControl id="email" isRequired>
                <FormLabel textTransform={"capitalize"}>Email address</FormLabel>
                <Input
                  placeholder="your-email@example.com"
                  _placeholder={{ color: "gray.500" }}
                  type="email"
                  name="email"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" onChange={handleChange} />
              </FormControl>
              <Stack spacing={6}>
                <Button
                  my={"5"}
                  fontSize={{ base: "lg", md: "lg", lg: "xl", xl: "xl" }}
                  bg={"black"}
                  color={"white"}
                  _hover={{
                    bg: "grey",
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </form>
          </Stack>
        </Flex>
      </>
    );
  }
  