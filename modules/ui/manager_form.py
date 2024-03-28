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
        self.actionAbout = QAction(MainWindow)
        self.actionAbout.setObjectName(u"actionAbout")
        self.actionExport_SVG = QAction(MainWindow)
        self.actionExport_SVG.setObjectName(u"actionExport_SVG")
        self.actionExportPNG = QAction(MainWindow)
        self.actionExportPNG.setObjectName(u"actionExportPNG")
        self.actionExportSVG = QAction(MainWindow)
        self.actionExportSVG.setObjectName(u"actionExportSVG")
        self.actionExportPDF = QAction(MainWindow)
        self.actionExportPDF.setObjectName(u"actionExportPDF")
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
        self.menuExport = QMenu(self.menuFile)
        self.menuExport.setObjectName(u"menuExport")
        self.menuHelp = QMenu(self.menubar)
        self.menuHelp.setObjectName(u"menuHelp")
        MainWindow.setMenuBar(self.menubar)
        self.statusbar = QStatusBar(MainWindow)
        self.statusbar.setObjectName(u"statusbar")
        MainWindow.setStatusBar(self.statusbar)
        self.dockWidget = QDockWidget(MainWindow)
        self.dockWidget.setObjectName(u"dockWidget")
        self.dockWidget.setMinimumSize(QSize(400, 111))
        self.manager_panel = QWidget()
        self.manager_panel.setObjectName(u"manager_panel")
        self.verticalLayout_2 = QVBoxLayout(self.manager_panel)
        self.verticalLayout_2.setObjectName(u"verticalLayout_2")
        self.scrollArea = QScrollArea(self.manager_panel)
        self.scrollArea.setObjectName(u"scrollArea")
        self.scrollArea.setWidgetResizable(True)
        self.manager_panel_scroll = QWidget()
        self.manager_panel_scroll.setObjectName(u"manager_panel_scroll")
        self.manager_panel_scroll.setGeometry(QRect(0, 0, 380, 670))
        self.verticalLayout_3 = QVBoxLayout(self.manager_panel_scroll)
        self.verticalLayout_3.setObjectName(u"verticalLayout_3")
        self.create_process_btn = QPushButton(self.manager_panel_scroll)
        self.create_process_btn.setObjectName(u"create_process_btn")

        self.verticalLayout_3.addWidget(self.create_process_btn)

        self.layout_graph_btn = QPushButton(self.manager_panel_scroll)
        self.layout_graph_btn.setObjectName(u"layout_graph_btn")

        self.verticalLayout_3.addWidget(self.layout_graph_btn)

        self.isolate_selected_btn = QPushButton(self.manager_panel_scroll)
        self.isolate_selected_btn.setObjectName(u"isolate_selected_btn")

        self.verticalLayout_3.addWidget(self.isolate_selected_btn)

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
        self.menubar.addAction(self.menuHelp.menuAction())
        self.menuFile.addAction(self.actionOpen)
        self.menuFile.addAction(self.actionSave)
        self.menuFile.addSeparator()
        self.menuFile.addAction(self.menuExport.menuAction())
        self.menuExport.addAction(self.actionExportPNG)
        self.menuExport.addAction(self.actionExportSVG)
        self.menuExport.addSeparator()
        self.menuExport.addAction(self.actionExportPDF)
        self.menuHelp.addAction(self.actionAbout)

        self.retranslateUi(MainWindow)

        QMetaObject.connectSlotsByName(MainWindow)
    # setupUi

    def retranslateUi(self, MainWindow):
        MainWindow.setWindowTitle(QCoreApplication.translate("MainWindow", u"MainWindow", None))
        self.actionOpen.setText(QCoreApplication.translate("MainWindow", u"Open", None))
        self.actionSave.setText(QCoreApplication.translate("MainWindow", u"Save", None))
        self.actionAbout.setText(QCoreApplication.translate("MainWindow", u"About", None))
        self.actionExport_SVG.setText(QCoreApplication.translate("MainWindow", u"Export SVG", None))
        self.actionExportPNG.setText(QCoreApplication.translate("MainWindow", u"PNG", None))
        self.actionExportSVG.setText(QCoreApplication.translate("MainWindow", u"SVG", None))
        self.actionExportPDF.setText(QCoreApplication.translate("MainWindow", u"PDF", None))
        self.menuFile.setTitle(QCoreApplication.translate("MainWindow", u"File", None))
        self.menuExport.setTitle(QCoreApplication.translate("MainWindow", u"Export", None))
        self.menuHelp.setTitle(QCoreApplication.translate("MainWindow", u"Help", None))
        self.create_process_btn.setText(QCoreApplication.translate("MainWindow", u"Create Process", None))
        self.layout_graph_btn.setText(QCoreApplication.translate("MainWindow", u"Layout Graph", None))
        self.isolate_selected_btn.setText(QCoreApplication.translate("MainWindow", u"Isolate Selected", None))
    # retranslateUi

