"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { User } from "@heroui/user";
import { Avatar, AvatarGroup, AvatarIcon } from "@heroui/avatar";
import { Button } from "@heroui/button";
const Home = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[90%] flex flex-col my-20">
        <Card
          className="bg-stone-950 rounded-sm 
        border-1 border-fuchsia-700"
        >
          <CardHeader>
            <div className="flex flex-row gap-4">
            <Avatar size="lg"></Avatar>
            <div>
            <p className="text-large font-bold">Tomasz Bogdan</p>
            <p className="text-sm font-ligth">Student</p>
            </div>
            
            </div>
            
          </CardHeader>
          <CardBody>
          <Button>Upload prifile picture</Button>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
        <div className="flex flex-row justify-between my-6">
          <Card className="w-[49%] rounded-sm border-1 border-fuchsia-600">
            <CardHeader>
              <p>Issues</p>
            </CardHeader>
            <CardBody></CardBody>
            <CardFooter></CardFooter>
          </Card>
          <Card className="w-[49%] rounded-sm border-1 border-fuchsia-600">
            <CardHeader>
              <p>Projects</p>
            </CardHeader>
            <CardBody></CardBody>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
