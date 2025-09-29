import Image from "next/image";
import Grid, { GridRow } from "@/components/ui/grid";
import SpotlightBorder from "@/components/ui/spotlight-border";
import AnimatedInView from "@/components/ui/animated-in-view";
import ActionButton from "@/components/ui/action-button";
import SpotlightButton from "@/components/ui/spotlight-button";

const SectionHeading = ({ children }) => (
  <h2 className="text-base text-foreground text-left max-w-2xl mb-4">
    {children}
  </h2>
);

// Helpers for strict validation
const hasText = (v) => typeof v === "string" && v.trim().length > 0;

const isOverviewValid = (s) =>
  s &&
  hasText(s.title) &&
  hasText(s.body) &&
  ((s.image && hasText(s.image.src)) || (s.video && hasText(s.video.src)));

const isChallengesValid = (s) =>
  s &&
  hasText(s.title) &&
  Array.isArray(s.items) &&
  s.items.length > 0 &&
  s.items.every((it) => hasText(it.challenge) && hasText(it.solution));

const isGalleryValid = (s) =>
  s &&
  Array.isArray(s.images) &&
  s.images.length > 0 &&
  s.images.every((img) => img && hasText(img.src));

const renderCaseSection = (section, index) => {
  if (!section || typeof section !== "object") return null;
  const key = `${section.type}-${index}`;

  // New: Overview section
  if (section.type === "overview") {
    if (!isOverviewValid(section)) return null;
    const useVideo = section.video && hasText(section.video.src);
    return (
      <AnimatedInView
        key={key}
        animation="fadeInUp"
        blur={3}
        className="md:opacity-0"
      >
        {section.title && <SectionHeading>{section.title}</SectionHeading>}
        {section.body && (
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
            {section.body}
          </p>
        )}
        <SpotlightBorder className="rounded-lg" radiusClass="rounded-lg">
          {useVideo ? (
            <div className="bg-muted rounded-lg overflow-hidden">
              <video
                src={section.video.src}
                poster={section.video.poster}
                controls
                className="w-full h-auto"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg bg-muted">
              <Image
                src={section.image.src}
                alt={section.image.alt || "Overview image"}
                width={1200}
                height={675}
                sizes="(max-width: 768px) 100vw, 600px"
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </SpotlightBorder>
      </AnimatedInView>
    );
  }

  // New: Challenges section
  if (section.type === "challenges") {
    if (!isChallengesValid(section)) return null;
    return (
      <AnimatedInView
        key={key}
        animation="fadeInUp"
        blur={3}
        className="md:opacity-0"
      >
        {section.title && <SectionHeading>{section.title}</SectionHeading>}
        <div className="grid grid-cols-1 gap-4 lg:gap-5">
          {section.items.map((it, i) => (
            <SpotlightBorder
              key={`${key}-item-${i}`}
              borderColor="hsl(var(--primary))"
              spotlightSize="30% 40px"
            >
              <div className="border border-border p-4 rounded-lg bg-background">
                <h3 className="text-foreground">{it.challenge}</h3>
                <p className="text-muted-foreground sm:text-base text-xs">
                  <span className="font-medium text-foreground">
                    Solution:{" "}
                  </span>
                  {it.solution}
                </p>
                {hasText(it.impact) && (
                  <p className="text-muted-foreground sm:text-base text-xs mt-1">
                    <span className="font-medium text-foreground">
                      Impact:{" "}
                    </span>
                    {it.impact}
                  </p>
                )}
              </div>
            </SpotlightBorder>
          ))}
        </div>
      </AnimatedInView>
    );
  }

  // New: Gallery section
  if (section.type === "gallery") {
    if (!isGalleryValid(section)) return null;
    return (
      <AnimatedInView
        key={key}
        animation="fadeInUp"
        blur={3}
        className="md:opacity-0"
      >
        {section.title && <SectionHeading>{section.title}</SectionHeading>}
        <div className="grid grid-cols-1 gap-5">
          {section.images.map((img, i) => (
            <SpotlightBorder
              key={`${key}-img-${i}`}
              className="rounded-lg"
              radiusClass="rounded-lg"
            >
              <div className="overflow-hidden rounded-lg bg-muted">
                <Image
                  src={img.src}
                  alt={img.alt || `Gallery image ${i + 1}`}
                  width={1200}
                  height={675}
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="w-full h-auto object-cover"
                />
              </div>
            </SpotlightBorder>
          ))}
        </div>
      </AnimatedInView>
    );
  }

  if (section.type === "text") {
    return (
      <AnimatedInView
        key={key}
        animation="fadeInUp"
        blur={3}
        className="md:opacity-0"
      >
        <div className="prose prose-invert max-w-none">
          {section.title && <SectionHeading>{section.title}</SectionHeading>}
          {section.body && (
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {section.body}
            </p>
          )}
        </div>
      </AnimatedInView>
    );
  }

  if (section.type === "image") {
    return (
      <AnimatedInView
        key={key}
        animation="fadeInUp"
        blur={3}
        className="md:opacity-0"
      >
        <SpotlightBorder className="rounded-lg" radiusClass="rounded-lg">
          <div className="overflow-hidden rounded-lg bg-muted">
            <Image
              src={section.src}
              alt={section.alt || "Case image"}
              width={1200}
              height={675}
              sizes="(max-width: 768px) 100vw, 600px"
              className="w-full h-auto object-cover"
            />
          </div>
        </SpotlightBorder>
      </AnimatedInView>
    );
  }

  if (section.type === "stats") {
    const items = Array.isArray(section.items) ? section.items : [];
    return (
      <AnimatedInView
        key={key}
        animation="fadeInUp"
        blur={3}
        className="md:opacity-0"
      >
        <SpotlightBorder className="rounded-lg" radiusClass="rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4">
            {items.map((it, i) => (
              <div
                key={`${key}-stat-${i}`}
                className="flex flex-col items-start bg-background rounded-md border border-border p-3"
              >
                <span className="text-xs text-muted-foreground">
                  {it.label}
                </span>
                <span className="text-base md:text-lg font-semibold text-foreground">
                  {it.value}
                </span>
              </div>
            ))}
          </div>
        </SpotlightBorder>
      </AnimatedInView>
    );
  }

  if (section.type === "quote") {
    return (
      <AnimatedInView
        key={key}
        animation="fadeInUp"
        blur={3}
        className="md:opacity-0"
      >
        <blockquote className="border-l-4 border-border pl-4 italic text-muted-foreground">
          {section.body}
        </blockquote>
      </AnimatedInView>
    );
  }

  if (section.type === "list") {
    const items = Array.isArray(section.items) ? section.items : [];
    return (
      <AnimatedInView
        key={key}
        animation="fadeInUp"
        blur={3}
        className="md:opacity-0"
      >
        {section.title && <SectionHeading>{section.title}</SectionHeading>}
        <ul className="list-disc ml-5 space-y-1 text-sm md:text-base text-muted-foreground">
          {items.map((it, i) => (
            <li key={`${key}-li-${i}`}>{it}</li>
          ))}
        </ul>
      </AnimatedInView>
    );
  }

  return null;
};

export default function CaseStudy({ project }) {
  const {
    title,
    description,
    image,
    tags = [],
    links = {},
    case: caseData,
  } = project || {};
  const sections = Array.isArray(caseData?.sections) ? caseData.sections : [];

  return (
    <main>
      <section id="case-study">
        <Grid>
          <GridRow />
          <GridRow
            center={
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground ">
                  {title}
                </h1>
                {description && (
                  <p className="text-muted-foreground mb-2">{description}</p>
                )}
                {links?.live && (
                  <SpotlightButton
                    href={links.live}
                    text="Visit Website"
                    className="mt-2"
                    target="_blank"
                  />
                )}
              </div>
            }
          />
          <GridRow />
          {image && (
            <GridRow
              centerMuted={true}
              center={
                <SpotlightBorder
                  className="rounded-lg"
                  radiusClass="rounded-lg"
                >
                  <div className="overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={image}
                      alt={title}
                      width={1200}
                      height={675}
                      sizes="(max-width: 768px) 100vw, 600px"
                      priority
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </SpotlightBorder>
              }
            />
          )}
          {tags.length > 0 && (
            <GridRow
              center={
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span
                      key={`tag-${t}`}
                      className="text-xs bg-muted text-muted-foreground border border-border rounded px-2 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              }
            />
          )}
          <GridRow />
          {sections.map((s, i) => {
            const content = renderCaseSection(s, i);
            return content ? (
              <GridRow
                key={`section-${i}`}
                centerMuted={s.type === "challenges"}
                center={content}
              />
            ) : null;
          })}
          <GridRow />
        </Grid>
      </section>
    </main>
  );
}
