# -*- mode: python ; coding: utf-8 -*-

block_cipher = None

import os
import re
import sys
import inspect
import datetime
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
all_hidden_imports += collect_submodules('Qt')
all_hidden_imports += collect_submodules('requests')
all_hidden_imports += collect_submodules('webbrowser')
all_hidden_imports += collect_submodules('pygraphviz')
all_hidden_imports += collect_submodules('reportlab')
all_hidden_imports += collect_submodules('qtsass')
all_hidden_imports += collect_submodules('qdarkstyle')
all_hidden_imports += collect_submodules('packaging')

binaries = []
if sys.platform == "win32":
    graphviz_root = os.environ.get(
        "GRAPHVIZ_ROOT", "C:\\Program Files\\Graphviz\"
    )
    binaries.extend(
        [
            (os.path.join(graphviz_root, "bin", "gvc.dll"), "."),
            (os.path.join(graphviz_root, "bin", "cgraph.dll"), "."),
            (os.path.join(graphviz_root, "bin", "cdt.dll"), "."),
            (os.path.join(graphviz_root, "bin", "pathplan.dll"), "."),
            (os.path.join(graphviz_root, "bin", "graph.dll"), "."),
            (os.path.join(graphviz_root, "bin", "gvplugin_core.dll"), "."),
        ]
    )

a = Analysis(
    ['run.py'],
    pathex=[PROJECT_DIR],
    binaries=binaries,
    datas=[
        ("config", "config"),
        ("modules", "modules"),
        ("resources", "resources"),
        ("samples", "samples"),
        ("VERSION", "."),
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