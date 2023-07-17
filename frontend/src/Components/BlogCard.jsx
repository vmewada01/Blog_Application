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
  } from "@chakra-ui/react";
  import React from "react";
  import { useNavigate } from "react-router-dom";
  
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
    title,
    image_url,
    description,
    category,
    date,
    author,
    author_profile_pic,
  }) => {
    const navigate = useNavigate();
  
    const handleClick = (params) => {
      navigate(`/blog/${params}`);
    };
  
    const handleComments = () => {
      alert("comments functionality added soon...");
    };
    const toShow = description.substring(0, 100) + "...";
  
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
                  onClick={() => handleClick(_id)}
                />
              </Link>
            </Box>
            <BlogTags tags={category} marginTop="3" />
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
              <Input />
              <Button onClick={handleComments} fontSize={"10px"}>
                Comments
              </Button>
            </Flex>
          </Box>
        </WrapItem>
      </Wrap>
    );
  };
  
  export default BlogCard;
  