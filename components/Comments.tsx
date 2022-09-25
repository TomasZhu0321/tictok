import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../store/authStore";
import NoResults from "./NoResults";
import useState from "react";

const Comments = () => {
  const comments = [];
  const isPostingComment = false;
  const { userProfile } = useAuthStore();
  return (
    <div className="border-t-2 border-black pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {Comments.length ? (
          <div>video</div>
        ) : (
          <NoResults text="No comments yet"></NoResults>
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
          <form onSubmit={() => {}} className="flex gap-4">
            <input
              value=""
              onChange={() => {}}
              placeholder="Leave your comment ..."
              className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-400 flex-1 rounded-lg"
            />
            <button className="text-md text-black" onClick={() => {}}>
              {isPostingComment ? "Commenting ... " : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
