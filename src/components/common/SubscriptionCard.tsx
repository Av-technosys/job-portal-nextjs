import { colorStyles } from "@/styles";
import { Stack, Avatar, Button } from "../common";
import { CIRCULAR_AVATAR_CONFIG } from "@/types";

interface SubscriptionCardProps {
  avatarUrl: string;
  buttonConfig: {
    buttonProps: object;
  };
  onButtonClick: () => void;
}



export default function SubscriptionCard({
  avatarUrl,
  buttonConfig,
  onButtonClick,
}: SubscriptionCardProps) {
  return (
    <Stack
      stackProps={{
        direction: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        sx: {
          background: "linear-gradient(145deg, #ffffff, #f5f9ff)",
          padding: "24px 20px",
          width: "280px",
          minHeight: "240px",
          borderRadius: "20px",
          border: "1px solid rgba(226, 232, 240, 0.8)",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.03)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 12px 30px rgba(37, 99, 235, 0.08)",
            borderColor: colorStyles.blue,
            "& .MuiAvatar-root": {
              transform: "scale(1.03)",
            }
          }
        },
      }}
    >
      <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
        <Avatar 
          {...CIRCULAR_AVATAR_CONFIG(avatarUrl, "avatar")} 
          sx={{ 
            width: 120, 
            height: 120, 
            zIndex: 1, 
            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            backgroundColor: "#fff"
          }} 
        />
      </div>
      
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Button 
          {...buttonConfig} 
          onClick={onButtonClick} 
        />
      </div>
    </Stack>
  );
}
