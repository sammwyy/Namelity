import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  SimpleGrid,
  Switch,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Data, ExternalData } from "./data/data";
import { Profile, generateProfile } from "./lib/profile";

function ProfileDetail({
  detail,
  title,
}: {
  detail: Data | ExternalData;
  title: string;
}) {
  return (
    <Flex
      flexDir={"column"}
      gap={"15px"}
      w={"70px"}
      h={"100px"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Heading fontSize={"15px"} opacity={0.8} textAlign={"center"}>
        {title}
      </Heading>

      <Box>
        {"url" in detail && (
          <Image
            src={detail.url}
            alt={detail.name}
            h={"70px"}
            style={{
              imageRendering: "pixelated",
            }}
          />
        )}
        {"emoji" in detail && (
          <Heading fontSize={"50px"}>{detail.emoji}</Heading>
        )}
      </Box>

      <Heading fontSize={"17px"} textAlign={"center"}>
        {detail.name}
      </Heading>
    </Flex>
  );
}

function ProfileCard({ profile }: { profile: Profile | null }) {
  if (!profile) {
    return null;
  }

  return (
    <Flex
      gap={"80px"}
      flexDir={"column"}
      alignItems={"center"}
      w={"95%"}
      maxW={"720px"}
    >
      {/* Color palette */}
      <Flex gap={"20px"}>
        {profile.palette.map((color, index) => (
          <Box
            key={index}
            bg={`rgb(${color.r}, ${color.g}, ${color.b})`}
            w={"50px"}
            h={"50px"}
            borderRadius={"50%"}
          ></Box>
        ))}
      </Flex>

      {/* Profile details */}
      <SimpleGrid
        gridTemplateColumns="repeat(auto-fit, 95px)"
        gridTemplateRows={"repeat(auto-fit, 100px)"}
        w={"100%"}
        spacingX={"30px"}
        spacingY={"90px"}
        textAlign={"center"}
        margin={"auto"}
        justifyItems={"center"}
        alignItems={"center"}
      >
        <ProfileDetail detail={profile.animal} title={"Animal"} />
        <ProfileDetail detail={profile.constellation} title={"Constellation"} />
        <ProfileDetail detail={profile.element} title={"Element"} />
        <ProfileDetail detail={profile.flower} title={"Flower"} />
        <ProfileDetail detail={profile.food} title={"Food"} />
        <ProfileDetail detail={profile.fruit} title={"Fruit"} />
        <ProfileDetail detail={profile.hobby} title={"Hobby"} />
        <ProfileDetail detail={profile.minecraft} title={"Minecraft"} />
        <ProfileDetail detail={profile.pokemon} title={"Pokemon"} />
        <ProfileDetail detail={profile.season} title={"Season"} />
        <ProfileDetail detail={profile.superpower} title={"Superpower"} />
        <ProfileDetail detail={profile.weakness} title={"Weakness"} />
        <ProfileDetail detail={profile.weather} title={"Weather"} />

        {profile.personality.map((personality, index) => (
          <ProfileDetail
            key={index}
            detail={personality}
            title={"#" + (index + 1)}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
}

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [name, setName] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (name && name.trim() != "") {
      const newProfile = generateProfile(name);
      setProfile(newProfile);
    } else {
      setProfile(null);
    }
  }, [name]);

  return (
    <Flex alignItems={"center"} py={"50px"} flexDir={"column"} gap={"30px"}>
      {/* Floating settings */}
      <Flex position={"absolute"} top={"20px"} right={"20px"}>
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Dark mode</FormLabel>
          <Switch isChecked={colorMode == "dark"} onChange={toggleColorMode} />
        </FormControl>
      </Flex>

      {/* Branding */}
      <Flex alignItems={"center"} flexDir={"column"} gap={"10px"}>
        <Image src={"/icon.png"} w={"50px"} />
        <Heading letterSpacing={"4px"} size={"2xl"}>
          Namelity
        </Heading>

        <Text letterSpacing={"2px"}>
          Created with ❤️ by{" "}
          <Link
            href="https://twitter.com/sammwy"
            target="_blank"
            textDecor={"underline"}
          >
            @sammwy
          </Link>
        </Text>
      </Flex>

      {/* Input */}
      <Input
        placeholder="Your nice name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxW={"350px"}
      />

      {/* Profile card */}
      <ProfileCard profile={profile} />
    </Flex>
  );
}

export default App;
