import React from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
  dark?: boolean;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
  dark = false,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''} ${className}`}>
      <span
        className={`text-[10px] font-semibold uppercase tracking-[0.3em] mb-5 inline-block ${
          dark ? 'text-[#A987C2]' : 'text-[#6E3A82]'
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] mt-2 ${
          dark ? 'text-white' : 'text-[#3B214F]'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            dark ? 'text-[#E8DDF0]/80' : 'text-[#716A73]'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
