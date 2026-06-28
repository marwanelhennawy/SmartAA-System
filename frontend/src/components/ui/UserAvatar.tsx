import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

export function UserAvatar() {
  const navigate = useNavigate();

  return (
    <div className="cursor-pointer" onClick={() => navigate("/profile")}>
      <Avatar>
        <AvatarFallback>ST</AvatarFallback>
      </Avatar>
    </div>
  );
}