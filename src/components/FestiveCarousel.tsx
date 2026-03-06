import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useProducts } from "@/hooks/use-products";

const FestiveCarousel = () => {
  const { products } = useProducts();
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = products.slice(0, 6);

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
    <section className="border-b border-white/10 bg-[#081d33]">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "center",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {slides.map((product) => (
            <CarouselItem key={product.id} className="pl-0 basis-full">
              <div className="relative h-[135px] w-full overflow-hidden sm:h-[155px] md:h-[175px] lg:h-[195px]">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-black/10" />

                <div className="absolute inset-0 flex items-end">
                  <div className="w-full px-4 pb-3 text-white sm:px-6 sm:pb-4 md:px-8 md:pb-5">
                    <p className="mb-1 inline-flex rounded-full border border-white/35 bg-white/10 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.13em] sm:text-[10px]">
                      Festive Picks
                    </p>
                    <h3 className="max-w-2xl font-display text-base font-bold sm:text-lg md:text-xl">
                      {product.name}
                    </h3>
                    <Link
                      to={`/product/${product.id}`}
                      className="mt-2 inline-flex rounded-lg bg-white px-3 py-1.5 text-[11px] font-semibold text-[#0E2A4A] transition hover:bg-white/90 sm:text-xs"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
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
              activeIndex === index ? "w-8 bg-white" : "w-3 bg-white/35"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default FestiveCarousel;
