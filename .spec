# -*- mode: python ; coding: utf-8 -*-

block_cipher = None

import os
import Nodz

# To collect all Nodz files we need to collect them manually
nodz_location = os.path.dirname(Nodz.__file__)

a = Analysis(
    ['manager.py'],
    pathex=[],
    binaries=[],
    datas=[
        ("custom_config.json", "."),
        ("data_icons.json", "."),
        ("modules", "modules"),
        ("resources", "resources"),
        ("samples", "samples"),
        (nodz_location, "Nodz")
    ],
    hiddenimports=[],
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
    icon='resources/icon_32.ico'
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