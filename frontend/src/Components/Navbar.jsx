import {
    Box,
    Flex,
    Avatar,
    HStack,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useColorModeValue,
    useColorMode,
    Tooltip,
    Heading,
    useToast,
  } from "@chakra-ui/react";
  import { MoonIcon, SunIcon } from "@chakra-ui/icons";
  import { Link as BrowseLink, useNavigate } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { getData } from "../Utils/localStorage";
  import { useEffect, useState } from "react";
  import { getUser, logout } from "../Store/Authentication/action";
  import { GET_USER_SUCCESS } from "../Store/Authentication/actionTypes";
  import MainCarousel from "./MainCarousel";
  export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();
    const { isAuth } = useSelector((state) => state.authReducer);
  
    const handleLogout = () => {
      dispatch(logout());
      navigate("/");
      toast({
        title: "Logout SuccessFully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    };
  
    const userBlogsHandler = (params) => {
      navigate(`/blogs/${params}`);
    };
  
    useEffect(() => {
      if (isAuth) {
        const userId = getData("userId");
        dispatch(getUser(userId)).then((r) => {
          if (r.status === GET_USER_SUCCESS) {
            setUser(r.payload);
          }
        });
      }
    }, [dispatch, isAuth]);
  
    return (
      <>
        <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
          <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            bg={colorMode === "light" ? "gray.900" : "gray.100"}
            color={colorMode === "light" ? "gray.100" : "gray.900"}
          >
            <HStack spacing={8} alignItems={"center"} w="100%">
              <Heading
                textAlign={"center"}
                fontSize={["xl", "xl", "2xl", "4xl"]}
                w={"100%"}
              >
                <Tooltip label={"click here to go home page"}>
                  <BrowseLink to={"/"}>PATEL FAMILY</BrowseLink>
                </Tooltip>
              </Heading>
            </HStack>
            <Flex alignItems={"center"} gap={{ sm: "10px", lg: "30px" }}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      isAuth === false
                        ? "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        : user.profile_pic
                    }
                  />
                </MenuButton>
                {isAuth === false ? (
                  <MenuList
                    color={colorMode === "light" ? "gray.900" : "gray.100"}
                  >
                    <MenuItem>
                      <BrowseLink to={"/register"}>Sign Up</BrowseLink>
                    </MenuItem>
                    <MenuItem>
                      <BrowseLink to={"/login"}>Log In</BrowseLink>
                    </MenuItem>
                  </MenuList>
                ) : (
                  <MenuList
                    color={colorMode === "light" ? "gray.900" : "gray.100"}
                  >
                    <MenuItem>{user.name}</MenuItem>
                    <MenuItem onClick={() => userBlogsHandler(user._id)}>
                      My Story
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                )}
              </Menu>
              <Tooltip label="Color Mode" placement="auto">
                <Button onClick={toggleColorMode} fontSize="2xl" bg="none">
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
              </Tooltip>
            </Flex>
          </Flex>
          {isAuth && <MainCarousel />}
        </Box>
      </>
    );
  }
  