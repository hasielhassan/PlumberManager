#############################################################################
# Copyright (c) 2023, Hasiel Alvarez.
#
# Your use of this software as distributed in this GitHub repository, is
# governed by the GPL-3.0 license
#
# The full license is in the file LICENSE, distributed with this software.
#############################################################################

import os
import re
import json
import pprint
import tempfile
import requests
import threading
import webbrowser
import qdarkstyle
import pygraphviz
import reportlab
import reportlab.lib
import reportlab.pdfbase
import reportlab.platypus 
import reportlab.rl_config
import reportlab.pdfbase.ttfonts

from packaging import version as packaging_version

from .thirdparty.Nodz import Nodz
from .thirdparty.Nodz.Nodz import nodz_main

import Qt
from Qt import QtCore, QtGui, QtWidgets, QtSvg

from .ui.manager_form import Ui_MainWindow as manager_form
from .ui.node_details_form import Ui_Form as node_details_form
from .ui.slot_details_form import Ui_Form as slot_details_form

CACHE = threading.local()
CACHE.data_types = {}
PROJECT_DIR = os.path.dirname(os.path.dirname(__file__))

with open(os.path.join(PROJECT_DIR, 'VERSION'), 'r') as file:
    VERSION = file.read()
class PlumberManager(QtWidgets.QMainWindow):

    version = VERSION

    custom_config_path = os.path.join(
        PROJECT_DIR, 'config', 'custom_config.json'
    )

    data_icons_path = os.path.join(
        PROJECT_DIR, 'config', 'data_icons.json'
    )

    settings = QtCore.QSettings("PlumberManager")

    data_types = {}

    def __init__(self, parent=None):
        """Initialize the manager window
            
            Args:
                parent: parent widget
        """

        super(PlumberManager, self).__init__(parent)

        self.ui = manager_form()
        self.ui.setupUi(self)

        self.setStyleSheet(
            qdarkstyle.load_stylesheet(
                qt_api=Qt.__binding__.lower()
            )
        )

        self.setWindowTitle('PlumberManager')
        self.setWindowIcon(
            QtGui.QIcon(
                os.path.join(
                    PROJECT_DIR, 
                    'resources','icon_32.png')
            )
        )

        self.nodz = nodz_main.Nodz(None)
        self.nodz.loadConfig(filePath=self.custom_config_path)
        self.nodz.config["icons_folder"] = os.path.join(
            PROJECT_DIR, "resources", "data_type_icons"
        )
        self.nodz.initialize()

        # Load data icons definition
        # this updates nodz config so it needs to happen after nodz
        self.loadDataTypes(self.nodz)

        self.ui.scene_frame.layout().addWidget(self.nodz)
        self.ui.actionAbout.triggered.connect(self.about)
        self.ui.actionOpen.triggered.connect(self.openGraph)
        self.ui.actionSave.triggered.connect(self.saveGraph)
        self.ui.actionExportPNG.triggered.connect(
            lambda : self.renderGraph('png')
        )
        self.ui.actionExportSVG.triggered.connect(
            lambda : self.renderGraph('svg')
        )

        self.ui.actionExportPDF.triggered.connect(
            lambda : self.renderGraph('pdf')
        )

        self.ui.create_process_btn.clicked.connect(self.createProcess)
        self.ui.layout_graph_btn.clicked.connect(self.layoutGraph)
        self.ui.isolate_selected_btn.clicked.connect(self.isolateSelected)

        # set some shortcuts
        self.ui.create_process_btn.setText(
            "Create New Process Node ( Ctrl + P )"
        )
        self.shortcut_new_process = QtWidgets.QShortcut(
            QtGui.QKeySequence('Ctrl+P'), self
        )
        self.shortcut_new_process.activated.connect(self.createProcess)

        self.ui.layout_graph_btn.setText("Auto Layout Graph ( Ctrl + L )")
        self.shortcut_layout = QtWidgets.QShortcut(
            QtGui.QKeySequence('Ctrl+L'), self
        )       
        self.shortcut_layout.activated.connect(self.layoutGraph)

        self.ui.actionOpen.setText("Open - (Ctrl+O)")
        self.shortcut_open = QtWidgets.QShortcut(
            QtGui.QKeySequence('Ctrl+O'), self
        )       
        self.shortcut_open.activated.connect(self.openGraph)

        self.ui.actionSave.setText("Save - (Ctrl+S)")
        self.shortcut_save = QtWidgets.QShortcut(
            QtGui.QKeySequence('Ctrl+S'), self
        )       
        self.shortcut_save.activated.connect(self.saveGraph)

        # some nodez signal connections
        self.nodz.signal_NodeSelected.connect(self.on_nodeSelected)
        self.nodz.signal_NodeCreated.connect(self.on_nodeCreated)
        self.nodz.signal_NodeDeleted.connect(self.on_nodeDeleted)
        self.nodz.signal_NodeEdited.connect(self.on_nodeEdited)
        self.nodz.signal_NodeMoved.connect(self.on_nodeMoved)

        #self.nodz.signal_NodeDoubleClicked.connect(self.on_nodeDoubleClick)

        self.nodz.signal_AttrCreated.connect(self.on_attrCreated)
        self.nodz.signal_AttrDeleted.connect(self.on_attrDeleted)
        self.nodz.signal_AttrEdited.connect(self.on_attrEdited)

        self.nodz.signal_PlugConnected.connect(self.on_connected)
        self.nodz.signal_SocketConnected.connect(self.on_connected)
        self.nodz.signal_PlugDisconnected.connect(self.on_disconnected)
        self.nodz.signal_SocketDisconnected.connect(self.on_disconnected)

        """
        self.nodz.signal_GraphSaved.connect(self.on_graphSaved)
        self.nodz.signal_GraphLoaded.connect(self.on_graphLoaded)
        self.nodz.signal_GraphCleared.connect(self.on_graphCleared)
        self.nodz.signal_GraphEvaluated.connect(self.on_graphEvaluated)

        self.nodz.signal_KeyPressed.connect(self.on_keyPressed)
        """

        # Create a QTimer to delay the updates check dialog
        self.update_timer = QtCore.QTimer(self)
        self.update_timer.timeout.connect(self._checkForUpdates)
        # Delay for half a second
        self.update_timer.start(500)


        # a global to track unsaved changes
        self.unsaved_changes = False

        # start maximized
        self.showMaximized()

    ######################################################################
    # Test signals
    ######################################################################

    # Nodes
    @QtCore.Slot(str)
    def on_nodeCreated(self, nodeName):
        print('node created: {}'.format(nodeName))
        self.unsaved_changes = True

    @QtCore.Slot(str)
    def on_nodeDeleted(self, nodeName):
        print('node deleted: {} '.format(nodeName))
        self.unsaved_changes = True

    @QtCore.Slot(str, str)
    def on_nodeEdited(self, nodeName, newName):
        print('node edited: {0}, new name : {1}'.format(nodeName, newName))
        self.unsaved_changes = True

    #@QtCore.Slot(str)
    def on_nodeSelected(self, nodeNames):

        print('node selected: {}'.format(nodeNames))

        layout = self.ui.details_panel.layout()
        current_items = layout.count()

        if current_items > 0:

            items = [layout.itemAt(i) for i in range(layout.count())]

            for item in items:
                if isinstance(item, QtWidgets.QWidgetItem):
                    widget = item.widget()
                    layout.removeItem(item)
                    widget.deleteLater()
                    widget = None

        for name in nodeNames:
            node = self.nodz.scene().nodes[name]

            details = ProcessDetails(node, self.nodz, self.data_types)
            index = layout.count() -1
            layout.insertWidget(index, details)


    @QtCore.Slot(str, object)
    def on_nodeMoved(self, nodeName, nodePos):
        print('node {0} moved to {1}'.format(nodeName, nodePos))
        self.unsaved_changes = True

    @QtCore.Slot(str)
    def on_nodeDoubleClick(self, nodeName):
        print('double click on node : {0}'.format(nodeName))

    # Attrs
    @QtCore.Slot(str, int)
    def on_attrCreated(self, nodeName, attrId):
        print('attr created : {0} at index : {1}'.format(nodeName, attrId))
        self.unsaved_changes = True

    @QtCore.Slot(str, int)
    def on_attrDeleted(self, nodeName, attrId):
        print('attr Deleted : {0} at old index : {1}'.format(nodeName, attrId))
        self.unsaved_changes = True

    @QtCore.Slot(str, int, int)
    def on_attrEdited(self, nodeName, oldId, newId):
        print('attr Edited : {0} at old index : {1}, new index : {2}'.format(nodeName, oldId, newId))
        self.unsaved_changes = True

    # Connections
    @QtCore.Slot(str, str, str, str)
    def on_connected(self, srcNodeName, srcPlugName, destNodeName, dstSocketName):
        print('connected src: "{0}" at "{1}" to dst: "{2}" at "{3}"'.format(srcNodeName, srcPlugName, destNodeName, dstSocketName))
        self.unsaved_changes = True

    @QtCore.Slot(str, str, str, str)
    def on_disconnected(self, srcNodeName, srcPlugName, destNodeName, dstSocketName):
        print('disconnected src: "{0}" at "{1}" from dst: "{2}" at "{3}"'.format(srcNodeName, srcPlugName, destNodeName, dstSocketName))
        self.unsaved_changes = True

    # Graph
    @QtCore.Slot()
    def on_graphSaved(self):
        print('graph saved !')

    #@QtCore.Slot()
    #def on_graphLoaded(self):
    #    print('graph loaded !')

    @QtCore.Slot()
    def on_graphCleared(self):
        print('graph cleared !')

    #@QtCore.Slot()
    #def on_graphEvaluated(self):
    #    print('graph evaluated !')

    # Other
    @QtCore.Slot(object)
    def on_keyPressed(self, key):
        print('key pressed : {}'.format(key))

    def closeEvent(self, event):

        if not self.unsaved_changes:
            event.accept()
            return
        
        reply = QtWidgets.QMessageBox.question(
            self,
            "Unsaved Changes!",
            (
                "You have unsaved changes in the editor.\n"
                "Do you want to close anyway and lose the changes?"
            ),
            QtWidgets.QMessageBox.Yes | QtWidgets.QMessageBox.No,
        )

        if reply == QtWidgets.QMessageBox.Yes:
            event.accept()  # Allow the window to close
        else:
            event.ignore()  # Ignore the close event

    def _checkForUpdates(self):
        """
        """
        self.update_timer.stop()

        try:
            response = requests.get(
                (
                    "https://api.github.com/repos/"
                    "hasielhassan/PlumberManager/"
                    "releases/latest"
                )
            ).json()
        except Exception as e:
            print("Failed to check for updates: {}".format(str(e)))
            return

        title = response["name"]
        version = response["tag_name"]
        description = response["body"]
        url = response["html_url"]

        current_version = packaging_version.parse(self.version)
        latest_version = packaging_version.parse(version)

        skipped = self.settings.value("skipped_updates", None)
        if skipped:
            skipped = skipped.split(",")
        else:
            skipped = []

        if version not in skipped and latest_version > current_version:
            
            dialog = QtWidgets.QMessageBox(self)

            # Set the title, message and icon
            dialog.setWindowTitle(title)
            dialog.setText(description)
            dialog.setIcon(QtWidgets.QMessageBox.Information)

            # Create custom buttons with your desired text
            check_button = QtWidgets.QPushButton("Check Release")
            remind_button = QtWidgets.QPushButton("Remind me later")
            skip_button = QtWidgets.QPushButton("Skip Release")

            # Add custom buttons to the message box
            dialog.addButton(check_button, QtWidgets.QMessageBox.AcceptRole)
            dialog.addButton(remind_button, QtWidgets.QMessageBox.AcceptRole)
            dialog.addButton(skip_button, QtWidgets.QMessageBox.ActionRole)

            # Display the message box and handle the result
            result = dialog.exec_()

            if result == 0:
                webbrowser.open(url, new=2)
            elif result == 2:
                skipped.append(version)
                as_string = ",".join(skipped)
                self.settings.setValue("skipped_updates", as_string)
            else:
                pass

    @classmethod
    def loadDataTypes(cls, nodz):
        """
        """

        if hasattr(CACHE, 'data_types') and CACHE.data_types:
            cls.data_types = CACHE.data_types
            return cls.data_types

        contents = open(cls.data_icons_path, "r").read()
        config = json.loads(contents)

        cls.data_types = {}

        for data_type in config:

            path = data_type["path"]
            name = data_type['code']

            if data_type['type'] in nodz.dataTypes:
                dtype = nodz.dataTypes[data_type['type']]
            else:
                dtype = type(str(data_type['type']), (object,), {})
                nodz.dataTypes[data_type['type']] = dtype

            if path.startswith('./'):
                print("Resolving relative path for: {}".format(path))
                path = path.replace('./', '')
                path = os.path.normpath(
                    os.path.join(PROJECT_DIR, path)
                )
                print("Absolute path: {}".format(path))

            cls.data_types[name] = (dtype, path)
        
        CACHE.data_types = cls.data_types

        print(pprint.pformat(cls.data_types))

    def createProcess(self):
        processName, ok = QtWidgets.QInputDialog.getText(
            self, 'New Process', 'Process Name:'
        )
        if ok and processName:
            self.nodz.createNode(
                name=processName, preset='node_preset_1', position=None
            )

            self.unsaved_changes = True

    def about(self):

        QtWidgets.QMessageBox.information(
            self, "About Plumber Manager",
            (
                "Plumber Manager v{}\n\n"
                "A helper tool to design CG Pipeline "
                "interactive diagrams and data flow documentation\n\n"
                "Author: Hasiel Alvarez\n"
                "Repo: https://github.com/hasielhassan/PlumberManager\n"
                "License: GNU General Public License v3.0\n\n"
                "Copyright (c) 2019-2023 Hasiel Alvarez\n"
            ).format(self.version)
        )

    def openGraph(self):

        if self.unsaved_changes:
            reply = QtWidgets.QMessageBox.question(
                self,
                "Unsaved Changes!",
                (
                    "You have unsaved changes in the editor.\n"
                    "Do you want to open a new file and lose the changes?"
                ),
                QtWidgets.QMessageBox.Yes | QtWidgets.QMessageBox.No,
            )

            if reply == QtWidgets.QMessageBox.No:
                return


        samples_dir = os.path.join(
            PROJECT_DIR, "samples"
        )

        path, filter = QtWidgets.QFileDialog.getOpenFileName(
            self, 'Open Graph file', samples_dir, ("Graph (*.gph)")
        )

        if not path:
            return

        self.nodz.clearGraph()
        self.nodz.loadGraph(filePath=path)
        self.nodz._focus()

        self.unsaved_changes = False

    def saveGraph(self):

        path, filter = QtWidgets.QFileDialog.getSaveFileName(
            self, 'Save Graph file', os.path.expanduser('~'), ("Graph (*.gph)")
        )

        self.nodz.saveGraph(filePath=path)

        self.unsaved_changes = False

    @staticmethod
    def layoutGraphForNodz(nodz):

        graph = pygraphviz.AGraph(rankdir='LR')

        for source, target in nodz.evaluateGraph():
            source = source.split('.')[0]
            target = target.split('.')[0]
            graph.add_edge(source, target)

        # Do the layout organization and use those values to position nodes
        graph.layout(prog='dot')
        for nodeName in graph.nodes():
            node = graph.get_node(nodeName)
            coords = node.attr['pos'].split(',')
            x = float(coords[0])
            y = float(coords[1])

            newX = (x * 4) + 500
            newY = (y * 5) + 500

            node = nodz.scene().nodes[nodeName]
            node.setPos(QtCore.QPointF(newX, newY))

        nodz.scene().updateScene()

        nodz._focus()

    def layoutGraph(self):
        self.layoutGraphForNodz(self.nodz)

    def __buildNodeIsolationData(self, node):

        data = {
            "node": node.name,
            "inputs": {
                n: {
                    "dataType": node.attrsData[n]["dataType"],
                    "connectionIcon": node.attrsData[n]["connectionIcon"],
                    "connections": [
                        (c.plugNode, c.plugAttr) for c in s.connections
                    ]
                }
                for n, s in node.sockets.items()
            },
            "outputs": {
                n: {
                    "dataType": node.attrsData[n]["dataType"],
                    "connectionIcon": node.attrsData[n]["connectionIcon"],
                    "connections": [
                        (c.socketNode, c.socketAttr) for c in p.connections
                    ]
                }
                for n, p in node.plugs.items()
            },
        }

        return data

    def isolateSelected(self):

        selected_nodes = self.nodz.scene().selectedItems()

        if not selected_nodes or len(selected_nodes) > 1:
            QtWidgets.QMessageBox.warning(
                self, "No selected nodes!",
                (
                    "Isolate Selected needs one selected node!"
                )
            )
            return
        
        node = selected_nodes[0]

        data = self.__buildNodeIsolationData(node)
        
        isolated_view = IsolatedViewDialog(
            "Isolated View of {}".format(node.name), 
            data, parent=self
        )
        isolated_view.show()

    def __getBackgroundColor(self):
        style_sheet = self.nodz.styleSheet()
        pattern = r'background: *rgb\((\d+), *(\d+), *(\d+), *(\d+)\)'
        match = re.search(pattern, style_sheet)

        if match:
            r, g, b, a = map(int, match.groups())
            return (r, g, b, a)
        else:
            return None
        
    def __exportSVG(self, rect, path):
            
        # Create a QSvgGenerator and configure it
        svg_generator = QtSvg.QSvgGenerator()
        svg_generator.setFileName(path)
        svg_generator.setViewBox(rect)
        svg_generator.setSize(rect.size().toSize())
        # You can adjust other settings like resolution and title here

        # Create a QPainter and set the QSvgGenerator as its output device
        painter = QtGui.QPainter()
        painter.begin(svg_generator)

        # Render the QGraphicsScene using the QPainter
        self.nodz.scene().render(
            painter, svg_generator.viewBox(), rect
        )

        # Finish painting and save the SVG file
        painter.end()

    def __exportPNG(self, rect, path):
        # Create a QImage with the desired size
        width = rect.width()
        height = rect.height()
        image = QtGui.QImage(
            width*2, height*2, 
            QtGui.QImage.Format_ARGB32_Premultiplied
        )

        # Create a QPainter and set the QImage as its rendering target
        painter = QtGui.QPainter(image)

        # Render the QGraphicsScene onto the QImage
        self.nodz.scene().render(
            painter, image.rect(), rect
        )

        # Finish painting
        painter.end()

        # Save the QImage to a file
        image.save(path)

    def __exportPDF(self, rect, path):

        # create a reportlab PDF canvas
        title = "Pipeline Document"
        pageinfo = "Plumber Manager v{}".format(self.version)

        SimpleDocTemplate = reportlab.platypus.SimpleDocTemplate
        Paragraph = reportlab.platypus.Paragraph
        Image = reportlab.platypus.Image
        Spacer = reportlab.platypus.Spacer 
        PageBreak = reportlab.platypus.PageBreak

        # A custom font to support emojis on "Normal" text
        font_file = os.path.join(
            PROJECT_DIR, "resources", "Symbola.ttf"
        )
        font = reportlab.pdfbase.ttfonts.TTFont(
            'Symbola', font_file
        )
        reportlab.pdfbase.pdfmetrics.registerFont(font)
        styles  = reportlab.lib.styles.getSampleStyleSheet()
        styles["Normal"].fontName = 'Symbola'

        inch = reportlab.lib.units.inch
        defaultPageSize = reportlab.rl_config.defaultPageSize
        hight = defaultPageSize[1]
        width = defaultPageSize[0]

        def coverPage(canvas, doc):
            
            canvas.saveState()
            canvas.setFillColorCMYK(0.21,0.11,0.0,0.63)
            canvas.rect(
                0,0,
                doc.width+doc.leftMargin+doc.rightMargin,
                doc.height+doc.topMargin+doc.bottomMargin, 
                fill=True, stroke=False
            )
            canvas.restoreState()
            
            canvas.saveState()
            canvas.setFont('Times-Bold',16)
            canvas.drawCentredString(width/2.0, hight-108, title)
            canvas.setFont('Times-Roman',9)
            canvas.drawString(
                inch, 0.75 * inch, "Made with %s" % pageinfo
            )
            canvas.restoreState()

        def processPage(canvas, doc):
            
            canvas.saveState()
            canvas.setFillColorCMYK(0.21,0.11,0.0,0.63)
            canvas.rect(
                0,0,
                doc.width+doc.leftMargin+doc.rightMargin,
                doc.height+doc.topMargin+doc.bottomMargin, 
                fill=True, stroke=False
            )
            canvas.restoreState()

            canvas.saveState()
            canvas.setFont('Times-Roman',9)
            canvas.drawString(
                inch, 0.75 * inch, 
                "Page %d %s" % (doc.page - 1, pageinfo)
            )
            canvas.restoreState()

        # create a temporary file for the png export
        # reportlab doesnt support the use of svg
        tmp_dir = tempfile.mkdtemp()
        tmp_path = os.path.join(tmp_dir, 'tmp.png')
        self.__exportPNG(rect, tmp_path)
        ratio = float(rect.width() / rect.height())
        max_width = (width - 100)
        max_height = max_width / ratio
        image = Image(tmp_path, width=max_width, height=max_height)  

        # build teh document template
        doc = SimpleDocTemplate(path)

        # and start a list with the contents
        flowables = [
            Spacer(1,2*inch),
            image,
            PageBreak(),
        ]

        data_icon = '<img src="{}" height="{}" width="{}"/>'
        
        for i, node_name in enumerate(self.nodz.scene().nodes.keys()):

            node = self.nodz.scene().nodes[node_name]

            process_title = Paragraph(
                (
                    "<b>This is {} Process</b>"
                ).format(node_name), styles["Heading1"]
            )
            flowables.append(process_title)
            flowables.append(Spacer(1,0.4*inch))


            data = self.__buildNodeIsolationData(node)
            isolated_view = IsolatedViewDialog(
                "Isolated View of {}".format(node.name), 
                data, parent=self
            )

            # create a temporary file for the png export
            tmp_dir = tempfile.mkdtemp()
            tmp_path = os.path.join(tmp_dir, 'tmp.png')
            isolated_view.exportPNG(tmp_path)
            ratio = float(
                isolated_view.nodz.scene().itemsBoundingRect().width() / 
                isolated_view.nodz.scene().itemsBoundingRect().height()
            )
            max_width = (width - 300)
            max_height = max_width / ratio
            image = Image(tmp_path, width=max_width, height=max_height) 

            flowables.append(Spacer(1,0.4*inch))
            flowables.append(image)
            flowables.append(Spacer(1,0.4*inch))

            inputs_title = Paragraph(
                "<b>Inputs:</b>", styles["Heading2"]
            )
            flowables.append(inputs_title)
            flowables.append(Spacer(1,0.1*inch))

            for name, s in node.sockets.items():
                data_type = [
                    (n,d[1]) for n, d in self.data_types.items() 
                    if d[0] == s.dataType
                ]
                if data_type:
                    data_type = data_type[0]
                else:
                    data_type = "Unknown"

                input_paragraph = Paragraph(
                        "- {} ({} {})".format(
                        name.title(), data_type[0], 
                        data_icon.format(
                            data_type[1],
                            styles["Heading4"].fontSize + 4,
                            styles["Heading4"].fontSize + 2,
                        )
                    ), styles["Heading4"]
                )
                flowables.append(input_paragraph)
                flowables.append(Spacer(1,0.1*inch))
            
            flowables.append(Spacer(1,0.2*inch))

            outputs_title = Paragraph(
                "<b>Outputs:</b>", styles["Heading2"]
            )
            flowables.append(outputs_title)
            flowables.append(Spacer(1,0.1*inch))
            for name, s in node.plugs.items():

                data_type = [
                    (n,d[1]) for n, d in self.data_types.items() 
                    if d[0] == s.dataType
                ]
                if data_type:
                    data_type = data_type[0]
                else:
                    data_type = "Unknown"

                output_paragraph = Paragraph(
                        "- {} ({} {})".format(
                        name.title(), data_type[0],
                        data_icon.format(
                            data_type[1], 
                            styles["Heading4"].fontSize + 4, 
                            styles["Heading4"].fontSize + 2,
                        )
                    ), styles["Heading4"]
                )
                flowables.append(output_paragraph)
                flowables.append(Spacer(1,0.1*inch))
            
            flowables.append(Spacer(1,0.2*inch))

            process_details = Paragraph(
                "<b>Process Details:</b>", styles["Heading2"]
            )
            flowables.append(process_details)
            flowables.append(Spacer(1,0.1*inch))
            
            process_details = node.metadata["process_details"].split("\n")
            for details_section in process_details:
                details_paragraph = Paragraph(
                    details_section, styles["Normal"]
                )
                flowables.append(details_paragraph)
                flowables.append(Spacer(1,0.1*inch))
            
            flowables.append(PageBreak())

        doc.build(
            flowables, 
            onFirstPage=coverPage, 
            onLaterPages=processPage
        )

    def renderGraph(self, image_format):

        path, filter = QtWidgets.QFileDialog.getSaveFileName(
            self, 'Export Graph {}'.format(image_format.upper()), 
            os.path.expanduser('~'), ("Image (*.{})".format(image_format))
        )

        # Calculate the bounding rectangle of all visible items
        visible_rect = self.nodz.scene().itemsBoundingRect()

        # Modify the top edge of the QRectF to include extra information
        visible_rect.setTop(visible_rect.top() - 25)
        visible_rect.setBottom(visible_rect.bottom() + 5)

        # set current bg color to transparent
        current_bg_color = self.__getBackgroundColor()
        self.nodz.setStyleSheet("background: rgb(0,0,0,0)")

        self.nodz.gridVisToggle = False

        if image_format == 'png':
            self.__exportPNG(visible_rect, path)

        elif image_format == 'svg':
            self.__exportSVG(visible_rect, path)

        elif image_format == 'pdf':
            self.__exportPDF(visible_rect, path)         

        else:
            pass

        # restore the original bg color
        self.nodz.setStyleSheet(
            "background: rgb({}, {}, {}, {})".format(*current_bg_color)
        )

        self.nodz.gridVisToggle = True

class ProcessDetails(QtWidgets.QWidget):

    def __init__(self, node, nodz, data_types):

        super(ProcessDetails, self).__init__()

        self.ui = node_details_form()
        self.ui.setupUi(self)

        self.node = node
        self.nodz = nodz
        self.data_types = data_types

        self.ui.group_box.setTitle(self.node.name)
        self.ui.name_edit.setText(self.node.name)

        position = self.node.scenePos()
        self.ui.coords_display.setText("%s, %s" % (position.x(), position.y()))

        self.ui.process_details = QtWidgets.QTextBrowser(self)
        process_details_text = self.node.metadata.get("process_details", "")
        self.ui.process_details.setText(process_details_text)

        # set the text browser to be editable
        self.ui.process_details.setReadOnly(False)
        self.ui.process_details.setOpenExternalLinks(True)
        self.ui.proocess_details_label = QtWidgets.QLabel(self)
        self.ui.proocess_details_label.setText("Process Details: ")
        self.ui.group_box.layout().addWidget(self.ui.proocess_details_label)
        self.ui.group_box.layout().addWidget(self.ui.process_details)

        # finally connect the objects
        # starting from text browser updates to a function
        self.ui.process_details.textChanged.connect(self.updateProcessDetails)
        self.ui.create_input_btn.clicked.connect(self.createInput)
        self.ui.create_output_btn.clicked.connect(self.createOutput)
        self.ui.name_edit.returnPressed.connect(self.updateName)

        self.listSlots()

    def listSlots(self):
        area_layout = self.ui.inputs_area.layout()
        for inputSlot in self.node.sockets:
            slot = SlotDetails(self.node.sockets[inputSlot], self, area_layout)
            area_layout.addWidget(slot)

        area_layout = self.ui.outputs_area.layout()
        for outputSlot in self.node.plugs:
            slot = SlotDetails(self.node.plugs[outputSlot], self, area_layout)
            area_layout.addWidget(slot)

    def updateProcessDetails(self):
        """
        Updates the process details of the node
        """

        text = self.ui.process_details.toPlainText()

        self.node.metadata["process_details"] = text

    def createInput(self):
        message = "Type a name for the input an select its data type."
        dialog = UserInputsDialog(
            "New Input", message, self.data_types, parent=self
        )
        if dialog.exec_() == QtWidgets.QDialog.Accepted:

            input_name, data_name = dialog.getInputs()
            type_class, type_icon = self.data_types[data_name]

            print("type_class: {}".format(type_class))
            print("type_icon: {}".format(type_icon))

            self.nodz.createAttribute(
                node=self.node, name=input_name, 
                index=0, preset='attr_preset_1',
                plug=False, socket=True, 
                dataType=type_class, connectionIcon=type_icon
            )
            self.nodz.scene().updateScene()

    def createOutput(self):
        message = "Type a name for the output an select its data type."
        dialog = UserInputsDialog(
            "New output", message, self.data_types, parent=self
        )
        if dialog.exec_() == QtWidgets.QDialog.Accepted:

            output_name, data_name = dialog.getInputs()
            type_class, type_icon = self.data_types[data_name]

            print("type_class: {}".format(type_class))
            print("type_icon: {}".format(type_icon))

            self.nodz.createAttribute(
                node=self.node, name=output_name, 
                index=-1, preset='attr_preset_2',
                plug=True, socket=False, 
                dataType=type_class, connectionIcon=type_icon
            )
            
            self.nodz.scene().updateScene()

    def updateName(self):
        newName = self.ui.name_edit.text()
        self.nodz.editNode(self.node, newName)
        self.ui.group_box.setTitle(newName)
        self.nodz.scene().updateScene()

class SlotDetails(QtWidgets.QWidget):

    def __init__(self, slot, node_details, layout):
        """
        Initializes the SlotDetails object

        Args:
            slot (Slot): The slot object representing the details of the slot.
            node_details (NodeDetails): The node details object containing the data types.
            layout (Layout): The layout object for the slot details form.

        Returns:
            None
        """

        super(SlotDetails, self).__init__()

        self.ui = slot_details_form()
        self.ui.setupUi(self)

        self.slot = slot

        self.ui.slot_name.setText(self.slot.attribute)
        self.ui.slot_name.returnPressed.connect(self.updateName)

        self.node_details = node_details
        self.layout = layout
        self.nodz = self.node_details.nodz

        for type_name, type_data in node_details.data_types.items():
            type_icon_path = type_data[1]
            icon = QtGui.QIcon(type_icon_path)
            self.ui.data_type.addItem(icon, type_name)

        current_data_type = [
            n for n, d in node_details.data_types.items() 
            if d[0] == self.slot.dataType
        ]

        if current_data_type:
            self.ui.data_type.setCurrentText(current_data_type[0])
        self.ui.data_type.activated.connect(self.updateDataType)

        self.ui.down_btn.setText("")
        self.ui.up_btn.setText("")

        upPixmap = QtGui.QPixmap(
            os.path.join(PROJECT_DIR, 'resources', 'arrow-up.png')
        )

        downPixmap = QtGui.QPixmap(
            os.path.join(PROJECT_DIR, 'resources', 'arrow-down.png')
        )

        self.ui.up_btn.setIcon(upPixmap)
        self.ui.down_btn.setIcon(downPixmap)

        self.ui.up_btn.clicked.connect(self.moveUp)
        self.ui.down_btn.clicked.connect(self.moveDown)

    def updateDataType(self):
        dataTypeName = self.ui.data_type.currentText()
        dataType = None
        self.nodz.editAttribute(
            self.node_details.node, 
            self.slot.index, newDataType=dataType
        )
        self.nodz.scene().updateScene()

    def updateName(self):
        newName = self.ui.slot_name.text()
        self.nodz.editAttribute(
            self.node_details.node, 
            self.slot.index, newName=newName
        )
        self.nodz.scene().updateScene()

    def reorder(self, direction):
        currentIndex = self.layout.indexOf(self)
        newIndex = currentIndex + direction
        self.layout.insertWidget(newIndex, self)

        self.nodz.editAttribute(
            self.node_details.node,
            self.slot.index,
            newIndex=self.slot.index + direction
        )

        self.nodz.scene().updateScene()

    def moveUp(self):
        self.reorder(-1)

    def moveDown(self):
        self.reorder(1)

class UserInputsDialog(QtWidgets.QDialog):

    def __init__(self, title, message, data_types, parent=None):
        """
        Initializes a UserInputsDialog object.

        Args:
            title (str): The title of the dialog window.
            message (str): The message to display in the dialog.
            data_types (dict): A dictionary containing the data types and their corresponding icon paths.
            parent (QWidget, optional): The parent widget of the dialog. Defaults to None.

        Returns:
            None
        """
        super(UserInputsDialog, self).__init__(parent=parent)

        self.setWindowTitle(title)

        form = QtWidgets.QFormLayout(self)
        form.addRow(QtWidgets.QLabel(message))

        self.input_name = QtWidgets.QLineEdit(self)
        form.addRow("Name:", self.input_name)

        self.data_type = QtWidgets.QComboBox(self)

        for type_name, type_data in data_types.items():
            type_icon_path = type_data[1]
            icon = QtGui.QIcon(type_icon_path)
            self.data_type.addItem(icon, type_name)

        form.addRow("Data Type:", self.data_type)

        buttonBox = QtWidgets.QDialogButtonBox(
            QtWidgets.QDialogButtonBox.Ok |QtWidgets.QDialogButtonBox.Cancel,
            QtCore.Qt.Horizontal, self
        )
        form.addRow(buttonBox)
        buttonBox.accepted.connect(self.accept)
        buttonBox.rejected.connect(self.reject)

    def getInputs(self):

        return self.input_name.text(), self.data_type.currentText()
    
class IsolatedViewDialog(QtWidgets.QDialog):

    def __init__(self, title, data, parent=None):
        """
        Initializes an IsolatedViewDialog object.

        Args:
            title (str): The title of the dialog.
            data: The data to be loaded into the network.
            parent (QWidget, optional): The parent widget of the dialog. 
                                        Defaults to None.

        Returns:
            None
        """
        super(IsolatedViewDialog, self).__init__(parent=parent)

        self.setWindowTitle(title)

        # Calculate the size of the dialog as 25% smaller than the parent
        parent_size = parent.size()
        dialog_width = parent_size.width() * 0.75
        dialog_height = parent_size.height() * 0.75
        self.resize(dialog_width, dialog_height)

        self.nodz = nodz_main.Nodz(None)
        self.nodz.loadConfig(filePath=PlumberManager.custom_config_path)
        self.nodz.config["icons_folder"] = os.path.join(
            PROJECT_DIR, "resources", "data_type_icons"
        )
        self.nodz.initialize()

        # Load data icons definition
        # this updates nodz config so it needs to happen after nodz
        PlumberManager.loadDataTypes(self.nodz)

        # setup the network from the data
        self.setupNetwork(data)

        # Create layout and add widgets
        layout = QtWidgets.QVBoxLayout()
        layout.addWidget(self.nodz)
        # Set dialog layout
        self.setLayout(layout)

    def setupAttr(self, node, attr, attr_type, attr_data):
        """
        Creates and sets up attributes for a given node.
        
        :param node: The node for which the attributes are being set up
        :param attr: The name of the attribute
        :param attr_type: The type of the attribute, either 'input' or 'output'
        :param attr_data: The data associated with the attribute, including 
                          dataType and connectionIcon
        
        :return: None
        """
        socket = True if attr_type == 'input' else False
        plug = True if attr_type == 'output' else False
        attr_preset = 'attr_preset_1' if attr_type == 'input' else 'attr_preset_2'
        conn_preset = 'attr_preset_2' if attr_type == 'input' else 'attr_preset_1'

        print("Creating {}.{}".format(node.name, attr))
        self.nodz.createAttribute(
            node=node, name=attr, 
            index=-1, preset=attr_preset,
            plug=plug, socket=socket, 
            dataType=attr_data["dataType"], 
            connectionIcon=attr_data["connectionIcon"]
        )

        for attr_node_name, attr_attr_name in attr_data["connections"]:
            if attr_node_name in self.nodz.scene().nodes.keys():
                attr_node = self.nodz.scene().nodes[attr_node_name]
            else:
                print("Creating new {} node".format(attr_node_name))
                attr_node = self.nodz.createNode(
                    name=attr_node_name, 
                    preset="node_preset_1", position=None
                )

            print("Creating {}.{}".format(attr_node_name, attr_attr_name))
            self.nodz.createAttribute(
                node=attr_node, name=attr_attr_name, 
                index=-1, preset=conn_preset,
                plug=not plug, socket=not socket, 
                dataType=attr_data["dataType"], 
                connectionIcon=attr_data["connectionIcon"]
            )

            if attr_type == 'input':
                print("Connecting {}.{} to {}.{}".format(
                    attr_node_name, attr_attr_name,
                    node.name, attr
                ))
                self.nodz.createConnection(
                    attr_node_name, attr_attr_name,
                    node.name, attr
                )
            else:
                print("Connecting {}.{} to {}.{}".format(
                    node.name, attr,
                    attr_node_name, attr_attr_name
                ))
                self.nodz.createConnection(
                    node.name, attr,
                    attr_node_name, attr_attr_name
                )

    def setupNetwork(self, data):

        print(pprint.pformat(data))
        
        node = self.nodz.createNode(
            name=data["node"], preset="node_preset_1", position=None
        )

        for input, input_data in data["inputs"].items():
            self.setupAttr(node, input, "input", input_data)

        for output, output_data in data["outputs"].items():
            self.setupAttr(node, output, "output", output_data)

        PlumberManager.layoutGraphForNodz(self.nodz)

    def __getBackgroundColor(self):
        style_sheet = self.nodz.styleSheet()
        pattern = r'background: *rgb\((\d+), *(\d+), *(\d+), *(\d+)\)'
        match = re.search(pattern, style_sheet)

        if match:
            r, g, b, a = map(int, match.groups())
            return (r, g, b, a)
        else:
            return None
    def exportPNG(self, path):

        # Calculate the bounding rectangle of all visible items
        visible_rect = self.nodz.scene().itemsBoundingRect()

        # Modify the top edge of the QRectF to include extra information
        visible_rect.setTop(visible_rect.top() - 25)
        visible_rect.setBottom(visible_rect.bottom() + 5)

        # set current bg color to transparent
        current_bg_color = self.__getBackgroundColor()
        self.nodz.setStyleSheet("background: rgb(0,0,0,0)")

        self.nodz.gridVisToggle = False

        # Create a QImage with the desired size
        width = visible_rect.width()
        height = visible_rect.height()
        image = QtGui.QImage(
            width*2, height*2, 
            QtGui.QImage.Format_ARGB32_Premultiplied
        )

        # Create a QPainter and set the QImage as its rendering target
        painter = QtGui.QPainter(image)

        # Render the QGraphicsScene onto the QImage
        self.nodz.scene().render(
            painter, image.rect(), visible_rect
        )

        # Finish painting
        painter.end()

        # Save the QImage to a file
        image.save(path)

        # restore the original bg color
        self.nodz.setStyleSheet(
            "background: rgb({}, {}, {}, {})".format(*current_bg_color)
        )

        self.nodz.gridVisToggle = True