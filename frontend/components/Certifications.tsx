import Image from 'next/image';

interface Certification {
  id: number;
  documentId: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  badge: {
    id: number;
    documentId: string;
    alternativeText: string;
    name: string;
    url: string;
  };
}

interface CertificationsProps {
  certifications: Certification[];
}


export function Certifications({ certifications }: Readonly<CertificationsProps>) {
  const sortedCertifications = [...certifications].sort((a, b) => {
    return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
  });


  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto font-energetic">
      <div className="relative max-w-screen-2xl m-auto">
        <div className="relative flex flex-col">
          <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 w-full lg:w-1/2 ">
            <h2 className="text-2xl font-bold sm:text-3xl">Certifications</h2>
              <nav className="grid lg:gap-10 mt-5 md:mt-10 gap-5" aria-label="Tabs" role="tablist">
              {sortedCertifications.map((certification) => {
                const badgeUrl = `${
                  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:1337"
                }${certification.badge.url}`;
                return (
                  <div key={certification.id} className="border-b border-gray-200 pb-4 flex items-center gap-4">
                    {/* バッジ画像 */}
                    <div className="w-16 h-16 flex-shrink-0">
                      <Image
                        src={badgeUrl}
                        alt={certification.badge.alternativeText || certification.name}
                        width={64}
                        height={64}
                        className="rounded-md shadow"
                      />
                    </div>

                    {/* 資格情報 */}
                    <div>
                      <h3 className="text-lg font-semibold">{certification.name}</h3>
                      <p className="text-sm text-gray-600">
                        {certification.issuingOrganization} - {new Date(certification.issueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
              </nav>
            </div>
        </div>
      </div>
    </div>
  );
}