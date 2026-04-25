"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "../components/ScrollReveal";

const contactChannels = [
  { icon: "/icons/Discord.svg", label: "Discord", href: "https://discord.com/users/1133402776290992158" },
  { icon: "/icons/Instagram.svg", label: "Instagram", href: "https://www.instagram.com/xau_dev/" },
  { icon: "/icons/mail.svg", label: "mrgolddev@gmail.com", href: "mailto:mrgolddev@gmail.com" },
];

const socials = [
  { icon: "/icons/figma.svg", label: "@xaudev", href: "https://figma.com/@xaudev" },
  { icon: "/icons/twitter.svg", label: "@xaudev", href: "#" },
  { icon: "/icons/github.svg", label: "@MrGolddev", href: "https://github.com/xau-dev" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-16">
      <div className="max-w-xl mx-auto text-center">
        <ScrollReveal direction="up">
          <h2
            className="text-4xl md:text-5xl font-normal text-white tracking-tight mb-4"
            style={{ fontFamily: "var(--font-domaine-condensed)" }}
          >
            Contact
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <p className="text-neutral-400 text-base mb-10">
            Open to projects, collaborations, or just a quick chat. I don&apos;t bite, just reach out.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <div
            className="border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm p-8"
            style={{ borderRadius: "15px" }}
          >
            <div className="mb-8">
              <p className="text-neutral-400 text-sm mb-4">Contact Channels</p>
              <div className="flex flex-wrap justify-center gap-3">
                {contactChannels.map((channel) => (
                  <Link
                    key={channel.label}
                    href={channel.href}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-800 bg-neutral-900/50 text-neutral-300 text-sm hover:border-neutral-700 hover:bg-neutral-800/50 hover:text-white transition-colors"
                    style={{ borderRadius: "15px" }}
                  >
                    <Image
                      src={channel.icon}
                      alt={channel.label}
                      width={16}
                      height={16}
                      className="opacity-70"
                    />
                    {channel.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-neutral-400 text-sm mb-4">Socials</p>
              <div className="flex flex-wrap justify-center gap-3">
                {socials.map((social) => (
                  <Link
                    key={`${social.label}-${social.icon}`}
                    href={social.href}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-800 bg-neutral-900/50 text-neutral-300 text-sm hover:border-neutral-700 hover:bg-neutral-800/50 hover:text-white transition-colors"
                    style={{ borderRadius: "15px" }}
                  >
                    <Image
                      src={social.icon}
                      alt={social.label}
                      width={16}
                      height={16}
                      className="opacity-70"
                    />
                    {social.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
