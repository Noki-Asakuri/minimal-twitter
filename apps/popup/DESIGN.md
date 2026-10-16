---
name: Minimal Twitter settings
colors:
  background: "#ffffff"
  foreground: "#0f1419"
  surface: "#f4f5f7"
  primary: "#2364d8"
  muted: "#626873"
  dark-background: "#161719"
  dark-surface: "#202226"
  dark-primary: "#86b2ff"
typography:
  heading:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "13px"
    fontWeight: 450
rounded:
  group: "16.8px"
  control: "8px"
spacing:
  inset: "22px"
  group: "16px"
  row: "45px"
---

## Overview

Clean editorial settings for a compact extension. Organize by intent rather than exposing one long feature inventory. Existing controls retain their storage and behavior.

## Colors

Neutral backgrounds and surfaces establish hierarchy. Blue identifies enabled controls and the active category. Follow the operating system's light or dark preference; use semantic tokens in both themes.

## Typography

Use bundled Geist throughout. Page titles are 24px semibold, the wordmark is 20px, descriptions are 14px, and setting labels are 13px. Keep capitalization natural and avoid decorative uppercase labels.

## Layout

A 440px-wide, 600px-high shell contains the header, extension switch, four category links, and one continuous scrolling page. Below 380px, reduce horizontal insets to 16px and omit the brand mark. Keep the category strip outside the scrolling content. Place original Typefully attribution and an updated-fork link below the title; omit a footer and save-status copy.

## Elevation & Depth

Use flat surface tones for setting groups. Reserve shadows for floating controls such as the font picker.

## Shapes

Use softly rounded setting groups, 8px tab corners, and native switch shapes. Navigation choices use labeled, two-column toggles with active color and a state indicator.

## Components

Category links scroll to section anchors, and an IntersectionObserver updates aria-current as the user scrolls. Keep every section mounted to preserve editor state and pending saves. Respect reduced-motion preferences when scrolling. Feed contains reading layout and distraction filters; Navigation contains destinations, shortcuts, and labels; Appearance contains fonts, search, controls, and notifications; More contains sharing, Typefully, and custom CSS.

## Do's and Don'ts

Preserve every existing preference and automatic saving. Use explicit control labels, visible keyboard focus, and reduced-motion support. Do not add promotional hero sections, decorative imagery, new font downloads, or a save button.
