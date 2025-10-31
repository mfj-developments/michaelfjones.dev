import { client } from "./client";
import type { Project } from "@/types/project";

// GROQ queries for fetching data from Sanity

/**
 * Fetch all projects, ordered by display order
 */
export async function getAllProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(order asc, _createdAt desc) {
    "slug": slug.current,
    title,
    summary,
    stack,
    "links": {
      "live": liveUrl,
      "repo": repoUrl,
      "caseStudy": caseStudyUrl
    },
    "image": image.asset->url,
    featured
  }`;

  return client.fetch(query);
}

/**
 * Fetch a single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    summary,
    stack,
    "links": {
      "live": liveUrl,
      "repo": repoUrl,
      "caseStudy": caseStudyUrl
    },
    "image": image.asset->url,
    featured
  }`;

  return client.fetch(query, { slug });
}

/**
 * Fetch featured projects (max 3)
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const query = `*[_type == "project" && featured == true] | order(order asc) [0...3] {
    "slug": slug.current,
    title,
    summary,
    stack,
    "links": {
      "live": liveUrl,
      "repo": repoUrl,
      "caseStudy": caseStudyUrl
    },
    "image": image.asset->url,
    featured
  }`;

  return client.fetch(query);
}

/**
 * Fetch about page content
 */
export async function getAbout() {
  const query = `*[_type == "about"][0] {
    title,
    bio,
    timeline,
    skills,
    education
  }`;

  return client.fetch(query);
}

/**
 * Fetch all blog posts
 */
export async function getAllBlogPosts() {
  const query = `*[_type == "blog"] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    excerpt,
    "coverImage": coverImage.asset->url,
    publishedAt,
    author,
    tags
  }`;

  return client.fetch(query);
}

/**
 * Fetch a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string) {
  const query = `*[_type == "blog" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    excerpt,
    "coverImage": coverImage.asset->url,
    content,
    publishedAt,
    author,
    tags
  }`;

  return client.fetch(query, { slug });
}

/**
 * Fetch site settings
 */
export async function getSettings() {
  const query = `*[_type == "settings"][0] {
    siteTitle,
    description,
    contactEmail,
    location,
    socialLinks,
    resumeUrl,
    "seoImage": seoImage.asset->url
  }`;

  return client.fetch(query);
}
