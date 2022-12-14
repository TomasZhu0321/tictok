import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BASE_URL } from "../../utils/index";

import useAuthStore from "../../store/authStore";
import { Video } from "../../types";
import axios from "axios";
import Comments from "../../components/Comments";
import LikeButton from "../../components/LikeButton";

interface IProps {
  postDetails: Video;
}
const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails); //details page的info
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
  const [muted, setVideMute] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };
  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = !muted;
    }
  }, [muted, post]);
  const router = useRouter();
  const { userProfile }: any = useAuthStore();

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      }); //传进去的body
      setPost({ ...post, likes: data.likes }); //update likes
    }
  };
  const addComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (userProfile && comment) {
      setIsPostingComment(true);
      const response = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });
      setPost({ ...post, comments: response.data.comments });
      setComment('');
      setIsPostingComment(false);
    }
  };

  return (
    <>
      <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
        <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
          <div className="opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
            <p
              className="cursor-pointer"
              onClick={() => {
                router.back();
              }}
            >
              <MdOutlineCancel className="text-white text-[35px] hover:opacity-90" />
            </p>
          </div>
          <div className="relative">
            <div className="lg:h-[100vh] h-[60vh]">
              <video
                loop
                ref={videoRef}
                onClick={onVideoClick}
                src={post.video.asset.url}
                className=" h-full cursor-pointer"
              ></video>
            </div>
            {/* play functionality */}
            <div className="absolute top-[45%] left-[40%]  cursor-pointer">
              {!isPlaying && (
                <button onClick={onVideoClick}>
                  <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
                </button>
              )}
            </div>
          </div>
          {/* mute functionality */}
          <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
            {muted ? (
              <button
                onClick={() => setVideMute(false)}
                className="rounded-full bg-slate-100 p-1"
              >
                <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
              </button>
            ) : (
              <button
                onClick={() => setVideMute(true)}
                className="rounded-full bg-slate-100 p-1"
              >
                <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
              </button>
            )}
          </div>
        </div>
        {/* personal info */}
        <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
          <div className="lg:mt-20 mt-10">
            <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded ">
              <div className="ml-4 md:w-20 md:h-20 w-10 h-10 ">
                <Link href="/">
                  <>
                    <Image
                      width={62}
                      height={62}
                      className="rounded-full"
                      src={post.postedBy.image}
                      alt="profile photo"
                      layout="responsive"
                    />
                  </>
                </Link>
              </div>
              <div>
                <Link href="/">
                  <div className="mt-3 flex flex-col items-center gap-2 ">
                    <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                      {post.postedBy.userName}{" "}
                      <GoVerified className="text-blue-400 text-md" />
                    </p>
                  </div>
                </Link>
              </div>
            </div>
            <div>
              <p className="px-10 text-lg text-gray-600 ">{post.caption}</p>
            </div>
            {/* like button */}
            <div className="mt-10 px-10">
              {userProfile && (
                <LikeButton
                  likes={post.likes}
                  handleLike={() => handleLike(true)}
                  handleDislike={() => handleLike(false)}
                />
              )}
            </div>
            {/* comment */}
            <Comments 
            comment ={comment}
            setComment={setComment}
            addComment={addComment}
            isPostingComment={isPostingComment}
            comments={post.comments}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);
  return {
    props: { postDetails: data },
  };
};
export default Detail;
