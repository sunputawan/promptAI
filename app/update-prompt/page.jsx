"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@/components/Form'
import PromptAccepted from '@/components/promptAccepted'

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, SetSubmitting] = useState(false);
  const [post, setPost] = useState({
    topic: '',
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    const getPromptDetails = async () => {
        const response = await fetch(`api/prompt/${promptId}`);
        const data = await response.json();

        setPost({
            topic: data.topic,
            prompt: data.prompt,
            tag: data.tag,
        })
    }

    if(promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    SetSubmitting(true);

    if(!promptId) return alert('Prompt ID not found');

    try {
      const isPromptAccepted = await PromptAccepted(post);
      if(isPromptAccepted[0] === "True") {
        const response = await fetch(`/api/prompt/${promptId}`, {
            method: 'PATCH',
            body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag
            }),
        });

        if(response.ok) {
            router.push('/');
        }
    } else {
        alert(isPromptAccepted[1]);
    }
    } catch(error) {
      console.log(error);
    } finally {
      SetSubmitting(false);
    }
  }

  return (
    <Form
    type="Edit"
    post={post}
    setPost={setPost}
    submitting={submitting}
    SetSubmitting={SetSubmitting}
    handleSubmit={updatePrompt}
    >

    </Form>
  )
}

export default EditPrompt