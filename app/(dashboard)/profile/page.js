import { UserProfile } from "@clerk/nextjs";
const ProfilesPage = () => {
  return <UserProfile routing="hash" />;
};

export default ProfilesPage;
