---
name: ViadrusAI
colors:
  surface: '#0e1417'
  surface-dim: '#0e1417'
  surface-bright: '#333a3d'
  surface-container-lowest: '#090f12'
  surface-container-low: '#161d1f'
  surface-container: '#1a2123'
  surface-container-high: '#242b2e'
  surface-container-highest: '#2f3639'
  on-surface: '#dde3e7'
  on-surface-variant: '#bbc9cf'
  inverse-surface: '#dde3e7'
  inverse-on-surface: '#2b3134'
  outline: '#859399'
  outline-variant: '#3c494e'
  surface-tint: '#47d6ff'
  primary: '#a5e7ff'
  on-primary: '#003543'
  primary-container: '#00d2ff'
  on-primary-container: '#00566a'
  inverse-primary: '#00677f'
  secondary: '#c9c6c5'
  on-secondary: '#313030'
  secondary-container: '#474646'
  on-secondary-container: '#b7b4b4'
  tertiary: '#ffd79f'
  on-tertiary: '#442b00'
  tertiary-container: '#ffb229'
  on-tertiary-container: '#6c4700'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b6ebff'
  primary-fixed-dim: '#47d6ff'
  on-primary-fixed: '#001f28'
  on-primary-fixed-variant: '#004e60'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c9c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474646'
  tertiary-fixed: '#ffddb1'
  tertiary-fixed-dim: '#ffba4a'
  on-tertiary-fixed: '#291800'
  on-tertiary-fixed-variant: '#624000'
  background: '#0e1417'
  on-background: '#dde3e7'
  surface-variant: '#2f3639'
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 40px
  container-max: 1440px
---

## Brand & Style

The design system bridges ancient Slavic mythology with cutting-edge hydro-informatics. It evokes a sense of "Technological Mysticism"—the feeling that the user is consulting a digital deity to navigate the unpredictable forces of nature. 

The aesthetic is rooted in **Glassmorphism** and **High-Tech Futurism**. It utilizes deep shadows, translucent surfaces, and vibrant bioluminescent accents to simulate a command center overlooking a dark, digital river. The visual language favors fluid, organic shapes for data visualization, contrasted against sharp, thin-lined UI containers to represent the precision of the predictive AI.

Target users include environmental emergency responders and regional authorities who require high-density data presented with clarity and emotional urgency.

## Colors

The palette is anchored by a deep-space black to provide maximum contrast for neon elements. 

- **Core Background**: The absolute black (#050505) creates an infinite depth, allowing glass layers to stack without visual clutter.
- **Primary Accent**: Cyan/Neon Blue is used for active states, data paths, and interactive elements. It should always be accompanied by a 15-20px Gaussian blur "glow" when representing live data or high-priority interactions.
- **Functional Semantics**: Danger, Warning, and Safe colors are saturated to ensure visibility against the dark backdrop. They should be used sparingly for status indicators and high-alert warnings.
- **Gradients**: Use mesh gradients transitioning from `#00d2ff` to `rgba(0, 210, 255, 0)` to simulate the flow of water and information.

## Typography

This design system utilizes **Inter** for its utilitarian precision and exceptional readability in low-light interfaces.

- **Hierarchical Contrast**: Use heavy weights (700) for "Display" levels to ground the interface. 
- **Functional Labels**: Data points and small UI labels should use the `label-caps` style to mimic technical readouts.
- **Color Application**: Headlines should primarily be white or high-opacity grey. Interactive text links or primary data figures should use the Cyan accent.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** model with a consistent 8px baseline. 

- **Grid System**: A 12-column grid is used for desktop layouts. Components should snap to the grid but maintain generous internal padding to support the "Glassmorphism" effect.
- **Rhythm**: Use the 8px unit for all margins and paddings. Component height should be in multiples of 8 (e.g., 40px, 48px, 56px).
- **Safe Areas**: Maps and river visualizations should bleed to the edge of the screen, with UI controls floating in fixed-position glass panels at the margins.

## Elevation & Depth

Depth is achieved through layering and transparency rather than traditional drop shadows.

- **The Base Layer**: The `#050505` background.
- **The Glass Layer**: Panels use a `rgba(255, 255, 255, 0.05)` fill with a 12px backdrop blur. This allows the background "digital waves" to remain visible but obscured.
- **Borders**: Every panel must have a 1px solid border at `rgba(255, 255, 255, 0.1)`. The top and left borders may be slightly lighter to simulate a subtle light source from the top-left.
- **Inner Glow**: Interactive cards should have a subtle inner glow (`box-shadow: inset ...`) using the primary Cyan color at 10% opacity.

## Shapes

The shape language reflects the duality of the brand: organic curves for water and geometric precision for tech.

- **Main Containers**: Use `rounded-lg` (1rem) for large dashboard panels and cards.
- **Interactive Elements**: Buttons and inputs use `rounded` (0.5rem) to maintain a modern, technical feel.
- **Liquid Elements**: Data visualizations and background decorative meshes should use Bezier-curved paths to simulate flowing water.

## Components

- **Buttons**: Primary buttons are solid Cyan with a 10px outer glow. Secondary buttons are "Ghost" style with a 1px border and high-blur background.
- **Cards**: All cards must implement the 12px glass blur. Content should be separated by thin 1px horizontal lines (`rgba(255, 255, 255, 0.05)`).
- **Status Chips**: Small, pill-shaped indicators. For 'Danger', the chip should have a pulsing animation to indicate immediate threat.
- **Input Fields**: Dark backgrounds (`#121212`) with the primary Cyan used only for the focus border and the cursor.
- **Icons**: Linear, 2px stroke icons. When active, icons should adopt the primary Cyan color and a soft outer glow.
- **Flood Gauges**: A custom component featuring a vertical cylinder with a liquid fill animation, using mesh gradients to represent varying water levels.