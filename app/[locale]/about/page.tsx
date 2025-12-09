import { CarpetPattern } from '@/components/patterns/CarpetPattern';
import { Divider } from '@/components/patterns/Divider';
import { FlyingCarpet } from '@/components/patterns/FlyingCarpet';
import { getTranslations } from 'next-intl/server';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations('about');

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <CarpetPattern variant="geometric" className="w-full h-full" />
        </div>

        <div className="container-custom text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-amiri font-bold mb-6">
            {t('title')}
          </h1>
          <div className="max-w-3xl mx-auto">
            <CarpetPattern variant="medallion" size={100} className="mx-auto mb-6 opacity-60" />
          </div>
        </div>
      </section>

      <Divider variant="ornate" />

      {/* Our Story */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-amiri font-bold text-center mb-8">
              {t('story')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center mb-12">
              {t('storyText')}
            </p>

            <FlyingCarpet variant="large" animate={false} className="mx-auto">
              <h3 className="text-2xl md:text-3xl font-amiri font-bold mb-4 text-white">
                {t('mission')}
              </h3>
              <p className="text-lg text-white/80 leading-relaxed">
                {t('missionText')}
              </p>
            </FlyingCarpet>
          </div>
        </div>
      </section>

      <Divider variant="ornate" />

      {/* Our Values */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <CarpetPattern variant="border" className="w-full h-full" />
        </div>

        <div className="container-custom relative z-10">
          <h2 className="text-3xl md:text-5xl font-amiri font-bold text-center mb-16">
            {t('values')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                key: 'quality', 
                gradient: 'from-amber-500/10 to-orange-500/5',
                accentColor: 'text-amber-500',
                pattern: (
                  <svg className="w-24 h-24" viewBox="0 0 100 100" fill="currentColor" opacity="0.15">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="50" cy="50" r="10"/>
                  </svg>
                )
              },
              { 
                key: 'tradition', 
                gradient: 'from-primary/10 to-secondary/5',
                accentColor: 'text-primary',
                pattern: (
                  <svg className="w-24 h-24" viewBox="0 0 100 100" fill="currentColor" opacity="0.15">
                    <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <polygon points="50,30 75,75 25,75" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="50" cy="55" r="8"/>
                  </svg>
                )
              },
              { 
                key: 'craftsmanship', 
                gradient: 'from-emerald-500/10 to-teal-500/5',
                accentColor: 'text-emerald-500',
                pattern: (
                  <svg className="w-24 h-24" viewBox="0 0 100 100" fill="currentColor" opacity="0.15">
                    <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(45 50 50)"/>
                    <rect x="30" y="30" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(45 50 50)"/>
                    <circle cx="50" cy="50" r="6"/>
                  </svg>
                )
              },
            ].map((item, index) => (
              <div
                key={item.key}
                className={`group relative p-8 pb-12 rounded-2xl bg-gradient-to-br ${item.gradient} backdrop-blur-sm border border-border/30 hover:border-secondary/40 hover:shadow-xl transition-all duration-300 animate-slide-up overflow-hidden`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Unique pattern - positioned at bottom right, away from text */}
                <div className={`absolute -bottom-4 -right-4 ${item.accentColor} opacity-60 group-hover:opacity-100 transition-opacity`}>
                  {item.pattern}
                </div>
                
                {/* Content area with proper spacing */}
                <div className="relative z-10 pr-8">
                  <h3 className={`text-3xl font-amiri font-bold text-foreground mb-4 group-hover:${item.accentColor} transition-colors`}>
                    {t(item.key)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`${item.key}Text`)}
                  </p>
                </div>
                
                {/* Subtle top accent */}
                <div className={`absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-current to-transparent ${item.accentColor} opacity-20 group-hover:opacity-40 transition-opacity`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Process */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-3xl md:text-5xl font-amiri font-bold">
              {t('process.title')}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { step: '1', key: 'step1', color: 'bg-amber-500', ring: 'ring-amber-500/20' },
                { step: '2', key: 'step2', color: 'bg-orange-500', ring: 'ring-orange-500/20' },
                { step: '3', key: 'step3', color: 'bg-primary', ring: 'ring-primary/20' },
                { step: '4', key: 'step4', color: 'bg-secondary', ring: 'ring-secondary/20' },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className="group text-center p-6 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Step number circle with ring */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${item.color} text-white text-2xl font-amiri font-bold mb-4 group-hover:scale-110 transition-transform shadow-lg ring-4 ${item.ring}`}>
                    {item.step}
                  </div>
                  <h4 className="text-lg font-amiri font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {t(`process.${item.key}.title`)}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t(`process.${item.key}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
