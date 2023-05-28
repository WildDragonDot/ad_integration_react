import {useState} from "react";
import {
  Card,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";




const UploadImages = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const {setAdId,adAccountId, accessTokenId } = useParams();

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!selectedFile) {
      // Handle the case where no file is selected
      setError("Please Upload images.");
      return;
    }

    const formData = new FormData();
    formData.append("filename", selectedFile);
    formData.append("access_token", accessTokenId);

    try {
      var requestOptions = {
        method: "POST",
        body: formData,
      };
  
      await fetch(
        `https://graph.facebook.com/v16.0/${adAccountId}/adimages`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          const data = (JSON.parse(result).images);
          const ImageHash = (Object.values(data)[0].hash)
          navigate(`/adCreative/${setAdId}/${ImageHash}/${adAccountId}/${accessTokenId}`);
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.error("Error occurred while uploading file:", error);
      // Handle the error case
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
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
          Upload Images (Step - 3)
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Upload your ad Images.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 space-y-6">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
          </div>
          <Button className="mt-6" fullWidth onClick={handleSubmit}>
            UPload Images
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default UploadImages;
