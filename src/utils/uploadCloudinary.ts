const cloud_name = process.env.NEXT_PUBLIC_VITE_CLOUD_NAME;
const upload_preset = process.env.NEXT_PUBLIC_VITE_UPLOAD_PRESET;
if (!upload_preset || !cloud_name) {
  throw new Error("Environment variables for Cloudinary are not set.");
}

const uploadImagetoCloudinary = async (file: File) => {
  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("upload_preset", upload_preset);
  uploadData.append("cloud_name", cloud_name);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    {
      method: "POST",
      body: uploadData,
    }
  );
  const data = await res.json();
  return data;
};
export default uploadImagetoCloudinary;
