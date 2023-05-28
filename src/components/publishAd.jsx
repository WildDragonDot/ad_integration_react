import { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
  Alert,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";

const PublishAd = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { setAdId, creativeId, adAccountId, accessTokenId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the required fields
    if (!name || !status) {
      setError("Please fill in all the required fields.");
      return;
    }

    const creativeData = { creative_id: creativeId };

    var formdata = new FormData();
    formdata.append("name", name);
    formdata.append("adset_id", setAdId);
    formdata.append("creative", JSON.stringify(creativeData));
    formdata.append("status", status);
    formdata.append("access_token", accessTokenId);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch(`https://graph.facebook.com/v16.0/${adAccountId}/ads`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setUploadSuccess(true);
        setTimeout(function () {
          navigate("/");
        }, 5000);
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
        {uploadSuccess ? (
          <Alert color="green">
            You have created successfully Ad.Visit on your facebook Ads Manager
            for complete info.Thank You!
          </Alert>
        ) : (
          <>
            {error && (
              <Alert color="red" variant="gradient" className="mb-5">
                <span>{error}</span>
              </Alert>
            )}
            <Typography variant="h4" color="blue-gray">
              Publish Ad Sets (Step - 5)
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Enter your details to publish ad.
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-4 space-y-6">
                <Input
                  size="lg"
                  label="Ad Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Select
                  label="Status"
                  size="lg"
                  value={status}
                  onChange={(e) => setStatus(e)}
                >
                  <Option value="PAUSED">Paused</Option>
                  <Option value="ACTIVE">Active</Option>
                </Select>
              </div>
              <Button className="mt-6" fullWidth onClick={handleSubmit}>
                Publish Ad
              </Button>
            </form>
          </>
        )}
      </Card>
    </div>
  );
};

export default PublishAd;
