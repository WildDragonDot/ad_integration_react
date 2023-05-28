import { useState, useRef } from "react";
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
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";

const SetAd = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [optimizationGoal, SetOptimizationGoal] = useState("REACH");
  const [billingEvents, SetBillingEvents] = useState("IMPRESSIONS");
  const [bidAmount, SetBidAmount] = useState("");
  const [dailyBudget, SetDailyBudget] = useState("");
  const [startTime, SetStartTime] = useState("");
  const [country, SetCountry] = useState("");
  const [interests, SetInterests] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const { creativeId, adAccountId, accessTokenId } = useParams();
  const calendarRef = useRef(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");

  const interestsOptions = [
    { value: "6003515142242", text: "Movie theater" },
    { value: "6003659163716", text: "Road movie" },
    { value: "6003439535375", text: "Movie Review" },
    { value: "6002868008910", text: "Monster movie" },
    { value: "6018341976753", text: "Warner Bros. Movie World - Gold Coast, Australia" },
    { value: "6003330965169", text: "Yahoo! Movies" },
    { value: "6003451445586", text: "Moviefone" },
    { value: "6005307387947", text: "MovieWeb" },
  ];

  if (
    !creativeId ||
    creativeId === "" ||
    !adAccountId ||
    adAccountId === "" ||
    !accessTokenId ||
    accessTokenId === ""
  ) {
    navigate("/");
    return;
  }



  const handleStartTimeClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleCalendarChange = (date) => {
    SetStartTime(date);
    setIsCalendarOpen(false);
  };

  const minDate = new Date();

  const handleSelectChange = (event) => {
    const selectedOption = interestsOptions.find((option) => option.value === event);
    if (selectedOption) {
      const { value, text } = selectedOption;
      SetInterests(value);
      setSelectedText(text);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the required fields
    if (!name || !optimizationGoal || !billingEvents || !bidAmount || !dailyBudget || !country || !interests || !startTime || !status) {
      setError("Please fill in all the required fields.");
      return;
    }
    const convertedDate = moment(startTime).format("YYYY-MM-DDTHH:mm:ssZ");
    console.log(name,optimizationGoal,bidAmount,dailyBudget,country,interests,convertedDate,status);

    // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
    var formdata = new FormData();
    const targeting = {"geo_locations": {"countries":[country]}, "interests": [{id: interests, 'name': selectedText}]}
    console.log(targeting)
    formdata.append("name", name);
    formdata.append("optimization_goal", optimizationGoal);
    formdata.append("billing_event", billingEvents);
    formdata.append("bid_amount", bidAmount);
    formdata.append("daily_budget", dailyBudget);
    formdata.append("campaign_id", creativeId);
    formdata.append("targeting", JSON.stringify(targeting));
    formdata.append("start_time", convertedDate);
    formdata.append("status", status);
    formdata.append("access_token", accessTokenId);
    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch(
      `https://graph.facebook.com/v16.0/${adAccountId}/adsets`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        navigate(`/uploadImages/${JSON.parse(result).id}/${adAccountId}/${accessTokenId}`);
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
          Create Ad Sets (Step - 2)
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to create ad sets.
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
              label="Bid Amount"
              value={bidAmount}
              onChange={(e) => SetBidAmount(e.target.value)}
            />
            <Input
              size="lg"
              label="Daily Budget"
              value={dailyBudget}
              onChange={(e) => SetDailyBudget(e.target.value)}
            />
            <Select
              label="Optimization Goal"
              size="lg"
              value={optimizationGoal}
            >
              <Option value="REACH">REACH</Option>
            </Select>
            <Select
              label="Billing Events"
              size="lg"
              value={billingEvents}
            >
              <Option value="IMPRESSIONS">IMPRESSIONS</Option>
            </Select>
            <Select
              label="Country"
              size="lg"
              value={country}
              onChange={(e) => SetCountry(e)}
            >
              <Option value="IN">India</Option>
              <Option value="IO">British Indian Ocean Territory</Option>
            </Select>

            <Select
              label="Interests"
              size="lg"
              value={interests}
              onChange={handleSelectChange}
            >
              {interestsOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.text}
                </Option>
              ))}
            </Select>
            <div className="flex flex-col">
              <label className="text-gray-700">Start Time</label>
              <div>
                <input
                  type="text"
                  className="w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-lg focus:border-blue-500"
                  value={moment(startTime).format("YYYY-MM-DD HH:mm")}
                  onClick={handleStartTimeClick}
                  readOnly
                />
                {isCalendarOpen && (
                  <div
                    ref={calendarRef}
                    className="absolute mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
                  >
                    <Calendar
                      value={startTime}
                      onChange={handleCalendarChange}
                      onClickOutside={() => setIsCalendarOpen(false)}
                      minDate={minDate}
                    />
                  </div>
                )}
              </div>
            </div>
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
            Create Ad Sets
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SetAd;
