"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/atoms/Container";
import Button from "@/components/atoms/Button";
import Logo from "@/components/atoms/Logo";
import NavLink from "@/components/atoms/NavLink";
import {
  heroContent,
  navigationItems,
  siteIdentity,
} from "@/data/portfolio";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="hero-navbar">
      <Container className="hero-navbar-container">
        <Logo
          className="hero-navbar-logo"
          href="#home"
          label={siteIdentity.homeLabel}
          monogram={
            <Image
              alt=""
              className="hero-navbar-logo-image"
              height={36}
              src="/logo.png"
              unoptimized
              width={36}
            />
          }
        >
          {siteIdentity.name}
        </Logo>

        <nav
          aria-controls="mobile-navigation"
          aria-label={siteIdentity.navigationLabel}
          className="hero-navbar-links"
          data-open={isMenuOpen}
          id="mobile-navigation"
        >
          {navigationItems.map((item) => (
            <NavLink
              active={item.active}
              href={item.href}
              key={item.href}
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}

          <Button
            className="hero-navbar-mobile-contact"
            href="#contact"
            onClick={closeMenu}
            size="small"
            variant="secondary"
          >
            {heroContent.contactAction}
          </Button>
        </nav>

        <Button
          className="hero-navbar-contact font-nav"
          href="#contact"
          size="small"
          variant="secondary"
        >
          {heroContent.contactAction}
          <svg
            aria-hidden="true"
            className="hero-navbar-contact-icon size-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 19 19 5M7 5h12v12"
              stroke="currentColor"
              strokeLinecap="square"
              strokeWidth="1.8"
            />
          </svg>
        </Button>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="hero-navbar-menu-button focus-ring"
          onClick={() => setIsMenuOpen((open) => !open)}
          type="button"
        >
          {isMenuOpen ? (
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </Container>
    </header>
  );
};

export default Navbar;