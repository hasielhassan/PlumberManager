# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'node_details_form.ui'
#
# Created: Sat Sep 15 23:46:47 2018
#      by: pyside-uic 0.2.15 running on PySide 1.2.4
#
# WARNING! All changes made in this file will be lost!

from PySide import QtCore, QtGui

class Ui_Form(object):
    def setupUi(self, Form):
        Form.setObjectName("Form")
        Form.resize(335, 296)
        self.verticalLayout = QtGui.QVBoxLayout(Form)
        self.verticalLayout.setObjectName("verticalLayout")
        self.group_box = QtGui.QGroupBox(Form)
        self.group_box.setObjectName("group_box")
        self.verticalLayout_2 = QtGui.QVBoxLayout(self.group_box)
        self.verticalLayout_2.setObjectName("verticalLayout_2")
        self.formLayout = QtGui.QFormLayout()
        self.formLayout.setObjectName("formLayout")
        self.label = QtGui.QLabel(self.group_box)
        self.label.setObjectName("label")
        self.formLayout.setWidget(0, QtGui.QFormLayout.LabelRole, self.label)
        self.name_edit = QtGui.QLineEdit(self.group_box)
        self.name_edit.setObjectName("name_edit")
        self.formLayout.setWidget(0, QtGui.QFormLayout.FieldRole, self.name_edit)
        self.label_2 = QtGui.QLabel(self.group_box)
        self.label_2.setObjectName("label_2")
        self.formLayout.setWidget(1, QtGui.QFormLayout.LabelRole, self.label_2)
        self.coords_display = QtGui.QLineEdit(self.group_box)
        self.coords_display.setReadOnly(True)
        self.coords_display.setObjectName("coords_display")
        self.formLayout.setWidget(1, QtGui.QFormLayout.FieldRole, self.coords_display)
        self.verticalLayout_2.addLayout(self.formLayout)
        self.horizontalLayout = QtGui.QHBoxLayout()
        self.horizontalLayout.setObjectName("horizontalLayout")
        self.create_input_btn = QtGui.QPushButton(self.group_box)
        self.create_input_btn.setObjectName("create_input_btn")
        self.horizontalLayout.addWidget(self.create_input_btn)
        self.create_output_btn = QtGui.QPushButton(self.group_box)
        self.create_output_btn.setObjectName("create_output_btn")
        self.horizontalLayout.addWidget(self.create_output_btn)
        self.verticalLayout_2.addLayout(self.horizontalLayout)
        self.line = QtGui.QFrame(self.group_box)
        self.line.setFrameShape(QtGui.QFrame.HLine)
        self.line.setFrameShadow(QtGui.QFrame.Sunken)
        self.line.setObjectName("line")
        self.verticalLayout_2.addWidget(self.line)
        self.inputs_area = QtGui.QGroupBox(self.group_box)
        self.inputs_area.setObjectName("inputs_area")
        self.verticalLayout_5 = QtGui.QVBoxLayout(self.inputs_area)
        self.verticalLayout_5.setObjectName("verticalLayout_5")
        self.verticalLayout_2.addWidget(self.inputs_area)
        self.outputs_area = QtGui.QGroupBox(self.group_box)
        self.outputs_area.setObjectName("outputs_area")
        self.verticalLayout_3 = QtGui.QVBoxLayout(self.outputs_area)
        self.verticalLayout_3.setObjectName("verticalLayout_3")
        self.verticalLayout_2.addWidget(self.outputs_area)
        self.verticalLayout.addWidget(self.group_box)

        self.retranslateUi(Form)
        QtCore.QMetaObject.connectSlotsByName(Form)

    def retranslateUi(self, Form):
        Form.setWindowTitle(QtGui.QApplication.translate("Form", "Form", None, QtGui.QApplication.UnicodeUTF8))
        self.group_box.setTitle(QtGui.QApplication.translate("Form", "GroupBox", None, QtGui.QApplication.UnicodeUTF8))
        self.label.setText(QtGui.QApplication.translate("Form", "Name", None, QtGui.QApplication.UnicodeUTF8))
        self.label_2.setText(QtGui.QApplication.translate("Form", "Coordinates", None, QtGui.QApplication.UnicodeUTF8))
        self.create_input_btn.setText(QtGui.QApplication.translate("Form", "Create Input", None, QtGui.QApplication.UnicodeUTF8))
        self.create_output_btn.setText(QtGui.QApplication.translate("Form", "Create Output", None, QtGui.QApplication.UnicodeUTF8))
        self.inputs_area.setTitle(QtGui.QApplication.translate("Form", "Inputs", None, QtGui.QApplication.UnicodeUTF8))
        self.outputs_area.setTitle(QtGui.QApplication.translate("Form", "Outputs", None, QtGui.QApplication.UnicodeUTF8))

