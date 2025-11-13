# Images Needed for Production

This document lists all image assets that need to be created for production deployment.

## Favicon & Icons

Create these icon files in `/public/`:

### Favicon
- **favicon.ico** (32x32 or multi-size .ico file)
  - Standard browser favicon
  - Should contain ParkWise logo/brand mark
  - Color: Emerald green (#059669) on white or transparent

### SVG Icon
- **icon.svg** (any size, vector)
  - Scalable vector version of brand mark
  - Clean, simple design
  - Works at any size

### PNG Icons
- **icon-192.png** (192x192px)
  - For Android/PWA home screen
  - 192x192 minimum for PWA

- **icon-512.png** (512x512px)
  - High-res version for splash screens
  - 512x512 minimum for PWA

- **apple-icon.png** (180x180px)
  - Apple touch icon for iOS home screen
  - Should have some padding (safe area)

## Open Graph / Social Media Images

Create these in `/public/`:

### Main OG Image
- **og-image.jpg** (1200x630px)
  - Used when site is shared on social media
  - Should include:
    - ParkWise branding/logo
    - Tagline: "Find Your Perfect Static Caravan"
    - Beautiful caravan/park imagery
    - Clean, professional design
  - Format: JPG (optimized, under 1MB)

### Logo
- **logo.png** (minimum 400x400px, transparent)
  - Full ParkWise logo with text
  - Transparent background (PNG)
  - Used in structured data and footer

## Recommended Sizes

### Favicon
```
16x16, 32x32, 48x48 (in favicon.ico)
```

### Icons
```
192x192 (Android)
512x512 (PWA)
180x180 (Apple)
```

### Social
```
1200x630 (Open Graph)
1200x675 (Twitter)
```

## Brand Colors

Use these colors for consistency:

- **Primary**: #059669 (Emerald 600)
- **Secondary**: #0284c7 (Blue 600)
- **Background**: #ffffff (White)
- **Text**: #111827 (Gray 900)

## Design Guidelines

### For Favicons/Icons:
- Simple, recognizable at small sizes
- Works on light and dark backgrounds
- Consider using just "PW" or a caravan silhouette
- No thin lines (won't show at small sizes)
- High contrast

### For OG Image:
- Text must be readable in preview (minimum 40px font)
- Important content in center (edges may be cropped)
- Avoid text in bottom 250px (covered by link preview)
- Test on Facebook, Twitter, LinkedIn previews

## Tools to Create These

### Free Options:
- **Canva** - Easy templates for OG images
- **Figma** - Professional design tool
- **Inkscape** - Free SVG editor
- **GIMP** - Free image editor

### Online Generators:
- **Favicon Generator** - realfavicongenerator.net
- **OG Image Generator** - og-image.vercel.app

## After Creating Images

1. Place all files in `/public/` directory
2. Verify sizes and formats match above specs
3. Optimize images:
   - Use TinyPNG/ImageOptim for PNGs
   - Use JPEGmini for JPG
   - Keep total size under 2MB for all icons
4. Test:
   - View favicon in browser tab
   - Add to home screen (iOS/Android)
   - Share URL on social media to check OG image
   - Use Facebook Debugger/Twitter Card Validator

## Current Status

- ✅ Configuration added to `/app/layout.tsx`
- ✅ PWA manifest created at `/public/manifest.json`
- ❌ Images not yet created (need designer/tool)

## Priority

**High Priority** (for launch):
- favicon.ico
- og-image.jpg

**Medium Priority** (for mobile):
- icon-192.png
- icon-512.png
- apple-icon.png

**Nice to Have**:
- icon.svg (can use PNG versions initially)
- logo.png (for now using text-based logo)
