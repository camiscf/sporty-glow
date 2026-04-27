---
name: Grit & Glow
colors:
  surface: '#fef7ff'
  surface-dim: '#ded7e4'
  surface-bright: '#fef7ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f1fe'
  surface-container: '#f3ebf8'
  surface-container-high: '#ede5f2'
  surface-container-highest: '#e7e0ed'
  on-surface: '#1d1a23'
  on-surface-variant: '#5c3f45'
  inverse-surface: '#322f38'
  inverse-on-surface: '#f6eefb'
  outline: '#906e75'
  outline-variant: '#e5bcc4'
  surface-tint: '#bb0058'
  primary: '#b60055'
  on-primary: '#ffffff'
  primary-container: '#e4006c'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb1c3'
  secondary: '#725477'
  on-secondary: '#ffffff'
  secondary-container: '#fad3fd'
  on-secondary-container: '#77587c'
  tertiary: '#6e5659'
  on-tertiary: '#ffffff'
  tertiary-container: '#886e71'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9e0'
  primary-fixed-dim: '#ffb1c3'
  on-primary-fixed: '#3f0019'
  on-primary-fixed-variant: '#8f0041'
  secondary-fixed: '#fcd7ff'
  secondary-fixed-dim: '#dfbbe4'
  on-secondary-fixed: '#2a1131'
  on-secondary-fixed-variant: '#593d5f'
  tertiary-fixed: '#fbdbde'
  tertiary-fixed-dim: '#debfc2'
  on-tertiary-fixed: '#281719'
  on-tertiary-fixed-variant: '#574144'
  background: '#fef7ff'
  on-background: '#1d1a23'
  surface-variant: '#e7e0ed'
typography:
  display-lg:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  title-sm:
    fontFamily: Lexend
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  data-lg:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  label-xs:
    fontFamily: Lexend
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  container-margin: 20px
  gutter: 16px
---

## Brand & Style

This design system is built for the intersection of high-performance discipline and unapologetic femininity. It balances the "hard" nature of the 75-day challenge with a "soft" visual wrapper that feels encouraging rather than punishing. 

The aesthetic combines **Minimalism** with **Glassmorphism**. The interface remains uncluttered to reduce cognitive load during a demanding challenge, while translucent layers and vibrant background blurs provide a sense of depth and energy. The goal is to evoke a "Studio Fitness" vibe: premium, energetic, and clean. Imagery should focus on high-key lighting, sweat-glistening skin, and lush textures like marble and athletic mesh.

## Colors

The palette uses a high-contrast strategy to drive action. 
- **Primary (Vibrant Magenta):** Reserved for primary actions, completion states, and "Hard" milestones. It represents energy and grit.
- **Secondary (Lavender):** Used for auxiliary tracking elements and secondary buttons.
- **Tertiary (Soft Pink):** Acts as a background tint for cards or subtle progress indicators.
- **Neutral (Deep Purple/Dark Slate):** Used for typography and deep shadows to ensure legibility and a grounded, premium feel.
- **Glass Accents:** White at 40-70% opacity is used for layered surfaces over colorful background gradients.

## Typography

This system employs a sophisticated typographic pairing to balance the brand's dual nature. **Noto Serif** provides an editorial, premium feel for headers and motivational quotes, suggesting the "Glow" and personal growth aspect. **Lexend** is utilized for all functional UI components, tracking numbers, and body copy; its hyper-readable, athletic structure reinforces the "Grit" and performance aspect of the challenge. Use uppercase labels for metadata to add a sporty, rhythmic feel to the layout.

## Layout & Spacing

The layout utilizes a **fluid grid** system designed for mobile-first consumption. 
- **Margins:** A standard 20px side margin ensures content does not feel cramped.
- **Rhythm:** An 8px base unit drives all padding and margins. Vertical rhythm should be generous to maintain the clean, "zen" feel of the system.
- **Sectioning:** Group daily tasks (The 5 Rules) into a unified central stack with 16px gutters between cards. Use larger 40px gaps to separate different functional areas like "Daily Stats" from "Photo Gallery."

## Elevation & Depth

Hierarchy is established through **Glassmorphism** and **Ambient Shadows**.
- **The Base:** A crisp white background, occasionally broken by soft, blurred organic shapes in Magenta and Lavender (Z-index: 0).
- **The Surface:** Cards use a "Milk Glass" effect (White at 60% opacity) with a `backdrop-filter: blur(20px)`. 
- **Shadows:** Instead of black, use high-spread, low-opacity shadows tinted with the Deep Purple neutral color (`rgba(30, 27, 36, 0.08)`).
- **Strokes:** Use 1px semi-transparent white borders on glass elements to simulate a light-catching edge.

## Shapes

The shape language is consistently soft to reflect the "girly" aesthetic, avoiding harsh angles that feel too aggressive. 
- **Cards & Containers:** Use a 1rem (16px) radius for a friendly, modern feel.
- **Progress Bars:** Fully pill-shaped ends (3rem) to emphasize movement and flow.
- **Interactive Elements:** Buttons and input fields should follow the `rounded-lg` (1rem) or `rounded-xl` (1.5rem) settings to maintain a tactile, approachable quality.

## Components

- **Action Buttons:** Primary buttons are vibrant Magenta with white text. Apply a subtle glow effect (box-shadow) using the primary color at 30% opacity.
- **Tracking Chips:** Small, pill-shaped indicators for "Day X" or "Completed." Use Lavender backgrounds with Deep Purple text for high legibility.
- **The "Big Five" Cards:** Daily habit cards (Water, Workouts, Reading, Diet, Photo) should use glass surfaces. Upon completion, the card background transitions from a soft white-glass to a solid Soft Pink with a Magenta checkmark.
- **Progress Rings:** Use thick, 12px strokes for circular progress indicators. The unfilled track should be a very pale Lavender, while the active track uses a Magenta-to-Lavender gradient.
- **Inputs:** Text fields for journaling or calorie tracking should have a subtle Soft Pink background with a bottom-only border that glows Magenta when focused.
- **Iconography:** Use "Duotone" icons where the secondary element is Magenta and the primary frame is Deep Purple. Focus on energetic, rounded line-art.