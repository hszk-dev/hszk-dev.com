import Image from "next/image";
import qs from "qs";

interface ProfileProps {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  photo: {
    id: number;
    documentId: string;
    alternativeText: string;
    name: string;
    url: string;
  };
}

function ProfileCard({
  name,
  photo,
}: Readonly<ProfileProps>) {
  console.log(name);
  const imageUrl = `${
    process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:1337"
  }${photo.url}`;
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto font-energetic">
      <div className="relative max-w-screen-2xl m-auto">
        <div className="relative flex w-full flex-col lg:flex-row items-center justify-center gap-4 lg:gap-12 flex-col lg:flex-row-reverse">
          <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 w-full lg:w-1/2 ">
            <h2 className="text-2xl font-bold sm:text-3xl">About Me</h2>
            <nav className="grid lg:gap-10 mt-5 md:mt-10 gap-5" aria-label="Tabs" role="tablist">
              <h3>{name}</h3>
            </nav>
          </div>
          <div className=" w-full lg:w-1/2">
            <div className="relative w-full">
              <div id="tabs-with-card-1" className="tabpanel" aria-labelledby="tabs-with-card-item-1">
                <Image
                  src={imageUrl}
                  alt={photo.alternativeText || name}
                  width={500}
                  height={500}
                  className="shadow-xl shadow-gray-200 max-h-[550px] rounded-xl dark:shadow-gray-900/[.2]"
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

async function fetchProfile() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:1337";
  const path = "/api/profile";

  const url = new URL(path, baseUrl);

  url.search = qs.stringify({
    populate: {
      photo: {
        fields: ["alternativeText", "name", "url"],
      }
    }
  });

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch profile data");
  }

  const data = await res.json();
  console.log(data);

  return data;
}

export default async function Profile() {
  const profile = await fetchProfile();

  return (
    <div>
      <h1>Profile</h1>
      <ProfileCard {...profile.data} />
    </div>
  );
}
