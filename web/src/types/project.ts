export type Project = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  links: {
    live?: string;
    repo?: string;
    caseStudy?: string;
  };
  image?: string;
  featured?: boolean;
};

