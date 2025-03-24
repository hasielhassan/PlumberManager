# -*- mode: python ; coding: utf-8 -*-

block_cipher = None

import os
import re
import sys
import Qt
import inspect
import requests
import datetime
import packaging
import reportlab
import qdarkstyle
import pyinstaller_versionfile
from PyInstaller.utils.hooks import collect_submodules

PROJECT_DIR = os.path.dirname(os.path.abspath(
  inspect.getfile(inspect.currentframe()))
)
with open(os.path.join(PROJECT_DIR, 'VERSION'), 'r') as file:
    VERSION = file.read()

if not re.match(r"^\d+\.\d+\.\d+\.\d+$", VERSION):
    VERSION = "0.0.0.0"

pyinstaller_versionfile.create_versionfile(
    output_file="versionfile.txt",
    version=VERSION,
    company_name="HasielHassan",
    file_description="Plumber Manager",
    internal_name="Plumber Manager",
    legal_copyright="© Hasiel Alvarez {}".format(datetime.datetime.now().year),
    original_filename="PlumberManager.exe",
    product_name="Plumber Manager",
)
all_hidden_imports = []

all_hidden_imports += collect_submodules('PySide6.QtSvg')

# To collect all files from certain packages we need to collect them manually
requests_location = os.path.dirname(requests.__file__)
reportlab_location = os.path.dirname(reportlab.__file__)
packaging_location = os.path.dirname(packaging.__file__)
qdarkstyle_location = os.path.dirname(qdarkstyle.__file__)
Qt_location = Qt.__file__

all_hidden_imports += collect_submodules('pygraphviz')
all_hidden_imports += collect_submodules('qtsass')

binaries = []
if sys.platform == "win32":
    graphviz_root = os.environ.get(
        "GRAPHVIZ_ROOT", "C:\\Program Files\\Graphviz"
    )
    binaries.extend(
        [
            (os.path.join(graphviz_root, "bin", "gvc.dll"), "."),
            (os.path.join(graphviz_root, "bin", "cgraph.dll"), "."),
            (os.path.join(graphviz_root, "bin", "cdt.dll"), "."),
            (os.path.join(graphviz_root, "bin", "pathplan.dll"), "."),
            (os.path.join(graphviz_root, "bin", "gvplugin_core.dll"), "."),
            (os.path.join(graphviz_root, "bin", "gvplugin_dot_layout.dll"), "."),
        ]
    )

a = Analysis(
    ['run.py'],
    pathex=[PROJECT_DIR] + sys.path,
    binaries=binaries,
    datas=[
        ("config", "config"),
        ("modules", "modules"),
        ("resources", "resources"),
        ("samples", "samples"),
        ("VERSION", "."),
        (requests_location, "requests"),
        (reportlab_location, "reportlab"),
        (packaging_location, "packaging"),
        (qdarkstyle_location, "qdarkstyle"),
        (Qt_location, "."),
    ],
    hiddenimports=all_hidden_imports,
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False
)

pyz = PYZ(
    a.pure, a.zipped_data,
    cipher=block_cipher
)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.zipfiles,
    a.datas,
    #exclude_binaries=True,
    exclude_binaries=False,
    name='PlumberManager',
    debug=False,
    #bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=False,
    icon='resources/icon_32.ico', # Windows icon
    version='versionfile.txt', # Windows version info
)

#coll = COLLECT(
#    exe,
#    a.binaries,
#    a.zipfiles,
#    a.datas,
#    strip=False,
#    upx=True,
#    upx_exclude=[],
#    name='PlumberManager'
#)