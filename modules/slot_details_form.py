# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'slot_details_form.ui'
##
## Created by: Qt User Interface Compiler version 5.15.2
##
## WARNING! All changes made in this file will be lost when recompiling UI file!
################################################################################

from Qt.QtCore import *
from Qt.QtGui import *
from Qt.QtWidgets import *


class Ui_Form(object):
    def setupUi(self, Form):
        if not Form.objectName():
            Form.setObjectName(u"Form")
        Form.resize(450, 29)
        self.horizontalLayout = QHBoxLayout(Form)
        self.horizontalLayout.setSpacing(3)
        self.horizontalLayout.setContentsMargins(3, 3, 3, 3)
        self.horizontalLayout.setObjectName(u"horizontalLayout")
        self.slot_name = QLineEdit(Form)
        self.slot_name.setObjectName(u"slot_name")

        self.horizontalLayout.addWidget(self.slot_name)

        self.data_type = QComboBox(Form)
        self.data_type.setObjectName(u"data_type")
        self.data_type.setMinimumSize(QSize(100, 0))

        self.horizontalLayout.addWidget(self.data_type)

        self.up_btn = QPushButton(Form)
        self.up_btn.setObjectName(u"up_btn")
        self.up_btn.setMaximumSize(QSize(25, 25))

        self.horizontalLayout.addWidget(self.up_btn)

        self.down_btn = QPushButton(Form)
        self.down_btn.setObjectName(u"down_btn")
        self.down_btn.setMaximumSize(QSize(25, 25))

        self.horizontalLayout.addWidget(self.down_btn)


        self.retranslateUi(Form)

        QMetaObject.connectSlotsByName(Form)
    # setupUi

    def retranslateUi(self, Form):
        Form.setWindowTitle("Form")
        self.up_btn.setText("\u25b2")
        self.down_btn.setText("\u25bc")
    # retranslateUi

