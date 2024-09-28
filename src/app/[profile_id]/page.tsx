import ProfilePage from "@/components/elements/profile";
import MainLayout from "@/components/mainLayout";

// Define the type for params
interface Params {
  profile_id: string;
}

interface PageProps {
  params: Params;
}

const Page: React.FC<PageProps> = ({ params }) => {
  const { profile_id } = params;

  return (
    <MainLayout>
      <ProfilePage profile_id={profile_id} />
    </MainLayout>
  );
};

export default Page;
