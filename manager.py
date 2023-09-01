import os
import json
import qdarkstyle
import pygraphviz

import Nodz
from Nodz import nodz_main

import Qt
from Qt import QtCore, QtGui, QtWidgets

from modules.manager_form import Ui_MainWindow as manager_form
from modules.node_details_form import Ui_Form as node_details_form
from modules.slot_details_form import Ui_Form as slot_details_form

class PlumberManager(QtWidgets.QMainWindow):

    version = "0.0.1-0"

    def __init__(self, parent=None):

        super(PlumberManager, self).__init__(parent)

        self.ui = manager_form()
        self.ui.setupUi(self)

        self.current_dir = os.path.dirname(__file__)
        #os.chdir(self.current_dir)

        self.setWindowTitle('PlumberManager')
        self.setWindowIcon(
            QtGui.QIcon(
                os.path.join(
                    self.current_dir, 
                    'resources','icon_32.png')
            )
        )

        config = os.path.join(self.current_dir, 'custom_config.json')

        self.nodz = nodz_main.Nodz(None)
        self.nodz.loadConfig(filePath=config)
        self.nodz.initialize()

        # Load data icons definition
        # this updates nodz config so it needs to happen after nodz
        icons = os.path.join(self.current_dir, 'data_icons.json')
        self.loadDataTypes(icons)

        self.ui.scene_frame.layout().addWidget(self.nodz)
        self.ui.actionAbout.triggered.connect(self.about)
        self.ui.actionOpen.triggered.connect(self.openGraph)
        self.ui.actionSave.triggered.connect(self.saveGraph)

        self.ui.create_process_btn.clicked.connect(self.createProcess)
        self.ui.layout_graph_btn.clicked.connect(self.layoutGraph)

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
        """
        self.nodz.signal_NodeCreated.connect(self.on_nodeCreated)
        self.nodz.signal_NodeDeleted.connect(self.on_nodeDeleted)
        self.nodz.signal_NodeEdited.connect(self.on_nodeEdited)
        self.nodz.signal_NodeSelected.connect(self.on_nodeSelected)
        self.nodz.signal_NodeMoved.connect(self.on_nodeMoved)
        self.nodz.signal_NodeDoubleClicked.connect(self.on_nodeDoubleClick)

        self.nodz.signal_AttrCreated.connect(self.on_attrCreated)
        self.nodz.signal_AttrDeleted.connect(self.on_attrDeleted)
        self.nodz.signal_AttrEdited.connect(self.on_attrEdited)

        self.nodz.signal_PlugConnected.connect(self.on_connected)
        self.nodz.signal_SocketConnected.connect(self.on_connected)
        self.nodz.signal_PlugDisconnected.connect(self.on_disconnected)
        self.nodz.signal_SocketDisconnected.connect(self.on_disconnected)

        self.nodz.signal_GraphSaved.connect(self.on_graphSaved)
        self.nodz.signal_GraphLoaded.connect(self.on_graphLoaded)
        self.nodz.signal_GraphCleared.connect(self.on_graphCleared)
        self.nodz.signal_GraphEvaluated.connect(self.on_graphEvaluated)

        self.nodz.signal_KeyPressed.connect(self.on_keyPressed)
        """

        self.lastSelectedNode = None

    ######################################################################
    # Test signals
    ######################################################################

    # Nodes
    @QtCore.Slot(str)
    def on_nodeCreated(self, nodeName):
        print('node created: {}'.format(nodeName))

    @QtCore.Slot(str)
    def on_nodeDeleted(self, nodeName):
        print('node deleted: {} '.format(nodeName))

    @QtCore.Slot(str, str)
    def on_nodeEdited(self, nodeName, newName):
        print('node edited: {0}, new name : {1}'.format(nodeName, newName))

    #@QtCore.Slot(str)
    def on_nodeSelected(self, nodeNames):
        print('node selected: {}'.format(nodeNames))

        layout = self.ui.details_panel.layout()
        current_items = layout.count()

        if current_items > 1:

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

    @QtCore.Slot(str)
    def on_nodeDoubleClick(self, nodeName):
        print('double click on node : {0}'.format(nodeName))

    # Attrs
    @QtCore.Slot(str, int)
    def on_attrCreated(self, nodeName, attrId):
        print('attr created : {0} at index : {1}'.format(nodeName, attrId))

    @QtCore.Slot(str, int)
    def on_attrDeleted(self, nodeName, attrId):
        print('attr Deleted : {0} at old index : {1}'.format(nodeName, attrId))

    @QtCore.Slot(str, int, int)
    def on_attrEdited(self, nodeName, oldId, newId):
        print('attr Edited : {0} at old index : {1}, new index : {2}'.format(nodeName, oldId, newId))

    # Connections
    @QtCore.Slot(str, str, str, str)
    def on_connected(self, srcNodeName, srcPlugName, destNodeName, dstSocketName):
        print('connected src: "{0}" at "{1}" to dst: "{2}" at "{3}"'.format(srcNodeName, srcPlugName, destNodeName, dstSocketName))

    @QtCore.Slot(str, str, str, str)
    def on_disconnected(self, srcNodeName, srcPlugName, destNodeName, dstSocketName):
        print('disconnected src: "{0}" at "{1}" from dst: "{2}" at "{3}"'.format(srcNodeName, srcPlugName, destNodeName, dstSocketName))

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

    def loadDataTypes(self, configPath):
        """
        """
        contents = open(configPath, "r").read()
        config = json.loads(contents)

        self.data_types = {}

        for data_type in config:

            path = data_type["path"]
            name = data_type['code']

            if data_type['type'] in self.nodz.dataTypes:
                dtype = self.nodz.dataTypes[data_type['type']]
            else:
                dtype = type(str(data_type['type']), (object,), {})
                self.nodz.dataTypes[data_type['type']] = dtype

            if path.startswith('./'):
                print("Resolving relative path for: {}".format(path))
                path = path.replace('./', '')
                path = os.path.normpath(
                    os.path.join(os.path.dirname(__file__), path)
                )
                print("Absolute path: {}".format(path))

            self.data_types[name] = (dtype, path)


    def createProcess(self):
        processName, ok = QtWidgets.QInputDialog.getText(
            self, 'New Process', 'Process Name:'
        )
        if ok and processName:
            self.nodz.createNode(
                name=processName, preset='node_preset_1', position=None
            )

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

        samples_dir = os.path.join(
            os.path.dirname(__file__),
            "samples"
        )

        path, filter = QtWidgets.QFileDialog.getOpenFileName(
            self, 'Open Graph file', samples_dir, ("Graph (*.gph)")
        )

        self.nodz.clearGraph()
        self.nodz.loadGraph(filePath=path)
        self.nodz._focus()

    def saveGraph(self):

        path, filter = QtWidgets.QFileDialog.getSaveFileName(
            self, 'Open Graph file', os.path.expanduser('~'), ("Graph (*.gph)")
        )

        self.nodz.saveGraph(filePath=path)

    def layoutGraph(self):
        
        graph = pygraphviz.AGraph(rankdir='LR')

        for source, target in self.nodz.evaluateGraph():
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

            node = self.nodz.scene().nodes[nodeName]
            node.setPos(QtCore.QPointF(newX, newY))

        self.nodz.scene().updateScene()

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

        super(SlotDetails, self).__init__()

        self.ui = slot_details_form()
        self.ui.setupUi(self)

        self.slot = slot

        self.ui.slot_name.setText(self.slot.attribute)

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

        self.ui.data_type.setCurrentText(current_data_type[0])

        self.ui.down_btn.setText("")
        self.ui.up_btn.setText("")

        root = os.path.dirname(__file__)
        upPixmap = QtGui.QPixmap(
            os.path.join(root, 'resources', 'arrow-up.png')
        )

        downPixmap = QtGui.QPixmap(
            os.path.join(root, 'resources', 'arrow-down.png')
        )

        self.ui.up_btn.setIcon(upPixmap)
        self.ui.down_btn.setIcon(downPixmap)

        self.ui.up_btn.clicked.connect(self.moveUp)
        self.ui.down_btn.clicked.connect(self.moveDown)

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

if __name__ == '__main__':
    try:
        app = QtWidgets.QApplication([])
        app.setStyleSheet(
            qdarkstyle.load_stylesheet(
                qt_api=Qt.__binding__.lower()
            )
        )
    except:
        # I guess we're running somewhere that already has a QApp created
        #app = QtWidgets.QApplication.instance()
        pass

    manager = PlumberManager()
    manager.show()

    if app:
        # command line stand alone test... run our own event loop
        app.exec_()