import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const Profile = async () => {
  const user = await currentUser();
  return (
    <div className="px-4 flex items-center gap-2 text-secondary text-sm">
      <UserButton />
      <p className="ml-1">{`${user.emailAddresses[0].emailAddress} - ${user.firstName}`}</p>
    </div>
  );
};

export default Profile;
