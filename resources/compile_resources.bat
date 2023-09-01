pyside2-uic manager_form.ui > ..\modules\manager_form.py
pyside2-uic node_details_form.ui > ..\modules\node_details_form.py
pyside2-uic slot_details_form.ui > ..\modules\slot_details_form.py

@powershell -Command "get-content -path ..\modules\manager_form.py | foreach-object {$_ -replace 'from PySide2','from Qt'} | Set-Content ..\modules\manager_form.py.copy"
@powershell -Command "Move-Item -Path ..\modules\manager_form.py.copy -Destination ..\modules\manager_form.py -force" 

@powershell -Command "get-content -path ..\modules\node_details_form.py | foreach-object {$_ -replace 'from PySide2','from Qt'} | Set-Content ..\modules\node_details_form.py.copy"
@powershell -Command "Move-Item -Path ..\modules\node_details_form.py.copy -Destination ..\modules\node_details_form.py -force" 

@powershell -Command "get-content -path ..\modules\slot_details_form.py | foreach-object {$_ -replace 'from PySide2','from Qt'} | Set-Content ..\modules\slot_details_form.py.copy"
@powershell -Command "Move-Item -Path ..\modules\slot_details_form.py.copy -Destination ..\modules\slot_details_form.py -force" 