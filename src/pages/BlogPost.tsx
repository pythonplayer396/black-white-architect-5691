import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  body: string | null;
  published_at: string | null;
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();

  const { data: post, isLoading } = useQuery({
    queryKey: ["public", "blog", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", id!)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data as Post | null;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 container mx-auto px-6">
          <p className="text-muted-foreground">Loading…</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-32">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-light text-architectural mb-8">
                Post Not Found
              </h1>
              <Link
                to="/blog"
                className="text-minimal text-foreground hover:text-muted-foreground transition-colors duration-300"
              >
                ← BACK TO BLOG
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <article className="pt-32 pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/blog"
              className="inline-block text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300 mb-12"
            >
              ← BACK TO BLOG
            </Link>

            <div className="mb-8">
              {post.published_at && (
                <div className="flex items-center text-minimal text-muted-foreground space-x-4 mb-6">
                  <span>{new Date(post.published_at).toLocaleDateString()}</span>
                </div>
              )}

              <h1 className="text-4xl md:text-6xl font-light text-architectural mb-6">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-xl text-muted-foreground leading-relaxed">{post.excerpt}</p>
              )}
            </div>

            {post.cover_image_url && (
              <div className="mb-12">
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="w-full h-[60vh] object-cover"
                />
              </div>
            )}

            {post.body && (
              <div className="prose prose-lg max-w-none text-foreground whitespace-pre-wrap leading-relaxed">
                {post.body}
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
