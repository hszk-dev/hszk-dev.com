import { fetchApi } from "@/lib/fetchApi";
import { Profile } from "@/components/Profile";
import { Hero } from "@/components/Hero";

const hero = {
  title: "hszk-dev.com",
  description: "Discover technical insights and explore the journey of a passionate developer.",
  photo: "/hero.webp",
};

async function fetchProfile() {
  const path = "/api/profile";

  const query = {
    populate: {
      photo: {
        fields: ["alternativeText", "name", "url"],
      },
    }
  };

  const data = await fetchApi(path, query);

  return data;
}

export default async function Home() {
  const profile = await fetchProfile();
  
  return (
    <div>
      <Hero {...hero} />
      <Profile {...profile.data} />
    </div>
  );
}
