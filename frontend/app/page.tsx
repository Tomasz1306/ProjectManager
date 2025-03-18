import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Avatar } from "@heroui/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full flex flex-col items-center">
        <div className="w-[90%] flex flex-col my-20">
          <Card
            className=" rounded-sm 
        border-1 border-fuchsia-700"
          >
            <CardBody>
              <div className="flex flex-row gap-4">
                <div className="w-1/3">
                  <div className="flex flex-row gap-4">
                    <div>
                      <Avatar size="lg"></Avatar>
                    </div>

                    <div>
                      <p className="text-large">Tomasz Bogdan</p>
                      <p className="text-sm">tomasz2@example.com</p>
                    </div>
                  </div>
                </div>
                <div className="w-1/3 "></div>
                <div className="flex w-1/3 justify-end">
                  <Button className="w-full rounded-sm border-1 border-purple-600 bg-transparent">
                    Update information
                  </Button>
                </div>
              </div>
            </CardBody>
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
    </section>
  );
}
