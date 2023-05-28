import { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";

const AddCreative = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [pageId, setPageId] = useState("");
  const [messages, setMessages] = useState("");
  const [error, setError] = useState("");
  const { setAdId, ImageHash, adAccountId, accessTokenId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the required fields
    if (!name || !pageId || !messages) {
      setError("Please fill in all the required fields.");
      return;
    }

    const object_stroy = {
      page_id: pageId,
      link_data: {
        image_hash: ImageHash,
        link: `https://facebook.com/${pageId}`,
        message: messages,
      },
    };

    // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
    var formdata = new FormData();
    formdata.append("name", name);
    formdata.append("object_story_spec", JSON.stringify(object_stroy));
    formdata.append("access_token", accessTokenId);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch(
      `https://graph.facebook.com/v16.0/${adAccountId}/adcreatives`,
      requestOptions
    ).then((response) => response.text()).then((result) => {
        console.log(result);
        navigate(`/publishAd/${setAdId}/${JSON.parse(result).id}/${adAccountId}/${accessTokenId}`);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Card
        color="transparent"
        shadow={false}
        className="bg-gray-100 p-10 shadow-lg"
      >
        {error && (
          <Alert color="red" variant="gradient" className="mb-5">
            <span>{error}</span>
          </Alert>
        )}
        <Typography variant="h4" color="blue-gray">
          Create Ad Creative (Step - 4)
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to create ad creative.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 space-y-6">
            <Input
              size="lg"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              size="lg"
              label="Facebook Page Id"
              value={pageId}
              onChange={(e) => setPageId(e.target.value)}
            />
            <Input
              size="lg"
              label="Messages"
              value={messages}
              onChange={(e) => setMessages(e.target.value)}
            />
          </div>
          <Button className="mt-6" fullWidth onClick={handleSubmit}>
            Create Ad Creative
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddCreative;
