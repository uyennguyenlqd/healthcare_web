import Image from "next/image";

type Props = {
  children: React.ReactNode;
};
const LoginScreen: React.FC<Props> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: "0 0 50%",
          position: "relative",
        }}
      >
        <Image
          src="/icons/background_img.jpeg"
          alt="doctor"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          style={{
            borderRadius: "8px",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",

          minHeight: "100%",
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
          flexDirection: "column",
          padding: "20px",
        }}
      >
        {children}
      </div>
    </div>
  );
};
export default LoginScreen;
