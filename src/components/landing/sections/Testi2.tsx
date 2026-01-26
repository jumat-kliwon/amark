'use client';

export function Testi2() {
  return (
    <section className="relative text-white mb-20">
      <div className="text-blue-700 text-center text-xl font-bold w-full mx-auto mb-6 mt-10">
        Apa kata mereka yang sudah mempraktekan ilmunya?
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="max-w-6xl mx-auto aspect-video relative rounded-xl overflow-hidden mb-4">
          <iframe
            className="w-full h-[200px] md:h-[400px] rounded-xl"
            src="https://www.youtube.com/embed/vxSjTnmG128"
            allowFullScreen
          />
        </div>
        <div className="max-w-6xl mx-auto aspect-video relative rounded-xl overflow-hidden mb-4">
          <iframe
            className="w-full h-[200px] md:h-[400px] rounded-xl"
            src="https://www.youtube.com/embed/4pW35-0GmZ0"
            allowFullScreen
          />
        </div>
        <div className="max-w-6xl mx-auto aspect-video relative rounded-xl overflow-hidden mb-4">
          <iframe
            className="w-full h-[200px] md:h-[400px] rounded-xl"
            src="https://www.youtube.com/embed/8nhauXbDEBw"
            allowFullScreen
          />
        </div>
        <div className="max-w-6xl mx-auto aspect-video relative rounded-xl overflow-hidden mb-4">
          <iframe
            className="w-full h-[200px] md:h-[400px] rounded-xl"
            src="https://www.youtube.com/embed/K_fJGCtZqw0"
            allowFullScreen
          />
        </div>
        <div className="max-w-6xl mx-auto aspect-video relative rounded-xl overflow-hidden mb-4">
          <iframe
            className="w-full h-[200px] md:h-[400px] rounded-xl"
            src="https://www.youtube.com/embed/ZMMBM-o-f-Y"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
