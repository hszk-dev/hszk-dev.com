import PostList from "@/components/PostList";


export default function Blog() {
  const data = [
    {
      id: 1,
      attributes: {
        title: "Hello, World!",
        description: "This is a test post.",
        slug: "hello-world",
        createdAt: "2022-01-01T00:00:00Z",
        updatedAt: "2022-01-01T00:00:00Z",
        publishedAt: "2022-01-01T00:00:00Z",
        cover: {
          data: {
            attributes: {
              url: "http://127.0.0.1:1337/uploads/a_bug_is_becoming_a_meme_on_the_internet_7176a326d4.jpeg",
            },
          },
        },
        category: {
          data: {
            attributes: {
              name: "Test",
              slug: "test",
            },
          },
        },
        authorsBio: {
          data: {
            attributes: {
              name: "John Doe",
              avatar: {
                data: {
                  attributes: {
                    url: "http://127.0.0.1:1337/uploads/thumbnail_daviddoe_strapi_f782b9dac6.jpeg",
                  },
                },
              },
            },
          },
        },
      }
    },
    {
      id: 2,
      attributes: {
        title: "Hello, World!",
        description: "This is a test post.",
        slug: "hello-world",
        createdAt: "2022-01-01T00:00:00Z",
        updatedAt: "2022-01-01T00:00:00Z",
        publishedAt: "2022-01-01T00:00:00Z",
        cover: {
          data: {
            attributes: {
              url: "http://127.0.0.1:1337/uploads/a_bug_is_becoming_a_meme_on_the_internet_7176a326d4.jpeg",
            },
          },
        },
        category: {
          data: {
            attributes: {
              name: "Test",
              slug: "test",
            },
          },
        },
        authorsBio: {
          data: {
            attributes: {
              name: "John Doe",
              avatar: {
                data: {
                  attributes: {
                    url: "http://127.0.0.1:1337/uploads/thumbnail_daviddoe_strapi_f782b9dac6.jpeg",
                  },
                },
              },
            },
          },
        },
      }
    }
  ]

  return (
    <div>
      <h1>Blog Page</h1>
      <div className="grid grid-rows-[20px_1fr_20px] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <PostList data={data} />
      </div>
    </div>
  );
}
