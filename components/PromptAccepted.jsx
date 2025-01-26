

const PromptAccepted = async (post) => {
    const response = await fetch('/api/openai', {
        method: 'POST',
        body: JSON.stringify({
          topic: post.topic,
          prompt: post.prompt,
        })
      })
      const data = await response.json();
      console.log(data.split("\n"));
    return data.split("\n");
}

export default PromptAccepted