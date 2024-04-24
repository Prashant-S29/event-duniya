import getSessionFromServer from "@/lib/getServerSession";
import { redirect } from "next/navigation";
import React from "react";

const PROMOTE_EVENT = async () => {
  const session = await getSessionFromServer();

    // if(!session){
    //   redirect("/")
    // }

  return (
    <>
      <div>
        <span className="text-white">
          HELLO World {session ? "session" : "no"}
        </span>
      </div>
    </>
  );
};

export default PROMOTE_EVENT;
