import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
};

const Blog = () => {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["public", "blog"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, cover_image_url, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data as Post[];
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h1 className="text-6xl md:text-8xl font-light text-architectural mb-8">
                INSIGHTS
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Notes, essays and updates from Solis Institute.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <p className="text-muted-foreground">Loading…</p>
            ) : posts.length === 0 ? (
              <p className="text-muted-foreground">No posts published yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                {posts.map((post) => (
                  <article key={post.id} className="group">
                    <Link to={`/blog/${post.slug}`} className="block">
                      {post.cover_image_url && (
                        <div className="relative overflow-hidden mb-6">
                          <img
                            src={post.cover_image_url}
                            alt={post.title}
                            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      )}

                      <div className="space-y-4">
                        {post.published_at && (
                          <div className="flex items-center text-xs text-muted-foreground space-x-4">
                            <span>{new Date(post.published_at).toLocaleDateString()}</span>
                          </div>
                        )}

                        <h2 className="text-xl lg:text-2xl font-light text-architectural group-hover:text-muted-foreground transition-colors duration-500">
                          {post.title}
                        </h2>

                        {post.excerpt && (
                          <p className="text-muted-foreground leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        )}

                        <div className="pt-4">
                          <span className="text-minimal text-foreground hover:text-muted-foreground transition-colors duration-300">
                            READ MORE
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
