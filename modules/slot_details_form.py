# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'slot_details_form.ui'
#
# Created: Sat Sep 15 23:46:47 2018
#      by: pyside-uic 0.2.15 running on PySide 1.2.4
#
# WARNING! All changes made in this file will be lost!

from PySide import QtCore, QtGui

class Ui_Form(object):
    def setupUi(self, Form):
        Form.setObjectName("Form")
        Form.resize(450, 29)
        self.horizontalLayout = QtGui.QHBoxLayout(Form)
        self.horizontalLayout.setSpacing(3)
        self.horizontalLayout.setContentsMargins(3, 3, 3, 3)
        self.horizontalLayout.setObjectName("horizontalLayout")
        self.slot_name = QtGui.QLineEdit(Form)
        self.slot_name.setObjectName("slot_name")
        self.horizontalLayout.addWidget(self.slot_name)
        self.data_type = QtGui.QComboBox(Form)
        self.data_type.setMinimumSize(QtCore.QSize(100, 0))
        self.data_type.setObjectName("data_type")
        self.horizontalLayout.addWidget(self.data_type)
        self.up_btn = QtGui.QPushButton(Form)
        self.up_btn.setMaximumSize(QtCore.QSize(25, 25))
        self.up_btn.setObjectName("up_btn")
        self.horizontalLayout.addWidget(self.up_btn)
        self.down_btn = QtGui.QPushButton(Form)
        self.down_btn.setMaximumSize(QtCore.QSize(25, 25))
        self.down_btn.setObjectName("down_btn")
        self.horizontalLayout.addWidget(self.down_btn)

        self.retranslateUi(Form)
        QtCore.QMetaObject.connectSlotsByName(Form)

    def retranslateUi(self, Form):
        Form.setWindowTitle(QtGui.QApplication.translate("Form", "Form", None, QtGui.QApplication.UnicodeUTF8))
        self.up_btn.setText(QtGui.QApplication.translate("Form", "▲", None, QtGui.QApplication.UnicodeUTF8))
        self.down_btn.setText(QtGui.QApplication.translate("Form", "▼", None, QtGui.QApplication.UnicodeUTF8))

