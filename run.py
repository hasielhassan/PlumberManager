
from Qt import QtWidgets

from modules.manager import PlumberManager

if __name__ == '__main__':
    
    new_app = False

    app = QtWidgets.QApplication.instance()    
    if not app:
        app = QtWidgets.QApplication([])
        new_app = True

    manager = PlumberManager()
    manager.show()

    if new_app:
        # command line stand alone, run our own event loop
        app.exec_()