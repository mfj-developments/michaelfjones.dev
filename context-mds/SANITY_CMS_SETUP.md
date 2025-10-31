# Sanity CMS Setup & Usage Guide

Complete guide for setting up and using Sanity CMS on your portfolio website.

---

## 🎯 Overview

You now have a professional content management system integrated into your portfolio! This allows you (and invited collaborators) to:

- ✍️ Edit projects through a visual interface
- 📝 Write blog posts with rich text
- 🎨 Manage images with built-in CDN
- ⚙️ Update site settings globally
- 👥 Collaborate with invited users

Perfect for learning CMS workflows and for your interior designer client project!

---

## 🚀 Initial Setup

### Step 1: Create a Sanity Account & Project

1. Go to [sanity.io](https://sanity.io) and sign up (free)
2. Or run the initialization command:

```bash
cd web
npx sanity init
```

3. During setup:
   - **Login/Create account**: Use your Google account (or email)
   - **Project name**: "Michael F. Jones Portfolio" (or whatever you prefer)
   - **Dataset**: `production` (default)
   - **Output path**: Current directory (hit Enter)

4. Copy your Project ID from the output or from https://sanity.io/manage

### Step 2: Update Environment Variables

Update `.env.local` with your Sanity credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Step 3: Deploy Sanity GraphQL API (Optional)

```bash
npx sanity graphql deploy
```

This enables GraphQL queries (optional - we're using GROQ by default).

### Step 4: Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000/studio to see your CMS!

---

## 📚 Content Types

### 1. Project

Manage your portfolio projects.

**Fields:**
- **Title** - Project name
- **Slug** - URL-friendly identifier (auto-generated)
- **Summary** - Short description (max 200 chars)
- **Tech Stack** - Array of technologies used
- **Image** - Project screenshot/thumbnail
- **Live URL** - Link to deployed project
- **Repository URL** - GitHub repo link
- **Case Study URL** - Detailed project writeup
- **Featured** - Show on home page (toggle)
- **Display Order** - Control sorting (lower = first)

### 2. About Page

Your professional bio and timeline.

**Fields:**
- **Biography** - Rich text editor for your story
- **Timeline** - Experience history (year, title, company, description)
- **Skills** - Tech stack and competencies
- **Education** - Degrees and certifications

### 3. Blog Post

Write technical articles and insights.

**Fields:**
- **Title** & **Slug**
- **Excerpt** - Short preview for cards
- **Cover Image** - Hero image
- **Content** - Rich text with images, links, code blocks
- **Tags** - Categorization
- **Published At** - Date/time
- **Author** - Defaults to your name

### 4. Site Settings

Global site configuration (singleton - only one document).

**Fields:**
- **Site Title** - Used in metadata
- **Description** - SEO description
- **Contact Email**
- **Location**
- **Social Links** - GitHub, LinkedIn, etc.
- **Resume URL** - Link to PDF
- **Default SEO Image** - Open Graph image

---

## 🎨 Using Sanity Studio

### Accessing the Studio

Navigate to: **http://localhost:3000/studio**

Or in production: **https://michaelfjones.dev/studio**

### First Time Setup

1. **Login** - Use the same account you created the project with
2. **Create your first project**:
   - Click "Project" in the sidebar
   - Click "Create new Project"
   - Fill in the fields
   - Click "Publish"

### Key Concepts

- **Draft vs Published**: Changes are saved as drafts until you click "Publish"
- **Media Library**: Upload images directly in the studio
- **GROQ**: The query language (like SQL for Sanity)
- **Datasets**: Separate environments (production, staging, etc.)

---

## 👥 Inviting Collaborators

### Add Team Members

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Click "Members" tab
4. Click "Invite member"
5. Enter their email
6. Choose role:
   - **Administrator** - Full access
   - **Editor** - Can create/edit/publish content
   - **Viewer** - Read-only access

### Free Tier Limits

- ✅ 3 invited users (perfect for you + 2 collaborators)
- Need more? Upgrade to Growth plan ($99/month, unlimited users)

---

## 📊 Data Migration

### Import Your Existing Projects

You have 3 archived projects to import. Here's how:

**Option 1: Manual Entry (Recommended for Learning)**

1. Go to `/studio`
2. Click "Project" → "Create new Project"
3. Copy data from `src/data/projects-archive.json`
4. Upload images from `public/images/`
5. Click "Publish"

**Option 2: Bulk Import (Faster)**

Create a script to import:

```typescript
// scripts/import-projects.ts
import { client } from "@/lib/sanity/client";
import projectsArchive from "@/data/projects-archive.json";

async function importProjects() {
  for (const project of projectsArchive) {
    await client.create({
      _type: "project",
      title: project.title,
      slug: { _type: "slug", current: project.slug },
      summary: project.summary,
      stack: project.stack,
      liveUrl: project.links.live,
      repoUrl: project.links.repo,
      featured: project.featured,
      order: 0,
    });
  }
}

importProjects();
```

Then run: `npx ts-node scripts/import-projects.ts`

---

## 🔗 Fetching Data in Your App

### Example: Get All Projects

```typescript
import { getAllProjects } from "@/lib/sanity/queries";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div>
      {projects.map((project) => (
        <ProjectCard key={project.slug} {...project} />
      ))}
    </div>
  );
}
```

### Available Query Functions

All defined in `src/lib/sanity/queries.ts`:

- `getAllProjects()` - All projects, ordered
- `getProjectBySlug(slug)` - Single project
- `getFeaturedProjects()` - Max 3 featured projects
- `getAbout()` - About page content
- `getAllBlogPosts()` - Blog posts, newest first
- `getBlogPostBySlug(slug)` - Single blog post
- `getSettings()` - Global site settings

---

## 🖼️ Working with Images

### Upload Images

In Sanity Studio, click the image field and:
- **Upload** - Drag & drop or browse
- **Select from library** - Reuse existing images
- **Hotspot** - Define focal point for cropping

### Use Images in Code

```typescript
import { urlFor } from "@/lib/sanity/client";
import Image from "next/image";

<Image
  src={urlFor(project.image).url()}
  alt={project.title}
  width={600}
  height={400}
/>
```

### Image Transformations

```typescript
// Resize
urlFor(image).width(800).height(600).url()

// Crop
urlFor(image).rect(0, 0, 500, 500).url()

// Quality
urlFor(image).quality(90).url()

// Format
urlFor(image).format('webp').url()
```

---

## 🚀 Deployment

### Vercel Environment Variables

Add to your Vercel project:

1. Go to Vercel dashboard → Your project → Settings → Environment Variables
2. Add:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID
   NEXT_PUBLIC_SANITY_DATASET
   NEXT_PUBLIC_SANITY_API_VERSION
   ```

### CORS Configuration

Allow your domain to access Sanity:

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select project → API tab
3. Add CORS origin:
   - `https://michaelfjones.dev`
   - Allow credentials: ✅

---

## 💰 Pricing & Limits (Free Tier)

**What's Included:**
- ✅ **3 users** (you + 2 collaborators)
- ✅ **10 GB bandwidth/month** (plenty for portfolios)
- ✅ **5 GB asset storage** (thousands of images)
- ✅ **Unlimited API requests**
- ✅ **Unlimited documents**
- ✅ **CDN-optimized images**

**When to Upgrade:**
- More than 3 users → Growth plan ($99/month)
- More bandwidth/storage → Usage-based pricing
- Advanced features (schedules, webhooks, etc.)

**For Your Interior Designer Client:**
- Free tier is perfect for small businesses
- 3 users = Owner + 2 staff members
- 10GB = ~10,000 page views/month

---

## 🎓 Perfect for Client Work

### Why This is Ideal for Your Interior Designer

1. **No-Code Editing** - Client edits content, you handle design
2. **Image Management** - Built-in CDN, automatic optimization
3. **Collaboration** - Invite their team members
4. **Version History** - Roll back changes if needed
5. **Mobile-Friendly** - Edit from phone/tablet
6. **Professional** - Studio looks polished and modern

### Typical Client Workflow

1. **You**: Set up schemas matching their content needs
2. **You**: Design the frontend components
3. **Client**: Adds projects, updates bio, writes blog posts
4. **You**: Make design tweaks, add features
5. **Client**: Manages content independently

---

## 🛠️ Next Steps

### Immediate (Required)

1. ✅ Run `npx sanity init` to create project
2. ✅ Update `.env.local` with project ID
3. ✅ Visit `/studio` and create your first project
4. ✅ Test fetching data in your components

### Soon (Recommended)

- Import your 3 archived projects
- Create a blog post template
- Set up automated deployments on content publish
- Add preview mode for draft content

### Later (Optional)

- Add custom Studio components
- Set up webhooks for external integrations
- Create content workflows/approval process
- Add localization for multiple languages

---

## 📖 Resources

- **Sanity Docs**: https://www.sanity.io/docs
- **GROQ Cheat Sheet**: https://www.sanity.io/docs/query-cheat-sheet
- **Image API**: https://www.sanity.io/docs/image-url
- **Next.js Integration**: https://www.sanity.io/plugins/next-sanity
- **Community Slack**: https://slack.sanity.io

---

## 🎉 You're Ready!

You now have a production-ready CMS perfect for:
- Managing your portfolio content
- Learning content workflows
- Client projects (like the interior designer site)
- Demonstrating full-stack skills to employers

Run `npx sanity init` and start building! 🚀
