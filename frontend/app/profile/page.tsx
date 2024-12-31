import { Certifications } from "@/components/Certifications";
import { Profile } from "@/components/Profile";
import { Skills } from "@/components/Skills";
import Image from "next/image";
import qs from "qs";

interface ProfileProps {
  id: number;
  documentId: string;
  name: string;
  birthDate: string;
  company: string;
  position: string;
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

function calculateAge(birthDateString: string): number {
  // 生年月日を Date オブジェクトに変換
  const birthDate = new Date(birthDateString);
  const today = new Date(); // 現在の日付

  // 年齢を計算
  let age = today.getFullYear() - birthDate.getFullYear();

  // 生年月日の月日がまだ来ていなければ、年齢を1減らす
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

function ProfileCard({
  name,
  birthDate,
  company,
  position,
  photo,
}: Readonly<ProfileProps>) {
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
              <h3>年齢: {calculateAge(birthDate)}才</h3>
              <h3>所属: {company}</h3>
              <h3>ポジション: {position}</h3>
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
      },
      skills: {
        fields: ["name"],
        populate: {
          category: {
            fields: ["name"],
          },
        }
      },
      certifications: {
        fields: ["name", "issuingOrganization", "issueDate"],
        populate: {
          badge: {
            fields: ["alternativeText", "name", "url"],
          },
        }
      },
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
      <Skills skills={profile.data.skills} />
      <Certifications certifications={profile.data.certifications} />
    </div>
  );
}
