import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Link,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Store/Authentication/action";
import { REGISTER_SUCCESS } from "../Store/Authentication/actionTypes";
import { Link as BrowseLink, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const toast = useToast();
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      setUserData({
        ...userData,
        [name]: files[0],
      });
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(register(userData)).then((r) => {
      if (r.status === REGISTER_SUCCESS) {
        toast({
          title: r.message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate("/login", { replace: true });
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
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={6} px={2}>
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
            p={5}
          >
            <Stack spacing={4}>
              <form onSubmit={handleSignup}>
                <Flex
                  flexDirection={{
                    base: "column",
                    sm: "column",
                    lg: "row",
                    xl: "row",
                  }}
                  gap={5}
                >
                  <Box>
                    <FormControl id="fullname" isRequired>
                      <FormLabel>Full Name</FormLabel>
                      <Input type="text" name="name" onChange={handleChange} />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="profile_pic">
                      <FormLabel>Profile_pic</FormLabel>
                      <Input
                        py={"1"}
                        px={"1"}
                        type="file"
                        name="profile_pic"
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Box>
                </Flex>
                <FormControl id="email" isRequired>
                  <FormLabel>Email Address</FormLabel>
                  <Input type="email" name="email" onChange={handleChange} />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      onChange={handleChange}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    fontSize={{ base: "lg", md: "lg", lg: "xl", xl: "xl" }}
                    p={{ base: "1rem 1rem", lg: "1rem 2rem", xl: "1rem 2rem" }}
                    loadingText="Submitting"
                    size="lg"
                    bg={"black"}
                    color={"white"}
                    _hover={{
                      bg: "grey",
                    }}
                    type="submit"
                  >
                    Sign up
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Already a user?{" "}
                    <Link color={"blue.400"}>
                      <BrowseLink to={"/login"}>Login</BrowseLink>
                    </Link>
                  </Text>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
