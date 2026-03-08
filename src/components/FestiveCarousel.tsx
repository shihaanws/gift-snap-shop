import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const imageModules = import.meta.glob("../assets/carousel-images/*.{png,jpg,jpeg,webp,avif,svg}", {
  eager: true,
  import: "default",
});

const slides = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, image], index) => {
    const filename = path.split("/").pop() ?? `Slide ${index + 1}`;
    const label = filename.replace(/\.[^.]+$/, "");
    return {
      id: `${label}-${index}`,
      image: String(image),
      alt: label,
    };
  });

const FestiveCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!api || slides.length === 0) return;

    const timer = window.setInterval(() => {
      api.scrollNext();
    }, 3200);

    return () => window.clearInterval(timer);
  }, [api, slides.length]);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setActiveIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <section className=" border-border bg-white">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "center",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-0 basis-full">
              <div className="relative h-[135px] w-full overflow-hidden sm:h-[155px] md:h-[175px] lg:h-[295px]">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="h-full w-full"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-black/10" /> */}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex items-center justify-center gap-2 py-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => api?.scrollTo(index)}
            className={`h-1.5 rounded-full transition-all ${
              activeIndex === index ? "w-8 bg-primary/90" : "w-3 bg-primary/25"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default FestiveCarousel;
