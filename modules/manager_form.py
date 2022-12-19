# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'manager_form.ui'
##
## Created by: Qt User Interface Compiler version 5.15.2
##
## WARNING! All changes made in this file will be lost when recompiling UI file!
################################################################################

from Qt.QtCore import *
from Qt.QtGui import *
from Qt.QtWidgets import *


class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        if not MainWindow.objectName():
            MainWindow.setObjectName(u"MainWindow")
        MainWindow.resize(1049, 753)
        self.actionOpen = QAction(MainWindow)
        self.actionOpen.setObjectName(u"actionOpen")
        self.actionSave = QAction(MainWindow)
        self.actionSave.setObjectName(u"actionSave")
        self.scene_frame = QWidget(MainWindow)
        self.scene_frame.setObjectName(u"scene_frame")
        self.verticalLayout = QVBoxLayout(self.scene_frame)
        self.verticalLayout.setObjectName(u"verticalLayout")
        MainWindow.setCentralWidget(self.scene_frame)
        self.menubar = QMenuBar(MainWindow)
        self.menubar.setObjectName(u"menubar")
        self.menubar.setGeometry(QRect(0, 0, 1049, 21))
        self.menuFile = QMenu(self.menubar)
        self.menuFile.setObjectName(u"menuFile")
        MainWindow.setMenuBar(self.menubar)
        self.statusbar = QStatusBar(MainWindow)
        self.statusbar.setObjectName(u"statusbar")
        MainWindow.setStatusBar(self.statusbar)
        self.dockWidget = QDockWidget(MainWindow)
        self.dockWidget.setObjectName(u"dockWidget")
        self.dockWidget.setMinimumSize(QSize(300, 111))
        self.manager_panel = QWidget()
        self.manager_panel.setObjectName(u"manager_panel")
        self.verticalLayout_2 = QVBoxLayout(self.manager_panel)
        self.verticalLayout_2.setObjectName(u"verticalLayout_2")
        self.scrollArea = QScrollArea(self.manager_panel)
        self.scrollArea.setObjectName(u"scrollArea")
        self.scrollArea.setWidgetResizable(True)
        self.manager_panel_scroll = QWidget()
        self.manager_panel_scroll.setObjectName(u"manager_panel_scroll")
        self.manager_panel_scroll.setGeometry(QRect(0, 0, 280, 670))
        self.verticalLayout_3 = QVBoxLayout(self.manager_panel_scroll)
        self.verticalLayout_3.setObjectName(u"verticalLayout_3")
        self.layout_graph_btn = QPushButton(self.manager_panel_scroll)
        self.layout_graph_btn.setObjectName(u"layout_graph_btn")

        self.verticalLayout_3.addWidget(self.layout_graph_btn)

        self.create_process_btn = QPushButton(self.manager_panel_scroll)
        self.create_process_btn.setObjectName(u"create_process_btn")

        self.verticalLayout_3.addWidget(self.create_process_btn)

        self.line = QFrame(self.manager_panel_scroll)
        self.line.setObjectName(u"line")
        self.line.setFrameShape(QFrame.HLine)
        self.line.setFrameShadow(QFrame.Sunken)

        self.verticalLayout_3.addWidget(self.line)

        self.details_panel = QWidget(self.manager_panel_scroll)
        self.details_panel.setObjectName(u"details_panel")
        self.verticalLayout_5 = QVBoxLayout(self.details_panel)
        self.verticalLayout_5.setObjectName(u"verticalLayout_5")

        self.verticalLayout_3.addWidget(self.details_panel)

        self.verticalSpacer = QSpacerItem(20, 40, QSizePolicy.Minimum, QSizePolicy.Expanding)

        self.verticalLayout_3.addItem(self.verticalSpacer)

        self.scrollArea.setWidget(self.manager_panel_scroll)

        self.verticalLayout_2.addWidget(self.scrollArea)

        self.dockWidget.setWidget(self.manager_panel)
        MainWindow.addDockWidget(Qt.RightDockWidgetArea, self.dockWidget)

        self.menubar.addAction(self.menuFile.menuAction())
        self.menuFile.addAction(self.actionOpen)
        self.menuFile.addAction(self.actionSave)

        self.retranslateUi(MainWindow)

        QMetaObject.connectSlotsByName(MainWindow)
    # setupUi

    def retranslateUi(self, MainWindow):
        MainWindow.setWindowTitle(u"MainWindow")
        self.actionOpen.setText(u"Open")
        self.actionSave.setText(u"Save")
        self.menuFile.setTitle(u"File")
        self.layout_graph_btn.setText(u"Layout Graph")
        self.create_process_btn.setText(u"Create Process")
    # retranslateUi

