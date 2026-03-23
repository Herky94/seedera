export interface ProjectDetail {
  slug: string;
  client: string;
  tags: string[];
  description: string;
  images: string[];
}

export const PROJECTS: ProjectDetail[] = [
  {
    slug: "progetto-uno",
    client: "NOME DEL CLIENTE",
    tags: ["CATEGORIA UNO", "CATEGORIA DUE", "CATEGORIA TRE"],
    description:
      "Lorem ipsum dolor sit consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus sociis natoque penatibus et m",
    images: [
      "/images/projects/Rectangle 24.png",
      "/images/projects/Rectangle 27.png",
      "/images/projects/Rectangle 24.png",
      "/images/projects/Rectangle 27.png",
    ],
  },
  {
    slug: "progetto-due",
    client: "NOME DEL CLIENTE",
    tags: ["CATEGORIA DUE", "CATEGORIA TRE"],
    description:
      "Lorem ipsum dolor sit consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus sociis natoque penatibus et m",
    images: [
      "/images/projects/Rectangle 27.png",
      "/images/projects/Rectangle 24.png",
      "/images/projects/Rectangle 27.png",
    ],
  },
  {
    slug: "progetto-tre",
    client: "NOME DEL CLIENTE",
    tags: ["CATEGORIA UNO"],
    description:
      "Lorem ipsum dolor sit consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus sociis natoque penatibus et m",
    images: [
      "/images/projects/Rectangle 24.png",
      "/images/projects/Rectangle 27.png",
    ],
  },
];
