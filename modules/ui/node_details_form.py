# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'node_details_form.ui'
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
        Form.resize(335, 296)
        self.verticalLayout = QVBoxLayout(Form)
        self.verticalLayout.setObjectName(u"verticalLayout")
        self.group_box = QGroupBox(Form)
        self.group_box.setObjectName(u"group_box")
        self.verticalLayout_2 = QVBoxLayout(self.group_box)
        self.verticalLayout_2.setObjectName(u"verticalLayout_2")
        self.formLayout = QFormLayout()
        self.formLayout.setObjectName(u"formLayout")
        self.label = QLabel(self.group_box)
        self.label.setObjectName(u"label")

        self.formLayout.setWidget(0, QFormLayout.LabelRole, self.label)

        self.name_edit = QLineEdit(self.group_box)
        self.name_edit.setObjectName(u"name_edit")

        self.formLayout.setWidget(0, QFormLayout.FieldRole, self.name_edit)

        self.label_2 = QLabel(self.group_box)
        self.label_2.setObjectName(u"label_2")

        self.formLayout.setWidget(1, QFormLayout.LabelRole, self.label_2)

        self.coords_display = QLineEdit(self.group_box)
        self.coords_display.setObjectName(u"coords_display")
        self.coords_display.setReadOnly(True)

        self.formLayout.setWidget(1, QFormLayout.FieldRole, self.coords_display)


        self.verticalLayout_2.addLayout(self.formLayout)

        self.horizontalLayout = QHBoxLayout()
        self.horizontalLayout.setObjectName(u"horizontalLayout")
        self.create_input_btn = QPushButton(self.group_box)
        self.create_input_btn.setObjectName(u"create_input_btn")

        self.horizontalLayout.addWidget(self.create_input_btn)

        self.create_output_btn = QPushButton(self.group_box)
        self.create_output_btn.setObjectName(u"create_output_btn")

        self.horizontalLayout.addWidget(self.create_output_btn)


        self.verticalLayout_2.addLayout(self.horizontalLayout)

        self.line = QFrame(self.group_box)
        self.line.setObjectName(u"line")
        self.line.setFrameShape(QFrame.HLine)
        self.line.setFrameShadow(QFrame.Sunken)

        self.verticalLayout_2.addWidget(self.line)

        self.inputs_area = QGroupBox(self.group_box)
        self.inputs_area.setObjectName(u"inputs_area")
        self.verticalLayout_5 = QVBoxLayout(self.inputs_area)
        self.verticalLayout_5.setObjectName(u"verticalLayout_5")

        self.verticalLayout_2.addWidget(self.inputs_area)

        self.outputs_area = QGroupBox(self.group_box)
        self.outputs_area.setObjectName(u"outputs_area")
        self.verticalLayout_3 = QVBoxLayout(self.outputs_area)
        self.verticalLayout_3.setObjectName(u"verticalLayout_3")

        self.verticalLayout_2.addWidget(self.outputs_area)


        self.verticalLayout.addWidget(self.group_box)


        self.retranslateUi(Form)

        QMetaObject.connectSlotsByName(Form)
    # setupUi

    def retranslateUi(self, Form):
        Form.setWindowTitle(QCoreApplication.translate("Form", u"Form", None))
        self.group_box.setTitle(QCoreApplication.translate("Form", u"GroupBox", None))
        self.label.setText(QCoreApplication.translate("Form", u"Name", None))
        self.label_2.setText(QCoreApplication.translate("Form", u"Coordinates", None))
        self.create_input_btn.setText(QCoreApplication.translate("Form", u"Create Input", None))
        self.create_output_btn.setText(QCoreApplication.translate("Form", u"Create Output", None))
        self.inputs_area.setTitle(QCoreApplication.translate("Form", u"Inputs", None))
        self.outputs_area.setTitle(QCoreApplication.translate("Form", u"Outputs", None))
    # retranslateUi

