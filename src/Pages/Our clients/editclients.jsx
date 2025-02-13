import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { getSingleClient, updateClient } from "../../Api/ourClient"; 
import { getToken } from "../../Utils/storage";
import { uploadFile } from "../../Utils/fileUpload"; 
import { toast } from "react-toastify";
import Header from "../../Components/header";
import Sidebar from "../../Components/sidebar";
import { FiCamera,FiArrowLeft } from "react-icons/fi";

const EditClient = () => {
    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const profileRef = useRef(null);

const initialStateInputs = {
    _id:id || "",
    name: "",
    logo: "",
};

const initialStateErrors = {
    _id: { required: false },
    name: { required: false },
    logo: { required: false }, 
    
};

const [inputs, setInputs] = useState(initialStateInputs);
const [errors, setErrors] = useState(initialStateErrors);
const [submitted, setSubmitted] = useState(false);

const handleValidation = (data) => {
    let error = { ...initialStateErrors };

    if (data.name === "") {
        error.name.required = true;
    }
    if (data.logo === "") { 
        error.email.required = true;
    } 

    
    return error;
};


  // Fetch client details on mount
  useEffect(() => {
    fetchClientDetails();
  }, [id]);

  const fetchClientDetails = async () => {
    try {
      const token = getToken();
      const res = await getSingleClient(id, token);
      setInputs({
        _id: res?.data?.result?._id || id,
        name: res?.data?.result?.name || "",
        logo: res?.data?.result?.logo || "",
      });
    } catch (error) {
      console.log("Error fetching client details:", error);
      toast.error("Failed to load client data.");
    }
  };


  // Handle input changes
  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });

    if (submitted) {
      setErrors(handleValidation({ ...inputs, [event.target.name]: event.target.value }));
    }
  };

  // Handle file upload
  const handleFileInputs = (event) => {
    const file = event?.target?.files[0];
    const folder = "Clients/"; // Folder path for uploaded files
  
    if (file && file.type.startsWith("image/")) {
      const fileName = file.name; // Get the file name
  
      uploadFile(file, folder)
        .then((res) => {
          const fileUrl = res?.Location;
          setInputs({ ...inputs, logo: fileUrl, fileName }); // Save image details
        })
        .catch((err) => {
          console.error(err);
          toast.error("Error uploading image.");
        });
    } else {
      toast.error("Please upload a valid image file.");
    }
  };
  const handleErrors = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const prop = obj[key];
        if (prop.required === true || prop.valid === true) {
          return false;
        }
      }
    }
    return true;
  };
  // Handle form submission
  const handleEditClient = async (event) => {
    event.preventDefault();
        const newError = handleValidation(inputs);
        setErrors(newError);
        setSubmitted(true);
    
        if (handleErrors(newError)) {
            try {
                console.log("inputs",initialStateInputs,inputs);
                await updateClient(inputs);
                toast.success("Client added successfully!");
                setInputs({ name: "", logo: "" });
                setErrors(initialStateErrors);
                setSubmitted(false);
    
                if (profileRef.current) {
                    profileRef.current.value = "";
                }
                fetchClientDetails();
    
            } catch (err) {
                toast.error(err?.response?.data?.message);
            }
        }
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex-1 flex flex-col transition-all duration-300 mb-5 ${isSidebarOpen ? "lg:ml-64 ml-16" : "ml-16"}`}>
        <Header toggleSidebar={toggleSidebar} />
        

        <div className="max-w-lg mx-auto  px-6 w-[30%] mb-4 mt-16">
        <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-[#13266A]">
                        Edit Client 
                      </h2>
                      <Link to="/ourclients">
                        <button className="bg-[#13266A] text-white px-4 py-2 rounded-md hover:bg-yellow-950 transition flex  justify-center items-center gap-2">
                          <FiArrowLeft className="text-xl" /> Clients List 
                        </button>
                      </Link>
                    </div>
                    </div>
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 w-96 mb-4">
          <form onSubmit={handleEditClient}>
            <label className="block text-md font-medium mb-2 text-start">Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Client Name"
              className="w-full p-2 border rounded-lg mb-4"
              value={inputs.name}
              onChange={handleInputs}
            />
            {errors.name.required && <span className="text-red-500 text-sm">Name is required</span>}

            <label className="block text-md font-medium mb-2 text-start">Logo:</label>
            <div className="form-group flex justify-start">
              <label htmlFor="fileInputImage" className="file-upload btn rounded-full cursor-pointer">
                {inputs.logo ? (
                  <img src={inputs.logo} width="100" height="100" alt="Preview" className="rounded-full border shadow-md" />
                ) : (
                  <FiCamera size={60} />
                )}
                {inputs.logo && (
    <p className="text-sm text-start text-gray-700 mt-2">Uploaded: {inputs?.fileName || "Please Select an Image"}</p>
  )}
              </label>
              <input
                ref={profileRef}
                className="hidden"
                onChange={handleFileInputs}
                name="logo"
                id="fileInputImage"
                type="file"
                accept="image/*"
              />
            </div>
            {errors.logo.required && <span className="text-red-500 text-sm">Logo is required</span>}

            <div className="flex justify-end mt-4">
              <button type="submit" className="bg-[#13266A] text-white px-4 py-2 rounded-lg hover:bg-yellow-950">
                Save Changes
              </button>
            </div>
          </form>
        </div>
        <div className="overflow-x-auto px-24 ">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-[#13266A] text-white">
                <th className="p-3 text-left">S.No</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Logo</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date Added</th>
              </tr>
            </thead>
            <tbody>
            
            <tr className="border-b hover:bg-gray-100">
  <td className="p-3">1</td>
  <td className="p-3">{inputs.name}</td>
  <td className="p-3">
    {inputs.logo ? (
      <img src={inputs.logo} alt={inputs.name} className="h-10 w-10 rounded-full" />
    ) : (
      "No Image"
    )}
  </td>
  <td className="p-3">{inputs.status === 1 ? "Active" : "Inactive"}</td>
  <td className="p-3">
    {new Date(inputs?.createdAt || Date.now()).toLocaleDateString()}
  </td>
</tr>

           
            </tbody>
          </table>
        </div>
      </div>
     
    </div>
  );
};

export default EditClient;
