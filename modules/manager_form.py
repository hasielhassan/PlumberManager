# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'manager_form.ui'
#
# Created: Sat Sep 15 23:46:46 2018
#      by: pyside-uic 0.2.15 running on PySide 1.2.4
#
# WARNING! All changes made in this file will be lost!

from PySide import QtCore, QtGui

class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(1049, 753)
        self.scene_frame = QtGui.QWidget(MainWindow)
        self.scene_frame.setObjectName("scene_frame")
        self.verticalLayout = QtGui.QVBoxLayout(self.scene_frame)
        self.verticalLayout.setObjectName("verticalLayout")
        MainWindow.setCentralWidget(self.scene_frame)
        self.menubar = QtGui.QMenuBar(MainWindow)
        self.menubar.setGeometry(QtCore.QRect(0, 0, 1049, 21))
        self.menubar.setObjectName("menubar")
        self.menuFile = QtGui.QMenu(self.menubar)
        self.menuFile.setObjectName("menuFile")
        MainWindow.setMenuBar(self.menubar)
        self.statusbar = QtGui.QStatusBar(MainWindow)
        self.statusbar.setObjectName("statusbar")
        MainWindow.setStatusBar(self.statusbar)
        self.dockWidget = QtGui.QDockWidget(MainWindow)
        self.dockWidget.setMinimumSize(QtCore.QSize(300, 111))
        self.dockWidget.setObjectName("dockWidget")
        self.manager_panel = QtGui.QWidget()
        self.manager_panel.setObjectName("manager_panel")
        self.verticalLayout_2 = QtGui.QVBoxLayout(self.manager_panel)
        self.verticalLayout_2.setObjectName("verticalLayout_2")
        self.scrollArea = QtGui.QScrollArea(self.manager_panel)
        self.scrollArea.setWidgetResizable(True)
        self.scrollArea.setObjectName("scrollArea")
        self.manager_panel_scroll = QtGui.QWidget()
        self.manager_panel_scroll.setGeometry(QtCore.QRect(0, 0, 280, 670))
        self.manager_panel_scroll.setObjectName("manager_panel_scroll")
        self.verticalLayout_3 = QtGui.QVBoxLayout(self.manager_panel_scroll)
        self.verticalLayout_3.setObjectName("verticalLayout_3")
        self.layout_graph_btn = QtGui.QPushButton(self.manager_panel_scroll)
        self.layout_graph_btn.setObjectName("layout_graph_btn")
        self.verticalLayout_3.addWidget(self.layout_graph_btn)
        self.create_process_btn = QtGui.QPushButton(self.manager_panel_scroll)
        self.create_process_btn.setObjectName("create_process_btn")
        self.verticalLayout_3.addWidget(self.create_process_btn)
        self.line = QtGui.QFrame(self.manager_panel_scroll)
        self.line.setFrameShape(QtGui.QFrame.HLine)
        self.line.setFrameShadow(QtGui.QFrame.Sunken)
        self.line.setObjectName("line")
        self.verticalLayout_3.addWidget(self.line)
        self.details_panel = QtGui.QWidget(self.manager_panel_scroll)
        self.details_panel.setObjectName("details_panel")
        self.verticalLayout_5 = QtGui.QVBoxLayout(self.details_panel)
        self.verticalLayout_5.setContentsMargins(0, 0, 0, 0)
        self.verticalLayout_5.setObjectName("verticalLayout_5")
        self.verticalLayout_3.addWidget(self.details_panel)
        spacerItem = QtGui.QSpacerItem(20, 40, QtGui.QSizePolicy.Minimum, QtGui.QSizePolicy.Expanding)
        self.verticalLayout_3.addItem(spacerItem)
        self.scrollArea.setWidget(self.manager_panel_scroll)
        self.verticalLayout_2.addWidget(self.scrollArea)
        self.dockWidget.setWidget(self.manager_panel)
        MainWindow.addDockWidget(QtCore.Qt.DockWidgetArea(2), self.dockWidget)
        self.actionOpen = QtGui.QAction(MainWindow)
        self.actionOpen.setObjectName("actionOpen")
        self.actionSave = QtGui.QAction(MainWindow)
        self.actionSave.setObjectName("actionSave")
        self.menuFile.addAction(self.actionOpen)
        self.menuFile.addAction(self.actionSave)
        self.menubar.addAction(self.menuFile.menuAction())

        self.retranslateUi(MainWindow)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def retranslateUi(self, MainWindow):
        MainWindow.setWindowTitle(QtGui.QApplication.translate("MainWindow", "MainWindow", None, QtGui.QApplication.UnicodeUTF8))
        self.menuFile.setTitle(QtGui.QApplication.translate("MainWindow", "File", None, QtGui.QApplication.UnicodeUTF8))
        self.layout_graph_btn.setText(QtGui.QApplication.translate("MainWindow", "Layout Graph", None, QtGui.QApplication.UnicodeUTF8))
        self.create_process_btn.setText(QtGui.QApplication.translate("MainWindow", "Create Process", None, QtGui.QApplication.UnicodeUTF8))
        self.actionOpen.setText(QtGui.QApplication.translate("MainWindow", "Open", None, QtGui.QApplication.UnicodeUTF8))
        self.actionSave.setText(QtGui.QApplication.translate("MainWindow", "Save", None, QtGui.QApplication.UnicodeUTF8))

