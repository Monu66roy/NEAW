import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import ImageSection from "@/components/ImageSection";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import ArticleCard from "@/components/ArticleCard";
import CTASection from "@/components/CTASection";
import Button from "@/components/Button";
import TopoArt from "@/components/TopoArt";

import {
  getContentList,
  getProjects,
  getArticles,
  getPageContent,
  getHomeSections,
  block,
} from "@/lib/api";

import { resolveImageUrl } from "@/lib/media";

export default async function HomePage() {
  const [
    FOCUS_AREAS,
    allProjects,
    allArticles,
    content,
    homeSections,
  ] = await Promise.all([
    getContentList("focus_areas"),
    getProjects(),
    getArticles(),
    getPageContent("home"),
    getHomeSections(),
  ]);

  // Only enabled sections are displayed.
  // sort_order controls the order configured from Admin → Home Builder.
  const enabledSections = homeSections
    .filter((section) => section.enabled)
    .sort((a, b) => a.sort_order - b.sort_order);

  // Projects are controlled from Admin → Projects → Show on Home.
  const featuredProjects = allProjects
    .filter((project) => project.show_on_home)
    .slice(0, 3);

  // Articles are controlled from Admin → Articles → Show on Home.
  const previewArticles = allArticles
    .filter((article) => article.show_on_home)
    .slice(0, 2);

  /*
   * If the Home Builder has no sections yet, keep the existing
   * hardcoded Home page behaviour as a safe fallback.
   */
  if (enabledSections.length === 0) {
    return (
      <>
        <HeroSection
          title={block(
            content,
            "hero_title",
            "Let's explore opportunities for Nepal's future"
          )}
          description={block(
            content,
            "hero_description",
            "Whether you are exploring a project, investment opportunity, technical collaboration, or strategic partnership, we welcome the opportunity to connect."
          )}
          primaryCta={{
            label: "Explore what we do",
            href: "/what-we-do",
          }}
          secondaryCta={{
            label: "Discuss a partnership",
            href: "/partnerships",
          }}
        />

        <section className="container-wide py-16 sm:py-24">
          <ImageSection
            eyebrow={block(content, "intro_eyebrow", "About NEWRPL")}
            title={block(
              content,
              "intro_title",
              "Exploring Opportunities. Building Possibilities."
            )}
            reverse
            imageUrl="/images/ImagesAbout.jpg"
            imageAlt="Hydropower and water resources in Nepal"
          >
            <p>
              {block(
                content,
                "intro_paragraph_1",
                "Nepal Energy and Water Resources Pvt. Ltd. works across Nepal's energy and water resources sectors, exploring opportunities that support sustainable economic growth and infrastructure development."
              )}
            </p>

            <p>
              {block(
                content,
                "intro_paragraph_2",
                "Our approach combines local understanding with technical capabilities and collaborative partnerships to identify, develop, and support opportunities with long-term potential."
              )}
            </p>

            <Button href="/about" className="self-start">
              Learn more about us
            </Button>
          </ImageSection>
        </section>

        <section className="border-y border-line bg-white py-16 sm:py-24">
          <div className="container-wide flex flex-col gap-10">
            <SectionHeading
              kicker="Areas of Focus"
              title="Where we work"
              description="Our work focuses on sectors that are central to Nepal’s infrastructure, economic development, and long-term sustainability. We explore opportunities where technical understanding, responsible development, investment, and collaboration can contribute to meaningful and sustainable outcomes."
              className="max-w-2xl"
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FOCUS_AREAS.map((area, index) => (
                <ServiceCard
                  key={area.id}
                  index={index}
                  title={area.title}
                  description={area.description}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="container-wide py-16 sm:py-24">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                kicker="Projects"
                title="Exploring opportunities across Nepal"
                description="Our project pipeline covers opportunities across energy and water resources, from early-stage concepts through development and implementation."
              />

              <Button href="/projects" variant="ghost">
                View all projects
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-white py-16 sm:py-24">
          <div className="container-wide">
            <ImageSection
              eyebrow="Partnerships"
              title="Strong partnerships create stronger outcomes"
              reverse
              imageUrl="/images/Gemini_Generated_Image_yexo4jyexo4jyexo.jpg"
              imageAlt="Hydropower and water resources in Nepal"
            >
              <p>
                We believe successful projects are built through collaboration.
                We work with investors, technical organisations, government
                stakeholders, communities, and other partners to bring the right
                expertise and resources together.
              </p>

              <p>
                Whether you are interested in project development, investment,
                technical collaboration, or a long-term strategic relationship,
                we welcome the opportunity to explore how we can work together.
              </p>

              <Button
                href="/partnerships"
                className="self-start"
              >
                Discuss a partnership
              </Button>
            </ImageSection>
          </div>
        </section>

        <section className="container-wide py-16 sm:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionHeading
              kicker="Opportunities"
              title="Explore opportunities with NEAW"
              description="We are interested in connecting with investors, project developers, technical specialists, and organisations looking to participate in Nepal's energy and water resources sectors."
            />

            <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface-alt p-8 sm:p-10">
              <span className="text-sm font-semibold text-blue">
                Projects & Partnerships
              </span>

              <h3 className="text-xl font-semibold text-ink">
                Have an opportunity to discuss?
              </h3>

              <p className="text-sm leading-relaxed text-slate">
                Tell us about your project, investment interest, technical
                capability, or partnership proposal. Our team will review the
                information and get in touch.
              </p>

              <Button
                href="/opportunities"
                variant="ghost"
                className="self-start"
              >
                View opportunities
              </Button>
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-white py-16 sm:py-24">
          <div className="container-wide flex flex-col gap-10">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                kicker="Insights"
                title="News and perspectives"
                description="Explore perspectives on Nepal's energy and water resources sectors, project development, sustainability, and emerging opportunities."
              />

              <Button href="/insights" variant="ghost">
                View all insights
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {previewArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={{
                    category: article.category,
                    title: article.title,
                    date: article.article_date,
                    description: article.description,
                    image_url: article.image_url,
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="container-wide py-16 sm:py-24">
          <ImageSection
            eyebrow="Careers"
            title="Grow with a team working for Nepal's future"
            visual={<TopoArt className="h-3/4 w-3/4" />}
          >
            <p>
              We value people who bring curiosity, technical capability,
              collaboration, and a commitment to creating meaningful outcomes.
              As our work grows, we aim to build a team capable of contributing
              to Nepal's evolving energy and infrastructure landscape.
            </p>

            <Button
              href="/careers"
              className="self-start"
            >
              View career opportunities
            </Button>
          </ImageSection>
        </section>

        <CTASection
          title="Let's build something lasting for Nepal"
          description="Whether you are exploring a partnership, investment opportunity, or project idea, we would be pleased to hear from you."
          primaryCta={{
            label: "Contact us",
            href: "/contact",
          }}
          secondaryCta={{
            label: "Learn about NEAW",
            href: "/about",
          }}
        />
      </>
    );
  }

  /*
   * Database-driven Home Builder rendering.
   */
  return (
    <>
      {enabledSections.map((section) => {
        /*
         * HERO
         */
        if (section.section_type === "hero") {
          return (
            <HeroSection
              key={section.id}
              title={
                section.title ||
                block(
                  content,
                  "hero_title",
                  "Let's explore opportunities for Nepal's future"
                )
              }
              description={
                section.description ||
                block(
                  content,
                  "hero_description",
                  "Whether you are exploring a project, investment opportunity, technical collaboration, or strategic partnership, we welcome the opportunity to connect."
                )
              }
              primaryCta={
                section.button_1_label
                  ? {
                      label: section.button_1_label,
                      href: section.button_1_url || "#",
                    }
                  : {
                      label: "Explore what we do",
                      href: "/what-we-do",
                    }
              }
              secondaryCta={
                section.button_2_label
                  ? {
                      label: section.button_2_label,
                      href: section.button_2_url || "#",
                    }
                  : {
                      label: "Discuss a partnership",
                      href: "/partnerships",
                    }
              }
            />
          );
        }

        /*
         * IMAGE + TEXT
         *
         * This supports the About / Partnerships / Careers style sections.
         */
        if (section.section_type === "image_text") {
          const isCareers =
            section.section_key.toLowerCase().includes("career");

          const fallbackImage = isCareers
            ? undefined
            : section.section_key.toLowerCase().includes("partnership")
            ? "/images/Gemini_Generated_Image_yexo4jyexo4jyexo.jpg"
            : "/images/ImagesAbout.jpg";

          const imageUrl =
            resolveImageUrl(section.image_url) ?? fallbackImage;

          const contentParagraphs = section.content
            ? section.content
                .split(/\n\s*\n/)
                .map((paragraph) => paragraph.trim())
                .filter(Boolean)
            : [];

          return (
            <section
              key={section.id}
              className="container-wide py-16 sm:py-24"
            >
              <ImageSection
                eyebrow={section.eyebrow}
                title={section.title}
                reverse
                imageUrl={imageUrl}
                imageAlt={
                  section.image_alt ||
                  "Nepal energy and water resources"
                }
                visual={
                  isCareers ? (
                    <TopoArt className="h-3/4 w-3/4" />
                  ) : undefined
                }
              >
                {section.description && (
                  <p>{section.description}</p>
                )}

                {contentParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}

                {section.button_1_label && (
                  <Button
                    href={section.button_1_url || "#"}
                    className="self-start"
                  >
                    {section.button_1_label}
                  </Button>
                )}
              </ImageSection>
            </section>
          );
        }

        /*
         * AREAS / CARDS
         */
        if (section.section_type === "cards") {
          return (
            <section
              key={section.id}
              className="border-y border-line bg-white py-16 sm:py-24"
            >
              <div className="container-wide flex flex-col gap-10">
                <SectionHeading
                  kicker={section.eyebrow || "Areas of Focus"}
                  title={section.title || "Where we work"}
                  description={section.description}
                  className="max-w-2xl"
                />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {FOCUS_AREAS.map((area, index) => (
                    <ServiceCard
                      key={area.id}
                      index={index}
                      title={area.title}
                      description={area.description}
                    />
                  ))}
                </div>
              </div>
            </section>
          );
        }

        /*
         * PROJECTS
         */
        if (section.section_type === "projects") {
          return (
            <section
              key={section.id}
              className="container-wide py-16 sm:py-24"
            >
              <div className="flex flex-col gap-10">
                <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                  <SectionHeading
                    kicker={section.eyebrow || "Projects"}
                    title={
                      section.title ||
                      "Exploring opportunities across Nepal"
                    }
                    description={section.description}
                  />

                  {section.button_1_label ? (
                    <Button
                      href={section.button_1_url || "#"}
                      variant="ghost"
                    >
                      {section.button_1_label}
                    </Button>
                  ) : (
                    <Button
                      href="/projects"
                      variant="ghost"
                    >
                      View all projects
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredProjects.map((project) => (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                    />
                  ))}
                </div>
              </div>
            </section>
          );
        }

        /*
         * SPLIT CTA / OPPORTUNITIES
         */
        if (section.section_type === "split_cta") {
          return (
            <section
              key={section.id}
              className="container-wide py-16 sm:py-24"
            >
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <SectionHeading
                  kicker={section.eyebrow || "Opportunities"}
                  title={
                    section.title ||
                    "Explore opportunities with NEAW"
                  }
                  description={section.description}
                />

                <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface-alt p-8 sm:p-10">
                  <span className="text-sm font-semibold text-blue">
                    {section.content || "Projects & Partnerships"}
                  </span>

                  <h3 className="text-xl font-semibold text-ink">
                    Have an opportunity to discuss?
                  </h3>

                  <p className="text-sm leading-relaxed text-slate">
                    Tell us about your project, investment interest,
                    technical capability, or partnership proposal.
                    Our team will review the information and get in
                    touch.
                  </p>

                  {section.button_1_label && (
                    <Button
                      href={section.button_1_url || "#"}
                      variant="ghost"
                      className="self-start"
                    >
                      {section.button_1_label}
                    </Button>
                  )}
                </div>
              </div>
            </section>
          );
        }

        /*
         * ARTICLES / INSIGHTS
         */
        if (section.section_type === "articles") {
          return (
            <section
              key={section.id}
              className="border-y border-line bg-white py-16 sm:py-24"
            >
              <div className="container-wide flex flex-col gap-10">
                <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                  <SectionHeading
                    kicker={section.eyebrow || "Insights"}
                    title={
                      section.title ||
                      "News and perspectives"
                    }
                    description={section.description}
                  />

                  {section.button_1_label ? (
                    <Button
                      href={section.button_1_url || "#"}
                      variant="ghost"
                    >
                      {section.button_1_label}
                    </Button>
                  ) : (
                    <Button
                      href="/insights"
                      variant="ghost"
                    >
                      View all insights
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {previewArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={{
                        category: article.category,
                        title: article.title,
                        date: article.article_date,
                        description: article.description,
                        image_url: article.image_url,
                      }}
                    />
                  ))}
                </div>
              </div>
            </section>
          );
        }

        /*
         * CTA
         */
        if (section.section_type === "cta") {
          return (
            <CTASection
              key={section.id}
              title={
                section.title ||
                "Let's build something lasting for Nepal"
              }
              description={
                section.description ||
                "Whether you are exploring a partnership, investment opportunity, or project idea, we would be pleased to hear from you."
              }
              primaryCta={
                section.button_1_label
                  ? {
                      label: section.button_1_label,
                      href: section.button_1_url || "#",
                    }
                  : {
                      label: "Contact us",
                      href: "/contact",
                    }
              }
              secondaryCta={
                section.button_2_label
                  ? {
                      label: section.button_2_label,
                      href: section.button_2_url || "#",
                    }
                  : {
                      label: "Learn about NEAW",
                      href: "/about",
                    }
              }
            />
          );
        }

        /*
         * Unknown section type:
         *
         * Do not crash the Home page. Instead, render a simple
         * text section so the admin can see that the section exists.
         */
        return (
          <section
            key={section.id}
            className="container-wide py-16 sm:py-24"
          >
            <SectionHeading
              kicker={section.eyebrow}
              title={section.title}
              description={section.description}
            />

            {section.content && (
              <div className="mt-6 max-w-3xl text-sm leading-relaxed text-slate">
                {section.content}
              </div>
            )}
          </section>
        );
      })}
    </>
  );
}