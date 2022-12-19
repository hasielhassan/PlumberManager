C:\Python37\Scripts\pyside2-uic --from-imports manager_form.ui > ..\modules\manager_form.py
C:\Python37\Scripts\pyside2-uic --from-imports node_details_form.ui > ..\modules\node_details_form.py
C:\Python37\Scripts\pyside2-uic --from-imports slot_details_form.ui > ..\modules\slot_details_form.py

python -m Qt --convert D:\Development\HasielHassan\PlumberManager\modules\manager_form.py
python -m Qt --convert D:\Development\HasielHassan\PlumberManager\modules\node_details_form.py
python -m Qt --convert D:\Development\HasielHassan\PlumberManager\modules\slot_details_form.py