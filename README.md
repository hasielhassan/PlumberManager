![GitHub top language](https://img.shields.io/github/languages/top/hasielhassan/PlumberManager)
![GitHub last commit](https://img.shields.io/github/last-commit/hasielhassan/PlumberManager)
![License](https://img.shields.io/github/license/hasielhassan/PlumberManager)

<img src="resources/icon_256.png" width="128"/>

# Plumber Manager
A helper tool to design CG Pipeline interactive diagramas and data flow documentation

![Screenshot](screenshot.png)

## Download it from Release!

A packaged binary version is provided as a release thanks to PyInstaller!

At the moment I'm only making it for Windows, mostly for testing.

[Download it from Release here!](https://github.com/hasielhassan/PlumberManager/releases)
### Why yet another diagraming tool?

Pipeline can be many things ranging from Tasks, DCC's and Tools, but personally I find it that at its core, Pipeline is mostly about the flow of data, and its main building blocks are just a bunch of processes with inputs and outputs (Loaders and Publishers)

While Pipeline diagrams can be made out from any diagraming software, there is none that comes with certain preconfigured concepts from our industry, and I also think that Node networks are the best way to represet that idea of "a bunch of processes with inputs and outputs"

What if there is a tool that offers:
- An editable Node network similar to those from all the DCC's that we use all  day.
- Pre-configured with all the known standard formats used in teh industry as inputs and outputs.
- Automatic layout of the network, usefull when things get really big an complex.
- Interactive navigation and preview of isolated parts of the network.
- Store documentation of process and its inputs and outputs.

All that is what Plumber Manager its aming to offer.

## Roadmap

- [ ] Allow to update connection names on existing nodes
- [ ] Allow to update connection data types on existing nodes
- [ ] Display the data type icons on the node slot names
- [ ] Option to preview isolated view of a selected node and just its direct connections
- [x] Save relative icons paths on graph files
- [ ] Fix properties panel to not display duplicated widgets after selection
- [ ] Improve connections ordering functionality
- [ ] Allow for process and input/output descriptions, with support for markdown
- [ ] Add export documentation functionality, that expots an html or markdown document with all processes and its inputs and outputs

# Development
## Requirements:
- Python 2 or 3
- PyQt5 or PySide2
- [qdarkstyle](https://github.com/ColinDuquesnoy/QDarkStyleSheet)
- [Qt.py](https://github.com/mottosso/Qt.py)
- [Nodz (modified version)](https://github.com/hasielhassan/Nodz)
- [pygraphviz](https://github.com/pygraphviz/pygraphviz)

## Setup and run

Install the dependencies on the `requirements.txt` file
```
python -m pip install requirements.txt
```

To start PlumberManager just run the `run.py` script

```
python /PlumberManager/run.py
```

## Packaging

This project its intended to be used directly and it the most simple way, and that its easier if its distributed as a single executable package

The binary release its done with PyInstaller and the `.spec` file its included in the repo

To create a build from source just make sure to have PyInstaller

```
pip install pyinstaller
```

And run the packaging using the included `.spec` file

```
pyinstaller /PlumberManager/.spec
```
