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
    <div>
      <Image
        src={imageUrl}
        alt={photo.alternativeText || name}
        width={500}
        height={500}
      />
      <div>
        <h3>{name}</h3>
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
