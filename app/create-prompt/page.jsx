"use client"

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@/components/Form'
import PromptAccepted from '@/components/PromptAccepted'

const CreatePrompt = () => {
  const router = useRouter();
  const { data:session } = useSession();

  const [submitting, SetSubmitting] = useState(false);
  const [post, setPost] = useState({
    topic: '',
    prompt: '',
    tag: '',
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    SetSubmitting(true);
    try {
      const isPromptAccepted = await PromptAccepted(post);
      // console.log(isPromptAccepted);
      if (isPromptAccepted[0] === "True") {
        const response = await fetch('/api/prompt/new', {
          method: 'POST',
          body: JSON.stringify({
            userId: session?.user.id,
            topic: post.topic,
            prompt: post.prompt,
            tag: post.tag
          }),
        })

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
    type="Create"
    post={post}
    setPost={setPost}
    submitting={submitting}
    SetSubmitting={SetSubmitting}
    handleSubmit={createPrompt}
    >

    </Form>
  )
}

export default CreatePrompt