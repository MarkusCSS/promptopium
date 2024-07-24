"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";


const UpdatePrompt = () => {
  const router = useRouter();
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const promptId = params.get("id");

    console.log("Prompt ID:", promptId); // Dodaj ovo za debug

    const getPromptDetails = async () => {
      if (promptId) {
        try {
          const response = await fetch(`/api/prompt/${promptId}`, { cache: 'no-store' });
          if (response.ok) {
            const data = await response.json();
            console.log("Fetched Data:", data); // Dodaj ovo za debug

            setPost({
              prompt: data.prompt,
              tag: data.tag,
            });
          } else {
            console.error("Failed to fetch prompt details", response.status);
          }
        } catch (error) {
          console.error("Error fetching prompt details", error);
        }
      }
    };

    getPromptDetails();
  }, []);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const params = new URLSearchParams(window.location.search);
    const promptId = params.get("id");

    if (!promptId) {
      alert("Missing PromptId!");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Failed to update prompt", response.status);
      }
    } catch (error) {
      console.error("Error updating prompt", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
