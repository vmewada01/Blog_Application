import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  useColorModeValue,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as BrowseLink, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { login } from "../Store/Authentication/action";
import { LOGIN_SUCCESS } from "../Store/Authentication/actionTypes";

export default function SimpleCard() {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    {
      dispatch(login(userData)).then((r) => {
        if (r.status === LOGIN_SUCCESS) {
          toast({
            title: r.message,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          navigate("/", { replace: true });
        } else {
          toast({
            title: r.message,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      });
    }
    //   else {
    //     toast({
    //       title: "Admin Has Restricted You To Login In This Website",
    //       status: "info",
    //       duration: 9000,
    //       isClosable: true,
    //       position: "top",
    //     });
    //   }
  };

  const loading = useSelector((store) => store.authReducer.isLoading);

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
          spacing={8}
          mx={"2"}
          maxW={"lg"}
          py={6}
          px={2}
          border={"2px solid black"}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignContent={"center"}
          >
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

          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <form onSubmit={handleLogin}>
                <FormControl id="email">
                  <FormLabel textTransform={"capitalize"}>
                    Email address
                  </FormLabel>
                  <Input type="email" name="email" onChange={handleChange} />
                </FormControl>
                <FormControl id="password">
                  <FormLabel textTransform={"capitalize"}>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    onChange={handleChange}
                  />
                </FormControl>
                <Stack spacing={7} my={"2"}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Link color={"blue.400"}>
                      <Flex flexDirection={"column"} gap={"0.25rem"}>
                        <BrowseLink to={"/forgetpassword"}>
                          Forget Password?
                        </BrowseLink>
                        <BrowseLink to={"/register"}>Sign Up?</BrowseLink>
                      </Flex>
                    </Link>
                  </Stack>
                  <Button
                    fontSize={{ base: "lg", md: "lg", lg: "xl", xl: "xl" }}
                    p={{ base: "1rem 1rem", lg: "1rem 2rem", xl: "1rem 2rem" }}
                    bg={"black"}
                    color={"white"}
                    _hover={{
                      bg: "grey",
                    }}
                    type="submit"
                  >
                    Sign in
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
