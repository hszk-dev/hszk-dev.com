import { Certifications } from "@/components/Certifications";
import { Profile } from "@/components/Profile";
import { Skills } from "@/components/Skills";
import { fetchApi } from "@/lib/fetchApi";

async function fetchProfile() {
  const path = "/api/profile";

  const query = {
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
  };

  const data = await fetchApi(path, query);

  return data;
}

export default async function ProfilePage() {
  const profile = await fetchProfile();

  return (
    <div>
      <Profile {...profile.data} />
      <Skills skills={profile.data.skills} />
      <Certifications certifications={profile.data.certifications} />
    </div>
  );
}
