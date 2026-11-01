import { heroStats } from "@/data/portfolio";
const HeroStats = () => (
  <dl className="hero-stats">
    {heroStats.map((stat) => (
      <div className="hero-stat min-w-0" key={stat.label}>
        <dt className="font-mono text-stat font-bold leading-none tracking-tight text-ink">{stat.value}</dt>
        <dd className="mt-2 text-sm leading-snug text-muted">{stat.label}</dd>
      </div>
    ))}
  </dl>
);

export default HeroStats;
