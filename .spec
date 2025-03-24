# -*- mode: python ; coding: utf-8 -*-

block_cipher = None

import os
import inspect
import pyinstaller_versionfile
from PyInstaller.utils.hooks import collect_submodules

import Nodz
import PySide2
import shiboken2

# To collect all Nodz files we need to collect them manually
Nodz_location = os.path.dirname(Nodz.__file__)

PROJECT_DIR = os.path.dirname(os.path.abspath(
  inspect.getfile(inspect.currentframe()))
)
with open(os.path.join(PROJECT_DIR, 'VERSION'), 'r') as file:
    VERSION = file.read()

pyinstaller_versionfile.create_versionfile(
    output_file="versionfile.txt",
    version=VERSION,
    company_name="HasielHassan",
    file_description="Plumber Manager",
    internal_name="Plumber Manager",
    legal_copyright="© Hasiel Alvarez 2023",
    original_filename="PlumberManager.exe",
    product_name="Plumber Manager",
)

hiddenimports_QtSvg = collect_submodules('PySide2.QtSvg')
all_hidden_imports = hiddenimports_QtSvg

a = Analysis(
    ['run.py'],
    pathex=[],
    binaries=[],
    datas=[
        ("config", "config"),
        ("modules", "modules"),
        ("resources", "resources"),
        ("samples", "samples"),
        ("VERSION", "."),
        (Nodz_location, "Nodz"),
    ],
    hiddenimports=all_hidden_imports,
    hookspath=[],
    runtime_hooks=[],
    excludes=["PySide6", "shiboken6"],
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