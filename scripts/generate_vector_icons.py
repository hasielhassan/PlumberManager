import os
import sys
import re
import math
import argparse

sys.stdout.reconfigure(encoding='utf-8')

project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out_dir = os.path.join(project_root, 'public', 'data_type_icons')
aswf_cache_dir = os.path.join(project_root, 'tmp', 'aswf_svgs')
os.makedirs(out_dir, exist_ok=True)

# Abstract helper to generate a 100% W3C compliant, 6-sided symmetric hexagonal vector badge SVG
def generate_hexagon_svg(code, label, color, logo_inner_xml, font_size=None, letter_spacing=None):
    if font_size is None or letter_spacing is None:
        if len(label) <= 3:
            font_size, letter_spacing = "9.0", "0.4"
        elif len(label) == 4:
            font_size, letter_spacing = "8.2", "0.5"
        elif len(label) <= 7:
            font_size, letter_spacing = "7.2", "0.5"
        else:
            font_size, letter_spacing = "6.5", "0.6"

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bg-grad-{code}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadow-{code}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Perfect 6-Sided Symmetric Hexagonal Badge Frame -->
  <polygon 
    points="32,4 56,18 56,46 32,60 8,46 8,18" 
    fill="url(#bg-grad-{code})" 
    stroke="{color}" 
    stroke-width="2.5" 
    stroke-linejoin="round"
    filter="url(#shadow-{code})"
  />

  <!-- Perfectly Centered Vector Logo (centered around y=25.5) -->
  {logo_inner_xml}

  <!-- Optimal Positioned & Sized Format Title (y=46.5) -->
  <text 
    x="32" 
    y="46.5" 
    text-anchor="middle" 
    fill="#F8FAFC" 
    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    font-size="{font_size}" 
    font-weight="700" 
    letter-spacing="{letter_spacing}"
  >{label}</text>
</svg>'''
    return svg

# Helper to sanitize and load official SVG files from local cache with explicit fill color
def load_aswf_svg(filename, scale=1.0, tx=0, ty=0, fill_color=None):
    filepath = os.path.join(aswf_cache_dir, filename)
    if not os.path.exists(filepath):
        return None
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Strip XML declarations & non-standard metadata tags
    content = re.sub(r'<\?xml[^>]+\?>', '', content)
    content = re.sub(r'<!DOCTYPE[^>]+>', '', content)
    content = re.sub(r'<sodipodi:namedview[^>]*>.*?</sodipodi:namedview>', '', content, flags=re.DOTALL)
    content = re.sub(r'<sodipodi:namedview[^>]*/>', '', content)
    content = re.sub(r'<inkscape:[^>]*>.*?</inkscape:[^>]*>', '', content, flags=re.DOTALL)
    content = re.sub(r'<inkscape:[^>]*/>', '', content)
    content = re.sub(r'<metadata[^>]*>.*?</metadata>', '', content, flags=re.DOTALL)
    
    m = re.search(r'viewBox=["\']([^"\']+)["\']', content)
    vb = [float(x) for x in m.group(1).split()] if m else [0, 0, 100, 100]
    
    m_inner = re.search(r'<svg[^>]*>(.*)</svg>', content, re.DOTALL)
    inner_xml = m_inner.group(1) if m_inner else content
    
    orig_w = vb[2] if vb[2] > 0 else 100
    orig_h = vb[3] if vb[3] > 0 else 100
    
    s = min(25.0 / orig_w, 23.0 / orig_h) * scale
    offset_x = (32 - (orig_w * s) / 2) + tx - (vb[0] * s)
    offset_y = (24.5 - (orig_h * s) / 2) + ty - (vb[1] * s)
    
    fill_attr = f' fill="{fill_color}"' if fill_color else ''
    return f'<g transform="translate({offset_x:.2f}, {offset_y:.2f}) scale({s:.4f})"{fill_attr}>{inner_xml}</g>'

# Generate Disney Partio Circular Particle Ring centered at (32, 25.5) with distinct dot spacing
partio_dots = []
num_partio_dots = 16
radius = 10.5
for i in range(num_partio_dots):
    t = i / num_partio_dots
    angle = t * 2 * math.pi - math.pi / 2
    cx = 32 + radius * math.cos(angle)
    cy = 25.5 + radius * math.sin(angle)
    dot_r = 0.8 + t * 1.6
    partio_dots.append(f'<circle cx="{cx:.2f}" cy="{cy:.2f}" r="{dot_r:.2f}"/>')
PARTIO_CENTERED_SPIRAL = f'<g fill="#84CC16">{"".join(partio_dots)}</g>'

# Official Vector Artworks
ALEMBIC_OFFICIAL = '''<g transform="translate(19.5, 12) scale(0.125)">
  <path fill="#0096D6" d="m99.383 5.022c-21.76 0-37.434 5.251-53.289 17.744-6.529 5.142-14.443 16.223-16.619 24.734-3 11.719-7.123 49.464 39.176 60.149 33.238 5.937 35.349-22.289 70.83-20.182 21.369 3.166 30.8 19.586 27.156 38.241-6.6 27.556-35.807 26.711-46.742 15.774-5.539-5.54-7.377-16.827.261-25.522 5.737-6.529 13.651-7.16 19.786-3.958 4.55 2.375 6.2 6.578 5.146 10.289-1.586 5.54-7.98 6.6-16.424 2.77 5.28 9.366 20.447 10.684 24.93-.395 2.375-8.112-.385-17.288-10.354-23.151-6.728-3.957-19.326-3.757-30.009 4.419-10.936 8.371-16.287 22.687-9.955 36.734 4.624 10.267 14.52 20.773 34.435 20.263a85.554 85.554 0 0 1 -14.133 7.339c-48.968 11.242-64.917-14.591-63.633-28.194.92-8.574 9.364-13.057 15.827-12.4 8.937.91 11.923 11.341 10.021 17.149 11.082-7.916 3.942-26.292-12.139-26.606-12.833-.25-23.222 7.814-25.32 20.01-1.626 9.47 1.543 17.8 7.12 24.6a82.945 82.945 0 0 1 -10.094-6.212c-9.809-7.9-20.384-22.71-18.657-36.725 1.254-10.179 7.158-15.366 15.692-12.842-7.973-8.922-19.209-2.657-22.2 6.542a29.385 29.385 0 0 0 -1.344 9.883 89.116 89.116 0 0 1 -6.781-28.315c-.8-11.673 1.772-27.3 8.563-35.812-7.582 5.736-13.584 21.352-13.584 36.007a92.333 92.333 0 1 0 92.334-92.333zm41.978 58.158c-5.232-.745-9.595-4.405-9.08-8.041a7.873 7.873 0 0 1 5.729-6.939c6.4-2.06 18.494 1.308 24.619 18.916-6.248-8.401-13.416-2.816-21.268-3.936z"/>
</g>'''

MATERIALX_OFFICIAL = load_aswf_svg('materialx.svg', scale=1.05, ty=0)
OPENVDB_OFFICIAL = load_aswf_svg('openvdb.svg', scale=1.05, ty=0)
OPENEXR_OFFICIAL = load_aswf_svg('openexr.svg', scale=1.05, ty=0)
OTIO_OFFICIAL = load_aswf_svg('otio.svg', scale=1.05, ty=0)
OSL_OFFICIAL = load_aswf_svg('osl.svg', scale=1.05, ty=0)
BLENDER_OFFICIAL = load_aswf_svg('blender.svg', scale=1.1, ty=0)
UNREAL_ASSET_OFFICIAL = load_aswf_svg('unrealengine.svg', scale=1.0, ty=0, fill_color="#38BDF8")
UNREAL_MAP_OFFICIAL = load_aswf_svg('unrealengine.svg', scale=1.0, ty=0, fill_color="#38BDF8")
NUKE_OFFICIAL = load_aswf_svg('nuke.svg', scale=1.0, ty=0, fill_color="#F59E0B")

# Master Data Type Configurations (42 Formats)
FORMAT_CONFIGS = [
    # ASWF & Core CG Formats
    {'code': 'usd', 'label': 'USD', 'color': '#0088CC', 'logo': '''<g fill="none" stroke="#0088CC" stroke-width="1.8" stroke-linejoin="round">
  <rect x="20" y="14" width="16" height="16" rx="2" fill="#0088CC" fill-opacity="0.25" />
  <rect x="24" y="18" width="16" height="16" rx="2" fill="#0088CC" fill-opacity="0.55" />
  <rect x="28" y="22" width="16" height="16" rx="2" fill="#0088CC" />
</g>'''},
    {'code': 'alembic', 'label': 'ABC', 'color': '#0096D6', 'logo': ALEMBIC_OFFICIAL},
    {'code': 'materialx', 'label': 'MTLX', 'color': '#E63946', 'logo': MATERIALX_OFFICIAL},
    {'code': 'openvdb', 'label': 'VDB', 'color': '#10B981', 'logo': OPENVDB_OFFICIAL},
    {'code': 'exr', 'label': 'EXR', 'color': '#F59E0B', 'logo': OPENEXR_OFFICIAL},
    {'code': 'otio', 'label': 'OTIO', 'color': '#059669', 'logo': OTIO_OFFICIAL},
    {'code': 'osl', 'label': 'OSL', 'color': '#6366F1', 'logo': OSL_OFFICIAL if OSL_OFFICIAL else '''<g fill="#6366F1"><circle cx="32" cy="24.5" r="10" fill-opacity="0.25" stroke="#6366F1" stroke-width="1.8"/><text x="32" y="28" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="10" font-weight="bold">OSL</text></g>'''},

    # New Formats (GTO, Partio circular particle ring, FDX official software logo)
    {'code': 'gto', 'label': 'GTO', 'color': '#0284C7', 'logo': '''<g stroke="#0284C7" stroke-width="1.6" fill="none" stroke-linejoin="round">
  <path d="M 32 14 L 42 20 L 42 32 L 32 38 L 22 32 L 22 20 Z" fill="#0284C7" fill-opacity="0.25"/>
  <line x1="32" y1="14" x2="32" y2="38"/>
  <line x1="22" y1="20" x2="42" y2="32"/>
  <line x1="42" y1="20" x2="22" y2="32"/>
  <rect x="30" y="12" width="4" height="4" fill="#F59E0B" stroke="none"/>
  <rect x="40" y="18" width="4" height="4" fill="#0284C7" stroke="none"/>
  <rect x="40" y="30" width="4" height="4" fill="#F59E0B" stroke="none"/>
  <rect x="30" y="36" width="4" height="4" fill="#0284C7" stroke="none"/>
  <rect x="20" y="30" width="4" height="4" fill="#F59E0B" stroke="none"/>
  <rect x="20" y="18" width="4" height="4" fill="#0284C7" stroke="none"/>
</g>'''},

    {'code': 'partio', 'label': 'PARTIO', 'color': '#84CC16', 'logo': PARTIO_CENTERED_SPIRAL},

    {'code': 'fdx', 'label': 'FDX', 'color': '#2BB673', 'logo': '''<g fill="#2BB673">
  <!-- White circular emblem background behind script 'f' -->
  <circle cx="32" cy="24.5" r="11" fill="#F8FAFC" fill-opacity="0.9" stroke="#2BB673" stroke-width="1.6"/>
  <!-- Official Final Draft script 'f' ribbon shape -->
  <path d="M 33 16 C 37 16 38.5 18 36 20 C 33.5 22 31 24.5 31 27.5 C 31 31 31.5 33 28.5 33 C 27 33 26 32 27 30.5 C 28.5 28 29.5 25 29.5 22.5 C 29.5 19 31 16 33 16 Z"/>
  <!-- Horizontal pen/quill crossing the script 'f' -->
  <path d="M 23 23 L 39 21.5 L 41 23.5 L 38.5 25 L 23 25 Z"/>
</g>'''},

    # Official Software & Format Updates
    {'code': 'blend', 'label': 'BLEND', 'color': '#EA7600', 'logo': BLENDER_OFFICIAL if BLENDER_OFFICIAL else '''<g transform="translate(20, 13)"><path fill="#EA7600" d="M 12 1.5 C 6.2 1.5 1.5 6.2 1.5 12 C 1.5 17.8 6.2 22.5 12 22.5 C 17.8 22.5 22.5 17.8 22.5 12 Z"/><circle cx="12" cy="12" r="3.2" fill="#0055AA"/></g>'''},

    {'code': 'fbx', 'label': 'FBX', 'color': '#8B5CF6', 'logo': '''<g stroke="#8B5CF6" stroke-width="1.8" fill="none" stroke-linejoin="round">
  <path d="M 32 14 L 44 21 L 44 33 L 32 40 L 20 33 L 20 21 Z" fill="#8B5CF6" fill-opacity="0.25"/>
  <path d="M 32 14 V 40 M 20 21 L 32 27.5 L 44 21" stroke-width="1.6"/>
  <circle cx="32" cy="14" r="2.2" fill="#8B5CF6" stroke="none"/>
  <circle cx="44" cy="21" r="2.2" fill="#8B5CF6" stroke="none"/>
  <circle cx="20" cy="21" r="2.2" fill="#8B5CF6" stroke="none"/>
  <circle cx="32" cy="27.5" r="2.2" fill="#8B5CF6" stroke="none"/>
</g>'''},

    {'code': 'gltf', 'label': 'GLTF', 'color': '#FF0055', 'logo': '''<g fill="#FF0055">
  <path d="M 19.5 14 H 44.5 V 19 H 26.5 V 36 H 19.5 Z" />
  <path d="M 31.5 23 H 44.5 V 36 H 37.5 V 29 H 31.5 Z" />
  <polygon points="37.5,23 44.5,19 44.5,23" fill="#E11D48"/>
</g>'''},

    {'code': 'ptex', 'label': 'PTEX', 'color': '#EC4899', 'logo': '''<g stroke="#EC4899" stroke-width="1.8" fill="none" stroke-linejoin="round">
  <rect x="19.5" y="14" width="25" height="22" rx="2.5" fill="#EC4899" fill-opacity="0.15"/>
  <line x1="32" y1="14" x2="32" y2="36"/>
  <line x1="19.5" y1="25" x2="44.5" y2="25"/>
  <rect x="21.5" y="16" width="8.5" height="7" fill="#0096D6" stroke="none" opacity="0.8"/>
  <rect x="34" y="16" width="8.5" height="7" fill="#EC4899" stroke="none" opacity="0.8"/>
  <rect x="21.5" y="27" width="8.5" height="7" fill="#F59E0B" stroke="none" opacity="0.8"/>
  <rect x="34" y="27" width="8.5" height="7" fill="#10B981" stroke="none" opacity="0.8"/>
</g>'''},

    {'code': 'review', 'label': 'REVIEW', 'color': '#A855F7', 'logo': '''<g fill="none" stroke="#A855F7" stroke-width="1.8" stroke-linejoin="round">
  <rect x="19" y="15" width="26" height="20" rx="3" fill="#A855F7" fill-opacity="0.2"/>
  <polygon points="28,20 37,25 28,30" fill="#A855F7" stroke="none"/>
  <rect x="21" y="12.5" width="4" height="2.5" rx="0.5" fill="#A855F7"/>
  <rect x="30" y="12.5" width="4" height="2.5" rx="0.5" fill="#A855F7"/>
  <rect x="39" y="12.5" width="4" height="2.5" rx="0.5" fill="#A855F7"/>
</g>'''},

    # Unreal & Nuke Formats
    {'code': 'uasset', 'label': 'UASSET', 'color': '#38BDF8', 'logo': UNREAL_ASSET_OFFICIAL if UNREAL_ASSET_OFFICIAL else '''<g fill="#38BDF8"><circle cx="32" cy="24.5" r="11" fill-opacity="0.2" stroke="#38BDF8" stroke-width="1.8"/><text x="32" y="28.5" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="12" font-weight="bold">U</text></g>'''},
    
    {'code': 'umap', 'label': 'UMAP', 'color': '#0070E0', 'logo': UNREAL_MAP_OFFICIAL if UNREAL_MAP_OFFICIAL else '''<g fill="#38BDF8"><circle cx="32" cy="24.5" r="11" fill-opacity="0.2" stroke="#0070E0" stroke-width="1.8"/><text x="32" y="28.5" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="12" font-weight="bold">U</text></g>'''},

    {'code': 'gizmo', 'label': 'GIZMO', 'color': '#F59E0B', 'logo': NUKE_OFFICIAL if NUKE_OFFICIAL else '''<g fill="#F59E0B"><circle cx="32" cy="24.5" r="11" fill-opacity="0.2" stroke="#F59E0B" stroke-width="1.8"/><text x="32" y="28.5" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="12" font-weight="bold">N</text></g>'''},

    # New Formats
    {'code': 'ply', 'label': 'PLY', 'color': '#38BDF8', 'logo': '''<g stroke="#38BDF8" stroke-width="1.6" fill="none" stroke-linejoin="round">
  <polygon points="32,14 44,22 38,36 26,36 20,22" fill="#38BDF8" fill-opacity="0.2"/>
  <line x1="32" y1="14" x2="26" y2="36"/>
  <line x1="32" y1="14" x2="38" y2="36"/>
  <line x1="20" y1="22" x2="44" y2="22"/>
  <circle cx="32" cy="14" r="2" fill="#38BDF8" stroke="none"/>
  <circle cx="44" cy="22" r="2" fill="#38BDF8" stroke="none"/>
  <circle cx="38" cy="36" r="2" fill="#38BDF8" stroke="none"/>
  <circle cx="26" cy="36" r="2" fill="#38BDF8" stroke="none"/>
  <circle cx="20" cy="22" r="2" fill="#38BDF8" stroke="none"/>
</g>'''},

    {'code': 'splat', 'label': 'SPLAT', 'color': '#F43F5E', 'logo': '''<g fill="#F43F5E">
  <ellipse cx="32" cy="25" rx="10" ry="6" fill-opacity="0.85" transform="rotate(-15 32 25)"/>
  <ellipse cx="26" cy="21" rx="6" ry="4" fill-opacity="0.6" transform="rotate(25 26 21)"/>
  <ellipse cx="38" cy="28" rx="7" ry="4.5" fill-opacity="0.75" transform="rotate(40 38 28)"/>
  <circle cx="23" cy="30" r="2.5" fill-opacity="0.9"/>
  <circle cx="41" cy="19" r="2.2" fill-opacity="0.8"/>
  <circle cx="32" cy="16" r="1.8" fill-opacity="0.7"/>
</g>'''},

    {'code': 'grm', 'label': 'GRM', 'color': '#EAB308', 'logo': '''<g stroke="#EAB308" stroke-width="2" stroke-linecap="round" fill="none">
  <path d="M 21 35 C 21 24 25 18 25 14"/>
  <path d="M 27 35 C 27 22 31 17 31 13"/>
  <path d="M 33 35 C 33 23 37 18 37 14"/>
  <path d="M 39 35 C 39 25 43 20 43 15"/>
</g>'''},

    {'code': 'aaf', 'label': 'AAF', 'color': '#A855F7', 'logo': '''<g fill="none" stroke="#A855F7" stroke-width="1.8" stroke-linejoin="round">
  <rect x="19.5" y="14" width="25" height="21" rx="3" fill="#A855F7" fill-opacity="0.2"/>
  <path d="M 20 22 H 44 M 20 28 H 44" stroke-width="1.2"/>
  <path d="M 25 33 L 32 17 L 39 33 M 27.5 28 H 36.5" stroke="#F8FAFC" stroke-width="2" stroke-linecap="round"/>
</g>'''},

    {'code': 'ale', 'label': 'ALE', 'color': '#8B5CF6', 'logo': '''<g stroke="#8B5CF6" stroke-width="1.8" fill="none" stroke-linejoin="round">
  <rect x="19.5" y="14" width="25" height="21" rx="3" fill="#8B5CF6" fill-opacity="0.2"/>
  <path d="M 19.5 21 H 44.5 M 19.5 28 H 44.5 M 28 14 V 35 M 36 14 V 35" stroke-width="1.2"/>
</g>'''},

    {'code': 'hdr', 'label': 'HDR', 'color': '#EAB308', 'logo': '''<g fill="none" stroke="#EAB308" stroke-width="1.8">
  <circle cx="32" cy="25" r="7" fill="#EAB308" fill-opacity="0.25"/>
  <line x1="32" y1="13" x2="32" y2="16" stroke-linecap="round" stroke-width="2"/>
  <line x1="32" y1="34" x2="32" y2="37" stroke-linecap="round" stroke-width="2"/>
  <line x1="20" y1="25" x2="23" y2="25" stroke-linecap="round" stroke-width="2"/>
  <line x1="41" y1="25" x2="44" y2="25" stroke-linecap="round" stroke-width="2"/>
  <line x1="23.5" y1="16.5" x2="25.6" y2="18.6" stroke-linecap="round" stroke-width="1.8"/>
  <line x1="38.4" y1="31.4" x2="40.5" y2="33.5" stroke-linecap="round" stroke-width="1.8"/>
  <line x1="23.5" y1="33.5" x2="25.6" y2="31.4" stroke-linecap="round" stroke-width="1.8"/>
  <line x1="38.4" y1="18.6" x2="40.5" y2="16.5" stroke-linecap="round" stroke-width="1.8"/>
</g>'''},

    {'code': 'fountain', 'label': 'FOUNTAIN', 'color': '#10B981', 'logo': '''<g fill="#10B981" stroke="#10B981" stroke-width="1.6" stroke-linejoin="round">
  <path d="M 32 14 L 39 26 L 35 36 H 29 L 25 26 Z" fill-opacity="0.25"/>
  <line x1="32" y1="14" x2="32" y2="28" stroke-linecap="round"/>
  <circle cx="32" cy="28" r="1.5"/>
</g>'''},

    {'code': 'screenjson', 'label': 'SCREENJSON', 'color': '#F59E0B', 'logo': '''<g fill="none" stroke="#F59E0B" stroke-width="1.8" stroke-linejoin="round">
  <rect x="20" y="14" width="24" height="21" rx="3" fill="#F59E0B" fill-opacity="0.2"/>
  <path d="M 25 19 C 23 19 23 21 23 22.5 C 23 23.5 22 24.5 21 24.5 C 22 24.5 23 25.5 23 26.5 C 23 28 23 30 25 30" stroke-linecap="round"/>
  <path d="M 39 19 C 41 19 41 21 41 22.5 C 41 23.5 42 24.5 43 24.5 C 42 24.5 41 25.5 41 26.5 C 41 28 41 30 39 30" stroke-linecap="round"/>
</g>'''},

    # Pre-existing Formats
    {'code': 'hda', 'label': 'HDA', 'color': '#FF6600', 'logo': '''<path fill="#FF6600" d="M 21.5 15.5 H 26.5 V 23.5 H 37.5 V 15.5 H 42.5 V 35.5 H 37.5 V 27.5 H 26.5 V 35.5 H 21.5 Z" />'''},
    {'code': 'mayaascii', 'label': 'MA', 'color': '#008080', 'logo': '''<path fill="#008080" d="M 18.5 35.5 V 15.5 H 24.5 L 32 25.5 L 39.5 15.5 H 45.5 V 35.5 H 40 V 20.5 L 34.5 29.5 H 29.5 L 24 20.5 V 35.5 Z" />'''},
    {'code': 'mayabin', 'label': 'MB', 'color': '#00A896', 'logo': '''<path fill="#00A896" d="M 18.5 35.5 V 15.5 H 24.5 L 32 25.5 L 39.5 15.5 H 45.5 V 35.5 H 40 V 20.5 L 34.5 29.5 H 29.5 L 24 20.5 V 35.5 Z" />'''},
    {'code': 'obj', 'label': 'OBJ', 'color': '#6366F1', 'logo': '''<g stroke="#6366F1" stroke-width="1.8" fill="none" stroke-linejoin="round"><path d="M 32 14.5 L 44 21.5 L 44 33.5 L 32 40.5 L 20 33.5 L 20 21.5 Z" fill="#6366F1" fill-opacity="0.2"/><path d="M 32 14.5 V 40.5 M 20 21.5 L 32 27.5 L 44 21.5"/></g>'''},
    {'code': 'csv', 'label': 'CSV', 'color': '#10B981', 'logo': '''<g stroke="#10B981" stroke-width="1.8" fill="none"><rect x="19.5" y="15" width="25" height="21" rx="3" fill="#10B981" fill-opacity="0.2"/><path d="M 19.5 22 H 44.5 M 19.5 29 H 44.5 M 28 15 V 36 M 36 15 V 36" stroke-width="1.2"/></g>'''},
    {'code': 'json', 'label': 'JSON', 'color': '#F59E0B', 'logo': '''<g fill="none" stroke="#F59E0B" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M 25 15 C 21 15 21 18.5 21 21.5 C 21 23.5 19 24.5 17 24.5 C 19 24.5 21 25.5 21 27.5 C 21 30.5 21 34 25 34" /><path d="M 39 15 C 43 15 43 18.5 43 21.5 C 43 23.5 45 24.5 47 24.5 C 45 24.5 43 25.5 43 27.5 C 43 30.5 43 34 39 34" /></g>'''},
    {'code': 'pdf', 'label': 'PDF', 'color': '#EF4444', 'logo': '''<g fill="none" stroke="#EF4444" stroke-width="1.8" stroke-linejoin="round"><path d="M 21.5 14 H 34 L 42.5 22 V 36 H 21.5 Z" fill="#EF4444" fill-opacity="0.2"/><path d="M 34 14 V 22 H 42.5"/><text x="32" y="31" text-anchor="middle" fill="#EF4444" font-family="-apple-system, sans-serif" font-size="8" font-weight="bold">PDF</text></g>'''},
    {'code': 'psd', 'label': 'PSD', 'color': '#3B82F6', 'logo': '''<g fill="#3B82F6"><rect x="19.5" y="14" width="25" height="22" rx="3.5" fill="none" stroke="#3B82F6" stroke-width="2"/><text x="32" y="29.5" text-anchor="middle" fill="#3B82F6" font-family="-apple-system, sans-serif" font-size="12" font-weight="bold">Ps</text></g>'''},
    {'code': 'rumba', 'label': 'RUMBA', 'color': '#06B6D4', 'logo': '''<g stroke="#06B6D4" stroke-width="1.8" fill="none"><polygon points="32,14 42.5,25.5 32,37 21.5,25.5" fill="#06B6D4" fill-opacity="0.3"/><circle cx="32" cy="25.5" r="3.8" fill="#06B6D4" stroke="none"/></g>'''},
    {'code': 'wav', 'label': 'WAV', 'color': '#8B5CF6', 'logo': '''<g fill="#8B5CF6"><rect x="17.5" y="22.5" width="2.8" height="6" rx="1.4"/><rect x="22.5" y="17.5" width="2.8" height="16" rx="1.4"/><rect x="27.5" y="13.5" width="2.8" height="24" rx="1.4"/><rect x="32.5" y="15.5" width="2.8" height="20" rx="1.4"/><rect x="37.5" y="19.5" width="2.8" height="12" rx="1.4"/><rect x="42.5" y="23.5" width="2.8" height="4" rx="1.4"/></g>'''},
    {'code': 'xgen', 'label': 'XGEN', 'color': '#14B8A6', 'logo': '''<g stroke="#14B8A6" stroke-width="2.2" stroke-linecap="round" fill="none"><path d="M 21 35.5 C 21 25 28 21 28 14.5"/><path d="M 28 35.5 C 28 24 34 19.5 34 14.5"/><path d="M 35 35.5 C 35 25 41 21 41 14.5"/></g>'''},
    {'code': 'xml', 'label': 'XML', 'color': '#64748B', 'logo': '''<g stroke="#64748B" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M 23 17 L 17 25.5 L 23 34"/><path d="M 41 17 L 47 25.5 L 41 34"/><line x1="34.5" y1="15" x2="29.5" y2="36"/></g>'''},
    {'code': 'bvh', 'label': 'BVH', 'color': '#F97316', 'logo': '''<g stroke="#F97316" stroke-width="1.8" fill="#F97316" stroke-linecap="round"><circle cx="32" cy="14.5" r="2.8"/><line x1="32" y1="17.5" x2="32" y2="27.5"/><line x1="23.5" y1="20.5" x2="40.5" y2="20.5"/><line x1="32" y1="27.5" x2="24.5" y2="36"/><line x1="32" y1="27.5" x2="39.5" y2="36"/></g>'''},
    {'code': 'jpg', 'label': 'JPG', 'color': '#3B82F6', 'logo': '''<g stroke="#3B82F6" stroke-width="1.8" fill="none" stroke-linejoin="round"><rect x="19.5" y="15" width="25" height="20" rx="3" fill="#3B82F6" fill-opacity="0.2"/><circle cx="25.5" cy="20" r="2.2" fill="#3B82F6" stroke="none"/><path d="M 21.5 31 L 27.5 23 L 33 28.5 L 37.5 24.5 L 42.5 31" stroke-linecap="round"/></g>'''},
    {'code': 'kiko', 'label': 'KIKO', 'color': '#E11D48', 'logo': '''<g stroke="#E11D48" stroke-width="2.2" stroke-linecap="round" fill="none"><path d="M 19 33.5 Q 28 11.5 35 26 T 45 14.5"/><circle cx="45" cy="14.5" r="2.5" fill="#E11D48" stroke="none"/></g>'''},
    {'code': 'atom', 'label': 'ATOM', 'color': '#0284C7', 'logo': '''<g stroke="#0284C7" stroke-width="1.6" fill="none"><ellipse cx="32" cy="25.5" rx="12.5" ry="4.8" transform="rotate(-30 32 25.5)"/><ellipse cx="32" cy="25.5" rx="12.5" ry="4.8" transform="rotate(30 32 25.5)"/><ellipse cx="32" cy="25.5" rx="12.5" ry="4.8" transform="rotate(90 32 25.5)"/><circle cx="32" cy="25.5" r="3.2" fill="#0284C7" stroke="none"/></g>'''}
]

def main():
    parser = argparse.ArgumentParser(description="Abstract 6-sided vector SVG icon generator for PlumberManager data types.")
    parser.add_argument('--code', type=str, help='Format code (e.g., custom_type)')
    parser.add_argument('--label', type=str, help='Text label (e.g., CUSTOM)')
    parser.add_argument('--color', type=str, help='Theme color hex (e.g., #FF5500)')
    parser.add_argument('--logo', type=str, help='Inner SVG logo XML markup')
    args = parser.parse_args()

    if args.code and args.label and args.color:
        logo_xml = args.logo if args.logo else '<circle cx="32" cy="25.5" r="6" fill="' + args.color + '"/>'
        svg_content = generate_hexagon_svg(args.code, args.label, args.color, logo_xml)
        target_path = os.path.join(out_dir, f'{args.code}.svg')
        with open(target_path, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        print(f" [OK] Generated custom vector icon badge: {args.code}.svg")
        return

    # Batch build all 42 registered formats
    for cfg in FORMAT_CONFIGS:
        code = cfg['code']
        label = cfg['label']
        color = cfg['color']
        logo_xml = cfg['logo']

        svg_content = generate_hexagon_svg(code, label, color, logo_xml)
        target_path = os.path.join(out_dir, f'{code}.svg')
        with open(target_path, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        print(f" [OK] Built vector SVG badge: {code}.svg")

    print(f"\nSuccessfully generated all {len(FORMAT_CONFIGS)} 6-sided symmetric vector SVG data type icons.")

if __name__ == '__main__':
    main()
