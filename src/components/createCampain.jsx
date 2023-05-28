import { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
  Alert,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const CreateCampain = ()=>{
  const navigate = useNavigate();
  const [adAccountID, setAdAccountID] = useState("");
  const [name, setName] = useState("");
  const [campaignObjective, setCampaignObjective] = useState("");
  const [status, setStatus] = useState("");
  const [specialAdCategories, setSpecialAdCategories] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [error, setError] = useState("");
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the required fields
    if (!adAccountID || !name || !campaignObjective || !status) {
      setError("Please fill in all the required fields.");
      return;
    }
    setSpecialAdCategories([]);
    // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
    var formdata = new FormData();
    formdata.append("name", name);
    formdata.append("objective", campaignObjective);
    formdata.append("status", status);
    formdata.append("special_ad_categories", "[]");
    formdata.append("access_token", accessToken);

    var requestOptions = {
      method: 'POST',
      body: formdata,
    };

    fetch(`https://graph.facebook.com/v16.0/${adAccountID}/campaigns`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        navigate(`/setAd/${JSON.parse(result).id}/${adAccountID}/${accessToken}`);
      })
      .catch(error => console.log('error', error));
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
          Create Campaign (Step - 1)
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to create campain.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 space-y-6">
            <Input
              size="lg"
              label="Ad Account ID (act_XXXXXXXXXXXX)"
              value={adAccountID}
              onChange={(e) => setAdAccountID(e.target.value)}
            />
            <Input
              size="lg"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Select
              label="Campaign objective"
              size="lg"
              value={campaignObjective}
              onChange={(e) => setCampaignObjective(e)}
            >
              <Option value="OUTCOME_AWARENESS">Awareness</Option>
              <Option value="OUTCOME_TRAFFIC">Traffic</Option>
              <Option value="OUTCOME_ENGAGEMENT">Engagement</Option>
              <Option value="OUTCOME_LEADS">Leads</Option>
              <Option value="OUTCOME_APP_PROMOTION">App promotion</Option>
              <Option value="OUTCOME_SALES">Sales</Option>
            </Select>
            <Select
              label="Status"
              size="lg"
              value={status}
              onChange={(e) => setStatus(e)}
            >
              <Option value="PAUSED">Paused</Option>
              <Option value="ACTIVE">Active</Option>
            </Select>
            <Input
              size="lg"
              label="Access Token"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
            />
          </div>
          <Button className="mt-6" fullWidth onClick={handleSubmit}>
            Create Campaign
          </Button>
        </form>
      </Card>
    </div>
  );
}


export default CreateCampain;